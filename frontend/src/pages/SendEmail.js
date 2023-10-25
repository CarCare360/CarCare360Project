import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Sidebar from "./marketing/SideBar";
import Navbar from "./dashboard/components/Navbar";
import Footer from "../pages/commons/Footer";
import axios from "axios";
import swal from "sweetalert";

import styled from "styled-components";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Autocomplete, Checkbox } from "@mui/material";
import CheckboxesTags from "../components/CheckBoxes";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SendEmail = () => {
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [subject, setSubject] = useState("");
  const [additionalEmails, setAdditionalEmails] = useState("");
  const [message, setMessage] = useState("");
  const [mailingLists, setMailingLists] = useState([]);

  useEffect(() => {
    async function fetchMailingLists() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/mailing/getMailingList"
        );
        setMailingLists(response.data);
      } catch (error) {
        console.error("Error fetching mailing lists:", error);
      }
    }

    fetchMailingLists();
  }, []);

  const handleSelection = (newValue) => {
    setSelectedGroups(newValue);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Show loading spinner while sending emails
    swal({
      title: "Sending Emails",
      text: "Please wait...",
      buttons: false,
      closeOnClickOutside: false,
      closeOnEsc: false,
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick: false,
      onOpen: () => {
        swal.showLoading(); // Display a loading spinner
      },
    });

    // Validate and filter the additional email addresses
    const validEmails = additionalEmails
      .split(",")
      .map((email) => email.trim()) // Trim whitespace
      .filter((email) => {
        // Define a regular expression for email validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
      });

    // Create an object with the form data
    const emailData = {
      subject,
      text: message,
      mailingListIds: selectedGroups.map((group) => group.id),
      to: validEmails,
    };

    // Send the emailData to the backend using Axios
    axios
      .post("https://car-care-360.onrender.com/api/mailing/sendEmail", emailData)
      .then((response) => {
        // After sending emails
        swal.close(); // Close the loading dialog
        swal(
          "Emails Sent",
          "All emails have been sent successfully.",
          "success"
        );
        setSubject("");
        setAdditionalEmails("");
        setMessage("");
      })
      .catch((error) => {
        // Handle any errors from the API call
        console.error("Error sending email:", error);
        swal("Error", "An error occurred while sending emails.", "error");
      });
  };

  // Create customerGroups from mailingLists
  const customerGroups = mailingLists.map((list) => {
    return { name: list.name, id: list._id };
  });

  return (
    <Container>
      <Navbar />

      <Row>
        <Col md={3}>
          <Sidebar /> {/* Display the sidebar on the left */}
        </Col>
        <Col md={9}>
          <MailSender>
            <h2 style={{ textAlign: "center" }}>Send Marketing Emails</h2>
            <div className="container">
              <div style={{ marginTop: "5%" }}>
                <form onSubmit={sendEmail}>
                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Enter the Subject"
                      value={subject || ""}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email address Groups</label>
                    <CheckboxesTags
                      options={customerGroups}
                      handleSelectedOptions={handleSelection}
                    />
                  </div>

                  <div className="form-group">
                    <label>Additional email addresses</label>
                    <input
                      name="email"
                      type="dropdown"
                      className="form-control"
                      placeholder="Enter additional email addresses"
                      value={additionalEmails || ""}
                      onChange={(e) => setAdditionalEmails(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>

                    <textarea
                      name="message"
                      className="form-control"
                      placeholder="Enter Your Message Here..."
                      rows="20"
                      value={message || ""}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button type="submit" className="btn btn-primary">
                      Send Email
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </MailSender>
        </Col>
      </Row>
    </Container>
  );
};

const MailSender = styled.div`
  text-align: left;
  margin-top: 100px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
`;

const FormLabelLeft = styled(Form.Label)`
  text-align: left;
`;

export default SendEmail;
