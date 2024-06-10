'use client'

import React, { useEffect, useState } from "react";

const Header = () => {

  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState<boolean>(false);
  const [isdark, setIsdark] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    setIsLocalStorageAvailable(typeof window !== 'undefined' && window.localStorage !== undefined);

    const storedValue = localStorage.getItem('isdark');
    if (isLocalStorageAvailable && storedValue !== null) {
      setIsdark(JSON.parse(storedValue));
    }

    setInitialized(true);
  }, [isLocalStorageAvailable]);

  useEffect(() => {
    if (initialized && isLocalStorageAvailable) {
      localStorage.setItem('isdark', JSON.stringify(isdark));
    }
  }, [initialized, isLocalStorageAvailable, isdark]);

  const handleCheckboxChange = () => {
    setIsdark(!isdark);
  };

  if (!initialized) {
    return null; // Render nothing until initialization is complete
  }

  return (
    <header className="navbar bg-base-300 text-base-content">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl lg:text-3xl">Smart<span className="text-info">Tracker</span></a>
        <p className="text-xs mt-4">by <a href="https://www.alpinetech.fr/" className="underline">Alpine<span className="text-info">Tech</span></a></p>
      </div>
      <div className="navbar-end flex-none lg:gap-2">
        <input type="checkbox" value="dark" checked={isdark} onChange={() => handleCheckboxChange()} className="toggle theme-controller bg-amber-300 border-amber-200 [--tglbg:theme(colors.gray.100)] checked:bg-blue-300 checked:border-blue-300 checked:[--tglbg:theme(colors.blue.900)] row-start-1 col-start-1 col-span-2" />
        <input type="checkbox" value="light" checked={!isdark} className="invisible theme-controller" />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full fill-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
            </div>
          </div>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Demo Profile
              </a>
            </li>
            <li className="rounded-xl disabled"><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header