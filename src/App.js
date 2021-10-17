import {getAuth, signInWithPopup,GoogleAuthProvider,GithubAuthProvider,signOut,FacebookAuthProvider  } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();

const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

function App() {
  const [user,setUser]=useState({});

  const auth=getAuth();

  const handleGoogleSignIn=()=>{
    signInWithPopup(auth,GoogleProvider)
    .then(result=>{
      const {displayName,email,photoURL}=result.user;
      const logedInUser={
        name:displayName,
        email:email,
        photo:photoURL
      };
      setUser(logedInUser);
    })
    .catch(error=>{
      console.log(error.message);
    })
  }

  const handleGithubSignIn=()=>{
    signInWithPopup(auth,GithubProvider)
    .then(result=>{
      const {displayName,email,photoURL}=result.user;
      const logedInUser={
        name:displayName,
        email:email,
        photo:photoURL
      };
      setUser(logedInUser);
    })
  }

  const handleSignOut=()=>{
    signOut(auth)
    .then(()=>{
      setUser({})
    })
  }

  const handleFacebookSignIn=()=>{
    signInWithPopup(auth, FacebookProvider)
    .then(result=>{
      const {displayName,photoURL,email}=result.user;
      console.log(result.user);
      const loggedInUser={
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(loggedInUser);
    })
  }

  return (
    <div className="App">

      { !user.name?
        <div className="">
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGithubSignIn}>Github Sign In</button>
        <button onClick={handleFacebookSignIn}>Facebook Sign In</button>
      </div>:
      <button onClick={handleSignOut}>Sign Out</button>}

      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
