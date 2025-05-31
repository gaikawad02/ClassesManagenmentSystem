import { Box, Button, Container, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(135deg, #1A365D 0%, #2A4A80 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
      }}
    >
      {/* Abstract shapes in background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: 'radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.4) 0%, transparent 30%), ' +
                      'radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.4) 0%, transparent 30%)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.1,
                }}
              >
                Where Innovative 
                <Box component="span" sx={{ 
                  color: theme.palette.secondary.main,
                  display: 'inline', 
                }}> Startups </Box>
                Meet Strategic 
                <Box component="span" sx={{ 
                  color: theme.palette.secondary.main,
                  display: 'inline', 
                }}> Investors</Box>
              </Typography>
              
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  mb: 4, 
                  fontWeight: 400,
                  maxWidth: '90%',
                  opacity: 0.9,
                }}
              >
                VentureMatch connects promising entrepreneurs with the right investors, 
                creating powerful partnerships that drive innovation and success.
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  mt: 4, 
                }}
              >
                <Button 
                  component={Link} 
                  to="/signup" 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    fontWeight: 600,
                    py: 1.5,
                    px: 4,
                    fontSize: '1rem',
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  component={Link} 
                  to="/about" 
                  variant="outlined" 
                  sx={{ 
                    color: 'white', 
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                    py: 1.5,
                  }}
                  size="large"
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box 
              sx={{ 
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  width: '80%',
                  height: '80%',
                  backgroundColor: 'rgba(255, 215, 0, 0.2)',
                  borderRadius: '20px',
                  zIndex: -1,
                }
              }}
            >
              <Box
                component="img"
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Startup and investor meeting"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;