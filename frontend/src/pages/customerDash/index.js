import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

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
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [lastServiceMileage, setLastServiceMileage] = useState("");
  const [bookings, setBookings] = useState([]);
  const [appointmentsAvailable, setAppointmentsAvailable] = useState(false);

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

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "RegisterNumber", headerName: "Register number", width: 150 },
    { field: "ServiceType", headerName: "Service type", width: 150 },
    { field: "Date", headerName: "Date", width: 150 },
    { field: "Time", headerName: "Time", width: 150 },
    { field: "Vehicle", headerName: "Vehicle", width: 150 },
    { field: "CurrentStatus", headerName: "Current status", width: 150 },
    {
      field: "delete",
      headerName: "Cancel",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleDeleteRow(params.row.id)}
        >
          Cancel
        </Button>
      ),
    },
  ];

  const handleDeleteRow = (rowId) => {
    fetch(`/api/booking/${rowId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Booking deleted successfully
          swal(
            "Booking Cancelled",
            "The booking has been Cancelled.",
            "success"
          );
          // Optionally, you can update the UI or perform any other actions here.
        } else if (response.status === 404) {
          // Booking not found
          swal(
            "Booking Not Found",
            "The booking you are trying to delete does not exist.",
            "error"
          );
        } else {
          throw new Error("Request failed");
        }
      })
      .catch((error) => {
        console.error(error);
        swal("Something went wrong!", "Try again shortly.", "error");
      });

    console.log("rid", rowId);
    const updatedAppointments = bookings.filter(
      (appointment) => appointment.id !== rowId
    );
    setBookings(updatedAppointments);
  };

  useEffect(() => {
    // Define the URL of your API endpoint
    const apiUrl3 = "/api/booking/" + customerID; // Replace with the actual URL

    // Make a GET request to the API
    fetch(apiUrl3)
      .then((response) => response.json())
      .then((b) => {
        console.log(b);
        setBookings(b);
        console.log("bookings", bookings);
        if (b && b.length > 0) {
          setAppointmentsAvailable(true);
          setBookings(b);
        } else {
          setAppointmentsAvailable(false);
          setBookings([]); // Initialize bookings as an empty array
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Create a mapping function
  function mapBookingToRow(booking) {
    return {
      id: booking._id, // or any other unique identifier
      RegisterNumber: booking.registrationNumber,
      ServiceType: booking.serviceType,
      Date: booking.selectedDate,
      Time: booking.preferredTime,
      Vehicle: `${booking.make} ${booking.model}`, // Combine make and model
      CurrentStatus: booking.status,
    };
  }

  // Map the bookings to rows

  const rows = bookings.map(mapBookingToRow);

  // Now, the `rows` array contains the mapped data with "Vehicle" column
  console.log(rows);

  const handleSubmit = async (e) => {
    console.log("customer", customerID);
    console.log("bookings", bookings);
    const vehicle = {
      currentMileage,
    };

    try {
      const response = await axios.patch(
        "/api/registervehicle/" + selectedVehicle._id,
        vehicle,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response) {
        swal("Updated!", "", "success"); // Show success message
        setCurrentMileage("");
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
                handleSubmit();

                console.log(currentMileage);
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
                        readOnly
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
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last Service Mileage</Form.Label>
                      <Form.Control
                        type="text"
                        value={`${selectedVehicle.lastServiceMileage}`}
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
                        min={Math.max(
                          parseInt(selectedVehicle.lastServiceMileage, 10),
                          selectedVehicle.currentMileage === null
                            ? 0
                            : parseInt(selectedVehicle.currentMileage, 10)
                        )}
                        required
                        value={currentMileage}
                        onChange={(e) => setCurrentMileage(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ margin: "10px" }}
                >
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

            {appointmentsAvailable ? (
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
            ) : (
              <Typography variant="body1">
                No appointments available.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CustomerDashboard;
