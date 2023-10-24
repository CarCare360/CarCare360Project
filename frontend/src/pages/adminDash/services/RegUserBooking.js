import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Topbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import swal from "sweetalert";
import ReCAPTCHA from "react-google-recaptcha";
//import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Modal,
  FormControl,
} from "react-bootstrap";
import jwtDecode from "jwt-decode";

const RegUserBooking = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleID, setSelectedVehicleID] = useState();
  console.log("sel", selectedVehicleID);

  useEffect(() => {
    // Define the URL of your API endpoint
    const apiUrl = "/api/registervehicle/" + currentCustomer.id; // Replace with the actual URL

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

  function findVehicle(id, vehicles) {
    // console.log("make",make);
    // console.log("model",model);
    // console.log("chassis code",chassisCode);
    if (id) {
      for (const vehicle of vehicles) {
        if (vehicle === null) {
          continue;
        }

        if (vehicle._id === id) {
          return vehicle;
        }
      }
    }
  }

  const selectedVehicle = findVehicle(selectedVehicleID, vehicles);
  console.log(selectedVehicle);

  //form validation
  const [validated, setValidated] = useState(false);
  // For reCAPTCHA
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const captcha = useRef(null);
  //input data
  const [isGuest, setIsGuest] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [odoMeter, setOdoMeter] = useState("");
  const [serviceType, setServiceType] = useState("Full Service");
  const [selectedDate, setSelectedDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [customerID, setCustomerID] = useState("");

  //get current logged in user data
  const token = localStorage.getItem("token");
  const currentCustomer = jwtDecode(token);
  //Set current customer data

  useEffect(() => {
    // Set current customer data
    const fullName = currentCustomer.username;
    const names = fullName.split(" ");
    if (names.length === 2) {
      setFirstName(names[0]);
      setLastName(names[1]);
    }
    setEmail(currentCustomer.email);
    setMobileNumber(currentCustomer.phone);
    setCustomerID(currentCustomer.id);
  }, []);

  useEffect(() => {
    //vehicle data based on selected vehicle
    if (selectedVehicle) {
      setMake(selectedVehicle.make);
      setModel(selectedVehicle.model);
      setRegistrationNumber(selectedVehicle.registerNumber);
    }
  }, [selectedVehicle]);

  const resetForm = () => {
    // Reset the form fields
    setMake("");
    setModel("");
    setRegistrationNumber("");
    setOdoMeter("");
    setSelectedDate("");
    setPreferredTime("");
    setServiceType("");
  };

  //triggers when submit button clicked
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else if (!selectedVehicle) {
      // Handle the case where reCAPTCHA is not filled
      alert("Please select a vehicle");
      e.preventDefault();
      e.stopPropagation();
    } else if (!recaptchaValue) {
      // Handle the case where reCAPTCHA is not filled
      alert("Please complete the reCAPTCHA.");
      e.preventDefault();
      e.stopPropagation();
    } else {
      setValidated(false);

      e.preventDefault();

      // Define the request body data
      const requestBody = {
        isGuest,
        firstName,
        lastName,
        email,
        mobileNumber,
        make,
        model,
        registrationNumber,
        odoMeter,
        serviceType,
        selectedDate,
        preferredTime,
        customerID,
      };

      // Create the fetch request
      fetch("/api/booking/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          console.log("this is the result", response.status);
          if (response.status === 201) {
            e.target.reset();
            resetForm(); // Clear user entered form data
            swal("Booked!", "We are waiting for you!", "success"); // Show success message
          } else {
            throw new Error("Request failed");
          }
        })
        .catch((error) => {
          console.error(error);
          swal("Something went wrong!", "Try again shortly.", "error"); // Show error message
        });
    }
  };

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Months are 0-indexed, so add 1
    let day = today.getDate();

    // Ensure that month and day have leading zeros for proper formatting
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  }
  return (
    <>
      <Topbar />
      <Box height={50} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <section>
            <Container className="shadow p-3 mb-5 bg-body rounded">
              <h2>Book a service</h2>
              <div className=" pl-4 pr-4 pt-2 pb-2">
                <Form className="text-left">
                  <Form.Group controlId="vehicleSelect">
                    <Form.Label>
                      {selectedVehicle
                        ? "Selected Vehicle:"
                        : "Select a Vehicle:"}
                    </Form.Label>
                    <FormControl
                      as="select"
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicleID(e.target.value)}
                    >
                      <option value="">Select a Vehicle:</option>
                      {vehicles.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                          {vehicle.registerNumber} - {vehicle.model}
                        </option>
                      ))}
                    </FormControl>
                  </Form.Group>
                </Form>

                <Form
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                  className="text-left"
                >
                  <Row className=" pb-2">
                    <Form.Group as={Col} controlId="text">
                      <Form.Label className="d-flex justify-content-start">
                        First Name
                      </Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="EX:John"
                        maxLength={25}
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled
                      />
                      <Form.Control.Feedback type="invalid">
                        *Please enter your name
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label className="d-flex justify-content-start">
                        Last Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="EX:Smith"
                        maxLength={25}
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled
                      />
                      <Form.Control.Feedback type="invalid">
                        *Please enter your last name
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className=" pb-2">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label className="d-flex justify-content-start">
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                        placeholder="Enter email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                      />{" "}
                      <Form.Control.Feedback type="invalid">
                        *Please enter a valid E-mail
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Col>
                      <Form.Label
                        htmlFor="inlineFormInputGroup"
                        visuallyHidden
                        className="d-flex justify-content-start"
                      >
                        Mobile Number
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <InputGroup.Text type="number">+94</InputGroup.Text>
                        <Form.Control
                          type="tel"
                          pattern="[0-9]{9}"
                          minLength={9}
                          maxLength={9}
                          id="inlineFormInputGroup"
                          placeholder=""
                          required
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          *Please enter a valid mobile number
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className=" pb-2">
                    <Form.Group as={Col} controlId="formGridMake">
                      <Form.Label className="d-flex justify-content-start">
                        Make
                      </Form.Label>

                      <Form.Control
                        type="text"
                        placeholder=""
                        maxLength={20}
                        required
                        value={make}
                        onChange={(e) => setMake(selectedVehicle.make)}
                        disabled
                      />
                      <Form.Control.Feedback type="invalid">
                        *Please enter make of your vehicle
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridModel">
                      <Form.Label className="d-flex justify-content-start">
                        Model
                      </Form.Label>
                      <Form.Control
                        type="text"
                        required
                        maxLength={25}
                        placeholder=""
                        value={model}
                        onChange={(e) => setModel(selectedVehicle.model)}
                        disabled
                      />
                      <Form.Control.Feedback type="invalid">
                        *Please enter model of your vehicle
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className=" pb-2">
                    <Form.Group as={Col} controlId="formGridRegNum">
                      <Form.Label className="d-flex justify-content-start">
                        Registration Number
                      </Form.Label>

                      <Form.Control
                        type="text"
                        placeholder=""
                        minLength={4}
                        maxLength={15}
                        required
                        value={registrationNumber}
                        disabled
                        onChange={(e) =>
                          setRegistrationNumber(
                            selectedVehicle.registrationNumber
                          )
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        *Please enter valid registration number
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Col>
                      <Form.Label
                        htmlFor="inlineFormInputGroup"
                        visuallyHidden
                        className="d-flex justify-content-start"
                      >
                        ODO Meter Reading
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control
                          id="inlineFormInputGroup"
                          type="Number"
                          placeholder=""
                          required
                          value={odoMeter}
                          onChange={(e) => setOdoMeter(e.target.value)}
                        />
                        <InputGroup.Text type="number">km</InputGroup.Text>{" "}
                        <Form.Control.Feedback type="invalid">
                          *Please enter valid mileage
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>

                  <Row className=" pb-2 ">
                    <Form.Group as={Col} controlId="formGridState ">
                      <Form.Label className="d-flex justify-content-start">
                        Service type
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="d-flex justify-content-start w-100"
                        required
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                      >
                        <option value="">Select service type</option>
                        <option value="Full_Service">Full Service</option>
                        <option value="Body_wash">Body wash</option>
                        <option value="Express_Lube">Express Lube</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        *Please select service type
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="dob">
                      <Form.Label className="d-flex justify-content-start">
                        Select Date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Preferred date"
                        required
                        min={getCurrentDate()} // Use a function to get the current date
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        *Please select the preferred date
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label className="d-flex justify-content-start">
                        Preferred Time
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="d-flex justify-content-start w-100"
                        required
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                      >
                        {/* available time slots to be granted from database dynamicaly */}
                        <option value="">Select preferred time</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        *Please select the preferred date
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <col></col>
                  </Row>
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={(value) => setRecaptchaValue(value)}
                  />
                  <div class="container d-flex justify-content-center">
                    <Button
                      variant="primary"
                      type="submit"
                      className=" mt-2 justify-content-center"
                    >
                      Book Now!
                    </Button>
                  </div>
                </Form>
              </div>
            </Container>
          </section>
        </Box>
      </Box>
    </>
  );
};

export default RegUserBooking;
