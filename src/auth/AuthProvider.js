import React,{useContext, useEffect,useState} from 'react';
import {useDispatch} from 'react-redux';

// action
import { setGameAdmin } from '../features/MarriageSlice.js';

// util
import {signInWithGmail,auth} from '../firebase.util.js';

export const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider ({children}){
    const [currentUser,setCurrentUser] = useState(null);
    const [loading,setLoading]=useState(true);
    const dispatch = useDispatch();

    const login= ()=>{
        return signInWithGmail()
    }

    const logout = ()=>{
        return auth.signOut();
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            console.log('entered use effect = ',user)
            setCurrentUser(user)
            setLoading(false)
            user && dispatch(setGameAdmin({adminUid:user.uid,adminName:user.displayName.split(" ")[0]}))
          })

        return unsubscribe
    },[dispatch])

    const getAuthToken = async ()=>{
        let token = ""
        await auth.onAuthStateChanged(user=>{
            token=user.refreshToken
          })
        return token
    }

    const value = {
        login,
        logout,
        currentUser,
        getAuthToken
    }
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

