import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentContact, setCurrentContact] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedContacts, setSelectedContacts] = useState(contacts);
  const [contactElements, setContactElements] = useState([]);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUsername(currentUser.username);
    }
  }, [currentUser]);

  // initial rendering of contacts
  useEffect(() => {
    setSelectedContacts(contacts);
    setContactElements(renderContacts());
  }, []);

  // search result rendering
  useEffect(() => {
    setContactElements(renderContacts());
  }, [selectedContacts, currentSelected]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    setCurrentContact(contact);
  };

  const handleSearch = async (keyword) => {
    setSearchKeyword(keyword);
    const permIndex = contacts.indexOf(currentContact);
    setCurrentSelected(permIndex);

    const searchKeywordLowerCase = keyword.toLowerCase();

    const searchResults = await contacts.filter((contact) => {
      return contact.username.toLowerCase().includes(searchKeywordLowerCase);
    });
    setSelectedContacts(searchResults);
  };

  // useEffect(() => {
  //   const newUpdatedContacts = renderContacts();
  //   setContactElements(newUpdatedContacts);
  // }, [selectedContacts]);

  const renderContacts = () => {
    const reverse = [...selectedContacts].reverse();
    return reverse.map((contact, index) => {
      return (
        <div
          key={contact._id}
          className={`contact ${index === currentSelected ? "selected" : ""}`}
          onClick={() => changeCurrentChat(index, contact)}
          style={{
            backgroundColor: index === currentSelected ? "#eff1f5" : "",
          }}
        >
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${contact.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h5>{contact.username}</h5>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="searchbar">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="contacts">{contactElements}</div>
          {/* <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUsername}</h2>
            </div>
          </div> */}
        </Container>
      )}
    </>
  );
}

export default Contacts;
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 90%;
  border-radius: 2rem 0 0 2rem;

  overflow: hidden;
  background-color: #ced5e1; /* Light greyish background color */
  .searchbar {
    display: flex;
    align-items: center;
    padding: 0.3rem 1rem;
    gap: 1rem;
    border-radius: 2rem 0 0 0;
    border-bottom: 1px solid white; /* 1px solid grey border at the bottom */
    justify-content: center;
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: grey; /* Light grey scrollbar thumb */
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ced5e1; /* Light greyish background color */
      min-height: 5rem;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      border-bottom: 1px solid white;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        margin-left: 1.5rem;
        img {
          height: 3rem;
        }
      }
      .username {
        h5 {
          color: black; /* Black text color */
        }
      }
    }
    .selected {
      background-color: #eff1f5; /* Light background color for selected contact */
    }
  }

  .current-user {
    background-color: #1874ff; /* Blue background color for current user */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white; /* White text color */
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
