import { Outlet } from "react-router-dom"
import Selector from "./Selector"

function SubjectDetail() {
  return (
    <div className='flex h-[calc(100vh-90px)]'>
     <div className="flex items-center w-full h-[95%] mx-10 rounded-xl bg-base-300">
            <Selector/>
            <div className="divider mx-0 divider-horizontal"></div>
            <Outlet/>
     </div>
    </div>
  )
}

export default SubjectDetail