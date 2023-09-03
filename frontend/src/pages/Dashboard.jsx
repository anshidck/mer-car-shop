import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Cars from "../components/Cars";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const {user} = useSelector((state) => state.auth)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    })
  return (
    <div>
        <Navbar/>
        <Cars/>
    </div>
  );
}

export default Dashboard;
