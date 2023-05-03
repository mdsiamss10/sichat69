import { Timestamp } from "firebase/firestore";

export interface MessageType {
  docID: string;
  userID: string;
  text: string;
  name: string;
  createdAt: string;
  timestamp: Timestamp;
  userPhotoUrl: string;
  privateChatBetweenAliSiam: boolean;
  blured: boolean;
}
