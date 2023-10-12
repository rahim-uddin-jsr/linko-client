import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { createContext, useState } from "react";
import { app } from "../../firebase/firebase.config";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(true);
  const auth = getAuth(app);

  const googleAuthProvider = new GoogleAuthProvider();

  const googleAuth = () => {
    return signInWithPopup(auth, googleAuthProvider);
  };

  const authInfo = {
    user,
    googleAuth,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
