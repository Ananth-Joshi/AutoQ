import { Link } from 'react-router-dom'

//Buttons for Navigating to authentication page if user is not logged in.
function AuthButtons() {
  return (
    <div className='flex gap-2'>
        <Link to='/login' className='btn btn-primary'>Log In</Link>
        <Link to='/signup' className='btn btn-primary'>Sign Up</Link>
    </div>
  )
}

export default AuthButtons