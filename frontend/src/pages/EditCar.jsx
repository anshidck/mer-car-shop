import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { useState, useEffect } from 'react'
import {  useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVehicleById, updateVehicle } from '../features/vehicles/vehicleSlice'


function EditCar() {
    const { vehicleId } = useParams();
    const [formData, setFormData] = useState({
      name: '',
      desc: '',
      price: '',
      primaryImage: '',
      secondaryImage: '',
      quantity: '',
      manufacturer: '',
      model: ''
    })
    
    const { name, desc, price, primaryImage, secondaryImage, quantity, manufacturer, model } = formData;

  
      const dispatch = useDispatch()
    
    
      useEffect(() => {
        dispatch(getVehicleById(vehicleId)); 

        
      }, [dispatch, vehicleId]);
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateVehicle({ id: vehicleId, vehicleData: formData }));
      };
    
    
      return (
        <div className='flex flex-col items-center gap-2 w-full mt-20'>
            <h1 className='font-bold text-6xl flex gap-1 justify-center items-center'><BsFillPersonFill /> EDIT</h1>
            
            <form onSubmit={onSubmit} className='w-full flex flex-col gap-3 items-center p-3' >
              <input value={name} name='name' onChange={onChange} className='w-[80%] md:w-[50%] p-3 rounded-sm' type="text" placeholder='Enter Your vehicle Name'/>
              <input value={desc} name='desc' onChange={onChange} className='w-[80%] md:w-[50%] p-3 rounded-sm' type="text" placeholder='Enter Your description'/>
              <input value={price} name='price' onChange={onChange} className='w-[80%] md:w-[50%] p-3 rounded-sm' type="text" placeholder='Enter vehicle Price'/>
              <input value={primaryImage} name='primaryImage' onChange={onChange} className='w-[80%] md:w-[50%] p-3 rounded-sm' type="text" placeholder='primary image'/>
              <input value={secondaryImage} name='secondaryImage' onChange={onChange} className='w-[80%] md:w-[50%] p-3 rounded-sm' type="text" placeholder='Secondary image'/>
              <input value={quantity} name='quantity' onChange={onChange} className='w-[80%] md:w-[50%] p-3 rounded-sm' type="text" placeholder='No. of vehicles'/>
              <input value={manufacturer} name='manufacturer' onChange={onChange} className='w-[80%] md:w-[50%] p-3 rounded-sm' type="text" placeholder='manufacturer'/>
              <input value={model} name='model' onChange={onChange} className='w-[80%] md:w-[50%] p-3 rounded-sm' type="text" placeholder='vehicle model'/>
              <button type='submit' className='w-[80%] md:w-[50%] p-3 bg-orange-600 text-white rounded-sm font-bold'>Submit</button>
            </form>

        </div>
      )
}

export default EditCar