import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        topic: '',
        comments: [],
    });

    useEffect(() => {
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
        if (!formData.title || !formData.content || !formData.topic) {
            alert('Please fill in all fields, including selecting a topic.');
            return;
        }
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        posts.push(formData);
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        
        alert('Post created successfully!');
        setFormData({
            title: '',
            content: '',
            author: '',
            topic: '',
            comments: [],
        });
        navigate('/');
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card raised sx={{ p: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
                        Create a Blog Post
                    </Typography>
                    <form onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    name="title"
                                    fullWidth
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Topic</InputLabel>
                                    <Select
                                        value={formData.topic}
                                        label="Topic"
                                        onChange={handleChange}
                                        name="topic"
                                        required
                                    >
                                        {['Academic Resources', 'Career Services', 'Campus', 'Culture', 'Local Community Resources', 'Social', 'Sports', 'Health and Wellness', 'Technology', 'Travel', 'Alumni'].map((topic) => (
                                            <MenuItem key={topic} value={topic}>{topic}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}

export default CreateForm;

