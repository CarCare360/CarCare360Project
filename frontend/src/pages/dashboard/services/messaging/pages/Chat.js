import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host, getMe } from "../utils/APIRoutes";
import axios from "axios";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../../../components/Sidebar";
import { registerRoute, loginRoute } from "../utils/APIRoutes";

import { io } from "socket.io-client";

export default function Chat() {
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
          "http://localhost:4000/api/messages/getme" + "/" + token
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
                navigate("/CustomerDashboard/message-system");
              }
            }
          } else {
            localStorage.setItem("chat-app-user", JSON.stringify(data.user));
            if (!data.user.isAvatarImageSet) {
              navigate("/setAvatar");
            } else {
              navigate("/CustomerDashboard/message-system");
            }
          }
        } catch (error) {
          console.log("Error occured");
        }
      }
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get(
          "http://localhost:4000/api/messages/getme" + "/" + token
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
      <SidebarWrapper>
        <Sidebar />
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
    </Container>
  );
}

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
  margin-left: 50px;
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
      grid-template-columns: 35% 65%;
    }
    @media screen and (max-width: 720px) {
      grid-template-columns: 0% 100%;
    }
  }
`;
