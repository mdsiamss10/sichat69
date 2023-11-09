import { Timestamp } from "firebase/firestore";

export interface MessageType {
  docID: string;
  userID: string;
  text: string;
  name: string;
  email: string;
  createdAt: string;
  timestamp: Date;
  userPhotoUrl: string;
  privateChatBetweenAliSiam: boolean;
  blured: boolean;
  servertimestamp: Timestamp;
}
export interface SubAdminsType {
  email: string;
  docID: string;
}
