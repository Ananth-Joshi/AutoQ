import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../firebase/firebaseconfig'
import { Link, useNavigate } from 'react-router-dom'


//Login Page component.
function LogIn() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState<String|null>(null)
    const navigate=useNavigate();

    //function to handle login,
    const handleLogIn=async (event:React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault()
      await setPersistence(auth,browserSessionPersistence)
      try{
          setError(null)
          await signInWithEmailAndPassword(auth,email,password)
          navigate("/classes")
      }catch(error:any){
          setError(error.message)
      }
    }
    return (
      <div className="hero min-h-[calc(100vh-90px)]">
      <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Log In!</h1>
          <p className="py-6">
             Log In now and continue making question papers
          </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogIn}>
              <div className="form-control">
              <label className="label">
                  <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="input input-bordered" required />     </div>
              <div className="form-control">
              <label className="label">
                  <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="input input-bordered" required /></div>
              <div>Don't Have an account? <Link to='/signup'><span className="underline cursor-pointer">Sign Up</span></Link></div>
              {error&&<div className="text-red-800">{error}</div> }
              <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
              </div>
          </form>
          </div>
      </div>
      </div>
    )
}

export default LogIn