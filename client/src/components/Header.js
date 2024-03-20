// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Toolbar from '@mui/material/Toolbar';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
// import { useNavigate } from 'react-router-dom';

// function Header(props) {
//   const { sections, title, isAdmin } = props;
//   const navigate = useNavigate()
//   const isAuthenticated = () => {
//     return Boolean(localStorage.getItem('isAuthenticated'));
//   };

//   const signOut = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('userName');
    
//   };

//   const handleLogout = () => {
//     signOut(); // Update authentication status
//     navigate('/signin'); // Redirect to sign-in page or another appropriate page
//   };

  
 
//   return (
//     <React.Fragment>
//       <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Button size="small" variant="outlined" onClick={() => navigate('/createpost')}>Create a post </Button>
//         {isAdmin && (<Button size="small" variant="outlined" onClick={() => navigate('/admin')}>Admin controls </Button>)}
//         <Typography
//           component="h2"
//           variant="h5"
//           color="inherit"
//           align="center"
//           noWrap
//           sx={{ flex: 1 }}
//         >
//           {title}
//         </Typography>
//         <IconButton>
//           <SearchIcon />
//         </IconButton>
//         {isAuthenticated() ? (
//           <Button variant="outlined" size="small" onClick={handleLogout}>
//             Log out
//           </Button>
//         ) : (
//           <Button variant="outlined" size="small" onClick={() => navigate('/signup')}>
//             Sign up
//           </Button>
//         )}

//       </Toolbar>
//       <Toolbar
//         component="nav"
//         variant="dense"
//         sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
//       >
//         {sections.map((section) => (
//           <Link
//             color="inherit"
//             noWrap
//             key={section.title}
//             variant="body2"
//             href={section.url}
//             sx={{ p: 1, flexShrink: 0 }}
//           >
//             {section.title}
//           </Link>
//         ))}
//       </Toolbar>
//     </React.Fragment>
//   );
// }

// Header.propTypes = {
//   sections: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       url: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
//   title: PropTypes.string.isRequired,
// };

// export default Header;
import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Button, IconButton, Typography, Link, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  const { sections, title, isAdmin } = props;
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return Boolean(localStorage.getItem('isAuthenticated'));
  };

  const signOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
  };

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button size="small" variant="text" onClick={() => navigate('/createpost')} sx={{ marginRight: 2 }}>
            Create a post
          </Button>
          {isAdmin && (
            <Button size="small" variant="text" onClick={() => navigate('/admin')}>
              Admin controls
            </Button>
          )}
        </Box>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => {}} sx={{ marginRight: 2 }}>
            <SearchIcon />
          </IconButton>
          {isAuthenticated() ? (
            <Button variant="text" size="small" onClick={handleLogout}>
              Log out
            </Button>
          ) : (
            <Button variant="text" size="small" onClick={() => navigate('/signup')}>
              Sign up
            </Button>
          )}
        </Box>
      </Toolbar>
      <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'center', overflowX: 'auto' }}>
        {sections.map((section) => (
          // <Link
          //   color="inherit"
          //   noWrap
          //   key={section.title}
          //   variant="body2"
          //   href={section.url}
          //   sx={{ p: 1, flexShrink: 0, textDecoration: 'none' }}
          //   onClick={(e) => {
          //     e.preventDefault();
          //     navigate(section.url);
          //   }}
          // >
          //   {section.title}
          // </Link>
          // Import useNavigate from 'react-router-dom' is already there.

// In the Header component, update the onClick handler for each Link
<Link
  color="inherit"
  noWrap
  key={section.title}
  variant="body2"
  onClick={(e) => {
    e.preventDefault();
    navigate('/', { state: { topic: section.title } }); // Navigate to '/posts' with topic state
  }}
  sx={{ p: 1, flexShrink: 0, textDecoration: 'none', cursor: 'pointer' }}
>
  {section.title}
</Link>

        ))}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
