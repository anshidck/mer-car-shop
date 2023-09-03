import React, { useEffect, useState } from "react";
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import Car from "../components/Car";
import { fetchCar } from "../features/vehicles/vehicleSlice";

function SearchPage() {
    const [search, setSearch] = useState('')
    const  { cars , isLoading} = useSelector((state) => state.vehicle)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCar({search}))
    },[dispatch, search])
  return (
    <div className="p-5 flex flex-col items-center justify-center">
      <div className=" flex items-center gap-1 border border-orange-500 w-[30%] py-3 px-3 rounded-lg bg-white ">
        <input onChange={(e) => setSearch(e.target.value)} className=" md:w-[95%] outline-none" type="text" />
        <BsSearch />
      </div>
      {isLoading ? ('Loding......') : (
        <div className=" p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {cars && cars.map((car) => (
            <Car key={car._id} car={car}/>
        ))}
      </div>
      )}
    </div>
  );
}

export default SearchPage;
