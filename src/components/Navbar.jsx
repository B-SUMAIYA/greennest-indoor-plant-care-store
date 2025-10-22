//import { div } from 'framer-motion/client';
import React from 'react';
import { useContext } from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import { PiPlant } from 'react-icons/pi';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.log(err);
    }
  }
    return (
       <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to='/'>Home</Link></li>
        <li>
          <Link to='/Plants'>Plants</Link> 
          
        </li>
        <li><Link to="/Profile">My Profile</Link></li>
      </ul>
                </div>
                
    <a className="btn btn-ghost text-xl text-green-700"><PiPlant className='text-green-700'></PiPlant>
 GreenNest</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li className='font-bold'><Link to='/'>Home</Link></li>
      <li className='font-bold' >
       <Link to="/Plants">Plants</Link>
      </li>
      <li className='font-bold'><Link to="/Profile">My Profile</Link></li>
    </ul>
  </div>
        <div className="navbar-end">
    
          <div>
            {user ? (
              <div className='dropdown dropdown-end'>
                <div tabIndex={0} role='button' className='btn btn-ghost flex items-center gap-2'>
                  <img src={user.displayName || "https://i.ibb.co/zGwLrD1/default-avatar.png"} alt="avatar" className='w-8 h-8 rounded-full' />
                  <span>{user.displayName || 'user'}</span>
                  </div>
                  <ul tabIndex={0} className='menu menu-sm  bg-base-100 rounded-box mt-3 w-40 shadow'>
                    <li><button onClick={handleLogout} className='text-red-500'>Logout</button></li>
                  </ul>

                

              </div>
            ) : <div className='flex gap-2'>
                <Link to="/login" className='btn bg-green-600 text-white font-semibold'>Login</Link>
                <Link to="/signup" className='btn border-green-600 text-green-700 font-semibold'>Register</Link>
            </div>
          }
  </div>
  </div>
</div>
    );
};

export default Navbar;