/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { adminArray } from "@/admin.array";
import { db } from "@/firebase.config";
import { MessageType } from "@/types";
import { User } from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { MdBlurOff, MdLensBlur } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

function ChatBox({
  message,
  user,
}: {
  message: MessageType;
  user: User | null;
}) {
  const handleDelete = async (docID: string) => {
    if (confirm("Are you sure you want to delete?")) {
      try {
        await deleteDoc(doc(db, "chats", docID));
      } catch (error: any) {
        alert(error.message);
      }
    }
  };
  const handleBlurUpdate = async (docID: string) => {
    try {
      await updateDoc(doc(db, "chats", docID), { blured: !message.blured });
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <>
      <div
        className={`chat ${
          user?.uid === message?.userID ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={message?.userPhotoUrl ?? ""} />
          </div>
        </div>
        <div className="chat-header">
          <span>{message?.name ?? ""} | </span>
          <time className="text-xs opacity-50">
            {moment(message?.timestamp).fromNow()}
          </time>
        </div>
        <div
          className={`chat-bubble my-1 ${
            user?.uid === message?.userID
              ? "chat-bubble-primary"
              : "bg-gray-800"
          } flex justify-center items-center min-w-auto transition ${
            message!.blured && "blur-sm select-none"
          }`}
        >
          {message?.text ?? ""}
        </div>
        <div className="chat-footer opacity-100">
          <div className="flex items-center mb-2 justify-between">
            {(user?.uid === message.userID ||
              adminArray.includes(user?.email ?? "")) && (
              <div className="flex space-x-2 select-none">
                <RiDeleteBin6Line
                  onClick={() => handleDelete(message!.docID)}
                  className="text-red-500 text-lg cursor-pointer opacity-50"
                />
                {message.blured ? (
                  <>
                    <MdBlurOff
                      onClick={() => handleBlurUpdate(message!.docID)}
                      className="text-green-500 text-lg cursor-pointer"
                    />
                  </>
                ) : (
                  <>
                    <MdLensBlur
                      onClick={() => handleBlurUpdate(message!.docID)}
                      className="text-green-500 text-lg cursor-pointer"
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
