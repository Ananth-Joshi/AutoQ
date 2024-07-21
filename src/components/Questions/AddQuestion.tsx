import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { createQuestion} from "../../functions/functions";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/firebaseconfig";

//Add a new quesrion component.
function AddQuestion() {
  const [question,setQuestion]=useState('')
  const params=useParams()
  const queryClient=useQueryClient()

  //Refetch query if user is not found.
  useEffect(()=>(
    auth.onAuthStateChanged((user)=>{
    if(user){
        queryClient.invalidateQueries({queryKey:['questionList',params.chapterId]})
    }
    })),[])

  //Mutation to add a new question.
  const addQuestionMutation=useMutation({
    mutationFn:async()=>{
        await createQuestion(auth.currentUser?.uid,params.classId,params.subjectId,params.chapterId,question);
    },
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:['questionList',params.chapterId]});setQuestion('');}
  })

  //Function to handle submission of new question form.
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(question.trim())
      addQuestionMutation.mutate();
  }

  return (
    <div className='flex justify-center w-3/4'>
        <div className='flex items-center justify-center p-2 rounded-xl h-20 bg-base-200 max-w-[900px] w-3/4'>
            <form className='flex gap-2' onSubmit={handleSubmit}>
                <input type="text" placeholder="Add a Question" value={question} onChange={(e)=>{setQuestion(e.target.value)}} className="input rounded-xl input-bordered input-primary w-full max-w-xs" />
                <button className='btn rounded-xl btn-primary'>Add</button>
            </form>
        </div>
    </div>

  )
}

export default AddQuestion