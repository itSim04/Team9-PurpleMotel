import { UserAttributes } from 'src/app/models/User';
import { KeyValue } from "@angular/common";
import { User } from "./User";

export interface Message {

    // Holds a message

    date: Date; // The date of the message 
    owner_id: string; // The owner id
    content: string; // The content of the message


}

export interface Chat {

    // Holds a chat

    user_1: KeyValue<string, UserAttributes>; // The first user (typically the logged in user)
    user_2: KeyValue<string, UserAttributes>; // The second user
    start: Date; // The start date of the conversation
    lastMessage: Message; // The last message in the chat
    messages: Message[]; // The messages held by this chat


}