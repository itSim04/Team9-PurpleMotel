import { KeyValue } from "@angular/common";
import { User, UserAttributes } from './User';

export interface Announcement {

  label: string, //Label of a certain announcement
  body: string, //Information about it
  concerned_tier: string,

  author_id: string;

}


export interface AnnouncementsResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: Announcement;
  }[];

  included: {
    id: string,
    type: 'Users',
    attributes: UserAttributes,
    relationships: {
      user_type: {
        data: {
          id: string,
          type: string;
        };
      },
    };
  }[];
}

export interface AnnouncementResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: Announcement;
  };

  included: {

    id: string;
    type: 'Users';
    attributes: UserAttributes;
  };
}

export interface AnnouncementPackage {
  announcement: KeyValue<string, Announcement>;
  user: KeyValue<string, User>;
}

export interface AnnouncementsPackage {
  announcements: Map<string, Announcement>;
  users: Map<string, User>;
}