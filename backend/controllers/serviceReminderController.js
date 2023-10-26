const ManufacturerRecommendation = require("../models/manufacturerRecommendationModel");
const sendEmail = require("../utils/sendEmail");

// Get all manufacturer recommendations and store in an array
let manufacturerRecommendations = [];

// Get all manufacturer recommendations
const getManufacturerRecommendations = async (req, res) => {
  try {
    manufacturerRecommendations = await ManufacturerRecommendation.find({});
    //console.log(manufacturerRecommendations);
    res.status(200).json(manufacturerRecommendations);
  } catch (error) {
    console.log({ error: "Internal Server Error" });
  }
};

// Example of how to use the function and store the results in an array

// Function to find a vehicle by make and model
async function findVehicleByMakeAndModel(make, model) {
  await getManufacturerRecommendations();
  for (const v of manufacturerRecommendations) {
    if (
      v.make.toLowerCase() === make.toLowerCase() &&
      v.model.toLowerCase() === model.toLowerCase()
    ) {
      //console.log(v);
      return v; // Return the recommendation if found
    }
  }
  return null; // Return null if not found after checking all recommendations
}

module.exports = {
  sendServiceReminder: async (vehicle, customer) => {
    //console.log(vehicle,customer);
    let foundVehicle = null;
    foundVehicle = await findVehicleByMakeAndModel(vehicle.make, vehicle.model);
    //const oilchangeInterval = foundVehicle.
    //console.log(allRecommendations);
    console.log("founded recomendations", foundVehicle);
    const currentMileage = parseInt(vehicle.currentMileage);

    let oilchangeInterval = 5000; //default oil change interval
    if (foundVehicle) {
      oilchangeInterval = parseInt(foundVehicle.engineOilServiceInterval);
    }
    const nextServiceAt = parseInt(vehicle.currentMileage) + oilchangeInterval;

    const overDueMileage =
      currentMileage - parseInt(vehicle.lastServiceMileage) - oilchangeInterval;
    let msgBody = null;
    if (overDueMileage > 0) {
      msgBody = `
 
                    <p>Dear Customer,</p>
                    <p>Your ${vehicle.make} ${vehicle.model} with the registration number ${vehicle.registerNumber} is overdue for service by ${overDueMileage} kilometers. </p>
                    <p> To keep your vehicle running smoothly, please schedule an appointment with us now.</p>
                    <p> Thank you for choosing CarCare360.\n
                    Best regards,\n
                    CarCare360</p>
                  `;
      sendEmail({
        to: customer.email,
        subject: " Urgent: Your Vehicle's Service is Overdue",
        text: msgBody,
      });
      console.log(msgBody);
    } else if (overDueMileage > -1000) {
      msgBody = `           
      <p>Dear Customer,</p>
      <p>At CarCare360, your vehicle's maintenance and safety are our top priorities. We wanted to remind you that your ${
        vehicle.make
      } ${vehicle.model} with the registration number ${
        vehicle.registerNumber
      } is running closer for its upcoming service.</p>
      <p><strong>Last Service Date:</strong> ${vehicle.lastServiceDate}</p>
      <p><strong>Last Service Mileage:</strong> ${
        vehicle.lastServiceMileage
      }</p>
      <p><strong>Current Mileage:</strong> ${vehicle.currentMileage}</p>
      <p><strong>Kilometers Left Until Next Service:</strong> ${Math.abs(
        overDueMileage
      )}</p>
      <p> To keep your vehicle running smoothly, please schedule an appointment with us now.</p>
      <p> Thank you for choosing CarCare360.\n
      Best regards,\n
      CarCare360</p>
    `;
      sendEmail({
        to: customer.email,
        subject: "Reminder: Upcoming Service",
        text: msgBody,
      });
      console.log(msgBody);
    } else {
      msgBody = `           
      <p>Dear Customer,</p>
      <p>At CarCare360, your vehicle's maintenance and safety are our top priorities. Your ${vehicle.make} ${vehicle.model} with the registration number ${vehicle.registerNumber} is upto date with services.</p>
      <p><strong>Last Service Date:</strong> ${vehicle.lastServiceDate}</p>
      <p><strong>Last Service Mileage:</strong> ${vehicle.lastServiceMileage}</p>
      <p><strong>Current Mileage:</strong> ${vehicle.currentMileage}</p>
      <p><strong>Next Service on: </strong> ${nextServiceAt}</p>
      <p> To keep your vehicle running smoothly, please schedule an appointment with us on time now.</p>
      <p> Thank you for choosing CarCare360.\n
      Best regards,\n
      CarCare360</p>
    `;
      sendEmail({
        to: customer.email,
        subject: "Reminder: Upcoming Service",
        text: msgBody,
      });
    }
  },
};
