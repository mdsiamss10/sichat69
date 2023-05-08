/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { auth } from "@/firebase.config";
import useStore from "@/store/useCheckStore";
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
  const { unCheckChecked } = useStore();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      unCheckChecked();
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center p-4 shadow-md shadow-gray-100/50 md:rounded-md bg-white">
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
          <label
            htmlFor="my-modal-6"
            className="btn btn-primary rounded-full px-4"
          >
            Sign Out
          </label>
          <input type="checkbox" id="my-modal-6" className="modal-toggle" />
          <label
            htmlFor="my-modal-6"
            style={{ margin: 0 }}
            className="modal cursor-pointer modal-bottom sm:modal-middle"
          >
            <label className="modal-box relative">
              <h3 className="text-lg font-bold">You're kidding right?😂😔</h3>
              <p className="py-4">Are you sure to sign out?</p>
              <div className="modal-action">
                <label className="btn btn-primary" onClick={handleSignOut}>
                  Logout
                </label>
                <label htmlFor="my-modal-6" className="btn btn-outline">
                  Cancel
                </label>
              </div>
            </label>
          </label>
        </div>
      </div>
    </>
  );
}

export default Header;
