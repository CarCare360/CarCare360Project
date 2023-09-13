const ManufacturerRecommendation = require("../models/manufacturerRecommendationModel");
const mongoose = require("mongoose");

// Get all manufacturer recommendations
const getManufacturerRecommendations = async (req, res) => {
  try {
    const manufacturerRecommendations = await ManufacturerRecommendation.find(
      {}
    );
    res.status(200).json(manufacturerRecommendations);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single manufacturer recommendation by ID
const getManufacturerRecommendationById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "No such manufacturer recommendation!" });
  }

  try {
    const manufacturerRecommendation =
      await ManufacturerRecommendation.findById(id);

    if (!manufacturerRecommendation) {
      return res
        .status(404)
        .json({ error: "No such manufacturer recommendation" });
    }

    res.status(200).json(manufacturerRecommendation);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new manufacturer recommendation
const createManufacturerRecommendation = async (req, res) => {
  const {
    regNumber,
    chassisFirstCode,
    make,
    model,
    fuelType,
    engineOilServiceInterval,
    coolantReplacementInterval,
    transmissionFluidReplacementInterval,
    engineOilType,
    transmissionFluidType,
    coolantType,
    oilFilter,
    wheelAlignmentInterval,
  } = req.body;

  if (
    !regNumber ||
    !chassisFirstCode ||
    !make ||
    !model ||
    !fuelType ||
    !engineOilServiceInterval ||
    !coolantReplacementInterval ||
    !transmissionFluidReplacementInterval ||
    !engineOilType ||
    !transmissionFluidType ||
    !coolantType ||
    !oilFilter ||
    !wheelAlignmentInterval
  ) {
    return res.status(400).json({ error: "Fill the fields" });
  }

  try {
    const manufacturerRecommendation = await ManufacturerRecommendation.create({
      regNumber,
      chassisFirstCode,
      make,
      model,
      fuelType,
      engineOilServiceInterval,
      coolantReplacementInterval,
      transmissionFluidReplacementInterval,
      engineOilType,
      transmissionFluidType,
      coolantType,
      oilFilter,
      wheelAlignmentInterval,
    });

    res.status(201).json(manufacturerRecommendation);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// Update a manufacturer recommendation by ID
const updateManufacturerRecommendation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "No such manufacturer recommendation!" });
  }

  try {
    const manufacturerRecommendation =
      await ManufacturerRecommendation.findByIdAndUpdate(id, req.body, {
        new: true,
      });

    if (!manufacturerRecommendation) {
      return res
        .status(404)
        .json({ error: "No such manufacturer recommendation" });
    }

    res.status(200).json(manufacturerRecommendation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// Delete a manufacturer recommendation by ID
const deleteManufacturerRecommendation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "No such manufacturer recommendation!" });
  }

  try {
    const manufacturerRecommendation =
      await ManufacturerRecommendation.findByIdAndRemove(id);

    if (!manufacturerRecommendation) {
      return res
        .status(404)
        .json({ error: "No such manufacturer recommendation" });
    }

    res.status(200).json(manufacturerRecommendation);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getManufacturerRecommendations,
  getManufacturerRecommendationById,
  createManufacturerRecommendation,
  updateManufacturerRecommendation,
  deleteManufacturerRecommendation,
};
