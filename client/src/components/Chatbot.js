import React, { useState, useRef, useEffect } from 'react';
import { Button, Box, Typography, TextField, Container, Avatar, Chip, AppBar, Toolbar, IconButton} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    <Box sx={{ width: '100%' }}>
    <Container maxWidth="sm" disableGutters sx={{ bgcolor: '#f5f5f5', height: '70vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" sx={{ bgcolor: '#2196f3', width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}>
            Chat with AI Agent
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ position: 'absolute', right: 15 }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }} ref={chatboxRef}>
      {messages.map((msg, index) => (
        <Box key={index} sx={{
          display: 'flex',
          flexDirection: msg.role === 'ai' ? 'row-reverse' : 'row',
          mb: 2,
          alignItems: 'flex-start',
        }}>
          <Avatar sx={{
            bgcolor: msg.role === 'ai' ? '#2196f3' : '#e0e0e0',
            order: msg.role === 'ai' ? 2 : 1,
          }}>
            {msg.role === 'ai' ? <ComputerIcon /> : <PersonIcon />}
          </Avatar>
          <Box sx={{
            order: msg.role === 'ai' ? 1 : 2,
            bgcolor: msg.role === 'ai' ? '#e3f2fd' : '#f5f5f5',
            p: 1,
            borderRadius: '20px',
            ml: 1,
            mr: 1,
            maxWidth: 'calc(100% - 48px)', // account for avatar size
            alignSelf: 'flex-start',
            wordBreak: 'break-word',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Typography variant="body1">
              {msg.content}
            </Typography>
            {msg.options && (
              <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {msg.options.map((option, idx) => (
                  <Chip
                    key={idx}
                    label={option}
                    onClick={() => handleOptionClick(option)}
                    sx={{
                      mb: 1,
                      mr: 1,
                      bgcolor: '#2196f3',
                      color: 'white',
                      whiteSpace: 'normal', // Allows the text to wrap within the Chip
                      maxWidth: '100%', // Ensures the Chip doesn't exceed its container's width
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{ 
      bgcolor: 'transparent',
      px: 2, 
      py: 2, 
      display: 'flex',
      alignItems: 'center',
      width: '100%', 
      boxSizing: 'border-box', 
    }}
  >
    <TextField
      fullWidth
      placeholder="Type your question..."
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      sx={{ 
        mr: 1, 
        borderRadius: '20px', 
        '& .MuiOutlinedInput-root': { borderRadius: '20px' } 
      }}
    />
    <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '20px' }}>
      Ask
    </Button>
  </Box>
</Container>
</Box>
  );
};

export default Chatbot;




