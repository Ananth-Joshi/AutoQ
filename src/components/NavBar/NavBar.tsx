import { Link } from "react-router-dom"
import { auth } from "../../firebase/firebaseconfig"
import { onAuthStateChanged, User } from "firebase/auth"
import {useEffect, useState } from "react"
import UserSection from "./UserSection"
import AuthButtons from "./AuthButtons"

function NavBar() {
    const [authenticatedUser,setAuthenticatedUser]=useState<User|null>(null)
    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
          if(user){
              setAuthenticatedUser(user)
          }else{
              setAuthenticatedUser(null)
          }
      })
    },[])
  return (
    <div className="navbar bg-base-100 md:px-10 h-[90px] lg:px-10 py-5">
        <div className="flex-1">
           <Link to="/" className="btn btn-ghost text-xl">AutoQ</Link>
        </div>
        <div className="flex-none gap-4">
            {(authenticatedUser)?<UserSection/>:<AuthButtons/>}
        </div>
    </div>
  )
}

export default NavBar