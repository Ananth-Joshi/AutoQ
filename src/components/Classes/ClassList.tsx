import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createClass, deleteClass, getClasses } from "../../functions/functions"
import { auth } from "../../firebase/firebaseconfig"
import { DocumentData } from "firebase/firestore"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function ClassList() {
  const [className,setClassName]:[string,React.Dispatch<React.SetStateAction<string>>]=useState('');
  const queryClient=useQueryClient();
  const navigate=useNavigate()
  const params= useParams()

//Query to fetch classes
  const classQuery=useQuery({
    queryKey:['classList'],
    queryFn:async()=>{
        const data = await getClasses(auth.currentUser?.uid);
        return data;
    },
    initialData:[], //start with empty array.
    refetchOnWindowFocus:false
  })
  

//Mutation to add a new class.
  const createClassMutation=useMutation({
    mutationFn:async()=>{
        await createClass(auth.currentUser?.uid,className);
    },
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:['classList']});setClassName('');}
  })

//Mutation to delete class.
  const deleteClassMutation=useMutation({
    mutationFn:async(cid:string)=>{
        await deleteClass(auth.currentUser?.uid,cid)
    },
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:['classList']})}
  })


//Function to handle submission of new class form
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(className.trim())
      createClassMutation.mutate();
  }
  

  return (
    <div className='flex md:ml-10 lg:ml-10 flex-col h-[calc(100vh-6rem)] items-center flex-wrap bg-base-300 dark: w-1/3 p-4 rounded-3xl'>
        <div className='text-2xl my-2'>CLASSES</div>
        <ul className="menu-vertical bg-base-200 rounded-box w-3/4 max-w-3/4 overflow-y-scroll p-2 h-5/6 text-2xl">
        {
          
            classQuery.data?.map((c:DocumentData)=>( 
                <li key={c.id} onClick={()=>{navigate(`/classes/${c.id}`,{replace:true})}} className={`flex ${(c.id===params.classId)?'bg-base-300':''} rounded-lg items-center gap-2 hover:bg-base-300 cursor-pointer p-2`}>
                    <div className="w-3/4 break-all hover:bg-none">{c.data().name}</div>
                    <button onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{e.stopPropagation();deleteClassMutation.mutate(c.id);navigate('/classes')}} className="btn btn-outline btn-error rounded-lg">Delete</button>
                </li>
            ))   
        }
           
        </ul>
        <form className="flex gap-2 justify-between hover:bg-base-300 cursor-pointer w-3/4 p-2" onSubmit={handleSubmit}>
            <input type="text" placeholder="Class Name" value={className} onChange={(e)=>{setClassName(e.target.value)}} className="input input-bordered input-primary rounded-xl w-full max-w-xs" />
            <button className="btn btn-outline btn-error rounded-lg" type="submit">Add Class</button>
        </form>
    </div>  
  )
}

export default ClassList