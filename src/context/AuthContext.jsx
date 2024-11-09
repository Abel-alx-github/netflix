import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebaseServices";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
       const [user, setUser] = useState({});

       useEffect( () => {
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                setUser( u => u = currentUser);
            } else {
                setUser({})
                console.log("user is sign out")
            }
         } );
         
         return () => {
            unsubscribe();
         }
       }, []);

        const registerUser = async (email, password) => {
          try{
            const userCredential =  await createUserWithEmailAndPassword(auth, email, password)
            const uid = userCredential.user.uid;
            const userRef = doc(db, "Users", uid);
            const userData = {fav: []};
            setDoc(userRef, userData)

          }
          catch(e){
            console.log(e, "erroe whilke setdoc")
          }
                    } 
       
       const logIn = (email, password) => {
           return signInWithEmailAndPassword(auth, email, password);
       }

       const logOut = () => {
           return signOut(auth);
            
       }

    return (
       
        <AuthContext.Provider value={{user, registerUser, logIn, logOut}}>
            {children}     
        </AuthContext.Provider>
    )
};

export const AuthUseUser = () => {
    return useContext(AuthContext);
}