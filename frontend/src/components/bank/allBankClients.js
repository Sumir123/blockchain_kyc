import React, { useContext, useEffect } from 'react';
import { ThemeProvider, Box, Grid } from '@mui/material';
import theme from './utils/theme';
import { Button, Card, Typography, Paper, CardActions } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { TransactionContext } from '../../context/TransactionContext';
import Header from './components/header';

const AllBankClientsPage = () => {
  const {
    getAllUserDetailsofBank,
    allBankClientDetails,
    getUserKYC,
    getBankDashboard,
  } = useContext(TransactionContext);

  useEffect(() => {
    getAllUserDetailsofBank();
    getBankDashboard();
  }, []);

  return (
    <>
      <Header />

      <Grid mt={1} container spacing={4}>
        {allBankClientDetails.length != 0 ? (
          allBankClientDetails.map((user) => (
            <Box sx={{ mt: 15, ml: 10 }}>
              <Card
                key={user.address}
                sx={{ margin: '10px', padding: '25px', maxWidth: 500 }}
                elevation={6}
                width="30vw"
              >
                <Typography>Address: {user.address}</Typography>
                <Typography>Name: {user.name}</Typography>
                <Typography>Email: {user.email}</Typography>
                <Typography>Phone: {user.phone}</Typography>
                <Typography>KYC STATUS: {user.kycStatus}</Typography>

                <CardActions>
                  <Button
                    component={RouterLink}
                    to={`/bank/userkycdetails/${user.address}`}
                    size="small"
                    variant="contained"
                  >
                    View KYC Detail
                  </Button>
                </CardActions>
              </Card>
            </Box>

            // <h2>{name.name}</h2>
          ))
        ) : (
          <div style={{ marginTop: '300px', marginLeft: '600px' }}>
            <Typography variant="h4">No Bank Clients</Typography>
          </div>
        )}
      </Grid>
    </>
  );
};

export default AllBankClientsPage;
