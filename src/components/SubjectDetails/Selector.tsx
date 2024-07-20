import { useMatch, useNavigate, useParams } from "react-router-dom"

//Toggle component to switch between chapters and papers.
function Selector() {
  const chapterMatch=useMatch('/classes/:classId/subjects/:subjectId/chapters')
  const paperMatch=useMatch('/classes/:classId/subjects/:subjectId/papers')
  const params=useParams()
  const navigate=useNavigate()
  const paperPath=`/classes/${params.classId}/subjects/${params.subjectId}/papers`
  const chapterPath=`/classes/${params.classId}/subjects/${params.subjectId}/chapters`
  return (
    <div className="flex flex-col gap-2 mx-8 rounded-xl bg-base-100 p-2">
        <input className="btn rounded-xl" onChange={()=>navigate(chapterPath,{replace:true})} checked={!Object.is(chapterMatch,null)} type="radio" name="options" aria-label="CHAPTERS" />
        <input className="btn checked:bg-base-100 rounded-xl" onChange={()=>navigate(paperPath,{replace:true})}checked={!Object.is(paperMatch,null)} type="radio" name="options" aria-label="QUESTION PAPERS" />
    </div>
  )
}

export default Selector