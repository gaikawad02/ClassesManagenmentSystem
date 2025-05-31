import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import MoneyIcon from '@mui/icons-material/Money';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const stats = [
  {
    value: '1,000+',
    label: 'Startups',
    icon: <BusinessIcon sx={{ fontSize: 40 }} />,
    color: '#1A365D'
  },
  {
    value: '500+',
    label: 'Investors',
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    color: '#2A9D8F'
  },
  {
    value: '$250M+',
    label: 'Funds Raised',
    icon: <MoneyIcon sx={{ fontSize: 40 }} />,
    color: '#E9C46A'
  },
  {
    value: '80%',
    label: 'Success Rate',
    icon: <ShowChartIcon sx={{ fontSize: 40 }} />,
    color: '#E76F51'
  }
];

const StatsSection = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        py: 8, 
        bgcolor: 'background.paper',
      }}
    >
      <Container>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 1,
            }}
          >
            VentureMatch by the Numbers
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '700px', 
              mx: 'auto', 
              color: 'text.secondary' 
            }}
          >
            Our platform has helped hundreds of startups connect with the right investors and secure funding.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${theme.palette.divider}`,
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    '& .stat-icon': {
                      transform: 'scale(1.1)',
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '6px',
                    height: '100%',
                    backgroundColor: stat.color,
                  }
                }}
              >
                <Box 
                  className="stat-icon"
                  sx={{ 
                    mb: 2, 
                    color: stat.color,
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography 
                  variant="h3" 
                  component="p" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1, 
                    color: stat.color 
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography 
                  variant="h6" 
                  component="p" 
                  sx={{ 
                    fontWeight: 500, 
                    color: 'text.primary' 
                  }}
                >
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;