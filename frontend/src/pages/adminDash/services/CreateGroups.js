import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./marketing/SideBar";
import Navbar from "./dashboard/components/Navbar";
import styled from "styled-components";
import CustomerTable from "../components/CustomerTable";

const CreateNewGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupEmails, setGroupEmails] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (groupName) {
      const newGroup = {
        name: groupName,
        emailAddresses: [
          ...(groupEmails
            ? groupEmails.split(",").map((email) => email.trim())
            : []),
          ...(selectedUsers.length > 0
            ? selectedUsers.map((user) => user.email)
            : []),
        ],
      };

      axios
        .post(
          "https://car-care-360.onrender.com/api/mailing/createList",
          newGroup
        )
        .then((response) => {
          if (response.status === 201) {
            swal("Group Created!", "", "success");
            setGroupName("");
            setGroupEmails("");
            setSelectedUsers([]); // Clear selected users after creating the group
          } else if (response.status) {
            swal("Emails were added to the group", "", "success");
            setGroupName("");
            setGroupEmails("");
            setSelectedUsers([]); // Clear selected users after adding emails to the group
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
          <Sidebar />
        </Col>
        <Col md={9}>
          <CreateGroups>
            <h2 style={{ textAlign: "center" }}>Manage Groups</h2>
            <div className="form-container">
              <form onSubmit={handleCreateGroup}>
                <div className="form-group">
                  <h5>Group Name</h5>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter the group name"
                    value={groupName || ""}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>
                <div>
                  <h5>Select Users to Add:</h5>
                  <CustomerTable
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                  />
                </div>
                <div className="form-group">
                  <br />
                  <h5>Additional Email Addresses</h5>
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
                    Save Group
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
