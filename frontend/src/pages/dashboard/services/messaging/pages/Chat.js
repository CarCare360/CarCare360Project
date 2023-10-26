import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host, getMe } from "../utils/APIRoutes";
import axios from "axios";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Topbar from "../../../components/Navbar";

import ChatContainer from "../components/ChatContainer";
import MaintenanceManagerSidebar from "../../../components/Sidebar";
import CustomerSidebar from "../../../../customerDash/components/Sidebar";
import { registerRoute, loginRoute } from "../utils/APIRoutes";

import { io } from "socket.io-client";
import useAuth from "../../../../../hooks/useAuth";

export default function Chat() {
  const { role } = useAuth();
  const socket = useRef();
  const [me, setMe] = useState("");
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isContactsLoaded, setIsContactsLoaded] = useState(false);
  const [renderedContacts, setRenderedContacts] = useState(null);
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const setUsers = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        // navigate("/chat-login");
        const token = localStorage.getItem("token");
        const result = await axios.get(
          "https://car-care-360.onrender.com/api/messages/getme" + "/" + token
        );
        console.log(result.data);
        const username = result.data.username;
        const email = result.data.email;
        const password = "123456";

        // Try logging in
        try {
          const { data } = await axios.post(loginRoute, {
            username,
            password,
          });
          if (data.status === false) {
            // If login fails, try registering
            const { data } = await axios.post(registerRoute, {
              username,
              email,
              password,
            });
            if (data.status === true) {
              localStorage.setItem("chat-app-user", JSON.stringify(data.user));
              if (!data.user.isAvatarImageSet) {
                navigate("/setAvatar");
              } else {
                if (role === "maintenanceManager") {
                  navigate("/MaintenanceManagerDashboard/message-system");
                } else if (role === "customer") {
                  navigate("/CustomerDashboard/message-system");
                }
              }
            }
          } else {
            localStorage.setItem("chat-app-user", JSON.stringify(data.user));
            if (!data.user.isAvatarImageSet) {
              navigate("/setAvatar");
            } else {
              if (role === "maintenanceManager") {
                navigate("/MaintenanceManagerDashboard/message-system");
              } else if (role === "customer") {
                navigate("/CustomerDashboard/message-system");
              }
            }
          }
        } catch (error) {
          console.log("Error occured");
        }
      }
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get(
          "https://car-care-360.onrender.com/api/messages/getme" + "/" + token
        );
        setMe(result.data.username);
      } catch (error) {}
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    };
    setUsers();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  });

  useEffect(() => {
    const tempFn = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
          setIsContactsLoaded(true);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    tempFn();
  }, [navigate, currentUser]);

  useEffect(() => {
    renderContacts();
  }, [isContactsLoaded]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const renderContacts = () => {
    setRenderedContacts(
      <Contacts
        contacts={contacts}
        currentUser={currentUser}
        changeChat={handleChatChange}
      />
    );
  };

  return (
    <Container>
      <Topbar />

      <GridContainer>
        <SidebarWrapper>
          {role === "maintenancemanager" ? (
            <MaintenanceManagerSidebar />
          ) : (
            <CustomerSidebar />
          )}
        </SidebarWrapper>

        <ChatWrapper>
          <div className="container">
            {isContactsLoaded && (
              <Contacts
                contacts={contacts}
                currentUser={currentUser}
                changeChat={handleChatChange}
              />
            )}

            {isContactsLoaded && isLoaded && currentChat === undefined ? (
              <Welcome currentUser={me} />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )}
          </div>
        </ChatWrapper>
      </GridContainer>
    </Container>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr; /* Adjust column sizes as needed */
  gap: 20px; /* Adjust gap as needed */
`;

const SidebarWrapper = styled.div`
  flex: 1;
`;

const ChatWrapper = styled.div`
  flex: 8;
  margin-left: 20px;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  padding-bottom: 40px;
  margin-left: 50px;
  margin-right: 20px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #ebf3fe;
  border: #c0c9d8;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #ced5e1;

    border-radius: 2rem;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 40% 60%;
    }
    @media screen and (max-width: 720px) {
      grid-template-columns: 0% 100%;
    }
  }
`;
