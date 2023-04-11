import { KeyValue } from "@angular/common";

export interface Announcement {

    label: string, //Label of a certain announcement item
    description: string, //Information about it
    available_quantity: number; //Current available quantity of said announcement item
    is_ingredient: boolean;
  
  }

  export interface AnnouncementsResponse {
    status: string,
    data: {
      id: string;
      type: string;
      attributes: Announcement;
    }[];
    
  }

  export interface AnnouncementResponse {
    status: string,
    data: {
      id: string;
      type: string;
      attributes: Announcement;
    };
  }

  export interface AnnouncementPackage{
    announcement: KeyValue<string,Announcement>
  }
  
  export interface AnnouncementsPackage{
    announcements: Map<string,Announcement>
  }