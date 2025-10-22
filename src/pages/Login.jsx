// src/pages/Login.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate, Link } from "react-router"; // ✅ ঠিক এখানে পরিবর্তন
import toast from "react-hot-toast";

const Login = () => {
  const { login, googleLogin, resetPass } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // ✅ pathname use করো

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await login(email, password);
      toast.success("Login successful 🌿");
      navigate(from, { replace: true }); // ✅ লগইন হলে আগের পেজে ফিরে যাবে
    } catch (err) {
      toast.error(err.message || "Login failed ❌");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google 🌱");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Google login failed ❌");
    }
  };

  const handleReset = async () => {
    const email = prompt("Enter your account email for password reset:");
    if (!email) return;
    try {
      await resetPass(email);
      toast.success("Password reset email sent 📧");
    } catch (err) {
      toast.error(err.message || "Reset failed ❌");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-2xl font-semibold text-center text-green-700">Login to GreenNest</h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border px-3 py-2 rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              className="w-full border px-3 py-2 rounded mt-1"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass((prev) => !prev)}
              className="absolute right-3 top-2 text-sm text-green-700"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-green-700 underline"
          >
            Forgot Password?
          </button>
        </div>
      </form>

      <div className="mt-4">
        <button
          onClick={handleGoogle}
          className="w-full border px-3 py-2 rounded hover:bg-green-50 transition"
        >
          Continue with Google
        </button>
      </div>

      <p className="mt-3 text-sm text-center">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-green-700 font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
