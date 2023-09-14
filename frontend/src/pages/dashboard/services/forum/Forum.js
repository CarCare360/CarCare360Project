import AccountCircle from "@mui/icons-material/AccountCircle";
import Textarea from "@mui/joy/Textarea";
import { Box, Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import EnhancedTable from "./Table";

function Forum() {
  return (
    <>
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
            <Button className="button" variant="contained" sx={{ ml: "auto" }}>
              Create
            </Button>
          </div>
        </div>
      </Container>
      <DiscussionsTable>
        <EnhancedTable />
      </DiscussionsTable>
    </>
  );
}

export default Forum;

const DiscussionsTable = styled.div`
  width: 70%;
  margin: 5rem auto 5rem auto;
`;

const Container = styled.div`
  background-color: #c9c9c9;
  width: 70%;
  margin: 5rem auto 5rem auto;
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
