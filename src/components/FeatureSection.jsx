import { Box, Container, Grid, Typography, Card, CardContent, Avatar } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import HandshakeIcon from '@mui/icons-material/Handshake';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BarChartIcon from '@mui/icons-material/BarChart';

const features = [
  {
    title: 'Smart Matching Algorithm',
    description: 'Our proprietary algorithm matches startups with investors based on industry, stage, investment criteria, and goals.',
    icon: <HandshakeIcon fontSize="large" />,
    color: '#1A365D'
  },
  {
    title: 'Streamlined Communication',
    description: 'Direct messaging system allows for efficient communication between founders and potential investors.',
    icon: <RocketLaunchIcon fontSize="large" />,
    color: '#4CAF50'
  },
  {
    title: 'Secure Funding Process',
    description: 'Comprehensive tools for due diligence, documentation sharing, and transaction processing.',
    icon: <MonetizationOnIcon fontSize="large" />,
    color: '#F57C00'
  },
  {
    title: 'Performance Analytics',
    description: 'Track engagement metrics, investor interest, and compare your startup against industry benchmarks.',
    icon: <BarChartIcon fontSize="large" />,
    color: '#2196F3'
  }
];

const FeatureSection = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              '& span': {
                color: 'primary.main',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  width: '100%',
                  height: '4px',
                  backgroundColor: 'secondary.main',
                  borderRadius: '2px',
                }
              }
            }}
          >
            Why Choose <span>VentureMatch</span>
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '700px', 
              mx: 'auto', 
              color: 'text.secondary',
              fontSize: '1.1rem'
            }}
          >
            Our platform offers unique features designed to streamline the funding process
            and create successful partnerships between startups and investors.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: feature.color, 
                      width: 60, 
                      height: 60, 
                      mb: 2,
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection;