import { Outlet } from "react-router-dom"
import Selector from "./Selector"


//Component to display details (papers or chapters) of a subject.
function SubjectDetail() {
  return (
    <div className='flex h-[calc(100vh-90px)]'>
     <div className="flex items-center w-full h-[95%] mx-10 rounded-xl bg-base-300">
            <Selector/>{/*Toggle component to switch between chapters and papers.*/}
            <div className="divider mx-0 divider-horizontal"></div>
            <Outlet/> {/* Outlet to display either papers or chapters of subject based on selector */}
     </div>
    </div>
  )
}

export default SubjectDetail