import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email:'',
    photo: ''
  });

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);      
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }

  return (
    <div className="App">
      {
        <button onClick={handleSignIn} >Sign in</button>
      }
    </div>
  );
}

export default App;
