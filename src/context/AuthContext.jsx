import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => signInWithPopup(auth, googleProvider);
    const logout = () => signOut(auth);
    const login = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
    const register = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);
    const updateUser = (profile) => updateProfile(auth.currentUser, profile);
    const resetPass = (email) => sendPasswordResetEmail(auth, email);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

        });
        return () => unsub();
    }, []);
    return (
        <AuthContext.Provider value={{ user, loading, googleLogin, logout, login, register, updateUser, resetPass, setUser }}>
            {children}

        </AuthContext.Provider>
    )
};

export default AuthProvider
