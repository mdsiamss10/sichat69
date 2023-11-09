import { auth, db } from "@/firebase.config";
import useStore from "@/store/useCheckStore";
import { SubAdminsType } from "@/types";
import { User, signOut } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { BsThreeDotsVertical } from "react-icons/bs";
import AdminUserModal from "./AdminUserModal";
import CheckBox from "./CheckBox";
import NormalUserDropDown from "./NormalUserDropDown";

export const deleteAllChats = async () => {
  const collectionRef = collection(db, "chats");
  const q = query(collectionRef);
  onSnapshot(q, (snapshots) => {
    snapshots.docs.map(async (docs) => {
      await deleteDoc(doc(db, "chats", docs.id));
    });
  });
  location.reload();
};

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
        {admins.some(({ email }) => email === user?.email) ||
        user?.email === "ohiduzzamansiam@gmail.com" ? (
          <AdminUserModal admins={admins} subadmins={subadmins} user={user!} />
        ) : (
          <NormalUserDropDown user={user!} />
        )}
        <div className="flex items-center gap-2">
          {subadmins.some(({ email }) => email === user?.email) && (
            <CheckBox user={user} />
          )}
          {/* SIgn out button */}
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
              <h3 className="text-lg font-bold">
                You&apos;re kidding right?😂😔
              </h3>
              <p className="pt-4">Are you sure to sign out?</p>
              <div className="modal-action">
                <label
                  className="btn btn-outline opacity-50"
                  onClick={handleSignOut}
                >
                  Logout
                </label>
                <label htmlFor="my-modal-6" className="btn btn-primary">
                  Cancel
                </label>
              </div>
            </label>
          </label>
          {admins.some(({ email }) => email === user?.email) && (
            <>
              <div className="dropdown dropdown-left">
                <label tabIndex={0} className="">
                  <BsThreeDotsVertical size={20} />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li
                    onClick={() => {
                      void deleteAllChats();
                    }}
                  >
                    <a className="text-red-500">Delete all chats</a>
                  </li>
                  <div className="px-3">
                    {admins.some(({ email }) => email === user?.email) && (
                      <CheckBox user={user} />
                    )}
                  </div>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
