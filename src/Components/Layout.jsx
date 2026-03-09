import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar1 from "./Navbar1";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Section */}
      <div
        className={`flex-1 transition-all duration-300 ${
          open ? "lg:ml-60" : "ml-0"
        }`}
      >

        {/* Navbar */}
        <Navbar1 toggleSidebar={() => setOpen(!open)} />

        {/* Page Content */}
        <div className="p-6 bg-slate-100 min-h-screen">
          <Outlet />
        </div>

      </div>
    </div>
  );
}