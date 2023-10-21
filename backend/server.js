require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const socket = require("socket.io");

const ManufacturerRecommendationRoutes = require("./routes/manufacturerRecommendation");
const RegisterVehicleRoutes = require("./routes/registerVehicle");
const BookingRoute = require("./routes/booking");
const RegisterCustomerRoutes = require("./routes/registerCustomer");
const LoginCustomerRoutes = require("./routes/loginCustomer");
const privateRoute = require("./routes/private");
const MailingRoute = require("./routes/mailingRoute");
const componentRoutes = require("./routes/manegerDashboardRoutes");

const passwordReset = require("./routes/resetPassword");
const resetNewPassword = require("./routes/resetNewPassword");
const userRoutes = require("./routes/userRoutes");
const messagesRoute = require("./routes/messagesRoute");
const forumRoute = require("./routes/forumRoute");
const authentication = require("./routes/authRoutes");
const errorHandler = require("./middleware/error");
const e = require("express");
// const sendEmail = require("./routes/sendEmail")

const whatsappController = require("./controllers/whatsappController");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Error Handler(should be last piece of middleware)
app.use(errorHandler);

// routes

app.use("/api/manufacturerrecommendations", ManufacturerRecommendationRoutes);
app.use("/api/registervehicle", RegisterVehicleRoutes);
app.use("/api/booking", BookingRoute);
app.use("/api/registercustomer", RegisterCustomerRoutes);
app.use("/api/logincustomer", LoginCustomerRoutes);
app.use("/api/password-reset", passwordReset);
app.use("/api/password-reset/:id", resetNewPassword);
app.use("/api/auth/", userRoutes);
app.use("/api/messages", messagesRoute);
app.use("/api/forum", forumRoute);
app.use("/api/authentication", authentication);
app.use("/api/private", privateRoute);
app.use("/api/forum/", forumRoute);
app.use("/api/mailing/", MailingRoute);
app.use("/api/components/", componentRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listen for requests
    const server = app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port 4000!!!");
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

//initiate whatsapp webJS
whatsappController.initiateWhatsapp();
