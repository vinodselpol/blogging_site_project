import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Switch, Divider, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    // Load accounts from Local Storage
    const loadedAccounts = JSON.parse(localStorage.getItem('users')) || [];
    setAccounts(loadedAccounts);
  }, []);

  const toggleAccountStatus = (email) => {
    const updatedAccounts = accounts.map(account => {
      if (account.email === email) {
        return { ...account, disabled: !account.disabled };
      }
      return account;
    });
  
    localStorage.setItem('users', JSON.stringify(updatedAccounts));
    setAccounts(updatedAccounts); // Update state to reflect changes
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: 4, textAlign: 'center' }}>
        Admin Dashboard
      </Typography>
      <Card raised sx={{ marginTop: 2 }}>
        <CardContent>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Users Info
          </Typography>
          <List>
            {accounts.map((account, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText primary={account.email} secondary={account.disabled ? 'Disabled' : 'Enabled'} />
                  <Switch
                    checked={!account.disabled}
                    onChange={() => toggleAccountStatus(account.email)}
                    color="primary"
                  />
                </ListItem>
                {index < accounts.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      <Button variant="contained" onClick={()=>navigate('/')} sx={{ marginBottom: 2, marginTop:3 }}>Back to Homepage</Button>


    </Container>
  );
}

export default AdminPanel;

