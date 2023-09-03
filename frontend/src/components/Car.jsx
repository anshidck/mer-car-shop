import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getVehicleById } from '../features/vehicles/vehicleSlice'

function Car({ car }) {
  const dispatch = useDispatch()

  const handleItem = (productId) => {
    dispatch(getVehicleById(productId))
  }
  return (
    <div className='flex flex-col gap-1 bg-white p-3 rounded-md shadow-md'>
        <img src={car.primaryImage} alt="car" />
        <div>
        <h1 className=' md:text-3xl font-bold '>{car.name.charAt(0).toUpperCase() + car.name.slice(1)}</h1>
            <p>{car.model.toUpperCase()}</p>
            <p className='text-red-600'>$ {car.price}</p>
            <p className='text-sm'>Avg. Ex-Showroom price</p>
        </div>
        <Link to={`/details/${car._id}`} onClick={() => handleItem(car._id)} className='text-white bg-orange-600 rounded-sm py-2 font-bold flex items-center justify-center'>Details</Link>
    </div>
  )
}

export default Car