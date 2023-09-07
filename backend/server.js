const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleWare')
const userRouter = require('./router/userRouter');
const vehicleRouter = require('./router/vehicleRouter');
const app = express();
dotenv.config();
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', userRouter);
app.use('/api/vehicle', vehicleRouter)

// Serve frontend
if (process.env.NODE_ENV === 'development') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server running : ${PORT}`)
})

