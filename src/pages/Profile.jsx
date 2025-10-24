import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser , setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: user?.displayName || "", photo: user?.photoURL || "" });
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await updateUser({ displayName: form.name, photoURL: form.photo });
      setUser({ ...user, displayName: form.name, photoURL: form.photo });
      toast.success("profile Updated Successfully");

    } catch (err) {
      toast.error(err.message || "Updated Failed")
    }
  }
  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded shadow mt-8 '>
      <h2 className='text-2xl font-bold'>My Profile</h2>
      <div className="mt-4 flex items-center gap-4">
        <img src={user?.photoURL || "/assets/user.png"} alt="avatar" className='h-16 w-16 rounded-full object-cover' />
        <div>
          <p className='font-medium'>{ user?.displayName || "no name"} </p>
          <p className='text-sm text-gray-600'>{ user?.email}</p>
        </div>

      </div>
      <form onSubmit={handleSubmit} className='mt-4 space-y-3'>
        <div>
          <label className='text-sm'>Name</label>
          <input value={form.name} onChange={(e) => setForm({...form , name:e.target.value})} className='w-full border px-3 py-2 rounded'/>
        </div>
        <div>
          <label className='text-sm'>Photo Url</label>
          <input value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} className='w-full border px-3 py-2 rounded' />
           </div>
          <button className='bg-green-500 text-white px-4 py-2 rounded-2xl'>Update Profile</button>
       

      </form>
    </div>
  );
};

export default Profile;


