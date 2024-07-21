import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteSubject } from "../../functions/functions"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { auth } from "../../firebase/firebaseconfig"

//Card to display subject.
function SubjectCard({title,subjectId}:{title:string,subjectId:string}) {
  const queryClient=useQueryClient()
  const params=useParams()
  const navigate=useNavigate()
  const location = useLocation();

  //Mutation to delete subject.
  const deleteSubjectMutation=useMutation({
    mutationFn:async()=>{
        await deleteSubject(auth.currentUser?.uid,params.classId,subjectId)
    },
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:['subjectOfClass',params.classId]})}
  })

  return (
    <div className="card bg-neutral text-neutral-content w-1/4 rounded-xl">
        <div className="card-body items-center text-center">
            <h2 className="card-title break-all justify-center overflow-y-auto h-1/2 w-full">{title}</h2>
            <div className="flex flex-nowrap card-actions justify-end">
                <button className="btn btn-primary rounded-xl" onClick={()=>navigate(`${location.pathname}/subjects/${subjectId}/chapters`,{replace:true})}>View</button>
                <button onClick={()=>{deleteSubjectMutation.mutate()}} className="btn rounded-xl hover:bg-red-600">Delete</button>
            </div>
        </div>
    </div>
  )
}

export default SubjectCard