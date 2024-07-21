import { useParams } from "react-router-dom"
import AddPaperCard from "./AddPaperCard"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { auth } from "../../firebase/firebaseconfig"
import { getPapersList } from "../../functions/functions"
import { DocumentData } from "firebase/firestore"
import PaperCard from "./PaperCard"

//List of question Paper.
function PaperList() {
  const params= useParams()
  const queryClient=useQueryClient()

  //Refetch query if user is not found.
  useEffect(()=>(
      auth.onAuthStateChanged((user)=>{
      if(user){
          queryClient.invalidateQueries({queryKey:['paperList',params.subjectId]})
      }
      })),[])

  //Query to fetch papers.
  const paperQuery=useQuery({
      queryKey:[`paperList`,params.subjectId],
      queryFn:async()=>{
          const data = await getPapersList(auth.currentUser?.uid,params.classId,params.subjectId);
          return data;
      },
      initialData:[], //start with empty array.
      refetchOnWindowFocus:false
  })

  return (
    <div className="flex flex-col w-2/3 mx-auto h-full items-center">
        <div className="text-2xl my-4" >QUESTION PAPERS</div>
        <div className="flex flex-wrap justify-center w-full gap-2 overflow-y-auto">
            {
              paperQuery.data?.map((p:DocumentData)=>(
                <PaperCard key={p.id} title={p.data().name} paperId={p.id}/>
              ))
            }
            <AddPaperCard/>
        </div>
    </div>
  )
}

export default PaperList