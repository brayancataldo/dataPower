import { createContext, ReactNode, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { auth } from '../services/firebase';


export const AuthContext = createContext();

export function AuthContextProvider(props){
    
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user){
        
        const {displayName, photoURL, uid} = user

        if (!displayName || !photoURL){
          throw new Error('Missing information from Google Account');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return () =>{
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)
        console.log(result);
        if (result.user){
          const { displayName, photoURL, uid} = result.user
          if (!displayName || !photoURL){
            throw new Error('Missing information from Google Account');
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
  }

    return (
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )
}