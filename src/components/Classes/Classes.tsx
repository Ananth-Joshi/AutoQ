import { Outlet, useNavigate } from "react-router-dom"
import ClassList from "./ClassList"
import { useEffect } from "react"
import { auth } from "../../firebase/firebaseconfig"
import { useQueryClient } from "@tanstack/react-query"

function Classes() {
  const navigate=useNavigate()
  const queryClient=useQueryClient()

  //Route to login if not logged in.
  useEffect(()=>(
    auth.onAuthStateChanged((user)=>{
    if(!user){
      navigate('/login')
    }else{
      queryClient.invalidateQueries({queryKey:['classList']})
    }
    })),[])
  return (
    <div className='flex gap-3 h-[calc(100vh-90px)]'>
      <ClassList/>
      <Outlet/>
    </div>
  )
}

export default Classes