import { db } from "@/firebase.config";
import useStore from "@/store/useCheckStore";
import { User } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
function Footer({ user }: { user: User | null }) {
  const [text, setText] = useState("");
  const { checked } = useStore();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const date = new Date();
    const formattedDate =
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
      " " +
      date.toLocaleTimeString();
    e.preventDefault();
    if (text !== "") {
      const newText = text;
      setText("");
      try {
        await addDoc(collection(db, "chats"), {
          userID: user!.uid,
          text: newText,
          createdAt: formattedDate,
          name: user!.displayName,
          userPhotoUrl: user!.photoURL,
          timestamp: Date.now(),
          servertimestamp: serverTimestamp(),
          privateChatBetweenAliSiam: checked,
          blured: false,
        });
      } catch (error: any) {
        alert(error.message);
      }
    }
  };
  return (
    <>
      <div className="flex justify-between items-center p-4 md:px-0">
        <form onSubmit={handleSubmit} className="flex items-center w-full">
          <input
            type="text"
            id="simple-search"
            className="input input-bordered input-primary w-full mr-2"
            placeholder="Type Here..."
            autoComplete="off"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <RiSendPlaneFill />
          </button>
        </form>
      </div>
    </>
  );
}

export default Footer;
