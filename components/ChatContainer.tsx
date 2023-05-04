"use client";

import { db } from "@/firebase.config";

import { MessageType, SubAdminsType } from "@/types";
import { User } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import ChatBox from "./ChatBox";

function ChatContainer({
  user,
  admins,
  subadmins,
}: {
  user: User | null;
  admins: SubAdminsType[];
  subadmins: SubAdminsType[];
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const collectionRef = collection(db, "chats");
    const q = query(collectionRef, orderBy("servertimestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshots) => {
      setMessages(
        // @ts-ignore
        snapshots.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto p-2 md:px-0 w-full]">
      {messages.length === 0 && (
        <p className="h-full flex justify-center items-center text-xl font-medium text-gray-800">
          Nothing to show!
        </p>
      )}

      {admins.some(({ email }) => email === user?.email) ||
      subadmins.some(({ email }) => email === user?.email) ? (
        <>
          {messages.map((message) => (
            <ChatBox
              key={message.docID}
              admins={admins}
              message={message}
              user={user}
            />
          ))}
        </>
      ) : (
        <>
          {messages
            .filter((msg) => {
              return !msg.privateChatBetweenAliSiam;
            })
            .map((message) => (
              <ChatBox
                key={message.docID}
                admins={admins}
                message={message}
                user={user}
              />
            ))}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatContainer;
