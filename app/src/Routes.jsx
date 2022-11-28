import { Navigate } from 'react-router-dom';
import { DashboardLayout } from 'src/layout/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import PeopleAdd from './pages/people/PeopleAdd';
import PeopleList from './pages/people/PeopleList';
import PersonGet from './pages/people/PersonGet';
import PersonEdit from './pages/people/PersonEdit';

const routes = () => {
  return [
    {
      element: <DashboardLayout />,
      children: [
        {
          path: '/admin/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/admin/pessoa/adicionar',
          element: <PeopleAdd />,
        },
        {
          path: '/admin/pessoa',
          element: <PeopleList />,
        },
        {
          path: '/admin/pessoa/visualizar/:uuid',
          element: <PersonGet />,
        },
        {
          path: '/admin/pessoa/editar/:uuid',
          element: <PersonEdit />,
        },
      ],
    },
    {
      path: '/',
      element: <Navigate to="/admin/dashboard" />,
    },
  ];
};

export default routes;
