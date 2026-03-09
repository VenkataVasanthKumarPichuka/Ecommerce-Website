import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateToken = () => {
    return Math.random().toString(36).substring(2);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exist = users.find((u) => u.email === form.email);

    if (exist) {
      alert("User already exists");
      return;
    }

    users.push(form);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful");

    setIsLogin(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (user) {
      const token = generateToken();

      localStorage.setItem("token", token);

      navigate("/dashboard");
    } else {
      alert("Invalid Login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">

      <form
        onSubmit={isLogin ? handleLogin : handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <>
            <input
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="username"
              placeholder="User Name"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </>
        )}

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="text-center text-blue-600 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New user? Register here"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}