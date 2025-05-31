import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ color: 'secondary.main', mr: 1 }}>
                Venture
              </Box>
              Match
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Connecting innovative startups with strategic investors. 
              We bridge the gap between visionary entrepreneurs and 
              forward-thinking investors to create meaningful partnerships.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Company
            </Typography>
            <Link href="/about" color="inherit" sx={{ display: 'block', mb: 1 }}>
              About Us
            </Link>
            <Link href="/contact" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Contact Us
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Careers
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Blog
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Resources
            </Typography>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
              FAQ
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Startup Guide
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Investor Guide
            </Link>
            <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Success Stories
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              1234 Venture Boulevard
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              San Francisco, CA 94107
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              info@venturematch.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              +1 (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ mb: { xs: 2, md: 0 } }}>
            © {currentYear} VentureMatch. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;