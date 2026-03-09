import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar1({ toggleSidebar }) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between bg-blue-700 text-white px-5 py-3 shadow-md">

      {/* Left Section */}
      <div className="flex items-center gap-4">

        {/* Hamburger Menu */}
        <button
          className="lg:hidden text-2xl hover:text-gray-200"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        {/* Logo */}
        <h1
          className="text-xl font-bold cursor-pointer tracking-wide"
          onClick={() => navigate("/dashboard")}
        >
          Megashop
        </h1>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        {isLoggedIn ? (
          <>
            <span className="hidden sm:block text-sm opacity-90">
              Admin
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-red-500 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="px-4 py-1 bg-blue-500 rounded-md hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        )}

      </div>
    </nav>
  );
}