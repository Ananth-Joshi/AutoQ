import { useParams } from "react-router-dom"
import AddChapterCard from "./AddChapterCard"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { auth } from "../../firebase/firebaseconfig"
import { getChapters } from "../../functions/functions"
import { DocumentData } from "firebase/firestore"
import ChapterCard from "./ChapterCard"


//List of chapter card component
function ChapterList() {
    const params= useParams()
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
        refetchOnWindowFocus:false
    })

  return (
    <div className="flex flex-col w-2/3 mx-auto h-full items-center">
        <div className="text-2xl my-4" >CHAPTERS</div>
        <div className="flex flex-wrap justify-center w-full gap-2 overflow-y-auto">
            {
                chapterQuery.data?.map((c:DocumentData)=>(
                    <ChapterCard key={c.id} title={c.data().name} chapterId={c.id}/>
                ))
            }
            <AddChapterCard/>
        </div>
        
    </div>
  )
}

export default ChapterList