import axios from 'axios'

const API_URL = '/api/vehicle/'

// Create new goal
const createVehicle = async (vehicleData) => {

  const response = await axios.post(API_URL, vehicleData)

  return response.data
}

// Get user goals
const getVehicles = async () => {
  
  const response = await axios.get(API_URL)

  return response.data
}

// Get vehicle by ID
const getVehicleById = async (vehicleId) => {
  

  try {
    const response = await axios.get(API_URL + vehicleId);
    return response.data;
  } catch (error) {
    // Handle error here, e.g., throw an exception or return an error message
    throw error;
  }
};

const fetchCar = async (search, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`/api/vehicle?search=${search}`, config)

  return response.data
}

const updateVehicle = async (vehicleId, vehicleData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + vehicleId, vehicleData, config)

  return response.data
}

// Delete user goal
const deleteVehicle = async (vehicleId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL +  vehicleId, config)

  return response.data
}

const vehicleService = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  fetchCar
}

export default vehicleService