import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, Box, Card, CardContent, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';

function CreateForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        topic: '',
        comments: [],
    });
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if(!formData.title || !formData.content || !formData.topic) {
                alert('Please fill in all fields, including selecting a topic.')
                return
            }

            const res = await fetch('http://localhost:8000/api/blog/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            })
            const data = await res.json()
            console.log(data)
            // alert('Post created successfully!');
            setShowSuccessAlert(true);
            setFormData({
                  title: '',
                  content: '',
                  author: '',
                  topic: '',
                  comments: [],
            });

            setTimeout(() => {
                navigate('/'); // Adjust the path if your homepage has a different path
            }, 5000);
        // navigate('/');
        } catch (error) {
            // setError(true)
            console.log(error)
        }

    }

    console.log("The alert is on: ", showSuccessAlert)
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
              {showSuccessAlert ? (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ mb: 2 }}>
                    Post created successfully!
                </Alert>
            ) : (
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
    )}
        </Container>
    );
}

export default CreateForm;

