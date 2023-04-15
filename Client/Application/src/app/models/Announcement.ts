import { KeyValue } from "@angular/common";

export interface Announcement {

    label: string, //Label of a certain announcement
    body: string, //Information about it
  
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