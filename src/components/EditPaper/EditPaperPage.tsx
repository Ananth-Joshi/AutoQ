import {useEffect, useState } from "react"
import PaperHeader from "./PaperHeader"
import {  useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { auth } from "../../firebase/firebaseconfig"
import { getPaperContents, paperType } from "../../functions/functions"
import PaperQuestionList from "./PaperQuestionList"
import PaperContentList from "./PaperContentList"



function EditPaperPage() {

  const params=useParams()
  const queryClient=useQueryClient()
  const initialData:paperType={name:'',title:'',marks:'',subject:'',instructions:'',duration:'',body:[]}
  const [paperContent,setPaperContent]:[paperType,React.Dispatch<React.SetStateAction<paperType>>]=useState<paperType>(initialData)


  useEffect(()=>(
        auth.onAuthStateChanged((user)=>{
            if(user){
                queryClient.invalidateQueries({queryKey:['questionPaper','questionList',params.paperId]})
            }
    })),[])

  useQuery({
      queryKey:['questionPaper',params.paperId],
      queryFn:async()=>{
          const data=await getPaperContents(auth.currentUser?.uid,params.classId,params.subjectId,params.paperId)
          if(data)
            setPaperContent(data)
          return data
      },
      initialData:initialData,
      refetchOnWindowFocus:false,      
    })
  

  
  return (
    <div className="h-[calc(100vh-90px)]">
        <div className="flex flex-col items-center h-[95%] mx-10 rounded-xl bg-base-300">
            <PaperHeader/>
            <div className="divider divider-primary"></div>
            <div className="flex justify-between w-full ">
             <PaperContentList paperContent={paperContent} setPaperContent={setPaperContent} />
             <PaperQuestionList paperContent={paperContent} setPaperContent={setPaperContent}/>
            </div>
        </div>

    </div>
  )
}

export default EditPaperPage

