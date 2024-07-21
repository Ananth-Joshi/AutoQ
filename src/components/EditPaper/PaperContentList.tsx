import { useState } from "react"
import { paperType, savePaper } from "../../functions/functions"
import { auth } from "../../firebase/firebaseconfig"
import { useParams } from "react-router-dom"
import { ImPrinter } from "react-icons/im";
import { PDFDownloadLink } from "@react-pdf/renderer"
import PaperLayout from "./PaperLayout"

//Component to display the content(questions and headings) in the question paper.
function PaperContentList({paperContent,setPaperContent}:{paperContent:paperType,setPaperContent:React.Dispatch<React.SetStateAction<paperType>>}) 
{
  const [heading,setHeading]=useState('')
  const params=useParams()


  return (
    <div className="flex relative top-3 flex-col items-center h-[30rem] gap-2 ">
        <div className="flex gap-1">
            <input type="text" placeholder="Add Heading" value={heading} onChange={(e)=>{setHeading(e.target.value)}} className="input rounded-xl input-bordered input-info w-full max-w-xs" />
            
            <button className="btn rounded-xl btn-primary" onClick={
                ()=>{
                    if(heading){
                        setPaperContent({...paperContent,body:[...paperContent.body,{type:'heading',content:heading}]})
                    }}}>Add Heading</button>
            
            <button className="btn rounded-xl btn-success" onClick={
                async()=>{
                    await savePaper(auth.currentUser?.uid,params.classId,params.subjectId,params.paperId,{body:paperContent.body})
                }}>Save Paper</button>
            <PDFDownloadLink className="btn bg-blue-600 rounded-xl hover:bg-blue-700" document={<PaperLayout paper={paperContent}/>} fileName="paper.pdf">
            Print Paper<ImPrinter size={20} />
            </PDFDownloadLink>{/* Prints the paper. */}
        </div>
        <div className="flex relative top-2 h-full bg-base-100 rounded-xl justify-center w-3/4 overflow-y-auto max-w-[900px]">
            <table
                className="table-fixed h-fit w-full table-pin-rows text-center divide-y-2 divide-gray-600  bg-base-200 rounded-xl"
            >
                <thead className="ltr:text-left sticky rtl:text-right">
                <tr>
                    <th className="px-4 py-2">Q.No</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium">Question/Heading</th>
                    <th className="px-4 py-2">Marks</th>
                    <th className="px-4 py-2">Delete</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {
                        paperContent.body.map((c,index)=>{
                            if(c.type==='question'){
                                return <tr key={index}>
                                    <td className="text-center">{c.qNumber}</td>
                                    <td className="text-center">{c.type}</td>
                                    <td className="break-all px-4 py-2 font-medium">{c.content}</td>
                                    <td className="text-center">{c.marks}</td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <button className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium hover:bg-red-700" onClick={()=>{setPaperContent({...paperContent,body:paperContent.body.filter((c,i)=>(i!=index))})}}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            }else{
                                return <tr key={index}>
                                    <td></td>
                                    <td className="text-center">{c.type}</td>
                                    <td className="break-all px-4 py-2 font-medium">{c.content}</td>
                                    <td></td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <button className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium hover:bg-red-700" onClick={()=>{setPaperContent({...paperContent,body:paperContent.body.filter((c,i)=>(i!=index))})}}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
      </div>
  )
}

export default PaperContentList
