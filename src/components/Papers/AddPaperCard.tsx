import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom';
import { createPaper } from '../../functions/functions';
import { auth } from '../../firebase/firebaseconfig';


//Card component to create new paper.
function AddPaperCard() {
  const [paperName,setPaperName]:[string,React.Dispatch<React.SetStateAction<string>>]=useState('');
  const params=useParams()
  const queryClient=useQueryClient()

//Mutation to create new paper.
  const createPaperMutation=useMutation({
    mutationFn:async()=>{
        await createPaper(auth.currentUser?.uid,params.classId,params.subjectId,paperName);
    },
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:['paperList',params.subjectId]});setPaperName('');}
  })


//Function to handle submission of new class form.
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(paperName.trim())
      createPaperMutation.mutate();
  }
  
  return (
    <div className="card bg-primary text-primary-content rounded-xl w-1/4">
    <form className="card-body" onSubmit={handleSubmit}>
      <h2 className="card-title justify-center">Add Paper</h2>
      <input type="text" placeholder="New Paper Name" value={paperName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setPaperName(e.target.value)}} className="input rounded-xl input-bordered input-info w-full max-w-xs" />
      <div className="card-actions justify-center">
        <button className="btn rounded-xl">Add Paper</button>
      </div>
    </form>
  </div>
  )
}

export default AddPaperCard