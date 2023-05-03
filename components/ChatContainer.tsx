"use client";

import { adminArray, subAdminArray } from "@/admin.array";
import { db } from "@/firebase.config";

import { MessageType } from "@/types";
import { User } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import ChatBox from "./ChatBox";

function ChatContainer({ user }: { user: User | null }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);


  useEffect(() => {
    const collectionRef = collection(db, "chats");
    const q = query(collectionRef, orderBy("timestamp", "asc"));
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
    <div className="flex-1 overflow-auto px-2 md:px-0">
      {messages.length === 0 && (
        <p className="h-full flex justify-center items-center text-xl font-medium text-gray-800">
          Nothing to show!
        </p>
      )}

      {subAdminArray.includes(user?.email ?? "") ||
      adminArray.includes(user?.email ?? "") ? (
        <>
          {messages.map((message) => (
            <ChatBox key={message.docID} message={message} user={user} />
          ))}
        </>
      ) : (
        <>
          {messages
            .filter((msg) => {
              return !msg.privateChatBetweenAliSiam;
            })
            .map((message) => (
              <ChatBox key={message.docID} message={message} user={user} />
            ))}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatContainer;
