require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const ManufacturerRecommendationRoutes = require("./routes/manufacturerRecommendation");
const RegisterVehicleRoutes = require("./routes/registerVehicle");
const BookingRoute = require("./routes/booking");
const RegisterCustomerRoutes = require("./routes/registerCustomer");
const LoginCustomerRoutes = require("./routes/loginCustomer");
const passwordReset = require("./routes/resetPassword");
const resetNewPassword = require("./routes/resetNewPassword");
const e = require("express");
// const sendEmail = require("./routes/sendEmail")

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes

app.use("/api/manufacturerrecommendations", ManufacturerRecommendationRoutes);
app.use("/api/registervehicle", RegisterVehicleRoutes);
app.use("/api/booking", BookingRoute);
app.use("/api/registercustomer", RegisterCustomerRoutes);
app.use("/api/logincustomer", LoginCustomerRoutes);
app.use("/api/password-reset", passwordReset);
app.use("/api/password-reset/:id", resetNewPassword);
// app.use("/api/sendemail", sendEmail);

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port 4000!!!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
