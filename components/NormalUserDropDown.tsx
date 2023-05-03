/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { User } from "firebase/auth";

function NormalUserDropDown({ user }: { user: User }) {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info">
        <div className="avatar online">
          <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-">
            <img src={user?.photoURL ?? ""} title={user?.email ?? ""} />
          </div>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card compact dropdown-content shadow bg-base-100 rounded-box w-64"
      >
        <div className="card-body">
          <h2 className="card-title">Account Information</h2>
          <p>
            You are currently logged in as <b>{user?.email ?? ""}</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NormalUserDropDown;
