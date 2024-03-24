import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


function Footer() {
  

  return (
  
    <Box sx={{ overflowX: 'hidden', width: '100vw' }}>
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { md: 'repeat(4, 1fr)' },
      gap: { xs: 4, md: 10 },
      mx: 'auto',
      bgcolor: 'grey.200',
      color: 'grey.600',
      fontSize: '0.75rem',
      px: { xs: 2, sm: 4 }, // Adjust padding for responsiveness
      py: 4,
    }}>
      <Box sx={{ spaceY: 2}}> {/* space-y-4 */}
        <Typography variant="p" sx={{ fontWeight: 'bold', color:'black'}}>ABOUT</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2, mt:2 }}>How Blogging works</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>Newsroom</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>Investors</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>Blog plus</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>Blog Luxe</Typography>
      </Box>
    
      <Box sx={{ spaceY: 2 }}>
        <Typography variant="p" sx={{ fontWeight: 'bold', color:'black' }}>COMMUNITY</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 , mt:2 }}>Accessibility</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>This is not a real site</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>Built for fun</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>Referrals accepted</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>vinod</Typography>
      </Box>
    
      <Box sx={{ spaceY: 2 }}>
        <Typography variant="p" sx={{ fontWeight: 'bold', color:'black' }}>HOST</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2, mt:2 }}>vinod</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>Presents</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>CS Grad student</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>Software Engineer</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>Join Now</Typography>
      </Box>
    
      <Box sx={{ spaceY: 2 }}>
        <Typography variant="p" sx={{ fontWeight: 'bold', color:'black' }}>SUPPORT</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2, mt:2 }}>Help Center</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>Trust & Safety</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>Say Hi YouTube</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem' , mb: 2}}>Easter Eggs</Typography>
        <Typography sx={{ fontWeight: 'normal', color: 'black', fontSize: '0.85rem', mb: 2 }}>For the Win</Typography>
      </Box>
    </Box>
    </Box>
  );
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;
