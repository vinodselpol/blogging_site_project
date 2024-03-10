import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import Post from './Post'; // Make sure the path is correct

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    setPosts(storedPosts);
  }, []);

  const handleLike = (index) => {
    console.log(`Like post ${index}`);
    // Implement like functionality
  };

  const handleComment = (index) => {
    console.log(`Comment on post ${index}`);
    // Implement comment functionality
  };
  const updatePosts = (postId, updatedPost) => {
    const updatedPosts = posts.map((post, index) => 
      index === postId ? updatedPost : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((_, index) => index !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  };

  const isModerator = () => {
    // Implement logic to determine if the user is a moderator
    return localStorage.getItem('isModerator') === 'true';

  };
  

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Blog Posts
      </Typography>
      {posts.length > 0 ? (
        posts.map((post, index) => (
            <Post key={index} post={post} postId={index} updatePosts={updatePosts}  onDelete={handleDeletePost}
            isModerator={isModerator()} />
        ))
      ) : (
        <Typography variant="body1">No posts available.</Typography>
      )}
    </Container>
  );
}

export default Posts;
