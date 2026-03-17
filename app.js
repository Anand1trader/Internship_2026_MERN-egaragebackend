const express = require('express')
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

require("dotenv").config()

const DBConnection = require("./src/utils/DBConnection")
DBConnection()

const userRouter = require('./src/routes/UserRoutes')
app.use("/user", userRouter)
const garageRouter = require("./src/routes/GarageRoutes");
app.use("/garage", garageRouter);
const bookingRouter = require("./src/routes/BookingRoutes");
app.use("/booking", bookingRouter);
const paymentRouter = require("./src/routes/PaymentRoutes");
app.use("/payment", paymentRouter);
const serviceRouter = require("./src/routes/ServiceRoutes");

app.use("/service", serviceRouter);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})