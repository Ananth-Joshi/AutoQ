import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom';
import { createChapter } from '../../functions/functions';
import { auth } from '../../firebase/firebaseconfig';

function AddChapterCard() {
  const [chapterName,setChapterName]:[string,React.Dispatch<React.SetStateAction<string>>]=useState('');
  const params=useParams()
  const queryClient=useQueryClient()


//Mutation to create new chapter.
  const createChapterMutation=useMutation({
    mutationFn:async()=>{
        await createChapter(auth.currentUser?.uid,params.classId,params.subjectId,chapterName);
    },
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:['chapterList',params.subjectId]});setChapterName('');}
  })


//Function to handle submission of new chapter form.
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(chapterName.trim())
      createChapterMutation.mutate();
  }
  



  return (
    <div className="card bg-primary text-primary-content rounded-xl w-1/4">
    <form className="card-body" onSubmit={handleSubmit}>
      <h2 className="card-title justify-center">Add Chapter</h2>
      <input type="text" placeholder="New Chapter Name" value={chapterName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setChapterName(e.target.value)}} className="input rounded-xl input-bordered input-info w-full max-w-xs" />
      <div className="card-actions justify-center">
        <button className="btn rounded-xl">Add Chapter</button>
      </div>
    </form>
  </div>
  )
}

export default AddChapterCard