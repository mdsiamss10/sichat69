"use client";

import useStore from "@/store/useCheckStore";
import { User } from "firebase/auth";

function CheckBox({ user }: { user: User | null }) {
  const { checked, toggle } = useStore();
  return (
    <div className="form-control w-auto md:mr-2">
      <label className="cursor-pointer label">
        <span className="label-text mr-2">Private</span>
        <input
          onClick={toggle}
          checked={checked}
          type="checkbox"
          className="toggle toggle-primary"
        />
      </label>
    </div>
  );
}

export default CheckBox;
