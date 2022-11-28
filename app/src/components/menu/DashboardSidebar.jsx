import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuItem from './MenuItem';
import { menuItemsList } from './MenuItemsList';
import Logo from '../logo/Logo';
import { useLocation } from 'react-router-dom';
import { theme } from '../../theme';

export const DashboardSidebar = ({ open, onClose }) => {
  const location = useLocation();

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (open) {
      onClose?.();
    }
  }, [location.pathname]);

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Box sx={{ pr: 2, pl: 1, pb: 0 }}>
          <Toolbar style={{ justifyContent: 'space-between', display: 'flex' }}>
            <Logo style={{ width: 50 }} />{' '}
            <p style={{ marginLeft: '20px' }}>Adoção de Crianças</p>
            <Box sx={{ ml: 2 }} />
          </Toolbar>
        </Box>
        <Divider sx={{ borderColor: 'neutral.400' }} />
        <Box sx={{ p: 2, flexGrow: 1 }}>
          <List>
            {menuItemsList.map((item, index) => (
              <MenuItem {...item} key={index} />
            ))}
          </List>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.200',
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.200',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
