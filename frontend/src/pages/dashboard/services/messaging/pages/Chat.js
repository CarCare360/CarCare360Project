import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import axios from "axios";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../../../components/Sidebar";
import { io } from "socket.io-client";

export default function Chat() {
  const socket = useRef();
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
        navigate("/chat-login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
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
            <Welcome currentUser={currentUser} />
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
