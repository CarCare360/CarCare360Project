import React, { useState } from "react";

import {
  TextField,
  Grid,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const ManufacturerRecommendation = () => {
  const [regNumber, setRegNumber] = useState("");
  const [chassisFirstCode, setChassisFirstCode] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [engineOilServiceInterval, setEngineOilServiceInterval] = useState("");
  const [coolantReplacementInterval, setCoolantReplacementInterval] =
    useState("");
  const [
    transmissionFluidReplacementInterval,
    setTransmissionFluidReplacementInterval,
  ] = useState("");
  const [engineOilType, setEngineOilType] = useState("");
  const [transmissionFluidType, setTransmissionFluidType] = useState("");
  const [coolantType, setCoolantType] = useState("");
  const [oilFilter, setOilFilter] = useState("");
  const [wheelAlignmentInterval, setwheelAlignmentInterval] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
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
      wheelAlignmentInterval
    );

    const manufacturerecommendation = {
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
    };

    const response = await fetch("api/manufacturerrecommendations/", {
      method: "POST",
      body: JSON.stringify(manufacturerecommendation),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log("Error occured");
      console.log(response);
    }

    if (response.ok) {
      setRegNumber("");
      setChassisFirstCode("");
      setMake("");
      setModel("");
      setFuelType("");
      setTransmissionFluidType("");
      setTransmissionFluidReplacementInterval("");
      setCoolantType("");
      setCoolantReplacementInterval("");
      setEngineOilType("");
      setEngineOilServiceInterval("");
      setOilFilter("");
      setwheelAlignmentInterval("");
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container>
      <div className="manufacturerecommendation__container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="manufacturerecommendation__header">
              <h2>Manufacturer Recommendation Details</h2>
            </div>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                {/* Register Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Register Number"
                    variant="outlined"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Chassis First Code"
                    variant="outlined"
                    value={chassisFirstCode}
                    onChange={(e) => setChassisFirstCode(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Make"
                    variant="outlined"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Model"
                    variant="outlined"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl style={{ width: "100%" }} variant="outlined">
                    <InputLabel>Fuel Type</InputLabel>
                    <Select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      label="Fuel Type"
                      required
                    >
                      <MenuItem value={"Gasoline"}>Gasoline</MenuItem>
                      <MenuItem value={"Diesel"}>Diesel</MenuItem>
                      <MenuItem value={"Electric"}>Electric</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Transmission Fluid Type"
                    variant="outlined"
                    value={transmissionFluidType}
                    onChange={(e) => setTransmissionFluidType(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Transmission Fluid Replacement Interval"
                    variant="outlined"
                    value={transmissionFluidReplacementInterval}
                    onChange={(e) =>
                      setTransmissionFluidReplacementInterval(e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Coolant Type"
                    variant="outlined"
                    value={coolantType}
                    onChange={(e) => setCoolantType(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Coolant Replacement Interval"
                    variant="outlined"
                    value={coolantReplacementInterval}
                    onChange={(e) =>
                      setCoolantReplacementInterval(e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Engine Oil Type"
                    variant="outlined"
                    value={engineOilType}
                    onChange={(e) => setEngineOilType(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Engine Oil Service Interval"
                    variant="outlined"
                    value={engineOilServiceInterval}
                    onChange={(e) =>
                      setEngineOilServiceInterval(e.target.value)
                    }
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Oil Filter"
                    variant="outlined"
                    value={oilFilter}
                    onChange={(e) => setOilFilter(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Wheel Alignment Interval"
                    variant="outlined"
                    value={wheelAlignmentInterval}
                    onChange={(e) => setwheelAlignmentInterval(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="manufacturerecommendation__submitbtn">
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Recommendation Details Submitted Successfully
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManufacturerRecommendation;
