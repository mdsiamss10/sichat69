/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { db } from "@/firebase.config";
import { MessageType, SubAdminsType } from "@/types";
import { User } from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { MdBlurOff, MdDelete, MdLensBlur } from "react-icons/md";

function ChatBox({
  message,
  user,
  admins,
}: {
  message: MessageType;
  user: User | null;
  admins: SubAdminsType[];
}) {
  const [whoIsTyping, setWhoIsTyping] = useState<
    { name: string; isTyping: boolean }[] | []
  >([]);
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
  useEffect(() => {
    const db = getDatabase();
    const isTypingRef = ref(db, "whoistyping");

    // Listen for changes in the database reference
    onValue(isTypingRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Convert the data object into an array
        const newDataArray = Object.keys(data).map((key) => ({
          name: key,
          isTyping: data[key].isTyping,
        }));

        // Filter out duplicates based on the 'name' and 'isTyping' values
        const filteredArray = newDataArray.filter((newData) => {
          return !whoIsTyping.some((existingData: any) => {
            return (
              existingData.name === newData.name &&
              existingData.isTyping === newData.isTyping
            );
          });
        });

        // Update the state with the new array
        // console.log(filteredArray);
        setWhoIsTyping(() => [...filteredArray]);
      }
    });
  }, []);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // The page is not visible
        const fDB = getDatabase();
        set(ref(fDB, `whoistyping/${user?.email?.split("@")[0]}`), {
          isTyping: false,
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return (
    <>
      <div
        className={`chat ${
          user?.uid === message?.userID ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          {whoIsTyping.length == 0 ? (
            <>
              <div className="w-10 rounded-full">
                <img title={message.name} src={message?.userPhotoUrl ?? ""} />
              </div>
            </>
          ) : (
            <>
              {whoIsTyping.map((typeUser) => (
                <>
                  {typeUser.name === message.email.split("@")[0] && (
                    <>
                      {typeUser.isTyping &&
                        typeUser.name !== user?.email?.split("@")[0] && (
                          <>
                            <audio
                              autoPlay={true}
                              src="\resources\Facebook Msnger 2014.mp3"
                            />
                          </>
                        )}
                      <div
                        className={`w-10 rounded-full transition-all ${
                          typeUser.isTyping &&
                          typeUser.name !== user?.email?.split("@")[0] &&
                          message.privateChatBetweenAliSiam &&
                          "border-4 border-primary animate-pulse"
                        }`}
                      >
                        <img
                          title={message.name}
                          src={message?.userPhotoUrl ?? ""}
                        />
                      </div>
                    </>
                  )}
                </>
              ))}
            </>
          )}
        </div>
        <div className="chat-header">
          {user?.uid !== message?.userID && (
            <span className="opacity-80">
              {message?.name}{" "}
              {message.privateChatBetweenAliSiam && (
                <>
                  <div className="badge badge-primary badge-sm ml-1">
                    PRIVATE
                  </div>
                </>
              )}
            </span>
          )}
        </div>
        <div
          className={`chat-bubble my-1 p-3.5 text-[0.873rem] ${
            user?.uid === message?.userID
              ? `${
                  message.privateChatBetweenAliSiam
                    ? "chat-bubble"
                    : "chat-bubble-primary"
                }`
              : "bg-gray-100 text-black"
          } flex justify-center items-center min-w-auto transition ${
            message!.blured && "blur-sm select-none"
          }`}
        >
          {message?.text ?? ""}
        </div>
        <div className="chat-footer opacity-100">
          <div className="flex items-center mb-2 justify-between">
            {(user?.uid === message.userID ||
              admins.some(({ email }) => email === user?.email)) && (
              <div className="flex space-x-2 select-none items-center justify-center">
                <MdDelete
                  onClick={() => handleDelete(message!.docID)}
                  className="text-red-500 text-lg cursor-pointer"
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
            <div
              className={`text-[0.6rem] opacity-50 ${
                message?.userID === user?.uid && "ml-2"
              } ${admins.some(({ email }) => email === user?.email) && "ml-2"}`}
            >
              {moment(message?.timestamp).fromNow()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
