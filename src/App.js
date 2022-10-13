import React, { useState, useSyncExternalStore } from 'react';
import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.init';



const auth = getAuth();

const App = () => {
  const [user, setUser] = useState({});
  const GoogleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();



  const handleGoogleSignIn = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user)

      }).catch((error) => {
        console.log(error);
      });
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth, GithubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user)

      }).catch((error) => {
        console.log(error);
      });
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(() => {
        setUser({})
      })


  }


  return (
    <div className='App'>
      <h1>This is the Google Sign In</h1>

      {user.uid ?
        <button onClick={handleSignOut}> Sign Out</button>
        :
        <>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGithubSignIn}>GitHub Sign IN</button>
        </>}
      {user.uid &&
        <div>
          <h1>Name : {user.displayName}</h1>
          <h5>Email : {user.email}</h5>
          <img src={user.photoURL} alt="/" />
        </div>
      }
    </div >
  );
};

export default App;