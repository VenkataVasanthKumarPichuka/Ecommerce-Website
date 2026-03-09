import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">

      <h1 className="text-3xl font-bold mb-6">
        Welcome to Dashboard
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

    </div>
  );
}