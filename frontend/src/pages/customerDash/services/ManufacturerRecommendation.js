import React from 'react'
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
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const ManufacturerRecommendationView = () => {
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedChassisCode, setSelectedChassisCode] = useState(null);
  const [selectedVehicleInfo, setSelectedVehicleInfo] = useState(null);

  const [isDisplayed, setIsDisplayed] = useState(false);
  const DisplayComponent = () => {
    return (
      <div>
        <TableContainer component={Paper}  style={{ marginTop:"20px" }}>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.attribute}>
              <TableCell
                component="th"
                scope="row"
                style={{ backgroundColor: '#ddd' }} // Gray background for the first column
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


  const handleSelection = () => {
    if (selectedMake && selectedModel && selectedChassisCode) {
      const foundVehicle = vehicleData.find(
        (vehicle) =>
          vehicle.make === selectedMake.label &&
          vehicle.model === selectedModel.label &&
          vehicle.chassisCode === selectedChassisCode.label
      );

      if (foundVehicle) {
        setSelectedVehicleInfo(foundVehicle);
      } else {
        setSelectedVehicleInfo(null);
      }
    }
  };
  const automakers = [
    { label: 'Toyota' },
    { label: 'Honda' },
    { label: 'Nissan' },
    { label: 'Mazda' },
    { label: 'Suzuki' },
    { label: 'Subaru' },
    { label: 'Mitsubishi' },
    { label: 'Lexus' },
    { label: 'Acura' },
    { label: 'Isuzu' },
    { label: 'Daihatsu' },
    { label: 'Yamaha' },
    { label: 'Kawasaki' },
    { label: 'Ford' },
    { label: 'Chevrolet' },
    { label: 'Volkswagen' },
    { label: 'BMW' },
    { label: 'Mercedes-Benz' },
  ];
  const models = [
    // Toyota
    { label: 'Camry', make: 'Toyota' },
    { label: 'Corolla', make: 'Toyota' },
    { label: 'Rav4', make: 'Toyota' },
    { label: 'Prius', make: 'Toyota' },
    // Honda
    { label: 'Civic', make: 'Honda' },
    { label: 'Accord', make: 'Honda' },
    { label: 'CR-V', make: 'Honda' },
    { label: 'Fit', make: 'Honda' },
    // Nissan
    { label: 'Altima', make: 'Nissan' },
    { label: 'Maxima', make: 'Nissan' },
    { label: 'Rogue', make: 'Nissan' },
    { label: 'Sentra', make: 'Nissan' },
    // Mazda
    { label: 'Mazda3', make: 'Mazda' },
    { label: 'Mazda6', make: 'Mazda' },
    { label: 'CX-5', make: 'Mazda' },
    { label: 'MX-5', make: 'Mazda' },
    // Suzuki
    { label: 'Swift', make: 'Suzuki' },
    { label: 'Ciaz', make: 'Suzuki' },
    { label: 'Jimny', make: 'Suzuki' },
    { label: 'Vitara', make: 'Suzuki' },
    // Subaru
    { label: 'Outback', make: 'Subaru' },
    { label: 'Impreza', make: 'Subaru' },
    { label: 'Legacy', make: 'Subaru' },
    { label: 'Forester', make: 'Subaru' },
    // Mitsubishi
    { label: 'Lancer', make: 'Mitsubishi' },
    { label: 'Outlander', make: 'Mitsubishi' },
    { label: 'Eclipse', make: 'Mitsubishi' },
    { label: 'Pajero', make: 'Mitsubishi' },
    // Lexus
    { label: 'IS', make: 'Lexus' },
    { label: 'RX', make: 'Lexus' },
    { label: 'LS', make: 'Lexus' },
    { label: 'GX', make: 'Lexus' },
    // Acura
    { label: 'MDX', make: 'Acura' },
    { label: 'RDX', make: 'Acura' },
    { label: 'TLX', make: 'Acura' },
    { label: 'ILX', make: 'Acura' },
    // Isuzu
    { label: 'D-Max', make: 'Isuzu' },
    { label: 'MUX', make: 'Isuzu' },
    // Daihatsu
    { label: 'Terios', make: 'Daihatsu' },
    { label: 'Mira', make: 'Daihatsu' },
    // Yamaha
    { label: 'Yamaha1', make: 'Yamaha' },
    { label: 'Yamaha2', make: 'Yamaha' },
    // Kawasaki
    { label: 'Kawasaki1', make: 'Kawasaki' },
    { label: 'Kawasaki2', make: 'Kawasaki' },
    { label: 'Ford Fusion', make: 'Ford' },
    { label: 'Chevrolet Malibu', make: 'Chevrolet' },
    { label: 'Volkswagen Passat', make: 'Volkswagen' },
    { label: 'BMW 3 Series', make: 'BMW' },
    { label: 'Mercedes-Benz C-Class', make: 'Mercedes-Benz' },
  ];
  // List of chassis codes for the models
  const chassisCodes = [
    // Toyota
    { make: 'Toyota', model: 'Camry', chassisCode: 'TC1234', label: 'TC1234' },
    { make: 'Toyota', model: 'Camry', chassisCode: 'TC5678', label: 'TC5678' },
    { make: 'Toyota', model: 'Corolla', chassisCode: 'TCO123', label: 'TCO123' },
    { make: 'Toyota', model: 'Corolla', chassisCode: 'TCO456', label: 'TCO456' },
    { make: 'Toyota', model: 'Rav4', chassisCode: 'TR1234', label: 'TR1234' },
    { make: 'Toyota', model: 'Rav4', chassisCode: 'TR5678', label: 'TR5678' },
    { make: 'Toyota', model: 'Prius', chassisCode: 'TP1234', label: 'TP1234' },
    { make: 'Toyota', model: 'Prius', chassisCode: 'TP5678', label: 'TP5678' },
    // Honda
    { make: 'Honda', model: 'Civic', chassisCode: 'HC7890', label: 'HC7890' },
    { make: 'Honda', model: 'Civic', chassisCode: 'HC1234', label: 'HC1234' },
    { make: 'Honda', model: 'Accord', chassisCode: 'HA5678', label: 'HA5678' },
    { make: 'Honda', model: 'Accord', chassisCode: 'HA9012', label: 'HA9012' },
    { make: 'Honda', model: 'CR-V', chassisCode: 'HCR123', label: 'HCR123' },
    { make: 'Honda', model: 'CR-V', chassisCode: 'HCR456', label: 'HCR456' },
    { make: 'Honda', model: 'Fit', chassisCode: 'HF7890', label: 'HF7890' },
    { make: 'Honda', model: 'Fit', chassisCode: 'HF1234', label: 'HF1234' },
    // Nissan
    { make: 'Nissan', model: 'Altima', chassisCode: 'NA3456', label: 'NA3456' },
    { make: 'Nissan', model: 'Altima', chassisCode: 'NA7890', label: 'NA7890' },
    { make: 'Nissan', model: 'Maxima', chassisCode: 'NM1234', label: 'NM1234' },
    { make: 'Nissan', model: 'Maxima', chassisCode: 'NM5678', label: 'NM5678' },
    { make: 'Nissan', model: 'Rogue', chassisCode: 'NR7890', label: 'NR7890' },
    { make: 'Nissan', model: 'Rogue', chassisCode: 'NR1234', label: 'NR1234' },
    { make: 'Nissan', model: 'Sentra', chassisCode: 'NS1234', label: 'NS1234' },
    { make: 'Nissan', model: 'Sentra', chassisCode: 'NS5678', label: 'NS5678' },

  // Yamaha
  { make: 'Yamaha', model: 'Yamaha1', chassisCode: 'YYAM123', label: 'YYAM123' },
  { make: 'Yamaha', model: 'Yamaha1', chassisCode: 'YYAM456', label: 'YYAM456' },
  { make: 'Yamaha', model: 'Yamaha2', chassisCode: 'YYAM789', label: 'YYAM789' },
  { make: 'Yamaha', model: 'Yamaha2', chassisCode: 'YYAM1234', label: 'YYAM1234' },
  // Kawasaki
  { make: 'Kawasaki', model: 'Kawasaki1', chassisCode: 'KKAW567', label: 'KKAW567' },
  { make: 'Kawasaki', model: 'Kawasaki1', chassisCode: 'KKAW890', label: 'KKAW890' },
  { make: 'Kawasaki', model: 'Kawasaki2', chassisCode: 'KKAW123', label: 'KKAW123' },
  ];

  const vehicleData = [
    {
      make: 'Toyota',
      model: 'Camry',
      chassisCode: 'TC1234',
      transmissionFluidType: 'Type A',
      transmissionFluidReplacementInterval: 'Every 30,000 miles',
      coolantType: 'Coolant X',
      coolantReplacementInterval: 'Every 40,000 miles',
      engineOilType: 'Oil Y',
      engineOilServiceInterval: 'Every 5,000 miles',
      oilFilterPartNumber: 'ABC123',
      wheelAlignmentInterval: 'Every 10,000 miles',
    },
    // Add data for other makes and models
    
  ];

  function createData(attribute, value) {
    return { attribute, value };
  }
  
  const rows = [
    createData('Transmission Fluid Type', 'ATF Type T-IV'),
    createData('Transmission Fluid Replacement Interval', 'Every 30,000 miles'),
    createData('Coolant Type', 'Super Long Life Coolant'),
    createData('Coolant Replacement Interval', 'Every 50,000 miles'),
    createData('Engine Oil Type', 'Genuine Motor Oil 5W-30'),
    createData('Engine Oil Service Interval', 'Every 5,000 miles'),
    createData('Oil Filter Part Number', '90915-YZZD1'),
    createData('Wheel Alignment Interval', 'Every 12 months'),
  ];

  
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
          setSelectedVehicleInfo(null); // Reset selected vehicle info
          setIsDisplayed(true);
          
        }}

        renderInput={(params) => <TextField {...params} label="Chassis Code" />}
      />
    </div >
    
    {selectedVehicleInfo && (
            <div>
              <h2>Vehicle Information</h2>
              <p>Transmission Fluid Type: {selectedVehicleInfo.transmissionFluidType}</p>
              <p>Transmission Fluid Replacement Interval: {selectedVehicleInfo.transmissionFluidReplacementInterval}</p>
              <p>Coolant Type: {selectedVehicleInfo.coolantType}</p>
              <p>Coolant Replacement Interval: {selectedVehicleInfo.coolantReplacementInterval}</p>
              <p>Engine Oil Type: {selectedVehicleInfo.engineOilType}</p>
              <p>Engine Oil Service Interval: {selectedVehicleInfo.engineOilServiceInterval}</p>
              <p>Oil Filter Part Number: {selectedVehicleInfo.oilFilterPartNumber}</p>
              <p>Wheel Alignment Interval: {selectedVehicleInfo.wheelAlignmentInterval}</p>
            </div>
          )}
           <div>

      
      {/* Step 4: Use conditional rendering to display the component */}
      {isDisplayed && <DisplayComponent />}

   
    </div>
        </Box>
      </Box>
    </>
  )
}

export default ManufacturerRecommendationView
