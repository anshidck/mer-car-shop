import React from 'react'
import { MdDelete, } from 'react-icons/md'
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import {useDispatch} from 'react-redux'
import { deleteVehicle } from '../features/vehicles/vehicleSlice'
import {Link} from 'react-router-dom'


function AdminCard({car}) {
  const dispatch = useDispatch()
  const handleDeleteClick = (vehicleId) => {
    dispatch(deleteVehicle(vehicleId));
  };
  return (
    <div className='md:flex items-center justify-between px-10 bg-white p-3'>
        <div className='flex items-center gap-3 justify-center md:justify-start'>
        <img className='w-[15%] ' src={car.primaryImage} alt="car" />
        <p className='textxl md:text-3xl font-bold'>{car.name.charAt(0).toUpperCase() + car.name.slice(1)}</p>
        </div>
        <p className='text-xl md:text-3xl font-bold mr-40 fle'>{car.model.toUpperCase()}</p>
       <div className='flex gap-3 items-center justify-center'>
       <button><AiFillEye size={30}/></button>
       <button onClick={() => handleDeleteClick(car._id)}><MdDelete size={30} /></button>
        <Link to={`/edit/${car._id}`}><AiFillEdit size={30}/></Link>
       </div>
    </div>
  )
}

export default AdminCard