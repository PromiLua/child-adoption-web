import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet';
import { CardQuantityDashboard } from '../../components/dashboard/CardQuantityDashboard';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDashboard } from '../../services/DashboardService';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState({
    people: 0,
    active: 0,
    disabled: 0,
  });
  const [loading, setLoading] = useState(false);
  const [isLoadData, setLoadData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const responseDashboard = await dispatch(getDashboard());
      if (responseDashboard) {
        setDashboardData(responseDashboard);
      }
    };

    if (!isLoadData) {
      setLoadData(true);
      fetchData().then();
    }

    return () => {
      setLoading(false);
    };
  });

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <>
            <CardQuantityDashboard
              loading={loading.toString()}
              title="Pessoas ativas"
              quantity={dashboardData.people}
            />
            <CardQuantityDashboard
              loading={loading.toString()}
              title="Pessoas desativas"
              quantity={dashboardData.active}
            />
            <CardQuantityDashboard
              loading={loading.toString()}
              title="Pessoas interessadas"
              quantity={dashboardData.disabled}
            />
          </>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
