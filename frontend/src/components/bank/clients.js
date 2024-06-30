import React, { useContext, useEffect } from "react";
import { ThemeProvider, Box, Grid } from "@mui/material";
import { theme } from "../../theme/theme";
import { Button, Card, Typography, Paper, CardActions } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { TransactionContext } from "../../context/TransactionContext";
import Header from "./components/header";

const ClientPage = () => {
  const {
    getRequestedUsers,
    requestedClients,
    verifyUserKYC,
    rejectUserKYC,
    getAllBankClients,
    allBankClients,
    getUserKYC,
    kycDetail,
    getBankDashboard,
  } = useContext(TransactionContext);

  useEffect(() => {
    getAllBankClients();
    getRequestedUsers();
    getBankDashboard();
  }, []);

  const utilSet = new Set();
  const filteredRequestedClients = requestedClients.filter((user) => {
    const duplicate = utilSet.has(user.address);
    utilSet.add(user.address);
    return !duplicate;
  });
  return (
    <ThemeProvider theme={theme}>
      <>
        <Header />
        <Grid mt={1} container spacing={4}>
          {filteredRequestedClients.length != 0 ? (
            filteredRequestedClients.map((user) => {
              if (!allBankClients.includes(user.address)) {
                return (
                  <Box sx={{ mt: 15, ml: 10 }}>
                    {user.kycStatus == "REQUESTED" && (
                      <Card
                        key={user.address}
                        sx={{ margin: "10px", padding: "25px", maxWidth: 500 }}
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
                            size="small"
                            variant="contained"
                            to={`/bank/userkycdetails/${user.address}`}
                          >
                            View KYC
                          </Button>
                          <Button
                            onClick={() => verifyUserKYC(user.address)}
                            size="small"
                            variant="contained"
                            sx={{ ml: "10px" }}
                          >
                            Verify KYC
                          </Button>
                          <Button
                            onClick={() => rejectUserKYC(user.address)}
                            size="small"
                            variant="contained"
                            sx={{ ml: "10px" }}
                          >
                            Reject KYC
                          </Button>
                        </CardActions>
                      </Card>
                    )}
                    {console.log("FROM KYC DETAIL----", kycDetail)}
                  </Box>

                  // <h2>{name.name}</h2>
                );
              }
            })
          ) : (
            <div style={{ marginTop: "300px", marginLeft: "550px" }}>
              <Typography variant="h4">No KYC verification Requests</Typography>
            </div>
          )}
        </Grid>
      </>
    </ThemeProvider>
  );
};

export default ClientPage;
