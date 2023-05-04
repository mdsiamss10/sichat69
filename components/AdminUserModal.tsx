"use client";
import { db } from "@/firebase.config";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { SubAdminsType } from "@/types";
import { User } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { HiPlus } from "react-icons/hi";

/* eslint-disable react/no-unescaped-entities */
function AdminUserModal({
  user,
  admins,
  subadmins,
}: {
  user: User | null;
  admins: SubAdminsType[];
  subadmins: SubAdminsType[];
}) {
  const [adminName, setAdminName] = useState("");
  const [subAdminName, setSubAdminName] = useState("");

  const handleAdminSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (adminName !== "") {
        await addDoc(collection(db, "admins"), { email: adminName });
        setAdminName("");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  const handleSubAdminSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (subAdminName !== "") {
        await addDoc(collection(db, "subadmins"), { email: subAdminName });
        setSubAdminName("");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  const handleDelete = async (colName: string, docID: string) => {
    try {
      await deleteDoc(doc(db, colName, docID));
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <div>
        <label
          htmlFor="my-modal-7"
          className="btn btn-circle btn-ghost text-info"
        >
          <div className="avatar online">
            <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-">
              <img src={user?.photoURL ?? ""} title={user?.email ?? ""} />
            </div>
          </div>
        </label>

        <input type="checkbox" id="my-modal-7" className="modal-toggle" />
        <label
          htmlFor="my-modal-7"
          className="modal modal-bottom sm:modal-middle"
        >
          <label className="modal-box relative">
            <h4 className="font-medium text-lg mb-3">Set a new admin</h4>
            <form
              onSubmit={handleAdminSubmit}
              className="flex items-center w-full"
            >
              <input
                type="text"
                id="simple-search"
                className="input input-bordered input-primary w-full mr-2"
                placeholder="Admin email"
                autoComplete="off"
                value={adminName}
                onChange={(e) => {
                  setAdminName(e.target.value);
                }}
              />
              <button type="submit" className="btn btn-primary">
                <HiPlus />
              </button>
            </form>
            {/* Display the current admins */}
            <ul className="menu menu-compact bg-base-100 w-56 py-2 rounded-box">
              {admins.map((admin) => (
                <>
                  <li
                    onClick={() => {
                      if (admin.email === user?.email) {
                        return alert("You can't remove yourself from admin.");
                      }
                      if (confirm("Are you sure to remove?")) {
                        handleDelete("admins", admin.docID);
                      }
                    }}
                  >
                    <a>{admin?.email}</a>
                  </li>
                </>
              ))}
            </ul>

            <div className="divider"></div>

            <h4 className="font-medium text-lg mb-3">Set a new subadmin</h4>
            <form
              onSubmit={handleSubAdminSubmit}
              className="flex items-center w-full"
            >
              <input
                type="text"
                id="simple-search"
                className="input input-bordered input-primary w-full mr-2"
                placeholder="Subadmin email"
                autoComplete="off"
                value={subAdminName}
                onChange={(e) => {
                  setSubAdminName(e.target.value);
                }}
              />
              <button type="submit" className="btn btn-primary">
                <HiPlus />
              </button>
            </form>
            {/* Display the current admins */}
            <ul className="menu menu-compact bg-base-100 w-56 py-2 rounded-box">
              {subadmins.map((subadmin) => (
                <>
                  <li
                    onClick={() => {
                      if (confirm("Are you sure to remove?")) {
                        handleDelete("subadmins", subadmin.docID);
                      }
                    }}
                  >
                    <a>{subadmin?.email}</a>
                  </li>
                </>
              ))}
            </ul>
          </label>
        </label>
      </div>
    </>
  );
}

export default AdminUserModal;
