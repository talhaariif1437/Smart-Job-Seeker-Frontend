// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar1 = ({ toggleSidebar }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Company Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar1;
