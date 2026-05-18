require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ DATABASE
const DBConnection = require("./src/utils/DBConnection");
DBConnection();

// ✅ ROUTES
const userRouter = require("./src/routes/UserRoutes");
const garageRouter = require("./src/routes/GarageRoutes");
const bookingRouter = require("./src/routes/BookingRoutes");
const paymentRouter = require("./src/routes/PaymentRoutes");
const serviceRouter = require("./src/routes/ServiceRoutes");
const adminRoutes = require("./src/routes/AdminRoutes");

// ✅ API ROUTES
app.use("/user", userRouter);
app.use("/garage", garageRouter);
app.use("/booking", bookingRouter);
app.use("/payment", paymentRouter);
app.use("/service", serviceRouter);
app.use("/admin", adminRoutes);

// ✅ PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});