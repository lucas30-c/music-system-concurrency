import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const adminView = [
  { text: 'User List', icon: <PeopleIcon /> },
  { text: 'User Results', icon: <ListAltIcon /> },
  { text: 'Test Settings', icon: <SettingsIcon /> },
  { text: 'Edit Resources', icon: <EditIcon /> }
];

const userView = [
  { text: 'Profile', icon: <PeopleIcon /> },
  { text: 'Test History', icon: <ListAltIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
  { text: 'Placeholder', icon: <EditIcon /> }
]

const SidebarMenu = ({ setSelectedTable }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to handle item click
  const handleItemClick = (text) => {
    setSelectedTable(text);
    setSelectedItem(text);
  };

  return (
    <Drawer variant="permanent" anchor="left" PaperProps={{ style: { backgroundColor: '#003F7D' } }}>
      <Toolbar sx={{ height: '50px', minHeight: '50px !important' }} />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[
            { text: 'User Results', icon: <ListAltIcon /> },
            { text: 'User List', icon: <PeopleIcon /> },
            { text: 'Test Settings', icon: <SettingsIcon /> },
            { text: 'Edit Resources', icon: <EditIcon /> },
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleItemClick(item.text)}
              selected={item.text === selectedItem}  // Apply the selected style conditionally
              sx={{
                backgroundColor: item.text === selectedItem ? '#FF8E00' : 'inherit',
                '&.Mui-selected': {
                  backgroundColor: '#003366',
                },
              }}
            >
              <ListItemIcon sx={{ color: item.text === selectedItem ? 'white' : 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ color: item.text === selectedItem ? 'white' : 'white' }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SidebarMenu;