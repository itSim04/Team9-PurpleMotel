import { KeyValue } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Database, DatabaseReference, getDatabase, onChildAdded,push, ref, runTransaction, set, update} from '@angular/fire/database';
import { extractSessionUser, User } from "src/app/models/User";
import { Chat, Message } from "src/app/models/Chat";
import { UserDatabaseService } from "src/app/services/providers/user-database.service";
import { extractUserId, formatDate } from "src/app/components/database/database.component";
import { UrlBuilderService } from "src/app/services/utility/url-builder.service";


@Component({
  selector: 'app-chats',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatsPageComponent implements OnInit {

  // Holds a conversation

  @ViewChild('container') private container!: ElementRef;
  message: string = ""; // The current message
  loading: boolean = true; // Whether the page is still loading
  chat_loading: boolean = true; // Whether the page is still loading

  all_users: Map<string, User> = new Map<string, User>();
  active_guests: KeyValue<string, User>[] = [];
  active_last_messages: { lastDate: string, lastMessage: string; }[] = [];

  active_ids: string[] = [];

  hovered_id = -1;

  session_user!: KeyValue<string, User>; // The logged in user

  db: Database = getDatabase(); // Instance of firebase
  id!: string; // The id of the chat (x-y)
  chat: Map<string, Chat> = new Map(); // The chat this class holds
  constructor (public url: UrlBuilderService, private router: Router, private database: Database, private userService: UserDatabaseService, private route: ActivatedRoute) { }

  ngOnInit() {

    // Retrieves the messages from Firebase

    this.db = getDatabase();

    this.id = this.route.snapshot.paramMap.get("id") || '0';

    this.session_user = {

      key: extractUserId()!,
      value: extractSessionUser()!

    };

    this.userService.getAllUsers().subscribe(u => {

      this.all_users = u.users;

      const chatsRef = ref(this.db, 'chats/');

      onChildAdded(chatsRef, (snapshot) => {


        const temp = this.all_users.get(snapshot.key || '');


        if (temp) {

          if (snapshot.key == this.id) {

            this.chat_loading = true;

          } else {
            this.chat_loading = false;

            this.active_guests.push({ key: snapshot.key || '0', value: temp });
            this.active_last_messages.push((snapshot.val() as { lastDate: string, lastMessage: string; }));

          }
        }

      });


      if (this.id != '0') {

        this.download();

      } else {

        this.loading = false;
      }



    });
  }

  download() {

    this.loading = true;



    const commentsRef = ref(this.db, 'messages/' + this.id);

    console.log(this.id, this.active_ids, this.active_ids.indexOf(this.id!));
    if (this.id && this.active_ids.indexOf(this.id) == -1) {

      this.chat.set(this.id!, {

        user_1: this.session_user,
        user_2: this.all_users.getPair(this.id!)!,
        lastMessage: {

          content: '',
          owner_id: '-1',
          date: new Date()

        },
        messages: [],
        start: new Date()

      });

      this.active_ids.push(this.id);
      onChildAdded(commentsRef, (snapshot) => {

        this.loading = false;

        const data = snapshot.val();

        if (data["sender"] == this.session_user.key || data["sender"] == this.id) {


          const message = {

            content: data["message"],
            date: new Date(data["timestamp"]),
            owner_id: data["sender"]

          };
          this.chat.get(this.id)!.messages.push(message);

          this.chat.get(this.id)!.lastMessage = message;



          setTimeout(() => {


            this.container.nativeElement.scrollTo({ left: 0, top: this.container.nativeElement.scrollHeight, behavior: 'smooth' });

          });
        }

      });
    } else {

      this.loading = false;

    }

  }


  isSpecial(str: string): boolean {
    const emojiRegex = /^\p{Emoji}$/u; // regular expression to match a single Unicode emoji
    return emojiRegex.test(str.trim());
  }

  routeTo(id: string) {

    this.router.navigate(['adminchat/' + id]);
    this.id = String(id);
    this.download();

  }

  keyStroke($event: KeyboardEvent) {

    if ($event.key == "Enter") {

      this.postMessage();

    }

  }

  postMessage() {

    // Posts the message

    if (this.message.trim()) {


      const postListRef = ref(this.db, 'messages/' + this.id);

      const current_date = new Date();

      set(push(postListRef), {

        message: this.message,
        sender: this.session_user!.key,
        timestamp: current_date.toISOString()

      }).catch(r => console.log(r));

      const chatRef = ref(this.db, 'chats/' + this.id);

      update(chatRef, {

        lastMessage: this.message,
        lastDate: current_date.toISOString(),
        lastSender: this.session_user.key

      }).catch(r => console.log(r));

      const postRef: DatabaseReference = ref(this.db, "users/" + this.id + "/chats/");

      runTransaction(postRef, (post) => {

        if (!post) {

          post = {

            [this.id!]: current_date.toISOString()

          };

        } else if (!post[this.id!]) {

          post[this.id!] = current_date.toISOString();

        }
        return post;
      }).catch(r => console.log(r));

      this.message = "";

    }
  }

  formatDate(date: Date): string {

    // Formats the date in a readable format

    return formatDate(date);

  }
  formatDateString(date: string): string {

    // Formats the date in a readable format

    return formatDate(new Date(date));

  }

  // Defines border logic for messages
  topLeft(c: Message, i: number) {

    if (i == 0 || this.formatDate(this.chat.get(this.id)?.messages![i - 1].date!) != this.formatDate(c.date) || c.owner_id == this.session_user.key) {

      return '20px';

    } else if (i > 0 && this.chat.get(this.id)?.messages![i - 1].owner_id == c.owner_id) {

      return '5px';

    } else {

      return '20px';

    }

  }

  bottomRight(c: Message, i: number) {

    if (i == this.chat.get(this.id)?.messages!.length! - 1 || this.formatDate(this.chat.get(this.id)?.messages![i + 1].date!) != this.formatDate(c.date) || c.owner_id != this.session_user.key) {

      return '20px';

    } else if (i < this.chat.get(this.id)?.messages!.length! - 1 && this.chat.get(this.id)?.messages![i + 1].owner_id == c.owner_id) {

      return '5px';

    } else {

      return '20px';

    }
  }

  bottomLeft(c: Message, i: number) {

    if (i == this.chat.get(this.id)?.messages!.length! - 1 || this.formatDate(this.chat.get(this.id)?.messages![i + 1].date!) != this.formatDate(c.date) || c.owner_id == this.session_user.key) {

      return '20px';

    } else if (i < this.chat.get(this.id)?.messages!.length! - 1 && this.chat.get(this.id)?.messages![i + 1].owner_id == c.owner_id) {

      return '5px';

    } else {

      return '20px';

    }
  }

  topRight(c: Message, i: number) {

    if (i == 0 || this.formatDate(this.chat.get(this.id)?.messages![i - 1].date!) != this.formatDate(c.date) || c.owner_id != this.session_user.key) {

      return '20px';

    } else if (i > 0 && this.chat.get(this.id)?.messages![i - 1].owner_id == c.owner_id) {

      return '5px';

    } else {

      return '20px';

    }
  }





}

