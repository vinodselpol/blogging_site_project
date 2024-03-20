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
    "Here you can find wide range of blogs related various topics....",
  image: 'https://source.unsplash.com/random?wallpapers',
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
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} isAdmin={isAdmin()} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
         
          < Posts />
         
        </main>
      </Container>
      <Footer
        title="Blogging Platform"
        description="Create and Read Amazing Blogs here!!!!!!"
      />
    </ThemeProvider>
  );
}
