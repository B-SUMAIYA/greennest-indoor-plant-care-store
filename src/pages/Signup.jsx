// src/pages/Signup.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Signup = () => {
  const { register, updateUser, googleLogin } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pw) => {
    if (pw.length < 6) return "Password must be at least 6 characters.";
   if (!/[A-Z]/.test(pw)) return "Password must contain an uppercase letter.";
    if (!/[a-z]/.test(pw)) return "Password must contain a lowercase letter.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name?.value || "";
    const email = e.target.email.value;
    const photo = e.target.photo?.value || "";
    const password = e.target.password.value;

    const pwErr = validatePassword(password);
    if (pwErr) {
      toast.error(pwErr);
      return;
    }

    try {
      const cred = await register(email, password);
      await updateUser({ displayName: name, photoURL: photo });
      toast.success("Registration successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Signup failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Signed in with Google");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-2xl font-semibold">Sign Up</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <label className="text-sm">Name</label>
          <input name="name" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="text-sm">Photo URL</label>
          <input name="photo" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="text-sm">Email</label>
          <input name="email" type="email" className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="text-sm">Password</label>
          <div className="relative">
            <input name="password" type={showPass ? "text" : "password"} className="w-full border px-3 py-2 rounded" required />
            <button type="button" onClick={()=>setShowPass(s=>!s)} className="absolute right-2 top-2 text-sm">{showPass ? "Hide" : "Show"}</button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Password must be ≥6 chars, include uppercase & lowercase letters.</p>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
      </form>

      <div className="mt-4">
        <button onClick={handleGoogle} className="w-full border px-3 py-2 rounded">Continue with Google</button>
      </div>

      <p className="mt-3 text-sm">
        Already have an account? <Link to="/login" className="text-green-700">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
