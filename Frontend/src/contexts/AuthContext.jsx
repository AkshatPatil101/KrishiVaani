import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name: name,
      email: email,
      createdAt: new Date(),
      role: 'farmer'
    });
    
    // --- FIX: Manually set the user state right after creating the document ---
    setCurrentUser({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: name,
      role: 'farmer' // We know the role is farmer here
    });
    // ----------------------------------------------------------------------
    
    return userCredential;
  };

  const signupAsAdmin = async (email, password, name, secretCode) => {
    if (secretCode !== import.meta.env.VITE_ADMIN_SECRET_CODE) {
      throw new Error("Invalid Admin Secret Code.");
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name: name,
      email: email,
      createdAt: new Date(),
      role: 'admin'
    });

    // --- FIX: Manually set the user state right after creating the document ---
    setCurrentUser({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: name,
      role: 'admin' // We know the role is admin here
    });
    // ----------------------------------------------------------------------
    
    return userCredential;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // This listener is still important for handling logins and page reloads
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    try {
      if (!user) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);

      let userRole = 'farmer';
      if (docSnap.exists()) {
        userRole = docSnap.data().role;
      }

      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: userRole
      });
    } catch (error) {
      console.error(
        'AuthContext Firestore read failed:',
        error.code,
        error.message
      );

      // Fail-safe: still allow login without role
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: 'farmer'
      });
    } finally {
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []); // Added currentUser to dependency array

  const value = {
    currentUser,
    signup,
    signupAsAdmin,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};