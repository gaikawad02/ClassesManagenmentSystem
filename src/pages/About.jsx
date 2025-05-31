import { Box, Container, Typography, Grid, Avatar, Card, CardContent, Divider } from '@mui/material';

const teamMembers = [
  {
    name: "Emily Chen",
    position: "CEO & Co-Founder",
    bio: "Former VC with 10+ years of experience connecting startups with investors. Emily founded VentureMatch to streamline the fundraising process.",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Daniel Williams",
    position: "CTO & Co-Founder",
    bio: "Serial entrepreneur with three successful exits. Daniel leads our technology team, developing the matching algorithms that power our platform.",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Michael Rodriguez",
    position: "Chief Investment Officer",
    bio: "Former investment banker with expertise in early-stage funding. Michael oversees investor relations and helps refine our matching criteria.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Sarah Johnson",
    position: "Head of Startup Success",
    bio: "Experienced startup advisor who has helped dozens of companies secure funding. Sarah leads our startup onboarding and support programs.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const About = () => {
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
            About Us
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
            We're on a mission to transform how startups and investors connect,
            creating meaningful partnerships that drive innovation and success.
          </Typography>
        </Container>
      </Box>

      {/* Our Story */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box 
              component="img"
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="VentureMatch team meeting"
              sx={{ 
                width: '100%', 
                borderRadius: 3,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h3" 
              component="h2" 
              color="primary" 
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: 0,
                  width: '80px',
                  height: '4px',
                  bgcolor: 'secondary.main',
                  borderRadius: '2px',
                }
              }}
            >
              Our Story
            </Typography>
            <Typography paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
              VentureMatch was founded in 2022 by Emily Chen and Daniel Williams, who experienced firsthand the challenges 
              of connecting promising startups with the right investors. After witnessing countless innovative 
              ideas fail to secure funding due to a lack of connections, they set out to create a solution.
            </Typography>
            <Typography paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
              Using their combined expertise in venture capital and technology, they developed an intelligent 
              matching algorithm that goes beyond traditional networking to create meaningful connections based 
              on shared goals, values, and strategic fit.
            </Typography>
            <Typography paragraph sx={{ fontSize: '1.1rem' }}>
              Today, VentureMatch has helped over 1,000 startups connect with investors, resulting in more than 
              $250 million in funding and dozens of success stories. We're just getting started on our mission 
              to transform the funding landscape for innovative companies worldwide.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Our Values */}
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
            Our <span>Values</span>
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    color="primary.main" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 600 
                    }}
                  >
                    Innovation
                  </Typography>
                  <Typography variant="body1">
                    We believe in the power of innovation to transform industries and improve lives. 
                    Our platform is designed to support visionary entrepreneurs and forward-thinking 
                    investors who are creating the future.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    color="primary.main" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 600 
                    }}
                  >
                    Integrity
                  </Typography>
                  <Typography variant="body1">
                    Trust is the foundation of successful partnerships. We maintain rigorous vetting 
                    processes and promote transparent communication between startups and investors 
                    to build lasting, valuable relationships.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    color="primary.main" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 600 
                    }}
                  >
                    Inclusivity
                  </Typography>
                  <Typography variant="body1">
                    Great ideas come from everywhere. We're committed to creating opportunities for 
                    underrepresented founders and diverse startups, ensuring that innovation flourishes 
                    in all communities.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Leadership Team */}
      <Container sx={{ py: 8 }}>
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
          Meet Our <span>Team</span>
        </Typography>

        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .team-avatar': {
                      transform: 'scale(1.05)',
                    }
                  }
                }}
              >
                <Box 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <Avatar 
                    src={member.image} 
                    alt={member.name}
                    className="team-avatar"
                    sx={{ 
                      width: 150, 
                      height: 150, 
                      mb: 2,
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {member.position}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
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

export default About;