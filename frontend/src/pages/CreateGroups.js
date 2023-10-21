import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./marketing/SideBar";
import Navbar from "./dashboard/components/Navbar";
import styled from "styled-components";

const CreateNewGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupEmails, setGroupEmails] = useState("");

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (groupName && groupEmails) {
      const newGroup = {
        name: groupName,
        emailAddresses: groupEmails.split(",").map((email) => email.trim()),
      };

      axios
        .post("http://localhost:4000/api/mailing/createList", newGroup)
        .then((response) => {
          if (response.status === 201) {
            swal("Group Created!", "", "success");
            console.log(response.data);
            setGroupName("");
            setGroupEmails("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container>
      <Navbar />
      <Row>
        <Col md={3}>
          <Sidebar />{" "}
        </Col>
        <Col md={9}>
          <CreateGroups>
            <h2 style={{ textAlign: "center" }}>Create new Groups</h2>
            <div className="form-container">
              <form onSubmit={handleCreateGroup}>
                <div className="form-group">
                  <label>Group Name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter the new group name"
                    value={groupName || ""}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email Addresses</label>

                  <textarea
                    name="emails"
                    className="form-control"
                    placeholder="Enter the email addresses separated by commas"
                    rows="20"
                    value={groupEmails || ""}
                    onChange={(e) => setGroupEmails(e.target.value)}
                  ></textarea>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button type="submit" className="btn btn-primary">
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          </CreateGroups>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateNewGroup;

const CreateGroups = styled.div`
  text-align: left;
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  padding: 20px;
  border-radius: 10px;
`;
