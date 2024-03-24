import React, { useState, useRef, useEffect } from 'react';
import { Button, Box, Typography, TextField, Container, Avatar, Chip, AppBar, Toolbar} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    // AI's initial message with options
    { 
      role: 'ai', 
      content: "How can I assist you today?", 
      options: [
        "Where am I located right now?", 
        "What's the weather like at my location", 
        "Please suggest some activities to do based on my location and the current weather."
      ] 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const chatboxRef = useRef(null);

    const handleOptionClick = async (option) => {
    setMessages(prev => [...prev, { role: 'user', content: option }]);

    const queryParams = new URLSearchParams({ query: option });
    const response = await fetch(`http://localhost:8000/api/agent/askagent?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setMessages(prev => [...prev, { role: 'ai', content: data }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    await handleOptionClick(userInput);
    setUserInput('');
  };

  useEffect(() => {
    // Auto-scroll to the latest message
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container maxWidth="sm" sx={{ bgcolor: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <AppBar position="sticky" sx={{ bgcolor: '#2196f3'}}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}>
            Chat with AI Agent
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }} ref={chatboxRef}>
      {messages.map((msg, index) => (
  <Box key={index} sx={{
    position: 'relative', // Relative positioning for the container
    display: 'flex',
    justifyContent: 'flex-start',
    mb: 2,
    width: '100%', // Full width of the container
    ...(msg.role === 'ai' && {
      justifyContent: 'flex-end' // Align AI messages to the end (right)
    })
  }}>
    <Box sx={{
      bgcolor: msg.role === 'ai' ? '#e3f2fd' : '#f5f5f5',
      p: 1,
      borderRadius: '20px',
      maxWidth: '80%',
      wordBreak: 'break-word',
      ...(msg.role === 'ai' && {
        mr: '3rem', // Reserve space for the avatar
      })
    }}>
      <Typography variant="body1">
        {msg.content}
      </Typography>
      {msg.options && (
        <Box sx={{ mt: 1 }}>
          {msg.options.map((option, idx) => (
            <Chip key={idx} label={option} onClick={() => handleOptionClick(option)} 
                  sx={{ mb: 1, cursor: 'pointer', bgcolor: '#2196f3', color: 'white' }} />
          ))}
        </Box>
      )}
    </Box>
    {msg.role === 'ai' && (
      <Avatar sx={{
        bgcolor: '#2196f3',
        position: 'absolute', // Absolute positioning for the avatar
        right: '0', // Align to the right
        top: '50%',
        transform: 'translateY(-50%)', // Center vertically
      }}>
        <ComputerIcon />
      </Avatar>
    )}
    
  </Box>
))}
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'white', p: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="Type your question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          sx={{ mr: 1, borderRadius: '20px', '& .MuiOutlinedInput-root': { borderRadius: '20px' } }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '20px' }}>
          Ask
        </Button>
      </Box>
    </Container>
  );
};

export default Chatbot;




