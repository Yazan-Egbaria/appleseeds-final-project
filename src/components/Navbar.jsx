import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import { useState } from "react";
import { userAccountState } from "../authenticationFeature/states/userAccountState";
import { useRecoilValue } from "recoil";
import AccountMenuItem from "../authenticationFeature/components/AccountMenuItem";
import { useState } from "react";
const LoginState = useRecoilValue(userAccountState);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { text: "Home", linkTo: "/" },
    { text: "Marketplace", linkTo: "/marketplace" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  3;

  const hideMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="pagePadding flex h-20 w-full items-center justify-between py-2 text-white shadow-md">
      {/* Logo */}
      <NavLink className="text-2xl font-bold text-black" to="/">
        <span>Barter</span>
      </NavLink>

      {/* Desktop navbar */}
      <ul className="hidden items-center justify-center gap-4 md:flex">
        {links.map((link, index) => {
          const { text, linkTo } = link;
          return (
            <NavItem key={index} text={text} link={linkTo} color="text-black" />
          );
        })}
      </ul>

      {/* Get Started Button (Desktop) */}
      <div className="hidden md:flex">
        <AccountMenuItem
          isLogin={LoginState.isAuthenticated}
          name={LoginState.name}
          coins={LoginState.coins}
          onLogout={{}}
        />
        {/* Get Started Button (Desktop) */}
        <div className="hidden md:flex">
          <button className="rounded bg-gradient-to-b from-gray-700 to-gray-900 px-2 py-1 font-bold text-white transition-all duration-300 hover:to-gray-800">
            <NavLink to="/">Get Started</NavLink>
          </button>
        </div>

        {/* Mobile Burger Menu Icon */}
        <div className="flex items-center justify-center md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-black transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <span className="text-2xl">&#10005;</span>
            ) : (
              <span className="text-3xl">&#9776;</span>
            )}
          </button>
        </div>
        {/* Mobile Navigation (Hidden on Desktop) */}
        <ul
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } pagePadding absolute left-0 top-20 w-full flex-col gap-4 bg-gradient-to-b from-gray-700 to-gray-900 py-4 text-white shadow-md md:hidden`}
        >
          {links.map((link, index) => {
            const { text, linkTo } = link;
            return (
              <NavItem
                key={index}
                text={text}
                link={linkTo}
                color="text-white"
                hideMenu={hideMenu}
              />
            );
          })}
          <div className="w-full border"></div>
          <button className="rounded bg-gradient-to-b from-gray-700 to-gray-900 px-2 py-1 font-bold text-white transition-all duration-300 hover:to-gray-800">
            <NavLink to="/" onClick={hideMenu}>
              Get Started
            </NavLink>
          </button>
        </ul>
      </div>

      {/* Mobile Burger Menu Icon */}
      <div className="flex items-center justify-center md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-black transition-all duration-300"
        >
          {isMobileMenuOpen ? (
            <span className="text-2xl">&#10005;</span>
          ) : (
            <span className="text-3xl">&#9776;</span>
          )}
        </button>
      </div>
      {/* Mobile Navigation (Hidden on Desktop) */}
      <ul
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } pagePadding absolute left-0 top-20 w-full flex-col gap-4 bg-gradient-to-b from-gray-700 to-gray-900 py-4 text-white shadow-md md:hidden`}
      >
        {links.map((link, index) => {
          const { text, linkTo } = link;
          return (
            <NavItem
              key={index}
              text={text}
              link={linkTo}
              color="text-white"
              hideMenu={hideMenu}
            />
          );
        })}
        <div className="w-full border"></div>
        <button className="rounded bg-gradient-to-b from-gray-700 to-gray-900 px-2 py-1 font-bold text-white transition-all duration-300 hover:to-gray-800">
          <NavLink to="/" onClick={hideMenu}>
            Get Started
          </NavLink>
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
