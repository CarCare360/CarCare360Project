const ManufacturerRecommendation = require("../models/manufacturerRecommendationModel");
const mongoose = require("mongoose");
const sendEmail = require('../utils/sendEmail');

// Get all manufacturer recommendations and store in an array
const getAllManufacturerRecommendations = async () => {
  try {
    const manufacturerRecommendations = await ManufacturerRecommendation.find(
      {}
    );
    return manufacturerRecommendations;
  } catch (error) {
    throw new Error(
      "Error fetching manufacturer recommendations: " + error.message
    );
  }
};

// Example of how to use the function and store the results in an array

// Function to find a vehicle by make and model
async function findVehicleByMakeAndModel(make, model) {
    const manufacturerRecommendationsArray = await getAllManufacturerRecommendations();
    for (const v of manufacturerRecommendationsArray) {
      if (v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase()) {
        //console.log(v);
        return v; // Return the recommendation if found
      }
    }
    return null; // Return null if not found after checking all recommendations
  }
  

module.exports = {
  sendServiceReminder: (vehicle,customer) => {
    //console.log(vehicle,customer);
    const foundVehicle = findVehicleByMakeAndModel(vehicle.make, vehicle.model);
    //const oilchangeInterval = foundVehicle.
    //console.log(allRecommendations);
    console.log(foundVehicle);

    // const msgBody = `
    //                 <h2> Welcome to Car Care 360 </h2>
    //                 <p>Hello ${firstName} ${lastName},</p>
    //                 <p><strong>Service Appointment Confirmed! 🎉</strong></p>
    //                 <p> 🚗 Vehicle: ${make} ${model} </p>
    //                 <p> 🔍 RegNum: ${registrationNumber} </p>
    //                 <p> 📅 Date: ${selectedDate} </p>
    //                 <p> ⏰ Time: ${preferredTime} </p>
    //                 <p>Thank you! We are waiting for you! 🤝</p>
    //               `;
    // console.log(msgBody);
    // sendEmail({
    //   to: email, 
    //   subject: 'Service Appointment Confirmed!',
    //   text: msgBody,
    // });
  },
};
