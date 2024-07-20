import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getChapters } from "../../functions/functions";
import { auth } from "../../firebase/firebaseconfig";
import React, { useEffect } from "react";

function ChapterSelect({setChapter}:{setChapter:React.Dispatch<React.SetStateAction<string|null>>}) {

  const params=useParams() 
  const queryClient=useQueryClient()
  
  //Refetch query if user is not found.
  useEffect(()=>(
    auth.onAuthStateChanged((user)=>{
    if(user){
        queryClient.invalidateQueries({queryKey:['chapterList',params.subjectId]})
    }
    })),[])


  //Query to fetch subjects.
  const chapterQuery=useQuery({
    queryKey:[`chapterList`,params.subjectId],
    queryFn:async()=>{
        const data = await getChapters(auth.currentUser?.uid,params.classId,params.subjectId);
        return data;
    },
    initialData:[], //start with empty array.
    refetchOnWindowFocus:false,
})


  return (
    <select className="select select-primary w-full max-w-xs" defaultValue={"select"} onChange={(e)=>{setChapter(e.target.value);queryClient.invalidateQueries({queryKey:['questionList',params.chapterId]})}}>
        <option disabled value={'select'}>Select Chapter</option>
        {
            chapterQuery.data?.map((c)=>(
                <option value={c.id} key={c.id}>{c.data().name}</option>
            ))
        }
    </select>
  )
}

export default ChapterSelect