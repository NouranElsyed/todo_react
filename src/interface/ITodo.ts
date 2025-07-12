export interface ITodo {
  IsDone?: boolean;
  description?: string;
  documentId?: string;
  id?: number;
  title?: string;
  user?: number[]
}

// interface IuserDetails {
//   documentId?: string;
//   email?: string;
//   id?: number;
//   todos?: {
//     IsDone?: boolean;
//     description?: string;
//     documentId?: string;
//     id?: number;
//     title?: string;
//   }[];
//   username?: string;
// }
