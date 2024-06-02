import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import auth from '../firebase/firebase.config'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import useAxiosPublic from '../hooks/useAxiosPublic'

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic()
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true)

  // Providers
  const googleProvider = new GoogleAuthProvider()

  // Register a new user
  const createUser = (email, password) => {
    setIsUserLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Signin with email and password
  const signIn = (email, password) => {
    setIsUserLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Signin with google
  const googleSignIn = () => {
    setIsUserLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  // Update user data
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  // Signout user
  const signOutUser = async () => {
    signOut(auth)
  }

  // User Data
  const userData = auth.currentUser;

  //Observer 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post('/jwt', userInfo)
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('access-token', res.data.token);
                    setIsUserLoading(false);
                }
            })
    }
    else {
        localStorage.removeItem('access-token');
        setIsUserLoading(false);
    }
    })
    return () => {
      unsubscribe()
    }

  }, [axiosPublic])

  const authInfo = {
    user,
    setUser,
    userData,
    isUserLoading,
    setIsUserLoading,
    googleSignIn,
    signOutUser,
    signIn,
    createUser,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export default AuthProvider;