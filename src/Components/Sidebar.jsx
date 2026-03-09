import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path) => {
    navigate(path);
    if (setOpen) setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Categories", path: "/categories" },
     { name: "SubCategories", path: "/subcategories" },
    { name: "Add Product", path: "/add-product" },
    { name: "Products", path: "/products" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static top-0 left-0
        w-60 h-screen bg-blue-700 text-white
        p-6 shadow-lg z-40
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* Logo */}
        <h2 className="text-center text-2xl font-bold mb-10 tracking-wide">
          ADMIN
        </h2>

        {/* Menu */}
        <ul className="space-y-3">

          {menu.map((item) => (
            <li
              key={item.path}
              onClick={() => goTo(item.path)}
              className={`
                p-3 rounded-lg cursor-pointer transition-all
                ${
                  location.pathname === item.path
                    ? "bg-white text-blue-700 font-semibold"
                    : "hover:bg-blue-600"
                }
              `}
            >
              {item.name}
            </li>
          ))}

          {/* Logout */}
          <li
            onClick={logout}
            className="p-3 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer mt-10 text-center font-semibold"
          >
            Logout
          </li>

        </ul>
      </div>
    </>
  );
}