const express = require('express');
const Vehicle = require('../models/vehicleModel')
const asyncHandler = require('express-async-handler')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()


// Create a new vehicle
router.post('/', asyncHandler(async (req, res) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json(error);
    }
}));

// Get all vehicles
router.get('/', asyncHandler(async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json(error);
    }
}));

router.get('/search', asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { modal: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    const users = await Vehicleehicle.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
}));

// Define the route to get a vehicle by its ID
router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        try {
            const vehicle = await Vehicle.findById(id);
            if (vehicle) {
                res.json(vehicle);
            } else {
                res.status(404).json({ message: 'Vehicle not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(400).json({ message: 'Invalid vehicle ID' });
    }
}));

// Update a vehicle by ID
router.put('/:vehicleId', asyncHandler(async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const updatedVehicleData = req.body; // Updated vehicle data from the request body
    
        // Check if the vehicle with the given ID exists
        const vehicle = await Vehicle.findById(vehicleId);
    
        if (!vehicle) {
          return res.status(404).json({ message: 'Vehicle not found' });
        }
    
        // Update the vehicle information
        Object.assign(vehicle, updatedVehicleData);
    
        // Save the updated vehicle to the database
        await vehicle.save();
    
        res.json(vehicle); // Return the updated vehicle as a response
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}));


// Delete a vehicle by ID
router.delete('/:vehicleId', asyncHandler( async (req, res) => {
    try {
      const { vehicleId } = req.params;
  
      // Check if the vehicle with the given ID exists
      const vehicle = await Vehicle.findById(vehicleId);
  
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      // Delete the vehicle from the database
      await Vehicle.findByIdAndDelete(vehicleId);
  
      res.status(204).json(); // No content response for successful deletion
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }));
  

module.exports = router;