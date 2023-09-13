require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const socket = require("socket.io");

// routes
const ManufacturerRecommendationRoutes = require("./routes/manufacturerRecommendation");
const RegisterVehicleRoutes = require("./routes/registerVehicle");
const BookingRoute = require("./routes/booking");
const RegisterCustomerRoutes = require("./routes/registerCustomer");
const LoginCustomerRoutes = require("./routes/loginCustomer");
const userRoutes = require("./routes/userRoutes");
const messagesRoute = require("./routes/messagesRoute");

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
app.use("/api/auth/", userRoutes);
app.use("/api/messages", messagesRoute);

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    const server = app.listen(process.env.PORT, () => {
      console.log("listening on port 4000!!!");
    });
    const io = socket(server, {
      cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
    });

    global.onlineUsers = new Map();

    io.on("connection", (socket) => {
      global.chatSocket = socket;
      socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
      });

      socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-receive", data.message);
        }
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
