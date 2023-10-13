import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../firebase/firebase.config";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const auth = getAuth(app);

  const googleAuthProvider = new GoogleAuthProvider();

  const googleAuth = () => {
    return signInWithPopup(auth, googleAuthProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(
          "🚀 ~ file: AuthProvider.jsx:39 ~ unsubscribe ~ currentUser:",
          currentUser
        );
        axios
          .post("http://localhost:5000/jwt", {
            email: currentUser?.email,
            uid: currentUser?.uid,
          })
          .then((res) => {
            localStorage.setItem("access_token", res.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access_token");
      }
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const authInfo = {
    user,
    setUser,
    googleAuth,
    signUp,
    logOut,
    signIn,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
