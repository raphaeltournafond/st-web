import React from "react";

const Header = () => {
  return (
    <header className="navbar bg-base-300">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">SmartTracker</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://cdn.pixabay.com/photo/2017/10/21/16/46/running-2875180_1280.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <div className="divider"></div>
            <li className="bg-error rounded-xl"><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header