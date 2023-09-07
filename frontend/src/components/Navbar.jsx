import React,{useEffect, useState} from 'react'
import { logout, reset } from '../features/auth/authSlice'
import { BsFillPersonFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { fetchCar } from '../features/vehicles/vehicleSlice'


function Navbar() {
    const {user} = useSelector((state) => state.auth)
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
      }

      useEffect(() => {
        dispatch(fetchCar({search}))
    },[dispatch, search])
  return (
    <div>
      <div className="h-[20%] bg-white flex items-center px-7 md:justify-between
      
      ">
       <div className="flex items-center gap-2">
       <img
          className="h-[70px] md:h-[100px] w-[30%] md:w-[40%] -mt-7"
          src="http://www.clker.com/cliparts/u/O/L/Q/c/m/car-icon-hi.png"
          alt="car"
        />
        <h1 className="font-bold text-2xl sm:text-4xl">Cars</h1>
       </div>
        <div className='flex gap-3 justify-end'>
        <div className=" flex items-center gap-1 border border-orange-500 w-[50%] md:w-[80%] px-3 rounded-lg bg-white ">
        <input onChange={(e) => setSearch(e.target.value)} className="bg-white w-[80%] outline-none" type="text" />
        <BsSearch />
      </div>
        <button className="hidden bg-orange-600  text-xs md:font-bold p-1  rounded-md text-white  md:flex items-center gap-2" onClick={onLogout}>{user && user.name}<BsFillPersonFill /></button>
        <button className="bg-orange-600  text-xs md:font-bold p-1  rounded-md text-white  flex items-center gap-2 md:hidden" onClick={onLogout}>{user && user.name}</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar