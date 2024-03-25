import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, IconButton, Paper, Avatar, Stack, Switch, Grid, Modal } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import FaceIcon from '@mui/icons-material/Face';
import DeleteIcon from '@mui/icons-material/Delete';
import { deepOrange, deepPurple } from '@mui/material/colors';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';

function generateGradient(post) {
  // Simple hash function to get a number from post ID
  const hash = post.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const startColor = `hsl(${hash % 360}, 70%, 80%)`;
  const endColor = `hsl(${(hash * 2) % 360}, 70%, 60%)`;

  return `linear-gradient(135deg, ${startColor}, ${endColor})`;
}


function Post({ post, postId, updatePosts, onDelete, isModerator }) {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [autoCommentEnabled, setAutoCommentEnabled] = useState(false);
  const [generatedComment, setGeneratedComment] = useState('');
  const [openModal, setOpenModal] = useState(false);

 

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
  const backgroundStyle = { backgroundImage: generateGradient(post._id.toString()) };

  return (
    <Paper elevation={2} sx={{ 
      my: 2, 
      borderRadius: 3, 
      overflow: 'hidden', 
      border: '1px solid #e0e0e0', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Smooth transition for transform and shadow
      ':hover': {
        transform: 'scale(1.03)', // Slightly scale up the post
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)', // Enhanced shadow effect on hover
      },
    }}>
  <Box
    sx={{
      height: 200,
      backgroundColor: backgroundStyle, // This would be replaced with an actual image later
    }}
  />
  {/* Content Area with Fixed Max Height and Scrollbar */}
  <Box sx={{ p: 3, overflow: 'auto', flexGrow: 1}}>
    <Typography variant="caption" display="block" gutterBottom color="primary" textTransform="uppercase">
      {post.topic}
    </Typography>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      {post.title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {post.content}
    </Typography>
  </Box>

  {/* Author Information */}
  <Box sx={{ px: 3, pb: 2 }}>
    <Typography fontWeight="normal" variant="subtitle2" color="text.secondary" gutterBottom>
      Author
    </Typography>
    <Box display="flex" alignItems="center">
      <Avatar sx={{ bgcolor: deepOrange[500], width: 30, height: 30 }}>
        {post.author.charAt(0).toUpperCase()}
      </Avatar>
      <Typography fontWeight="normal" variant="subtitle2" sx={{ ml: 2 }} noWrap>
        {post.author.toUpperCase()}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }} noWrap>
        - {moment(post.createdAt).fromNow()}
      </Typography>
    </Box>
  </Box>

  {/* Moderator's delete button */}
  {isModerator && (
    <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
      <IconButton
        onClick={() => onDelete(post._id, postId)}
        aria-label="delete"
        size="small"
        sx={{ bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }}
      >
        <DeleteIcon fontSize="inherit" sx={{ color: '#fff' }} />
      </IconButton>
    </Box>
  )}

  {/* <Box sx={{ width: '100%', height: '1px', backgroundColor: 'primary.main', my: 2 }} /> */}
  <Box mt={2} ml={3} mb={2}>
        <Button
          startIcon={<CommentIcon />}
          onClick={() => setShowComments(!showComments)}
          variant="outlined"
          color="primary"
          sx={{ borderRadius: 2, textTransform: 'none', py: 1 }}
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </Button>
      </Box>
{showComments && (
  <Box mt={3} px={3} pb={2} sx={{ maxHeight: 300, overflow: 'auto' }}>
    {post.comments.length ? (
      post.comments.map((comment, index) => (
        <Paper
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            mb: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>
            {comment.userName.charAt(0).toUpperCase()}
          </Avatar>
          <Box flexGrow={1}>
            <Typography variant="body2" fontWeight="bold" color="primary.main">
              {comment.userName.toUpperCase()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {comment.text}
            </Typography>
          </Box>
        </Paper>
      ))
    ) : (
      <Typography color="text.secondary">No comments yet.</Typography>
    )}
    <TextField
      fullWidth
      variant="filled"
      label="Add a comment"
      value={newComment}
      onChange={handleNewCommentChange}
      margin="normal"
      sx={{ my: 2, '.MuiFilledInput-root': { bgcolor: 'background.paper' } }}
    />
    <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
      <Button
        onClick={submitComment}
        variant="contained"
        color="primary"
        sx={{ textTransform: 'none', borderRadius: 2, height: '40px' }}
      >
        Submit Comment
      </Button>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: '4px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          backgroundColor: '#f0f0f0',
          color: '#333'
        }}
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: '0.875rem', mr: 1 }}>
          AI Comment:
        </Typography>
        <Switch
          checked={autoCommentEnabled}
          onChange={(e) => handleAutoCommentToggle(e.target.checked)}
        />
      </Box>
    </Box>
  </Box>
)}

</Paper>
  );
}

export default Post;


