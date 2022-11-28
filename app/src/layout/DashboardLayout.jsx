import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from '../components/menu/DashboardNavbar';
import { DashboardSidebar } from '../components/menu/DashboardSidebar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            py: 2,
          }}
        >
          <Outlet />
        </Box>
        <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
        <DashboardSidebar
          onClose={() => setSidebarOpen(false)}
          open={isSidebarOpen}
        />
      </DashboardLayoutRoot>
    </>
  );
};
