import React, { useEffect } from 'react'
import AdminCard from '../components/AdminCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCar } from '../features/vehicles/vehicleSlice'
import { Link } from 'react-router-dom'

function AdminDashboard() {
    const {vehicles} = useSelector((state) => state.vehicle)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCar())
    },[dispatch])
  return (
    <div className='p-3 px-7 flex flex-col gap-5'>
        <Link to='/add' className='text-white bg-orange-600 py-2 ronde font-bold flex items-center justify-center'> + ADD</Link>
        {vehicles && vehicles.map((car) => (
            <AdminCard car={car} key={car._id}/>
        ))}
        
    </div>
  )
}

export default AdminDashboard