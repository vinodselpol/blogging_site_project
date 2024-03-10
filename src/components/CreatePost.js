import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateForm() {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    comments: []
  });

  useEffect(() => {
    // Fetch the signed-in user's name from Local Storage and set it as the author
    const userName = localStorage.getItem('userName');
    if (userName) {
      setFormData(formData => ({ ...formData, author: userName }));
    }
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!formData.title || !formData.content) {
      alert('Please fill in all fields.');
      return;
    }
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.push(formData);
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    
    console.log('Form Data Submitted:', formData);
    alert('Post created successfully!');

    // Reset form fields
    setFormData({
      title: '',
      content: '',
      author: formData.author
    });
    //navigate to the home page
    navigate('/')

   
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create a Blog Post
      </Typography>
      
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          fullWidth
          required
          value={formData.title}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Content"
          variant="outlined"
          name="content"
          fullWidth
          required
          multiline
          rows={4}
          value={formData.content}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
          Submit
        </Button>
      </form>
      <Button onClick={()=>navigate('/')} type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
          Cancel
        </Button>
    
    </Container>
  );
}

export default CreateForm;
