/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { SubAdminsType } from "@/types";
import { User } from "firebase/auth";

function NormalUserDropDown({
  user,
  admins,
  subadmins,
}: {
  user: User;
  admins?: SubAdminsType[];
  subadmins?: SubAdminsType[];
}) {
  return (
    <>
      <div>
        <label htmlFor="my-modal-4">
          <div className="avatar online">
            <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-">
              <img src={user?.photoURL ?? ""} title={user?.email ?? ""} />
            </div>
          </div>
        </label>
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative">
            <h3 className="text-lg font-bold">Hello, {user?.displayName}</h3>
            <p className="py-4">
              You are currently logged in with <b>{user?.email ?? ""}</b> this
              email
            </p>
          </label>
        </label>
      </div>
    </>
  );
}

export default NormalUserDropDown;
