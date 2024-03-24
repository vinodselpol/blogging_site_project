import { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Button, IconButton, Typography, Link, Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  const { sections, title, isAdmin } = props;
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchIconClick = () => {
    setShowSearch(!showSearch); // Toggle search input visibility
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search', { state: { query: searchQuery } }); // Navigate to a search page or handle the search as needed
  };

  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{ zIndex: theme => theme.zIndex.drawer + 1, backgroundColor: '#F8F8F2' }}>

      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button size="small" variant="text" onClick={() => navigate('/createpost')} sx={{ marginRight: 2 }}>
            Create a Blog
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
        {showSearch && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              sx={{ marginRight: 2 }}
            />
          )}
          <IconButton onClick={handleSearchIconClick} sx={{ marginRight: 2 }}>
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
