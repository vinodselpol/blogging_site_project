// import React, { useState, useEffect } from 'react';
// import { Button, List, ListItem, ListItemText, Switch } from '@mui/material';

// function AdminPanel() {
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     // Load accounts from Local Storage
//     const loadedAccounts = JSON.parse(localStorage.getItem('users')) || [];
//     setAccounts(loadedAccounts);
//   }, []);

//   const toggleAccountStatus = (email) => {
//     // const accounts = JSON.parse(localStorage.getItem('users')) || [];
//     const updatedAccounts = accounts.map(account => {
//       if (account.email === email) {
//         return { ...account, disabled: !account.disabled };
//       }
//       return account;
//     });
  
//     localStorage.setItem('users', JSON.stringify(updatedAccounts));
//   };
  

//   const handleToggle = (email) => {
//     toggleAccountStatus(email);
//     // Refresh accounts list
//     setAccounts(JSON.parse(localStorage.getItem('users')) || []);
//   };

//   console.log(accounts)


//   return (
//     <List>
//       {accounts.map((account, index) => (
//         <ListItem key={index}>
//           <ListItemText primary={account.email} secondary={account.disabled ? 'Disabled' : 'Enabled'} />
//           <Switch
//             checked={!account.disabled}
//             onChange={() => handleToggle(account.email)}
//             color="primary"
//           />
//         </ListItem>
//       ))}
//     </List>
//   );
// }

// export default AdminPanel;


import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Switch, Divider, Container } from '@mui/material';

function AdminPanel() {
  const [accounts, setAccounts] = useState([]);

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
    </Container>
  );
}

export default AdminPanel;

