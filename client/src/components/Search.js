import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {  Typography, Paper, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const searchQuery = location.state?.query; // Retrieve the search query passed via state
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); // State to store search results

  useEffect(() => {
    // Function to fetch search results using a POST request
    const fetchResults = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/blog/searchblog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: searchQuery }), // Pass the search term in the request body
        });

        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data = await response.json();
        setResults(data); // Assuming the API returns an array of results
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        setResults([]); // Handle error or indicate to the user that the search failed
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [searchQuery]); // Re-run the effect if the search query changes

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Search Results for "{searchQuery}"
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Home
        </Button>
      </div>
      {results.length > 0 ? (
        results.map((result, index) => (
          <Paper elevation={2} style={{ margin: '20px 0', padding: '15px' }} key={index}>
            <Typography variant="h6" component="h2">
              {result.title}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Author: {result.author}
            </Typography>
            <Divider style={{ margin: '10px 0' }} />
            <Typography variant="body1" component="p">
              {result.content}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant="subtitle1">No results found.</Typography>
      )}
    </div>
  );
}

export default Search;
