import { Timestamp } from "firebase/firestore";

export interface MessageType {
  docID: string;
  userID: string;
  text: string;
  name: string;
  createdAt: string;
  timestamp: Timestamp;
  userPhotoUrl: string;
<<<<<<< HEAD
=======
  privateChatBetweenAliSiam: boolean;
  blured: boolean;
>>>>>>> 470c8d1 (Adding private and blur feature)
}
