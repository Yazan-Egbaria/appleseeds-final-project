import React from "react";
import { NavLink } from "react-router-dom";

const AccountMenuItem = ({ isLogin, name, coins, onLogout }) => {
  return (
    <div className="flex items-center gap-4">
      {isLogin ? (
        <>
          <span className="text-black">Hay {name}</span>
          <span className="text-black">,Coins : {coins}</span>
          <button
            onClick={onLogout}
            className="rounded bg-gradient-to-b from-gray-700 to-gray-900 px-2 py-1 font-bold text-white transition-all duration-300 hover:to-gray-800"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <span className="text-black">Hay Guest</span>
          <span className="text-black">Click to </span>
          <NavLink to="/Login">
            <button
              onClick={onLogout}
              className="rounded bg-gradient-to-b from-gray-700 to-gray-900 px-2 py-1 font-bold text-white transition-all duration-300 hover:to-gray-800"
            >
              Login
            </button>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default AccountMenuItem;
