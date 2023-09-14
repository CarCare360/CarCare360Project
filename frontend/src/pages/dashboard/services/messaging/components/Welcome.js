import React from "react";
import styled from "styled-components";
import Hello from "../../../../../components/images/hello.svg";
export default function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={Hello} alt="Hello" />
      {/* {Image by freepik} */}

      <h1>
        Welcome, <span>{currentUser.username}</span>
      </h1>
      <h3> Please select a chat to Start Messaging. </h3>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black;
  border-radius: 0 2rem 2rem 0;
  img {
    height: 20rem;
  }
  span {
    color: #1874ff;
  }
`;
