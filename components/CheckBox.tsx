"use client";

import useStore from "@/store/useCheckStore";
import { User } from "firebase/auth";

function CheckBox({ user }: { user: User | null }) {
  const { checked, toggle } = useStore();
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        onClick={toggle}
        className="sr-only peer"
        checked={checked}
      />
      <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
      <span className="ml-3 text-sm font-medium text-gray-900">Private</span>
    </label>
  );
}

export default CheckBox;
