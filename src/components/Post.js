import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, ButtonGroup, Paper, Avatar, Container } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import FaceIcon from '@mui/icons-material/Face';
import DeleteIcon from '@mui/icons-material/Delete';

function Post({ post, postId, updatePosts,onDelete, isModerator }) {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

const submitComment = () => {
    if (newComment.trim()) {
      // Retrieve the userName from Local Storage
      const userName = localStorage.getItem('userName');
  
      // Check if userName exists, otherwise set a default or anonymous value
      const userComment = {
        text: newComment,
        username: userName || 'Anonymous', // Use the retrieved userName or default to 'Anonymous'
      };
  
      const updatedPost = { ...post, comments: [...post.comments, userComment] };
      updatePosts(postId, updatedPost);
      setNewComment('');
    }
  };
  

  return (
    
    <Paper elevation={3} sx={{ marginBottom: 2, padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main" }}><FaceIcon /></Avatar>
          <Typography sx={{ marginLeft: 2, fontWeight: 'bold', fontSize: '1.2rem' }}>
            {post.author}
          </Typography>
        </Box>
        {isModerator && (
          <IconButton onClick={() => onDelete(postId)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        )}
      </Box>

      <Typography variant="h5">{post.title}</Typography>
      <Typography sx={{ marginTop: 2 }}>{post.content}</Typography>

      <Box marginTop={2}>
        <ButtonGroup>
          <IconButton onClick={() => setShowComments(!showComments)}>
            <CommentIcon />
          </IconButton>
        </ButtonGroup>

        {showComments && (
          <Box sx={{ marginTop: 2 }}>
            {post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <Box key={index} display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                  <Avatar sx={{ bgcolor: "secondary.main", marginRight: 1 }}>
                    <FaceIcon />
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: 1 }}>
                    {comment.username}:
                  </Typography>
                  <Typography variant="body2">
                    {comment.text}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>No comments yet.</Typography>
            )}

            <TextField
              fullWidth
              variant="outlined"
              label="Add a comment"
              value={newComment}
              onChange={handleNewCommentChange}
              sx={{ marginTop: 2 }}
            />
            <Button onClick={submitComment} variant="contained" sx={{ marginTop: 1 }}>
              Comment
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
    
  );
}

export default Post;
