const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const manufacturerRecommendationSchema = new Schema(
  {
    // regNumber: {
    //   type: String,
    //   required: true,
    // },
    chassisFirstCode: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    transmissionFluidType: {
      type: String,
      required: true,
    },
    transmissionFluidReplacementInterval: {
      type: String,
      required: true,
    },
    coolantType: {
      type: String,
      required: true,
    },
    coolantReplacementInterval: {
      type: String,
      required: true,
    },
    engineOilType: {
      type: String,
      required: true,
    },
    engineOilServiceInterval: {
      type: String,
      required: true,
    },

    oilFilter: {
      type: String,
      required: true,
    },
    wheelAlignmentInterval: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ManufacturerRecommendation",
  manufacturerRecommendationSchema
);
