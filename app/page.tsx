"use client";

import ChatPage from "@/components/ChatPage";
import SignIn from "@/components/SignIn";
import { auth } from "@/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

function Home() {
  const [user] = useAuthState(auth);
  return <>{user ? <ChatPage user={user} /> : <SignIn />}</>;
}

export default Home;
