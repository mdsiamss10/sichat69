import { User } from "firebase/auth";
import ChatContainer from "./ChatContainer";
import Footer from "./Footer";
import Header from "./Header";

function ChatPage({ user }: { user: User | null }) {
  return (
    <div className="max-w-3xl main-container mx-auto flex flex-col">
      <Header user={user} />
      <ChatContainer user={user} />
      <Footer user={user} />
    </div>
  );
}

export default ChatPage;
