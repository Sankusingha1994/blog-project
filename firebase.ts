import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAC3_vxkB5mOS4ASCCLTQqEfY4kkbL5LKE",
  authDomain: "my-blog-3d3d7.firebaseapp.com",
  projectId: "my-blog-3d3d7",
  storageBucket: "my-blog-3d3d7.appspot.com",
  messagingSenderId: "500541838526",
  appId: "1:500541838526:web:7da03de4dafbd2f1663aef",
  measurementId: "G-2DHH67X9Q9"
  
  };
  
  
const app = initializeApp(firebaseConfig)
  

  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage= getStorage(app)
  // const serverTimestamp : string = firestore.FieldValue.serverTimestamp


  export {auth,db,storage}
  