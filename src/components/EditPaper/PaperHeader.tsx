import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react"
import { useParams } from "react-router-dom";
import { paperType, savePaper } from "../../functions/functions";
import { auth } from "../../firebase/firebaseconfig";


//Component containing header data of the paper (title, subject, max. marks, etc)

function PaperHeader(){
  const params=useParams()
  const queryClient=useQueryClient()
  const paperQuery:UseQueryResult<paperType|undefined>=useQuery({queryKey:['questionPaper',params.paperId]})


  const paperHeaderMutation=useMutation({
        mutationFn:async(data:Object)=>{
            await savePaper(auth.currentUser?.uid,params.classId,params.subjectId,params.paperId,data)
        },
        onSuccess:()=>{queryClient.invalidateQueries({queryKey:['questionPaper',params.paperId]})}
  })


  //Update the paper header.

  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData=new FormData(e.currentTarget)
    const dataObj=Object.fromEntries(formData)
    paperHeaderMutation.mutate(dataObj)
  }

  
  
  return (
    <div className="flex flex-col justify-center">
        <div className="text-2xl my-2 text-center">PAPER HEADER</div>
        <form className="flex gap-2 items-center " onSubmit={handleSubmit}>
          <label>Title
            <input type="text" defaultValue={paperQuery.data?.title} name="title" required placeholder="Enter Test Title" className="input input-bordered input-primary w-full max-w-xs" />
          </label>
          <label>Subject
            <input type="text" defaultValue={paperQuery.data?.subject} name="subject" required placeholder="Enter Subject Name" className="input input-bordered input-primary w-full max-w-xs" />
          </label>
          <label>Marks
            <input type="text" defaultValue={paperQuery.data?.marks} name="marks" required placeholder="Enter Total Marks" className="input input-bordered input-primary w-full max-w-xs" />
          </label>
          <label className="flex flex-col">Instructions
            <textarea defaultValue={paperQuery.data?.instructions} required name="instructions" className="textarea textarea-primary h-24" placeholder="Duration"/>
          </label>
          <label className="flex flex-col">Duration
            <input type="text" defaultValue={paperQuery.data?.duration} name="duration" required placeholder="Enter Duration(in Hours)" className="input input-bordered input-primary w-20" />
          </label> 
            <button className="btn self-center relative top-3 btn-success rounded-xl">Update Paper Header</button>
        </form>
    </div>
  )
}

export default PaperHeader