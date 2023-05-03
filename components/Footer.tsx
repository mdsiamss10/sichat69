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
          timestamp: serverTimestamp(),
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
          <label htmlFor="simple-search" className="sr-only">
            Send Message
          </label>
          <div className="relative w-full">
            {/* <div className="absolute cursor-pointer z-50 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FcAddImage className="text-gray-600 cursor-pointer" />
            </div> */}
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 pl-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-0 block w-full p-2.5  "
              placeholder="Type Here..."
              autoComplete="off"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="p-[0.72rem] px-6 md:px-8 ml-2 text-lg font-medium text-white bg-blue-600 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <RiSendPlaneFill />
          </button>
        </form>
      </div>
    </>
  );
}

export default Footer;
