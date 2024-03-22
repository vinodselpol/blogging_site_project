import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, IconButton, Paper, Avatar, Stack, Switch } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import FaceIcon from '@mui/icons-material/Face';
import DeleteIcon from '@mui/icons-material/Delete';

function Post({ post, postId, updatePosts, onDelete, isModerator }) {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [autoCommentEnabled, setAutoCommentEnabled] = useState(false);
  const [generatedComment, setGeneratedComment] = useState('');

  const handleNewCommentChange = (event) => setNewComment(event.target.value);

  const fetchGeneratedComment = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/blog/generatecomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: post._id }),
      });
  
      const data = await response.json();
      setGeneratedComment(data.trimmedComment);
      setNewComment(data.trimmedComment); // Automatically set the new comment to the generated one
    } catch (error) {
      console.error('Error fetching generated comment:', error);
    }
  };

  useEffect(() => {
    if (autoCommentEnabled) {
      fetchGeneratedComment();
    }
  }, [autoCommentEnabled]);


 
  

  const submitComment = async () => {
    const commentToSubmit = newComment.trim() || generatedComment.trim();
    if (commentToSubmit) {
      const userName = localStorage.getItem('userName') || 'Anonymous';
      const userComment = { text: newComment, userName: userName , _id: post._id};
      const res = await fetch('http://localhost:8000/api/blog/comment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userComment),
      });
      const data = await res.json();
      updatePosts(postId, data);
      setNewComment('');
      setGeneratedComment(''); 
      setAutoCommentEnabled(false);
    }
  }

  return (
    <Paper elevation={3} sx={{ my: 2, p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main" }}><FaceIcon /></Avatar>
          <Typography fontWeight="bold" variant="subtitle1">{post.author}</Typography>
        </Stack>
        {isModerator && (
          <IconButton onClick={() => onDelete(post._id, postId)} aria-label="delete" color="error">
            <DeleteIcon />
          </IconButton>
        )}
      </Box>

      <Typography variant="h6" gutterBottom>{post.title}</Typography>
      <Typography variant="body1" paragraph>{post.content}</Typography>

      <Box mt={2}>
        <Button startIcon={<CommentIcon />} onClick={() => setShowComments(!showComments)}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </Button>
        {showComments && (
          <Box mt={2}>
            {post.comments.length ? (
              post.comments.map((comment, index) => (
                <Stack key={index} direction="row" spacing={2} alignItems="center" mt={1}>
                  <Avatar sx={{ bgcolor: "secondary.main" }}><FaceIcon /></Avatar>
                  <Typography variant="body2" fontWeight="bold">{comment.userName}:</Typography>
                  <Typography variant="body2">{comment.text}</Typography>
                </Stack>
              ))
            ) : (
              <Typography mt={1}>No comments yet.</Typography>
            )}
            
            
            <TextField
              fullWidth
              variant="outlined"
              label="Add a comment"
              value={newComment}
              onChange={handleNewCommentChange}
              margin="normal"
            />
            
            {/* <Box mt={2} display="flex" alignItems="center" gap={2}>
            <Button onClick={submitComment} variant="contained" sx={{ mt: 1, py: '6px', fontSize: '0.875rem' }}>
  Submit Comment
</Button>
<Box
  display="flex"
  alignItems="center"
  sx={{
    margin: '20px 0',
    padding: '8px 10px', // Adjust padding to visually align with the button's height
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#f5f5f5',
  }}
>
  <Typography
    mr={1}
    sx={{
      fontWeight: 'bold',
      color: '#333',
      fontSize: '0.875rem', // Adjust font size to match the button's text size if necessary
    }}
  >
    Auto-generate comment:
  </Typography>
  <Switch
    checked={autoCommentEnabled}
    onChange={(e) => setAutoCommentEnabled(e.target.checked)}
    sx={{
      // No additional height adjustment here; rely on the Box's padding and content size
    }}
  />
</Box>
              
            </Box> */}
            <Box mt={2} display="flex" alignItems="center" gap={2}>
  <Button onClick={submitComment} variant="contained" sx={{ py: '10px', fontSize: '0.875rem' }}>
    Submit Comment
  </Button>
  <Box
    display="flex"
    alignItems="center"
    sx={{
      padding: '4px', // Adjust padding to visually align with the button's height
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      backgroundColor: 'lightblue',
      height: '100%', // Make Box fill the height to match the button vertically if necessary
    }}
  >
    <Typography
      sx={{
        fontWeight: 'bold',
        color: '#333',
        fontSize: '0.875rem', // Ensure the text matches the button's font size
      }}
    >
      Auto-generate comment:
    </Typography>
    <Switch
      checked={autoCommentEnabled}
      onChange={(e) => setAutoCommentEnabled(e.target.checked)}
    />
  </Box>
</Box>


          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default Post;
