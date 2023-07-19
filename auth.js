import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //<--------------SignInwithGoogle------------------>
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };
  //<--------------ClassicSignIn--------------------->
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };
  //<------------------LogOut------------------------>
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        placeholder="Email...."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password...."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign IN</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={logOut}>logOut</button>
    </div>
  );
};
