import React, { useEffect } from 'react'
import Car from './Car'
import { useDispatch, useSelector } from 'react-redux'
import { getVehicles } from '../features/vehicles/vehicleSlice'

function Cars() {
  const {vehicles} = useSelector((state) => state.vehicle)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVehicles())
  },[dispatch])
  return (
    <div className='w-full p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
      {vehicles && vehicles.map((car) => (
        <Car car={car} key={car._id}/>
      ))}
        
        
    </div>
  )
}

export default Cars