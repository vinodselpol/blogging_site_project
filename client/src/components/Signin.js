
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signIn } from './auth';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const users = JSON.parse(localStorage.getItem('users') || '[]');
  //   const user = users.find(user => user.email === formData.email && user.password === formData.password && !user.disabled);

  //   if (user) {
  //     signIn(); // Assuming signIn function sets authentication status
  //     localStorage.setItem('userName', user.name);
  //     localStorage.setItem('isModerator', user.email.includes('@moderator.com') ? 'true' : 'false');
  //     localStorage.setItem('isAdmin', user.email.includes('@admin.com') ? 'true' : 'false');

  //     navigate('/');
  //   } else {
  //     alert('Invalid email or password, or your account may be disabled.');
  //   }
  // };

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      // dispatch(signInSstart())
      const res = await fetch('http://localhost:8000/api/auth/signin', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data)
     
      // dispatch(signInSuccess(data))
      //navigate to sign in page is not working

      if (data) {
        signIn()
        navigate('/')
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('isModerator', data.email.includes('@moderator.com') ? 'true' : 'false');
        localStorage.setItem('isAdmin', data.email.includes('@admin.com') ? 'true' : 'false');
      }


    } catch (error) {
      
      // dispatch(signInFailure(error.message))
      alert('Invalid userName or password or account may be disabled.')
      console.log(error)
      // alert(error.message)
      
    }
 
  }

 


  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Card elevation={3}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
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
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2, mb: 2 }}
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign Up
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SignIn;

