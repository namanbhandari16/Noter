import React,{useContext,useState,useEffect} from "react"
import {auth} from '../firebase'
var msg=""
const AuthContext = React.createContext()
export function useAuth(){
    return useContext(AuthContext)
}
export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email,password,name){
        return auth.createUserWithEmailAndPassword(email,password)
        .then((user)=> {
                user.user.updateProfile({
                    displayName: name
                })
                .then((s)=>{console.log('name added')})
        })
        .catch(e=>msg=e.message)
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }
    function logout(){
        return auth.signOut()
    }
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])
    
    const value={
        currentUser,
        signup,
        login,
        logout,
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}