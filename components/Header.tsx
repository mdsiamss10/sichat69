/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { adminArray } from "@/admin.array";
import { auth } from "@/firebase.config";
import { User, signOut } from "firebase/auth";
import CheckBox from "./CheckBox";
import NormalUserDropDown from "./NormalUserDropDown";

function Header({ user }: { user: User | null }) {
  const handleSignOut = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      try {
        await signOut(auth);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };
  return (
    <>
      <div className="flex justify-between items-center p-4 shadow-lg shadow-gray-100 md:rounded-md bg-white">
        <NormalUserDropDown user={user!} />
        <div className="flex items-center space-x-5">
          {(adminArray.includes(user?.email ?? "") ||
            user?.email === "mohammadali.150236@gmail.com") && (
            <CheckBox user={user} />
          )}
          <button
            onClick={handleSignOut}
            className="btn btn-primary rounded-full px-4"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
