import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteQuestion, getQuestions } from "../../functions/functions";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/firebaseconfig";
import { DocumentData } from "firebase/firestore";
import { useState } from "react";

//Component to list the questions of a chapter.
function QuestionsList() {
  const params= useParams()
  const [search,setSearch]=useState('')
  const queryClient=useQueryClient()
    
  //Query to fetch questions
  const questionQuery=useQuery({
    queryKey:['questionList',params.chapterId],
    queryFn:async()=>{
        const data = await getQuestions(auth.currentUser?.uid,params.classId,params.subjectId,params.chapterId);
        return data;
    },
    initialData:[], //start with empty array.
    refetchOnWindowFocus:false

  })

    
    //Mutation to delete Question.
    const deleteQuestionMutation=useMutation({
        mutationFn:async(questionId:string)=>{
            await deleteQuestion(auth.currentUser?.uid,params.classId,params.subjectId,params.chapterId,questionId)
        },
        onSuccess:()=>{queryClient.invalidateQueries({queryKey:['questionList',params.chapterId]})}
      })
    
  return (
    <div className="flex flex-col h-3/4 items-center gap-2 w-3/4">
    <input type="text" placeholder="Search Question..." value={search} onChange={(e)=>{setSearch(e.target.value)}} className="input rounded-xl input-bordered input-primary w-full max-w-xs" />
    <div className="flex h-full bg-base-100 rounded-xl justify-center w-3/4 overflow-y-scroll max-w-[900px]">
        <table
            className=" table-fixed w-full h-fit table-pin-rows text-center divide-y-2 divide-gray-600  bg-base-200 rounded-xl"
        >
            <thead className="ltr:text-left sticky rtl:text-right">
            <tr>
                <th className="px-4 py-2">S.No</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium">Question</th>
                <th className="px-4 py-2">Delete</th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {
                questionQuery.data?.filter(q=>q.data().question.toLowerCase().includes(search.toLowerCase())).map((q:DocumentData,index)=>(
                <tr>
                    <td className="text-center">{index+1}</td>
                    <td className="break-all px-4 py-2 font-medium">{q.data().question}</td>
                    <td className="whitespace-nowrap px-4 py-2">
                    <button className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium hover:bg-red-700" onClick={()=>(deleteQuestionMutation.mutate(q.id))}>
                        Delete
                    </button>
                    </td>
                </tr>
                ))
            }
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default QuestionsList