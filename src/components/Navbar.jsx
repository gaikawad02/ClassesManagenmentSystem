import { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  IconButton, 
  Menu, 
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <AppBar position="sticky" elevation={0} sx={{ 
      backgroundColor: 'transparent', 
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      background: 'rgba(255, 255, 255, 0.8)',
      color: 'primary.main',
      transition: 'all 0.3s ease',
    }}>
      <Container>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box 
              component="span" 
              sx={{ 
                color: 'secondary.main', 
                mr: 1, 
                display: 'inline' 
              }}
            >
              Venture
            </Box>
            Match
          </Typography>

          {/* Mobile menu */}
          {isMobile ? (
            <Box>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {navItems.map((item) => (
                  <MenuItem key={item.label} onClick={handleCloseNavMenu} component={Link} to={item.path}>
                    <Typography textAlign="center">{item.label}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/login">
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/signup">
                  <Typography textAlign="center">Sign Up</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Desktop menu */}
              <Box sx={{ display: 'flex', mr: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      mx: 1,
                      color: 'text.primary',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
              <Box>
                <Button 
                  component={Link} 
                  to="/login" 
                  color="primary" 
                  sx={{ mx: 1 }}
                >
                  Login
                </Button>
                <Button 
                  component={Link} 
                  to="/regitration" 
                  variant="contained" 
                  color="primary" 
                  sx={{ mx: 1 }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;