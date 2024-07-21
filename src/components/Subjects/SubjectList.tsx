import SubjectCard from "./SubjectCard"
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSubjects } from "../../functions/functions";
import { auth } from "../../firebase/firebaseconfig";
import { DocumentData } from "firebase/firestore";
import AddSubjectCard from "./AddSubjectCard";
import { useEffect } from "react";


//Component to display list of subjects.
function SubjectList() {
    const params= useParams()
    const queryClient=useQueryClient()

    //Refetch query if user is not found.
    useEffect(()=>(
        auth.onAuthStateChanged((user)=>{
        if(user){
            queryClient.invalidateQueries({queryKey:['subjectOfClass',params.classId]})
        }
        })),[])

    //Query to fetch subjects.
    const subjectQuery=useQuery({
        queryKey:[`subjectOfClass`,params.classId],
        queryFn:async()=>{
            const data = await getSubjects(auth.currentUser?.uid,params.classId);
            return data;
        },
        initialData:[], //start with empty array.
        refetchOnWindowFocus:false
    })

  return (
    <div className="flex md:mr-10 box-border lg:mr-10 flex-col h-[calc(100vh-6rem)] items-center bg-base-300 w-5/6 p-4 rounded-3xl">
        <div className='text-2xl my-2'>SUBJECTS</div>
        <div className="flex flex-wrap justify-center w-full gap-2 overflow-y-auto">
            {
                subjectQuery.data?.map((s:DocumentData)=>(
                    <SubjectCard key={s.id} title={s.data().name} subjectId={s.id}/>
                ))
            }
           <AddSubjectCard/>
        </div>
    </div>
  )
}

export default SubjectList