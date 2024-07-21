import { useNavigate, useParams } from "react-router-dom"
import { deleteChapter } from "../../functions/functions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { auth } from "../../firebase/firebaseconfig"


//Chapter display card.
function ChapterCard({title,chapterId}:{title:string,chapterId:string}) {
  const params=useParams()
  const navigate=useNavigate() 
  const queryClient=useQueryClient()

   //Mutation to delete chapter.
   const deleteChapterMutation=useMutation({
    mutationFn:async()=>{
        await deleteChapter(auth.currentUser?.uid,params.classId,params.subjectId,chapterId)
    },
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:['chapterList',params.subjectId]})}
  })


  return (
    <div className="card bg-neutral text-neutral-content w-1/4 rounded-xl">
    <div className="card-body items-center text-center">
        <h2 className="card-title break-all justify-center overflow-y-auto h-1/2 w-full">{title}</h2>
        <div className="flex flex-nowrap card-actions justify-end">
            <button className="btn btn-primary rounded-xl" onClick={()=>navigate(`${location.pathname}/${chapterId}/questions`)}>View</button>
            <button onClick={()=>{deleteChapterMutation.mutate()}} className="btn rounded-xl hover:bg-red-600">Delete</button>
        </div>
    </div>
</div>
  )
}

export default ChapterCard