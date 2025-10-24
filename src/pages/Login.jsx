import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import {  Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
const Login = () => {
  const { login, googleLogin, resetPass } = useContext(AuthContext);
  const [showPass, setShowPass ] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await login(email, password);
      toast.success("Login Succesfully ");
      navigate(from, { replace: true });

    } catch (err) {
      toast.error(err.message || "Login failed")
    }
  

  }

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with google");
      navigate(from, { replace: true });

    } catch (err) {
      toast.error(err.message || 'Google loging fail');

    }
  }
  const handleReset = async () => {
    const email = prompt("Enter your account email for password reset:");
    if (!email) return
    try {
      await resetPass(email);
      toast.success("[Password Reset Email sent");
    } catch (err) {
      toast.error(err.message || 'Reset Fail');

    }
  
  
  }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8">
      <h2 className="text-2xl font-semibold text-center text-green-700">Login to GreeNest </h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <label className="text-sm font-medium ">Email</label>
          <input name="email" type="email" placeholder="example@email.com" className="w-full border px-3 py-2 rounded mt-1" required/>
        </div>
        <div className="relative">
          
                      <label className="text-sm font-medium ">Password</label>
          <input name="password" type={showPass ? "text" : "password"} placeholder="Password" className="w-full border pr-10  px-3 py-2 rounded mt-1" required />
         
            <button type="button" onClick={() => setShowPass((prev)=> !prev)} className="absolute right-3 top-[38px] text-sm z-10 text-green-700">
      {showPass?<FaEye></FaEye> :<FaEyeSlash></FaEyeSlash>}
          </button>
          </div>
       
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4  py-2 rounded transition"> Login</button>
          <button type="buttom" onClick={handleReset} className="text-sm text-red-400 underline">
            Forgot Password
          </button>
</div>
      </form>
      <div className="mt-4 ">
        <button onClick={handleGoogle} className="w-full border px-3 py-2 rounded hover:bg-sky-600">Continue With <span className="text-blue-700">Google</span></button>
      </div>
      <p className="mt-3 text-sm text-center">Don't Have An Account? {""}</p>
      <Link className="text-blue-700 font-semibold" to="/signup">Sign Up</Link>
  </div>

)

  }

export default Login 
