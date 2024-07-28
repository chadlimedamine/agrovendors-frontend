import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Cart from './Cart';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Features/authSlice';
import { useNavigate } from 'react-router-dom';
const Principle = () => {
  const dispatch = useDispatch();
  const { token, username } = useSelector((state) => state.auth);
  const navigate= useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const totalCards = 9; // Total number of cards
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  // Generate dummy card data
  const cards = Array.from({ length: totalCards }, (_, index) => <Cart key={index} />);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const drawerWidth = 240;
  const navItems = ['Home', 'About', 'Contact'];

  const { window } = "100%";
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mx: 2 }}>
        Platforme
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, ml: "25px" }}
            >
              Platforme
            </Typography>
            <Box sx={{ display: { xs: 'flex', sm: 'flex' }, mr: 6 }}>
              <Button sx={{ color: '#fff' }}>
                Home
              </Button>
              {token ? (
        <div>
          <Typography variant="h6">Welcome, {username}!</Typography>
          <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <div>
          <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
          <Button variant="contained" onClick={() => navigate('/register')}>Register</Button>
        </div>
      )}

            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3, marginLeft:'4%', width: '100%' }}>
          <Toolbar />
          <Grid container spacing={2} justifyContent="center">
            {currentCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                {card}
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
            <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </Button>
            <Typography variant="body1" sx={{ mx: 2 }}>
               {currentPage} of {totalPages}
            </Typography>
            <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Principle;
