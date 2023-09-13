const express = require("express");
const {
  createManufacturerRecommendation,
  getManufacturerRecommendationById,
  getManufacturerRecommendations,
  deleteManufacturerRecommendation,
  updateManufacturerRecommendation,
} = require("../controllers/manufacturerRecommendationController");

const router = express.Router();

// GET all manufacturer recommendations
router.get("/", getManufacturerRecommendations);

// GET a single manufacturer recommendation by ID
router.get("/:id", getManufacturerRecommendationById);

// POST a new manufacturer recommendation
router.post("/", createManufacturerRecommendation);

// DELETE a manufacturer recommendation
router.delete("/:id", deleteManufacturerRecommendation);

// UPDATE a manufacturer recommendation
router.patch("/:id", updateManufacturerRecommendation);

module.exports = router;
