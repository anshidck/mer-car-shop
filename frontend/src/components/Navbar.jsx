import React from 'react'
import { logout, reset } from '../features/auth/authSlice'
import { BsSearch, BsFillPersonFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
      }
  return (
    <div>
      <div className="h-[20%] bg-white flex justify-between items-center px-7">
       <div className="flex items-center gap-2">
       <img
          className="h-[100px] w-[40%] -mt-7"
          src="http://www.clker.com/cliparts/u/O/L/Q/c/m/car-icon-hi.png"
          alt="car"
        />
        <h1 className="font-bold text-2xl sm:text-4xl">Cars</h1>
       </div>
        <div className='flex'>
        <Link to='/search' className="text-orange-600  text-xs md:font-bold p-1 sm:p-3 rounded-md bg-white ml-24 flex items-center gap-2 border border-orange-600">Search</Link>
        <button className="bg-orange-600  text-xs md:font-bold p-1 sm:p-3 rounded-md text-white ml-24 flex items-center gap-2" onClick={onLogout}>John Wick<BsFillPersonFill size={20}/></button>
        </div>
      </div>
    </div>
  )
}

export default Navbar