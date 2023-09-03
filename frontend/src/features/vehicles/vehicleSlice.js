import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import vehicleService from './vehicleService'

const initialState = {
  vehicles: [],
  car: [],
  cars: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new goal
export const createVehicle = createAsyncThunk(
  'vehicles/create',
  async (vehicleData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await vehicleService.createVehicle(vehicleData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user goals
export const getVehicles = createAsyncThunk(
  'vehicles/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await vehicleService.getVehicles(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const fetchCar = createAsyncThunk(
  'cars/getAll',
  async ({ search }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await vehicleService.fetchCar(search, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get vehicle by ID
export const getVehicleById = createAsyncThunk(
  'vehicle/getById',
  async (vehicleId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vehicleService.getVehicleById(vehicleId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchVehicles = createAsyncThunk(
  'vehicles/search',
  async ({ search }, thunkAPI) => {
    try {
      const response = await vehicleService.getSearchVehicles({ search })
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateVehicle = createAsyncThunk(
  'vehicles/update',
  async ({ id, vehicleData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vehicleService.updateVehicle(id, vehicleData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Delete user goal
export const deleteVehicle = createAsyncThunk(
  'vehicles/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await vehicleService.deleteVehicle(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVehicle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.vehicles.push(action.payload)
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(fetchCar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCar.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cars = action.payload
      })
      .addCase(fetchCar.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getVehicles.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.vehicles = action.payload
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getVehicleById.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getVehicleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.car = action.payload;
      })
      .addCase(getVehicleById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.vehicles = state.vehicles.map((vehicle) =>
          vehicle._id === action.payload._id ? action.payload : vehicle
        );
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.isLoading = true
      })
    .addCase(deleteVehicle.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.vehicles = state.vehicles.filter(
        (car) => car._id !== action.payload.id
      )
    })
    .addCase(deleteVehicle.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
},
})

export const { reset } = vehicleSlice.actions
export default vehicleSlice.reducer