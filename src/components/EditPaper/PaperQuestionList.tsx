import { useState } from "react"
import ChapterSelect from "./ChapterSelect"
import { useQuery} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getQuestions, paperType } from "../../functions/functions";
import { auth } from "../../firebase/firebaseconfig";
import { DocumentData } from "firebase/firestore";


//List of questions of the selected chapter for adding to question paper.
function PaperQuestionList({paperContent,setPaperContent}:{paperContent:paperType,setPaperContent:React.Dispatch<React.SetStateAction<paperType>>}) {
  const [chapter,selectChapter]:[string|null,React.Dispatch<React.SetStateAction<string|null>>]=useState<string|null>(null)
  const params=useParams()
  const [search,setSearch]=useState('')
  const [qMarks,setQMarks]=useState(1)
  const [qNo,setQNo]=useState(1)

  //Query to fetch questions
  const questionQuery=useQuery({
    queryKey:['questionList',params.chapterId],
    queryFn:async()=>{
        const data = await getQuestions(auth.currentUser?.uid,params.classId,params.subjectId,chapter);
        return data;
    },
    initialData:[], //start with empty array.
    refetchOnWindowFocus:false
  })

  return (
    <div className="flex flex-col gap-1 items-center h-[30rem] justify-center">
      <div className="flex gap-1 items-center justify-between">
        <ChapterSelect setChapter={selectChapter}/>
        <input type="text" placeholder="Search Question..." value={search} onChange={(e)=>{setSearch(e.target.value)}} className="input rounded-xl input-bordered input-primary w-full max-w-xs" />
        <div className="divider lg:divider-horizontal"></div>
        <label className="relative bottom-3">Q.No
          <input type="number" placeholder="Q.No" value={qNo} min={1} onChange={(e)=>{setQNo(e.target.valueAsNumber)}}  className="input rounded-xl input-bordered input-primary w-20" />
        </label>
        <label className="relative bottom-3">Q.Marks
          <input type="number" placeholder="Q.Marks" value={qMarks} min={1} onChange={(e)=>{setQMarks(e.target.valueAsNumber)}} className="input rounded-xl input-bordered input-primary w-20" />
        </label> 
      </div>
      <div className="flex flex-col h-full items-center gap-2 ">
        <div className="flex h-full bg-base-100 rounded-xl justify-center w-3/4 overflow-y-auto max-w-[900px]">
            <table
                className="table-fixed h-fit w-full table-pin-rows text-center divide-y-2 divide-gray-600  bg-base-200 rounded-xl"
            >
                <thead className="ltr:text-left sticky rtl:text-right">
                <tr>
                    <th className="px-4 py-2">S.No</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium">Question</th>
                    <th className="px-4 py-2">Add</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                    questionQuery.data?.filter(q=>q.data().question.toLowerCase().includes(search.toLowerCase())).map((q:DocumentData,index)=>(
                    <tr key={index}>
                        <td className="text-center">{index+1}</td>
                        <td className="break-all px-4 py-2 font-medium">{q.data().question}</td>
                        <td className="whitespace-nowrap px-4 py-2">
                        <button className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium hover:bg-blue-700" 
                        onClick={()=>{
                          setPaperContent({...paperContent,body:[...paperContent.body,{type:'question',qNumber:qNo,marks:qMarks.toString(),content:q.data().question}]})
                          setQNo(qNo+1)
                        }}>
                            Add
                        </button>
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default PaperQuestionList