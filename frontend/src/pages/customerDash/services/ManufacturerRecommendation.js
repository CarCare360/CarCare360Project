import React from 'react'
import { useEffect } from 'react';
import Topbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const ManufacturerRecommendationView = () => {
  let [selectedMake, setSelectedMake] = useState(null);
  let [selectedModel, setSelectedModel] = useState(null);
  let [selectedChassisCode, setSelectedChassisCode] = useState(null);
  let [selectedVehicleInfo, setSelectedVehicleInfo] = useState(null);
  let [dataArray,setDataArray]= useState(null);
  let [isSubmitted, setIsSubmitted] = useState(false);
  let [rows, setRows] = useState([
    createData('Transmission Fluid Type', ''),
    createData('Transmission Fluid Replacement Interval', ''),
    createData('Coolant Type', ''),
    createData('Coolant Replacement Interval', ''),
    createData('Engine Oil Type', ''),
    createData('Engine Oil Service Interval', ''),
    createData('Oil Filter Part Number', ''),
    createData('Wheel Alignment Interval', ''),
  ]);



  let  [isDisplayed, setIsDisplayed] = useState(false);
  const DisplayComponent = () => {
    return (
      <div>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.attribute}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ backgroundColor: '#ddd' }}
                  >
                    {row.attribute}
                  </TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  
  
  const toggleDisplay = () => {
    setIsDisplayed(!isDisplayed);
  };


  const [automakers, setAutomakers] = useState([]);
  const [models, setModels] = useState([]);
  const [chassisCodes, setChassisCodes] = useState([]);
  useEffect(() => {
    fetch('https://car-care-360.onrender.com/api/manufacturerrecommendations/')
      .then(response => response.json())
      .then(data => {
        setDataArray(data);

        setAutomakers([...new Set(data.map(item => item.make))].map(make => ({ label: make })));
        setModels(data.map(item => ({ label: item.model, make: item.make })));
        setChassisCodes(data.map(item => ({
          make: item.make,
          model: item.model,
          chassisCode: item.chassisFirstCode,
          label: item.chassisFirstCode,
        })));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function findVehicle(make, model, chassisCode, vehicles) {
    // console.log("make",make);
    // console.log("model",model);
    // console.log("chassis code",chassisCode);
    if (make && model && chassisCode) {
      for (const vehicle of vehicles) {
        if (vehicle === null) {
          continue;
        }
  
        if (
          vehicle.make === make.label &&
          vehicle.model === model.label &&
          vehicle.chassisFirstCode === chassisCode.label
        ) {
          return vehicle;
        }
      }
    }
  
    return null;
  }
    
  function createData(attribute, value) {
    return { attribute, value };
  }

  let handleSubmit = () => {
    setIsSubmitted(true);
  
    const selectedVehicle = findVehicle(selectedMake, selectedModel, selectedChassisCode, dataArray);
    const newRows = [
      createData('Transmission Fluid Type', selectedVehicle.transmissionFluidType),
      createData('Transmission Fluid Replacement Interval', selectedVehicle.transmissionFluidReplacementInterval),
      createData('Coolant Type', selectedVehicle.coolantType),
      createData('Coolant Replacement Interval', selectedVehicle.coolantReplacementInterval),
      createData('Engine Oil Type', selectedVehicle.engineOilType),
      createData('Engine Oil Service Interval', selectedVehicle.engineOilServiceInterval),
      createData('Oil Filter Part Number', selectedVehicle.oilFilter),
      createData('Wheel Alignment Interval', selectedVehicle.wheelAlignmentInterval),
    ];
  
    setRows(newRows); // Update the rows state with new data
    setIsDisplayed(true);
  };
  
  return (
    <>
      <Topbar />
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <h1>Manufacture Recommendation</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
      <Autocomplete
        id="make-combo-box"
        options={automakers}
        getOptionLabel={(option) => option.label}
        style={{ width: '33%' }}
        onChange={(_, newValue) => {
          setSelectedMake(newValue);
          setSelectedModel(null);
          setSelectedChassisCode(null);
          setSelectedVehicleInfo=(null);
          setIsDisplayed(false);
        }}
        value={selectedMake}
        renderInput={(params) => <TextField {...params} label="Make" />}
      />
      <Autocomplete
        id="model-combo-box"
        options={models.filter((model) => !selectedMake || model.make === selectedMake.label)}
        getOptionLabel={(option) => option.label}
        style={{ width: '33%' }}
        onChange={(_, newValue) => {
          setSelectedModel(newValue);
          setSelectedChassisCode(null);
          setSelectedVehicleInfo=(null);
          setIsDisplayed(false);
        }}
        value={selectedModel}
        disabled={!selectedMake} // Disable the Model combo box if Make is not selected
        renderInput={(params) => <TextField {...params} label="Model" />}
      />
      <Autocomplete
        id="chassis-code-combo-box"
        options={chassisCodes.filter(
          (code) => (!selectedMake || code.make === selectedMake.label) && (!selectedModel || code.model === selectedModel.label)
        )}
        getOptionLabel={(option) => option.label}
        style={{ width: '33%' }}
        disabled={!selectedMake || !selectedModel} // Disable the Chassis Code combo box if Make or Model is not selected
        onChange={(_, newValue) => {
          setSelectedChassisCode(newValue);
          const newRows = [
            createData('Transmission Fluid Type', ''),
            createData('Transmission Fluid Replacement Interval', ''),
            createData('Coolant Type', ''),
            createData('Coolant Replacement Interval', ''),
            createData('Engine Oil Type', ''),
            createData('Engine Oil Service Interval', ''),
            createData('Oil Filter Part Number', ''),
            createData('Wheel Alignment Interval', ''),
          ];
        
          setRows(newRows); // Update the rows state with new data

          setIsDisplayed(true);
          
        }}

        renderInput={(params) => <TextField {...params} label="Chassis Code" />}
      />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedMake || !selectedModel || !selectedChassisCode}
          >
            Submit
          </Button>

    </div >
    <div>
      {isDisplayed && <DisplayComponent />}
    </div>
        </Box>
      </Box>
    </>
  )
};

export default ManufacturerRecommendationView;
