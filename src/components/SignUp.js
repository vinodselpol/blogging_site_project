import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    disabled: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some(user => user.email === formData.email);

    if (userExists) {
      alert('User already exists with this email!');
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    alert('User signed up, Now please log in');
    navigate('/signin');
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Card elevation={3}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
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
              Sign Up
            </Button>
          </form>
          <Button fullWidth
              variant="outlined"
              sx={{ mt: 2, mb: 2 }} onClick={() => navigate('/signin')}>
              Have an account? Login Instead
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SignUp;
