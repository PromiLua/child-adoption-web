import React from 'react';
import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const CardQuantityDashboard = (props) => {
  return (
    <>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <Card sx={{ height: '100%' }} {...props}>
          <CardContent sx={{ textAlign: 'center' }}>
            <>
              <Box>
                <Typography variant="h1">
                  {props && props.loading === 'true' ? (
                    <Skeleton style={{ marginLeft: '90px', marginRight: '90px' }} />
                  ) : (
                    <>{props.quantity || 0}</>
                  )}
                </Typography>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">
                  {props && props.loading === 'true' ? (
                    <Skeleton />
                  ) : (
                    <>{props.title || 'Titulo'}</>
                  )}
                </Typography>
              </Box>
            </>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

CardQuantityDashboard.propTypes = {
  loading: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};
