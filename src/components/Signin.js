import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signIn } from './auth';

function SignIn() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Authenticate user
    const user = users.find(user => user.email === formData.email && user.password === formData.password && !user.disabled);
    
    if (user) {
      console.log('User signed in:', formData);

      // Redirect to home page or dashboard here
      
      signIn();
      localStorage.setItem('userName', user.name);
      if (user.email.includes('@moderator.com')) {
        // If the user's email includes '@moderator.com', set them as a moderator.
        localStorage.setItem('isModerator', 'true');
      } else {
        // For any other email, ensure the user is not set as a moderator.
        localStorage.setItem('isModerator', 'false');
      }
      if (user.email.includes('@admin.com')) {
        // If the user's email includes '@moderator.com', set them as a moderator.
        localStorage.setItem('isAdmin', 'true');
      } else {
        // For any other email, ensure the user is not set as a moderator.
        localStorage.setItem('isAdmin', 'false');
      }

      navigate('/')
    } else {
      alert('Invalid email or password! or Admin has disabled your account');
    }
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign In Page
        </Typography>
        <form onSubmit={handleSubmit} style={{ mt: 3 }}>
          <Grid container spacing={2}>
           
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
        <Button fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'green', '&:hover': { bgcolor: 'darkgreen' } }} onClick={() => {
                navigate('/signup')
          ;
        }}> Don't Have an account ? Sign up </Button>
      </div>
    </Container>
  );
}

export default SignIn;
