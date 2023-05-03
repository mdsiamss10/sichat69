/* eslint-disable @next/next/no-img-element */
"use client";
import { adminArray } from "@/admin.array";
import { db } from "@/firebase.config";
import { MessageType } from "@/types";
import { User } from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
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
    <div className="bg-slate-100 px-4 py-2 rounded-md my-2 lg:my-3 shadow-sm shadow-gray-100">
      <div className="flex items-center mb-2 justify-between">
        <div className="flex items-center">
          <img
            className="w-11 h-11 rounded-full"
            src={message!.userPhotoUrl}
            alt="User image"
          />
          <div className="ml-3">
            <div className="font-medium">{message.name}</div>
            <span className="text-sm text-slate-700">{message.createdAt}</span>
          </div>
        </div>
        {(user?.uid === message.userID ||
          adminArray.includes(user?.email ?? "")) && (
          <div className="flex space-x-2 select-none">
            {message.blured ? (
              <>
                <MdBlurOff
                  onClick={() => handleBlurUpdate(message!.docID)}
                  className="text-green-500 text-xl cursor-pointer"
                />
              </>
            ) : (
              <>
                <MdLensBlur
                  onClick={() => handleBlurUpdate(message!.docID)}
                  className="text-green-500 text-xl cursor-pointer"
                />
              </>
            )}
            <RiDeleteBin6Line
              onClick={() => handleDelete(message!.docID)}
              className="text-red-500 text-xl cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="bg-white rounded-md p-3">
        <p
          className={`text-gray-800 ${
            message!.blured && "blur-sm select-none"
          }`}
        >
          {message.text}
        </p>
      </div>
    </div>
  );
}

export default ChatBox;
