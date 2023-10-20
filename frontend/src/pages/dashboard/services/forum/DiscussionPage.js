import { Box, Button, FormControl, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Textarea from "@mui/joy/Textarea";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Sidebar from "../../components/Sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";

function DiscussionPage({ match }) {
  const url = useLocation();
  const discussionId = url.pathname.split("/")[3];
  const discussionDetails = localStorage.getItem("discussion_details");
  let currentDiscussion = JSON.parse(discussionDetails);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/forum/getPosts/${discussionId}`
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, [discussionId]);

  const [posts, setPosts] = useState([]);

  const [replyText, setReplyText] = useState("");

  const handleChange = (e) => {
    setReplyText(e.target.value);
    console.log(replyText);
  };

  const handleSubmit = () => {
    // Create a new post object
    const createPost = async () => {
      try {
        const response = await axios.post(
          `http://localhost:4000/api/forum/createPost`,
          {
            content: replyText,
            discussionId: discussionId,
            creatorToken: localStorage.getItem("token"),
          }
        );
        const newPost = {
          id: posts.length + 1,
          author: response.data.author,
          content: response.data.content,
        };

        const updatedPosts = [...posts, newPost];
        setPosts(updatedPosts);
        currentDiscussion.posts.push(newPost);
        currentDiscussion.lastPostBy = newPost.author;
        localStorage.setItem(
          "discussion_details",
          JSON.stringify(currentDiscussion)
        );
        setReplyText("");
      } catch (error) {
        console.log(error);
      }
    };
    createPost();
  };

  // const handleUpvote = (postId) => {
  //   if (upvotedPosts.includes(postId)) {
  //     return;
  //   }
  //   // Find the post with the given postId in the posts array
  //   const updatedPosts = posts.map((post) => {
  //     if (post.id === postId) {
  //       // Increment the upvotes by one
  //       updatedPosts.push(postId);
  //       return {
  //         ...post,
  //         upvotes: post.upvotes + 1,
  //       };
  //     }
  //     return post; // For other posts, return them as they are
  //   });

  //   // Update the state with the new posts array
  //   setPosts(updatedPosts);
  // };

  return (
    <Container>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <DiscussionWrapper>
        <DiscussionInfo>
          <DiscussionTitle>
            Discussion: {currentDiscussion.title}
          </DiscussionTitle>
          <p>
            Started by: <span>{currentDiscussion.creator}</span>{" "}
          </p>
          <p>
            Lasy Post by: <span>{currentDiscussion.lastPostBy}</span>
          </p>
          <p>
            No of Posts: <span>{currentDiscussion.posts.length}</span>
          </p>
        </DiscussionInfo>

        <div>
          {/* Display discussion posts */}
          {posts.map((post, i) => (
            <PostWrapper key={i}>
              <PostAuthor>
                <AccountCircleIcon fontSize="large" /> {post.author}
              </PostAuthor>
              <PostContent>{post.content}</PostContent>
              {/* <Upvote>
              <IconButton
              aria-label="Upvote"
              onClick={() => handleUpvote(post.id)}
              >
              <ThumbUpIcon fontSize="small" />
              </IconButton>
              <h6>{post.upvotes}</h6>
            </Upvote> */}
            </PostWrapper>
          ))}
          <ReplyContainer>
            <FormControl sx={{ width: "100%" }}>
              <h5>Add a reply</h5>
              <Textarea
                sx={{
                  margin: "0 auto",
                  width: "100%", // Initially set to 100% width
                  "@media screen and (max-width: 768px)": {
                    padding: "0.4rem",
                    width: "100%", // Adjust width for smaller screens
                  },
                }}
                placeholder="Type your reply here…"
                value={replyText}
                onChange={handleChange}
                minRows={3}
                endDecorator={
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      gap: "var(--Textarea-paddingBlock)",
                      pt: "var(--Textarea-paddingBlock)",
                      borderTop: "1px solid",
                      borderColor: "divider",
                      flex: "auto",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ ml: "auto" }}
                      onClick={handleSubmit}
                    >
                      Send
                    </Button>
                  </Box>
                }
              />
            </FormControl>
          </ReplyContainer>
        </div>
      </DiscussionWrapper>
    </Container>
  );
}

export default DiscussionPage;
const Container = styled.div`
  display: flex;
`;
const SidebarContainer = styled.div`
  flex: 1;
`;

const DiscussionWrapper = styled.div`
  flex: 8;
  background-color: #f7f7f7;
  padding: 40px;
`;

const DiscussionTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const DiscussionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 16px;
  width: 70%;
  margin: 0 auto;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  span {
    color: #007bff;
    font-weight: bold;
  }
`;

const PostWrapper = styled.div`
  background-color: #ffffff;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Left-align items */
  margin: 0 auto;
  padding: 15px;
  border-radius: 0.5rem;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const PostAuthor = styled.h3`
  gap: 0.2rem;
  font-size: 18px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* justify-content: flex-start; */ /* Remove this line to allow natural left alignment */
`;

const PostContent = styled.p`
  font-size: 16px;
  text-align: left; /* Add this property for left alignment */
  margin-left: 0.4rem;
  margin-top: 0.3rem;
`;

const Upvote = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  h6 {
    margin-left: 0.3rem;
    margin-top: 0.4rem;
  }
`;

const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-align: left;
  border-radius: 0.5rem;
  width: 70%;
  background-color: #ffffff; /* White background color */
  padding: 1rem; /* Add some padding for spacing */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a box shadow */
  margin: 2rem auto; /* Center horizontally */
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
