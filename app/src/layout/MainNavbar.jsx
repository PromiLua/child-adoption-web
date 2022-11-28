import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import Logo from '../components/logo/Logo';
import React from 'react';

const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <Logo
        style={{
          width: 50,
        }}
      />
      <Box sx={{ ml: 1 }} />
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
