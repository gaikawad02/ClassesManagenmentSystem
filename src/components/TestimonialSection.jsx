import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  IconButton, 
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const testimonials = [
  {
    quote: "VentureMatch connected us with the perfect investor who understood our vision. Six months later, we've grown 300% and expanded to three new markets.",
    name: "Sarah Johnson",
    position: "CEO, TechInnovate",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    quote: "As an investor, finding quality startups with real potential is challenging. VentureMatch's algorithm consistently connects me with companies that align with my investment thesis.",
    name: "Michael Rodriguez",
    position: "Angel Investor",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    quote: "The platform streamlined our fundraising process. We closed our seed round in half the time we expected thanks to the quality connections made through VentureMatch.",
    name: "David Chen",
    position: "Founder, EcoSolutions",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Box 
      sx={{ 
        py: 10, 
        bgcolor: 'primary.main',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05,
          background: 'radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.6) 0%, transparent 20%), ' +
                      'radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.6) 0%, transparent 20%)',
          zIndex: 0,
        }}
      />
      
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              '& span': {
                color: theme.palette.secondary.main,
              }
            }}
          >
            Success <span>Stories</span>
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '700px', 
              mx: 'auto',
              opacity: 0.9
            }}
          >
            Hear from the startups and investors who have found success through our platform.
          </Typography>
        </Box>

        <Card 
          sx={{ 
            maxWidth: 900, 
            mx: 'auto', 
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative',
            overflow: 'visible',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-30px',
              left: '-30px',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              bgcolor: 'rgba(255, 215, 0, 0.2)',
              zIndex: -1,
            }
          }}
        >
          <CardContent sx={{ p: 6 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Box sx={{ position: 'relative', flexShrink: 0 }}>
                <Avatar 
                  src={currentTestimonial.image} 
                  alt={currentTestimonial.name}
                  sx={{ 
                    width: isMobile ? 100 : 120, 
                    height: isMobile ? 100 : 120, 
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    border: '3px solid white',
                  }}
                />
                <FormatQuoteIcon 
                  sx={{ 
                    position: 'absolute',
                    bottom: -10,
                    right: -10,
                    color: theme.palette.secondary.main,
                    fontSize: 40,
                    bgcolor: 'white',
                    borderRadius: '50%',
                    p: 0.5
                  }}
                />
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" component="p" sx={{ mb: 2, fontStyle: 'italic', lineHeight: 1.6 }}>
                  "{currentTestimonial.quote}"
                </Typography>
                <Typography variant="h6" component="p" sx={{ fontWeight: 600 }}>
                  {currentTestimonial.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {currentTestimonial.position}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
          <IconButton 
            onClick={handlePrev}
            sx={{ 
              color: 'white', 
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton 
            onClick={handleNext}
            sx={{ 
              color: 'white', 
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialSection;