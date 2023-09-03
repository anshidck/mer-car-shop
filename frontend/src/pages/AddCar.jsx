import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createVehicle } from '../features/vehicles/vehicleSlice'

function AddCar() {
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
    
      const { name, desc, price, primaryImage, secondaryImage, quantity, manufacturer, model } = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      const {  isError ,message, isSuccess } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }
        
      if (isSuccess) {
        navigate('/admin')
      }

      }, [ isError, message])
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
        
          const vehicleData = {
            name,
            desc,
            price,
            primaryImage,
            secondaryImage,
            quantity,
            manufacturer,
            model
          }
    
          dispatch(createVehicle(vehicleData))
        }
    
      return (
        <div className='flex flex-col items-center gap-2 w-full mt-20'>
            <h1 className='font-bold text-5xl md:text-6xl flex gap-1 justify-center items-center'>Add your Car </h1>
       
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

export default AddCar