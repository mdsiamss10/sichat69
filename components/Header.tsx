/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { auth } from "@/firebase.config";
import { SubAdminsType } from "@/types";
import { User, signOut } from "firebase/auth";
import AdminUserModal from "./AdminUserModal";
import CheckBox from "./CheckBox";
import NormalUserDropDown from "./NormalUserDropDown";

function Header({
  user,
  admins,
  subadmins,
}: {
  user: User | null;
  admins: SubAdminsType[];
  subadmins: SubAdminsType[];
}) {
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
        {admins.some(({ email }) => email === user?.email) ? (
          <AdminUserModal admins={admins} subadmins={subadmins} user={user!} />
        ) : (
          <NormalUserDropDown user={user!} />
        )}
        <div className="flex items-center space-x-2">
          {(admins.some(({ email }) => email === user?.email) ||
            subadmins.some(({ email }) => email === user?.email)) && (
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
