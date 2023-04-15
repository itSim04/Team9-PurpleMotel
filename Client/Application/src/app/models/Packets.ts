export interface DeletionErrorResponse<Data> {
  status: string,
  message: {
    id: string;
    type: string;
    attributes: Data;
    relationships: {
      rltp: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  }[];
  included?: {

    id: string;
    type: string;
    attributes: unknown;

  }[];
}
