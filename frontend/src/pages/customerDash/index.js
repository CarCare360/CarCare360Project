import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Form, Row, Col } from "react-bootstrap";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Button,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Topbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useAuth from "../../hooks/useAuth";

const CustomerDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [userData, setUserData] = useState(useAuth()); //getting current loggedin user data
  const [customerID, setCustomerID] = useState(userData.id);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [currentMileage, setCurrentMileage] = useState();
  const formSectionRef = useRef(null);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');

  useEffect(() => {
    // Define the URL of your API endpoint
    const apiUrl = "/api/registervehicle/" + customerID; // Replace with the actual URL

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(vehicles);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "RegisterNumber", headerName: "Register number", width: 200 },
    { field: "ServiceType", headerName: "Service type", width: 200 },
    { field: "Date", headerName: "Date", width: 200 },
    { field: "TimeSlot", headerName: "Time slot", width: 200 },
    { field: "CurrentStatus", headerName: "Current status", width: 200 },
  ];

  const rows = [
    {
      id: 1,
      RegisterNumber: "CAB-1234",
      ServiceType: "Oil Change",
      Date: "2023-09-15",
      TimeSlot: "10:00 AM - 11:00 AM",
      CurrentStatus: "In Progress",
    },
    {
      id: 2,
      RegisterNumber: "KK-2590",
      ServiceType: "Brake Inspection",
      Date: "2023-09-16",
      TimeSlot: "2:00 PM - 3:00 PM",
      CurrentStatus: "Completed",
    },
    {
      id: 3,
      RegisterNumber: "KF-3269",
      ServiceType: "Tire Rotation",
      Date: "2023-09-17",
      TimeSlot: "9:00 AM - 10:00 AM",
      CurrentStatus: "Scheduled",
    },
    {
      id: 4,
      RegisterNumber: "AB-5678",
      ServiceType: "Engine Tune-up",
      Date: "2023-09-18",
      TimeSlot: "3:00 PM - 4:00 PM",
      CurrentStatus: "In Progress",
    },
    {
      id: 5,
      RegisterNumber: "XY-9876",
      ServiceType: "AC Inspection",
      Date: "2023-09-19",
      TimeSlot: "11:00 AM - 12:00 PM",
      CurrentStatus: "Scheduled",
    },
  ];

/*
  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicle = {
      registerNumber,
      make,
      model,
      lastServiceMileage,
      customerID,
    };
    console.log(customerID)

    try {
      const response = await axios.post(
        "http://localhost:4000/api/registervehicle",
        vehicle,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response) {
        ;
      } else {
        const json = response.json();
        console.log(json);
        console.log("Error Registering the vehicle");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("An error occurred:", error);
    }
  };

*/

  return (
    <>
      <Topbar />
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            My Vehicles
          </Typography>
          <Grid
            container
            spacing={2}
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            {vehicles.map((card) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={card._id}
                style={{ padding: "30px" }}
              >
                <Card>
                  {/* <CardMedia sx={{ height: 140 }} image={"https://global.toyota/pages/news/images/2015/10/13/1330/20151013_01_15_s.jpg"} /> */}
                  <CardHeader
                    title={
                      card.make.toUpperCase() + " " + card.model.toUpperCase()
                    }
                    style={{ marginBottom: "-20px" }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {card.registerNumber.toUpperCase()} <br />
                      Last service on {card.lastServiceMileage} km
                      <br />
                      {/*card.content*/}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    style={{ margin: "10px" }}
                    onClick={() => {
                      setSelectedVehicle(card);
                      setShowVehicleForm(true);
                      if (formSectionRef.current) {
                        formSectionRef.current.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    See more
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          {showVehicleForm && selectedVehicle && (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                // Handle the form submission logic here
              }}
            >
              <Box p={2} style={{ paddingTop: "60px" }} ref={formSectionRef}>
                <Typography variant="h4" gutterBottom>
                  {`${selectedVehicle.registerNumber.toUpperCase()} ${selectedVehicle.make.toUpperCase()} ${selectedVehicle.model.toUpperCase()}`}
                  {console.log("selected vehicle:", selectedVehicle)}
                </Typography>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Make</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedVehicle.make.toUpperCase()}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Model</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedVehicle.model.toUpperCase()}
                        onChange={(e) => setModel(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Registration Number</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedVehicle.registerNumber.toUpperCase()}
                        onChange={(e) => setRegisterNumber(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last Service Mileage</Form.Label>
                      <Form.Control
                        type="text"
                        value={`${selectedVehicle.lastServiceMileage} Km`}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last Service Date</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedVehicle.lastServiceDate}
                
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Current Mileage</Form.Label>
                      <Form.Control
                        type="number"
                        min={parseInt(selectedVehicle.lastServiceMileage, 10)}
                        required
                        value={currentMileage}
                        onChange={(e) => setCurrentMileage(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Box>
            </Form>
          )}

          {/* Table below the grid */}
          <Box mt={4}>
            <Typography variant="h4" gutterBottom>
              My Appointments
            </Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CustomerDashboard;
