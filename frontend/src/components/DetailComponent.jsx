import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getVehicleById } from "../features/vehicles/vehicleSlice";

function DetailComponent() {
    const {car} = useSelector((state) => state.vehicle)
    const dispatch = useDispatch()
    const cardId = useParams()

    useEffect(() => {
        dispatch(getVehicleById(cardId))
    },[dispatch, cardId])

    const carName = car ? car.name : "";
    const carModel = car ? car.model : "";
    const carDesc = car ? car.desc : "";
    const primaryImage = car ? car.primaryImage : "";
  return (
    <div className="p-3 py-4 w-full flex flex-col items-center gap-2 bg-white  ">
      <div className="w-[80%] gap-4 justify-center flex flex-col md:grid md:grid-cols-2">
        <img
          className="w-full col-span-1"
          src={primaryImage}
          alt="car"
        />
        <div className="flex flex-col gap-1 justify-between col-span-1">
            <h1 className="text-5xl font-bold">{carName}</h1>
            <p>{carModel}</p>
            <p className="text-xl text-red-600 font-semibold">$ 30000000</p>
          <p className="font-semibold">Avg. Ex-Showroom price</p>
          <button className="font-bold text-white bg-orange-600 p-3">Get Offer</button>
          <Link to='/home' className="p-3 text-orange-600 border border-orange-600 font-bold flex justify-center">Back</Link>
        </div>
      </div>
      <div className="w-[80%]">
        <p>
        {carDesc}
        </p>
      </div>
    </div>
  );
}

export default DetailComponent;
