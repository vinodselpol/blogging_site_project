import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import Footer from './Footer';

import Posts from './Posts'

const sections = [
  { title: 'Academic Resources', url: '#' },
  { title: 'Career Services', url: '#' },
  { title: 'Campus', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Local Community Resources', url: '#' },
  { title: 'Social', url: '#' },
  { title: 'Sports', url: '#' },
  { title: 'Health and Wellness', url: '#' },
  { title: 'Technology', url: '#' },
  { title: 'Travel', url: '#' },
  { title: 'Alumni', url: '#' },
];

const mainFeaturedPost = {
  title: 'Welcome to the blogging site',
  description:
    "Here you can find wide range of blogs related to various topics....",
  image: 'https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg', // https://source.unsplash.com/random?wallpapers
  imageText: 'main image description',
  linkText: 'Create your own Blog post here...',
};


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  const isAdmin = () => {
    // Implement logic to determine if the user is a moderator
    return localStorage.getItem('isAdmin') === 'true';

  };
  return (
    <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', margin: '0', padding: '0', overflowX: 'hidden' }}>
      <Header title="Blog" sections={sections} isAdmin={isAdmin()} />
      <Container maxWidth={false} disableGutters sx={{ flexGrow: 1, width: '100%', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Posts />
      </Container>
      <Footer />
    </div>
  </ThemeProvider>
  );
}
