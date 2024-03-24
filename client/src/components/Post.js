import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, IconButton, Paper, Avatar, Stack, Switch, Grid } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import FaceIcon from '@mui/icons-material/Face';
import DeleteIcon from '@mui/icons-material/Delete';
import { deepOrange, deepPurple } from '@mui/material/colors';
import moment from 'moment';

function Post({ post, postId, updatePosts, onDelete, isModerator }) {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [autoCommentEnabled, setAutoCommentEnabled] = useState(false);
  const [generatedComment, setGeneratedComment] = useState('');

  const handleNewCommentChange = (event) => setNewComment(event.target.value);

  const handleAutoCommentToggle = (checked) => {
    setAutoCommentEnabled(checked);
    if (!checked) {
      setNewComment(''); // Clear the input field when auto-generate is disabled
    }
  };


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
<Paper elevation={10} sx={{ my: 2, p: 2, borderRadius: 3, background:'transparent'}}>
<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
  <Stack direction="row" spacing={2} alignItems="center">
    <Avatar sx={{ bgcolor: deepOrange[500] }}>
      {post.author.charAt(0).toUpperCase()}
    </Avatar>
    <Box display="flex" alignItems="center">
      <Typography fontWeight="bold" variant="subtitle1" noWrap>
        {post.author.toUpperCase()}
      </Typography>
      <Typography variant="caption" color="text.secondary" noWrap>
        &nbsp;·&nbsp;{moment(post.createdAt).fromNow()}
      </Typography>
    </Box>
    <Box sx={{ width: '100%', height: '1px', backgroundColor: 'primary.main' }} />
  </Stack>
  {isModerator && (
    <IconButton
      onClick={() => onDelete(post._id, postId)}
      aria-label="delete"
      color="error"
    >
      <DeleteIcon />
    </IconButton>
  )}
</Box>
  <Typography variant="h6" gutterBottom>
    {post.title}
  </Typography>
  <Typography variant="body1" paragraph>
    {post.content}
  </Typography>
  <Box sx={{ width: '100%', height: '1px', backgroundColor: 'primary.main', my: 2 }} />
  <Box mt={2}>
    <Button
      startIcon={<CommentIcon />}
      onClick={() => setShowComments(!showComments)}
      variant="contained"
      color="primary"
      sx={{ borderRadius: 2 }}
    >
      {showComments ? 'Hide Comments' : 'Show Comments'}
    </Button>
    {showComments && (
      <Box mt={2}>
        {post.comments.length ? (
          post.comments.map((comment, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              alignItems="center"
              mt={1}
              sx={{ borderBottom: '1px solid', borderColor: 'primary.main', pb: 1 }}
            >
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                {comment.userName.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2" fontWeight="bold">
                {comment.userName}:
              </Typography>
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
          sx={{ my: 2 }}
        />
        <Box mt={2} display="flex" alignItems="center" gap={2}>
          <Button
            onClick={submitComment}
            variant="contained"
            color="primary"
            sx={{ py: '10px', fontSize: '0.875rem', borderRadius: 2, height: '40px' }}
          >
            Submit Comment
          </Button>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              padding: '4px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              backgroundColor: '#e6ee9c',
              height: '40px',
              color: '#333'
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}
            >
              AI COMMENT:
            </Typography>
            <Switch
              checked={autoCommentEnabled}
              onChange={(e) => handleAutoCommentToggle(e.target.checked)}
              sx={{ color: 'white' }}
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
