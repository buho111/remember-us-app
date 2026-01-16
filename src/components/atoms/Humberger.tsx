import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function Humberger() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <button
        onClick={handleMenuOpen}
        type="button"
        className="z-10 space-y-2 p-2 bg-white bg-opacity-70 rounded-full shadow-md hover:shadow-lg transition"
      >
        <div
          className={
            openMenu
              ? "w-6 h-0.5 bg-gray-700 translate-y-1.5 rotate-45 transition duration-500 ease-in-out"
              : "w-6 h-0.5 bg-gray-700 transition duration-500 ease-in-out"
          }
        />
        <div
          className={
            openMenu
              ? "opacity-0 transition duration-500 ease-in-out"
              : "w-6 h-0.5 bg-gray-700 transition duration-500 ease-in-out"
          }
        />
        <div
          className={
            openMenu
              ? "w-6 h-0.5 bg-gray-700 -rotate-45 transition duration-500 ease-in-out"
              : "w-6 h-0.5 bg-gray-700 transition duration-500 ease-in-out"
          }
        />
      </button>
      <nav
        className={
          openMenu
            ? "text-left fixed bg-white bg-opacity-90 backdrop-blur-md right-0 top-0 w-80 h-screen flex flex-col justify-start pt-20 px-6 rounded-l-2xl shadow-2xl"
            : "fixed right-[-100%]"
        }
      >
        <ul className="mt-6 space-y-4">
          <li className="border-b border-gray-200 pb-2">
            <Link
              to="/"
              className="py-3 inline-block text-gray-700 hover:text-blue-500 font-medium transition"
            >
              MAIN
            </Link>
          </li>
          <li className="border-b border-gray-200 pb-2">
            <Link
              to="/about"
              className="py-3 inline-block text-gray-700 hover:text-blue-500 font-medium transition"
            >
              ABOUT
            </Link>
          </li>
          <li className="border-b border-gray-200 pb-2">
            <Link
              to="/config"
              className="py-3 inline-block text-gray-700 hover:text-blue-500 font-medium transition"
            >
              CONFIG
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
