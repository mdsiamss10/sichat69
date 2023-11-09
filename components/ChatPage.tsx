"use client";
import { auth, db } from "@/firebase.config";
import { SubAdminsType } from "@/types";
import { User, signOut } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import ChatContainer from "./ChatContainer";
import Footer from "./Footer";
import Header from "./Header";

function ChatPage({ user }: { user: User | null }) {
  const [subadmins, setSubAdmins] = useState<SubAdminsType[]>([]);
  const [admins, setAdmins] = useState<SubAdminsType[]>([]);

  useEffect(() => {
    if (localStorage.getItem("isPasswordSet") !== "true") {
      if (admins.some(({ email }) => email !== user?.email)) {
        if (prompt("Enter password to login: ") !== "sichat69") {
          void signOut(auth);
        } else {
          localStorage.setItem("isPasswordSet", "true");
        }
      }
    }
  }, [user, admins]);

  useEffect(() => {
    const collectionRef = collection(db, "subadmins");
    const unsubscribe = onSnapshot(collectionRef, (snapshots) => {
      setSubAdmins(
        // @ts-ignore
        snapshots.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "admins");
    const unsubscribe = onSnapshot(collectionRef, (snapshots) => {
      setAdmins(
        // @ts-ignore
        snapshots.docs.map((doc) => ({ ...doc.data(), docID: doc.id }))
      );
    });
    return unsubscribe;
  }, []);
  return (
    <div className="max-w-3xl main-container mx-auto flex flex-col">
      <Header subadmins={subadmins} admins={admins} user={user} />
      <ChatContainer subadmins={subadmins} admins={admins} user={user} />
      <Footer user={user} />
    </div>
  );
}

export default ChatPage;
