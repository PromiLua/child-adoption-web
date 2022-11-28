import IconDashboard from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const PREFIX = 'admin';

export const menuItemsList = [
  {
    name: 'Dashboard',
    Icon: IconDashboard,
    showMenu: false,
    href: `/${PREFIX}/dashboard`,
  },
  {
    name: 'Pessoas',
    Icon: PersonIcon,
    showMenu: false,
    href: `/${PREFIX}/pessoa`,
  },
];
