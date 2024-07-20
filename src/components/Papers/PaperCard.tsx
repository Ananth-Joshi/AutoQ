import { useNavigate, useParams } from "react-router-dom"
import { deletePaper } from "../../functions/functions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { auth } from "../../firebase/firebaseconfig"

function PaperCard({title,paperId}:{title:string,paperId:string}) {
  const params=useParams()
  const navigate=useNavigate() 
  const queryClient=useQueryClient()

   //Mutation to delete paper.
   const deletePaperMutation=useMutation({
    mutationFn:async()=>{
        await deletePaper(auth.currentUser?.uid,params.classId,params.subjectId,paperId)
    },
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:['paperList',params.subjectId]})}
  })


  return (
    <div className="card bg-neutral text-neutral-content w-1/4 rounded-xl">
    <div className="card-body items-center text-center">
        <h2 className="card-title break-all justify-center overflow-y-auto h-1/2 w-full">{title}</h2>
        <div className="flex flex-nowrap card-actions justify-end">
            <button className="btn btn-primary rounded-xl" onClick={()=>navigate(`${location.pathname}/${paperId}`)}>View</button>
            <button onClick={()=>{deletePaperMutation.mutate()}} className="btn rounded-xl hover:bg-red-600">Delete</button>
        </div>
    </div>
</div>
  )
}

export default PaperCard