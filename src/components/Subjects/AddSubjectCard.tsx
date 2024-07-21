import { useMutation, useQueryClient} from "@tanstack/react-query";
import React, { ChangeEvent, useState } from "react"
import { createSubject } from "../../functions/functions";
import { auth } from "../../firebase/firebaseconfig";
import { useParams } from "react-router-dom";


//Card to add a subject.
function AddSubjectCard() {
  const [subjectName,setSubjectName]:[string,React.Dispatch<React.SetStateAction<string>>]=useState('');
  const params=useParams()
  const queryClient=useQueryClient()


//Mutation to create new subject.
  const createSubjectMutation=useMutation({
    mutationFn:async()=>{
        await createSubject(auth.currentUser?.uid,params.classId,subjectName);
    },
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:['subjectOfClass',params.classId]});setSubjectName('');}
  })


//Function to handle submission of new subject form.
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(subjectName.trim())
      createSubjectMutation.mutate();
  }
  
  return (
    <div className="card bg-primary text-primary-content rounded-xl w-1/4">
    <form className="card-body" onSubmit={handleSubmit}>
      <h2 className="card-title justify-center">Add Subject</h2>
      <input type="text" placeholder="New Subject" value={subjectName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setSubjectName(e.target.value)}} className="input rounded-xl input-bordered input-info w-full max-w-xs" />
      <div className="card-actions justify-center">
        <button className="btn rounded-xl">Add Subject</button>
      </div>
    </form>
  </div>
  )
}

export default AddSubjectCard