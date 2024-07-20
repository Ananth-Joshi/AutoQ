import { browserSessionPersistence, createUserWithEmailAndPassword, setPersistence, UserCredential } from "firebase/auth";
import React, { useState } from "react"
import { auth } from "../../firebase/firebaseconfig";
import { Link } from "react-router-dom";
import { createUserDocument } from "../../functions/functions";

function SignUp() { 
 
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [error,setError]=useState<String|null>(null)

  const handleSignUp=async (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    await setPersistence(auth,browserSessionPersistence)
    try{
        setError(null)
        const data:UserCredential=await createUserWithEmailAndPassword(auth,email,password)
        console.log(data.user.uid)
        await createUserDocument(data.user.email,data.user.uid)
    }catch(error:any){
        setError(error.message)
    }
  }
  return (
    <div className="hero  h-[calc(100vh-90px)]">
    <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Sign Up now!</h1>
        <p className="py-6">
           Sign Up and start creating question papers with ease on
           one click!!!
        </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSignUp}>
            <div className="form-control">
            <label className="label">
                <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
            <label className="label">
                <span className="label-text">Password</span>
            </label>
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
            </div>
            <div className="form-control">
            <label className="label">
                <span className="label-text">Confirm Password</span>
            </label>
            <input type="password" name="confirm" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="password" className="input input-bordered" required />
            </div>
            <div>Already Have an account? <Link to='/login'><span className="underline cursor-pointer">Sign in</span></Link></div>
            {error&&<div className="text-red-800">{error}</div> }
            <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={confirmPassword!==password}>Login</button>
            </div>
        </form>
        </div>
    </div>
    </div>
  )
}

export default SignUp