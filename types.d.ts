export interface MessageType {
  docID: string;
  userID: string;
  text: string;
  name: string;
  createdAt: string;
  timestamp: Date;
  userPhotoUrl: string;
  privateChatBetweenAliSiam: boolean;
  blured: boolean;
}
export interface SubAdminsType {
  email: string;
  docID: string;
}
