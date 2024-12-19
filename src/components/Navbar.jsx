import { NavLink, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coins, setCoins] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setCoins(userDoc.data().coins || 0);
        }
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      console.log("Logged out!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileClick = () => {
    navigate("/profile"); // This will take you to the Profile component
  };

  const hideMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const links = [
    { text: "Home", linkTo: "/" },
    { text: "Marketplace", linkTo: "/marketplace" },
  ];

  return (
    <nav className="pagePadding flex h-20 w-full items-center justify-between py-2 text-white shadow-md">
      {/* Logo */}
      <NavLink className="text-2xl font-bold text-black" to="/">
        <img src="/images/Logo.png" className="h-24 w-32" alt="" />
      </NavLink>

      {/* Desktop navbar */}
      <ul className="hidden items-center justify-center gap-4 md:flex">
        {links.map((link, index) => {
          const { text, linkTo } = link;
          return (
            <NavItem key={index} text={text} link={linkTo} color="text-black" />
          );
        })}

        {/* Profile Icon */}
      </ul>

      {/* Get Started Button (Desktop) */}
      <div className="hidden gap-6 md:flex">
        {isLoggedIn && (
          <div>
            <i
              class="fa-brands fa-bitcoin transform text-3xl transition-transform hover:scale-110"
              style={{ color: "#FFD700" }}
            ></i>
            <span className="text-2xl font-semibold tracking-wider text-yellow-500 shadow-lg">
              {" " + "="} {coins}
            </span>
          </div>

          /* Coins Display (Desktop) */
        )}
        {isLoggedIn && (
          <button onClick={handleProfileClick} className="text-xl text-black">
            <i
              class="fa-solid fa-user text-2xl"
              style={{ color: "#222222" }}
            ></i>
          </button>
        )}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="w-28 rounded-md bg-[#222222] p-2 text-base text-white transition hover:bg-[#333333]"
          >
            Logout
          </button>
        ) : (
          <button className="w-28 rounded-md bg-[#222222] p-2 text-base text-white transition hover:bg-[#333333]">
            <NavLink to="/login">Login</NavLink>
          </button>
        )}
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

      {/* Mobile Navbar */}
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
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="rounded bg-gradient-to-b from-gray-700 to-gray-900 px-2 py-1 font-bold text-white transition-all duration-300 hover:to-gray-800"
          >
            Logout
          </button>
        ) : (
          <button className="rounded bg-gradient-to-b from-gray-700 to-gray-900 px-2 py-1 font-bold text-white transition-all duration-300 hover:to-gray-800">
            <NavLink to="/login" onClick={hideMenu}>
              Login
            </NavLink>
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
