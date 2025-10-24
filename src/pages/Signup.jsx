import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const Signup = () => {
  const { register, updateUser, googleLogin } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const validatePassword = (pass) => {
    if (pass.length <6)
      return "password must be at 6 character.";
    if (!/[A-Z]/.test(pass))
      return "Password must contain an uppercase letter.";
    if (!/[a-z]/.test(pass))
      return "Password must contain a lowercase letter.";
    return null;

  };
 const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name?.value || "";
    const email = e.target.email.value;
    const photo = e.target.photo?.value || "";
    const password = e.target.password.value;
    const passErr = validatePassword(password);
    if (passErr) {
      toast.error(passErr);
      return;
    }
     try {
    const cred = await register(email, password);
    await updateUser({ displayName: name, photoURL: photo });
    toast.success('Succefull Registration');
    navigate("/");

  } catch (err) {
    toast.error(err.message || 'SignUp failed');

  }
  }
  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Sign In With Google");
      navigate('/');

    } catch (err) {
       toast.error(err.message || 'Google Signed In failed');
    }
  }
 return (
    <div className='max-w-md mx-auto bg-white p-6 rounded shadow mt-8'>
      <h2 className='text-2xl font-semibold'>Sign Up</h2>
      <form onSubmit={handleSubmit} className='mt-4 space-y-3' >
        <div className="">
          <label className='text-xl font-bold'>Name</label>
          <input placeholder='Enter Your Name' name='name' className='w-full border px-3 py-3 rounded text-sm' />
        </div>
        <div className="">
           <label className='text-xl font-bold'>Email</label>
          <input placeholder='example@email.com' name='email' type='email' required className='w-full border px-3 py-3 rounded required text-sm' />
      </div>
        <div className="">
          <label placeholder='Password' className='text-xl font-bold'>Password</label>
          <div className='relative'>
            <input name='password' type={showPass? "text" : "password"} className='w-full border px-3 py-2 rounded text-sm' required />
           
            <button type='button' onClick={() => setShowPass(s => !s)} className='absolute right-2 top-2 text-sm '> { showPass? <FaEye></FaEye> :<FaEyeSlash></FaEyeSlash>  }</button>

          </div>
          <p className='text-xs text-gray-500 mt-1'>Password Must be ≥6 character, include uppercase & lowercase letter.</p>
        </div>
        <button className='bg-green-600  text-white px-4 py-2  rounded'>Register</button>
      </form>
      <div className='mt-4'>
        <button onClick={handleGoogle} className='w-full border px-3 py-2 rounded'>Continue with <span className='font-bold text-sky-500'>Google</span></button>
      </div>
      <p className='mt-3 text-sm'>Already Hvae An Account?Please <Link to='/login' className='text-blue-700'>Login</Link></p>
      
    </div>
  );
};

export default Signup;
