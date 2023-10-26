import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const scrollRef = useRef();
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msg]);

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          // ref={scrollRef}
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button onSubmit={(e) => e.preventDefault()} type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #ced5e1; /* Blue background color */
  padding: 0 2rem;
  width: 100%;
  border-radius: 2rem 0 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white; /* White text color */
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: grey; /* Grey color emoji selector*/
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -500px;
        background-color: #ced5e1; /* Blue background color */
        box-shadow: 0 5px 10px #b0bbcf;
        border-color: #b0bbcf;
        .epr-body::-webkit-scrollbar {
          width: 5px;
          background-color: #b0bbcf; /* Blue background color */
        }

        .epr-body::-webkit-scrollbar-thumb {
          background-color: #303c4f;
        }
        .epr-emoji-category-label {
          background-color: #ced5e1; /* Blue background color */
          button {
            filter: contrast(0);
          }
        }
        .epr-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #ced5e1; /* Blue background color */
        }
      }
    }
    @media screen and (min-width: 300px) and (max-width: 720px) {
      gap: 0.5rem;
      margin-left: -1rem;
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: white; /* Light blue background color */

    input {
      width: 90%;
      height: 2rem; /* Adjust the height as needed */
      background-color: transparent;
      color: black; /* White text color */
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
      @media screen and (max-width: 720px) {
        gap: 0.5rem;
        margin-right: -2rem;
      }
    }

    button {
      margin-left: 1rem;
      padding: 0.3rem 1.2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: grey; /* Blue background color */
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      @media screen and (max-width: 720px) {
        gap: 0.5rem;
        margin-right: -1rem;
      }
      svg {
        font-size: 2rem;
        color: white; /* White text color */
      }
    }
  }
`;
