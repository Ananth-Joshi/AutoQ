import { auth } from "../../firebase/firebaseconfig"
import profilePic from '../../assets/profile.jpeg'
function UserSection() {
  return (
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
            <img
                alt="Tailwind CSS Navbar component"
                src={profilePic}/>
            </div>
        </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><div>{auth.currentUser?.email}</div></li>
            <li><div onClick={async()=>{await auth.signOut()}}>Logout</div></li>
        </ul>
    </div>
  )
}

export default UserSection