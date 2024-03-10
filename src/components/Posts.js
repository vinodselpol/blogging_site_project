import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Post from './Post'; // Make sure the path is correct
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate()
  const topic = location.state?.topic;

//   useEffect(() => {
//     const storedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
//     setPosts(storedPosts);
//   }, []);

//   const handleLike = (index) => {
//     console.log(`Like post ${index}`);
//     // Implement like functionality
//   };

useEffect(() => {
    const loadedPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    // Check if there's a topic selected (passed via state)
    
    
    if (topic) {
      const filteredPosts = loadedPosts.filter(post => post.topic === topic);
      setPosts(filteredPosts);
    } else {
      setPosts(loadedPosts); // No topic selected, use all posts
    }
  }, [topic]);

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

  const handleShowAllPosts = () => {
    navigate('/', { replace: true, state: {} }); // Navigate without a topic to reset the filter
  };
  
  const headingText = topic ? `Blog Posts in ${topic}` : "All Blog Posts";

  return (
    <Container maxWidth="md">
      {/* <Typography variant="h4" component="h1" gutterBottom>
        Blog Posts
      </Typography> */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4">{headingText}</Typography>
        {topic && (
          <Button variant="outlined" onClick={handleShowAllPosts}>Show All Posts</Button>
        )}

      </Box>
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
