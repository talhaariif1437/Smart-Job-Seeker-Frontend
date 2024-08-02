// src/components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';

const Sidebar1 = ({ isOpen }) => {
  return (
    <Drawer variant="persistent" anchor="left" open={isOpen}>
      <List>
        <ListItem button>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar1;
