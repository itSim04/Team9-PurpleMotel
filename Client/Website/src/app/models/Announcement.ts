import { User, UserAttributes } from './User';
import { KeyValue } from "@angular/common";

export interface AnnouncementAttributes {

  label: string, //Label of a certain announcement
  body: string, //Information about it
  concerned_tier: number;

}

export interface Announcement extends AnnouncementAttributes {

  author_id: string;

}

export interface AnnouncementsResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: AnnouncementAttributes;
    relationships: {
      user: {
        data: {
          id: string,
          type: string;
        };
      },
    };
  }[];
  included?: {

    id: string;
    type: string;
    attributes: UserAttributes;
    relationships: {
      user_type: {
        data: {
          id: string;
          type: string;
        };
      };
    };

  }[];

}

export interface AnnouncementResponse {
  status: string,
  data: {
    id: string;
    type: string;
    attributes: AnnouncementAttributes;
    relationships: {
      user: {
        data: {
          id: string,
          type: string;
        };
      },
    };
  };
  included?: {

    id: string;
    type: string;
    attributes: UserAttributes;
    relationships: {
      user_type: {
        data: {
          id: string;
          type: string;
        };
      };
    };

  }[];
}

export interface AnnouncementPackage {
  announcement: KeyValue<string, Announcement>;
  user: KeyValue<string, User>;
}

export interface AnnouncementsPackage {
  announcements: Map<string, Announcement>;
  users: Map<string, User>;
}