import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Card, 
  CardContent,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would send the form data to a server
    console.log('Form data submitted:', formData);
    setOpen(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon fontSize="large" />,
      title: 'Our Location',
      content: '1234 Venture Boulevard, San Francisco, CA 94107'
    },
    {
      icon: <EmailIcon fontSize="large" />,
      title: 'Email Us',
      content: 'info@venturematch.com'
    },
    {
      icon: <PhoneIcon fontSize="large" />,
      title: 'Call Us',
      content: '+1 (123) 456-7890'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 10,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
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
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              mb: 3,
              textAlign: 'center'
            }}
          >
            Contact Us
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            sx={{ 
              maxWidth: 800, 
              mx: 'auto', 
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            Have questions or need assistance? We're here to help you connect with the right people.
          </Typography>
        </Container>
      </Box>

      {/* Contact Cards */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    '& .contact-icon': {
                      color: 'secondary.main',
                      transform: 'scale(1.1)',
                    }
                  }
                }}
              >
                <Box 
                  className="contact-icon"
                  sx={{ 
                    color: 'primary.main', 
                    mb: 2,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {info.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {info.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {info.content}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Contact Form and Map */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, height: '100%' }}>
              <CardContent>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  color="primary" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: 600,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-10px',
                      left: 0,
                      width: '60px',
                      height: '4px',
                      bgcolor: 'secondary.main',
                      borderRadius: '2px',
                    }
                  }}
                >
                  Send Us a Message
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Your Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        endIcon={<SendIcon />}
                        sx={{ py: 1.5, px: 4 }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', overflow: 'hidden' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.18014304716!2d-122.43913489507258!3d37.757683108062355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1625091696839!5m2!1sen!2sus" 
                width="100%" 
                height={isMobile ? "300" : "100%"} 
                style={{ border: 0, display: 'block' }} 
                allowFullScreen="" 
                loading="lazy"
                title="VentureMatch location"
              ></iframe>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              textAlign: 'center', 
              mb: 6, 
              fontWeight: 700,
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
            Frequently Asked <span>Questions</span>
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ mb: 3, p: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                    How does the matching process work?
                  </Typography>
                  <Typography variant="body1">
                    Our proprietary algorithm analyzes multiple factors including industry, stage, investment criteria, and business goals to create meaningful connections between startups and investors.
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ p: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                    Is VentureMatch free to use?
                  </Typography>
                  <Typography variant="body1">
                    We offer a free basic plan with limited features. Premium plans for both startups and investors provide full access to our matching algorithm, communication tools, and analytics dashboard.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ mb: 3, p: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                    How long does it take to get matched?
                  </Typography>
                  <Typography variant="body1">
                    Most startups receive their first matches within 48 hours of completing their profile. The quality and number of matches improve as you engage with the platform and provide feedback.
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ p: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                    How do you vet startups and investors?
                  </Typography>
                  <Typography variant="body1">
                    All participants undergo a verification process to confirm their identity and credentials. Additional vetting is performed for premium members to ensure high-quality connections.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Your message has been sent successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;