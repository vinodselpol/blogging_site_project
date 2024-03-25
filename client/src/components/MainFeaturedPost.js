import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Link, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const BackgroundImageBox = styled(Box)(({ theme, backgroundimage }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.common.white,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundImage: `url(${backgroundimage})`,
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  display: 'flex', 
  flexDirection: 'column',
  justifyContent: 'center', 
  alignItems: 'center', 
}));

function MainFeaturedPost({ post }) {
  const navigate = useNavigate();
  return (
    <Paper elevation={0} square style={{ width: '100%', height:'90vh', overflow: 'hidden' }}>
      <BackgroundImageBox backgroundimage={post.image}>
        <Box sx={{ position: 'relative', p: { xs: 3, md: 6 }, pr: { md: 0 } }}>
          <Typography component="h1" variant="h3" color="black" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="h5" color="black" paragraph>
            {post.description}
          </Typography>
          <Link variant="subtitle1" href="/createpost" underline="hover" sx={{ color: 'black' }}>
            {post.linkText}
          </Link>
        </Box>
        <Box display={'flex'} justifyContent="space-between" sx={{ p: 2, m: 1, gap: '20px' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          color: 'white', // Text color
          bgcolor: 'purple', // Button background color
          borderRadius: '10px',
          px: '20px',
          py: '7px',
          boxShadow: 1,
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: 'primary.dark', // Darken the button on hover for better contrast
            boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)',
          },
          '&:active': {
            transform: 'scale(0.9)',
          },
          transition: 'all 0.15s ease-in-out',
        }}
        onClick={() => navigate('/createpost')}
      >
        Create a Blog
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
          color: 'white', // Adjusting the color scheme for consistency
          bgcolor: 'purple', // Ensuring visual harmony
          borderRadius: '10px',
          px: '20px',
          py: '7px',
          boxShadow: 1,
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: 'primary.dark', // Ensures the button darkens on hover
            boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)',
          },
          '&:active': {
            transform: 'scale(0.9)',
          },
          transition: 'all 0.15s ease-in-out',
        }}
        onClick={() => navigate('/chatbot')}
      >
        Talk to AI Agent
      </Button>
    </Box>
       
       
      </BackgroundImageBox>
    </Paper>
  );
}


MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;

