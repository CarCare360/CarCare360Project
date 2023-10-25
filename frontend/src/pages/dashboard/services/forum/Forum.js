import AccountCircle from "@mui/icons-material/AccountCircle";
import Textarea from "@mui/joy/Textarea";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import EnhancedTable from "./Table";
import MaintenanceManagerSidebar from "../../components/Sidebar";
import CustomerSidebar from "../../../customerDash/components/Sidebar";
import TopBar from "../../components/Navbar";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";

function Forum() {
  const [discussionTitle, setDiscussionTitle] = useState("");
  const [refreshTable, setRefreshTable] = useState(false);
  const { role } = useAuth();

  const token = localStorage.getItem("token");

  const handleCreateDiscussion = () => {
    try {
      const response = axios.post(
        "https://car-care-360.onrender.com/api/forum/createDiscussion",
        {
          title: discussionTitle.trim(),
          creatorToken: token,
        }
      );
      setDiscussionTitle("");
      setRefreshTable(!refreshTable);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <TopBar />
      <SidebarContainer>
        {role === "maintenancemanager" ? (
          <MaintenanceManagerSidebar />
        ) : (
          <CustomerSidebar />
        )}
      </SidebarContainer>
      <MainContainer>
        <Container>
          <div className="create-discussion">
            <div className="avatar">
              {" "}
              <AccountCircle
                className="avatar-image"
                style={{ fontSize: "3rem" }}
              />
            </div>

            <Textarea
              value={discussionTitle}
              onChange={(e) => setDiscussionTitle(e.target.value)}
              sx={{
                margin: "0 auto",
                borderRadius: "2rem",
                padding: "1rem",

                width: "100%", // Initially set to 100% width
                "@media screen and (max-width: 768px)": {
                  padding: "0.4rem",
                  width: "100%", // Adjust width for smaller screens
                },
              }}
              placeholder="Create a new Discussion...."
            />
            <div className="create-btn">
              <Button
                className="button"
                variant="contained"
                sx={{ ml: "auto" }}
                onClick={handleCreateDiscussion}
              >
                Create
              </Button>
            </div>
          </div>
        </Container>
        <DiscussionsTable>
          <EnhancedTable key={refreshTable} />
        </DiscussionsTable>
      </MainContainer>
    </Wrapper>
  );
}

export default Forum;

const Wrapper = styled.div`
  margin-left: 100px;
  padding-left: 200px;
`;

const SidebarContainer = styled.div`
  flex: 2;
`;

const MainContainer = styled.div`
  flex: 10;
  padding: 20px;
`;
const DiscussionsTable = styled.div`
  width: 70%;
  margin: 5rem auto 5rem auto;
`;

const Container = styled.div`
  background-color: #c9c9c9;
  width: 70%;
  margin: 3rem auto 5rem auto;
  border-radius: 2rem;
  padding: 10px 20px 10px 20px;
  .create-discussion {
    display: flex;
    margin: 1rem auto;
  }

  .avatar {
    display: flex;
    margin-right: 1rem;
    align-items: flex-start;
    .avatar-image {
      height: 5rem;
    }
  }
  .create-btn {
    display: flex;
    align-items: flex-end;
    padding: 2rem;

    button {
      border-radius: 1.5rem;
    }
  }
`;
