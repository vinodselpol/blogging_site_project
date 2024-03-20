import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, Paper, Avatar, Stack } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import FaceIcon from '@mui/icons-material/Face';
import DeleteIcon from '@mui/icons-material/Delete';

function Post({ post, postId, updatePosts, onDelete, isModerator }) {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleNewCommentChange = (event) => setNewComment(event.target.value);

  // const submitComment = () => {
  //   if (newComment.trim()) {
  //     const userName = localStorage.getItem('userName') || 'Anonymous';
  //     const userComment = { text: newComment, username: userName };
  //     const updatedPost = { ...post, comments: [...post.comments, userComment] };
  //     updatePosts(postId, updatedPost);
  //     setNewComment('');
  //   }
  // };

  const submitComment = async () => {
    if (newComment.trim()) {
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
            <Button onClick={submitComment} variant="contained" sx={{ mt: 1 }}>Comment</Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default Post;
