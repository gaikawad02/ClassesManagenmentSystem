import { Box, Container, Typography, Button, Grid, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CallToAction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 10 }, 
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1A365D 0%, #2A4A80 100%)',
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          background: 'radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.4) 0%, transparent 30%), ' +
                    'radial-gradient(circle at 80% 70%, rgba(255, 215, 0, 0.4) 0%, transparent 30%)',
          zIndex: 0,
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Grid 
          container 
          spacing={4} 
          sx={{ 
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Grid item xs={12} md={7}>
            <Typography 
              variant="h2" 
              component="h2" 
              color="white"
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Ready to take your{' '}
              <Box component="span" sx={{ color: theme.palette.secondary.main }}>
                startup
              </Box>
              {' '}or{' '}
              <Box component="span" sx={{ color: theme.palette.secondary.main }}>
                investment portfolio
              </Box>
              {' '}to the next level?
            </Typography>
            
            <Typography 
              variant="body1" 
              color="white" 
              sx={{ 
                mb: 4, 
                opacity: 0.9,
                maxWidth: '90%',
              }}
            >
              Join our community of innovative startups and strategic investors to create 
              meaningful connections that drive growth and success.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                component={Link} 
                to="/signup" 
                variant="contained" 
                color="secondary" 
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                }}
              >
                Get Started
              </Button>
              <Button 
                component={Link} 
                to="/contact" 
                variant="outlined" 
                size="large"
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                  py: 1.5,
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Grid>
          
          {!isMobile && (
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box 
                  component="img" 
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Team of entrepreneurs"
                  sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 3,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    transform: 'rotate(2deg)',
                    border: '8px solid white',
                  }}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default CallToAction;