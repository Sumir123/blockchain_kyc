import React, { useContext, useEffect, useState } from "react";
import theme from "./utils/theme";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Paper,
  CardActions,
  TextField,
  Box,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { TransactionContext } from "../../context/TransactionContext";
import Header from "./components/header";

const RequestClient = () => {
  const {
    requestAccess,
    getKycAccessRequests,
    KycRequestedClients,
    getAllBankClients,
    allBankClients,
    getBankDashboard,
  } = useContext(TransactionContext);

  useEffect(() => {
    getKycAccessRequests();
    getAllBankClients();
    getBankDashboard();
  }, []);

  const [client, setClient] = useState("");

  const handleChange = (e) => {
    setClient(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    requestAccess(client);
    setClient("");
  };

  //   useEffect(() => {
  //     getRequestedUsers();
  //   }, []);

  return (
    <>
      <Header />
      <Box
        component={Paper}
        elevation={2}
        sx={{
          alignContent: "center",
          textAlign: "center",
          margin: "100px 100px 0 100px",
          textAlign: "center",
        }}
      >
        <Box sx={{ paddingTop: "100px", paddingBottom: "50px" }}>
          <Grid item>
            <Typography variant="h5" gutterBottom>
              Request Client
            </Typography>
            <TextField
              id="request-client"
              label="Client Address"
              // variant="filled"
              onChange={handleChange}
              value={client}
              sx={{ width: "450px" }}
            />
          </Grid>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
            submit
          </Button>
        </Box>
      </Box>
      <Box
        component={Paper}
        elevation={3}
        sx={{
          width: "40%",
          alignContent: "center",
          textAlign: "center",
          margin: "50px 50px 50px 50px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom></Typography>

        {KycRequestedClients.map((client) => (
          <Card variant="outlined" sx={{ mt: 3 }}>
            {!allBankClients.includes(client) && (
              <CardContent>
                <Typography variant="h6">Address : {client}</Typography>
                <Typography variant="h6">
                  KYC Access :{" "}
                  {allBankClients.includes(client) ? "Granted" : "pending"}
                </Typography>
              </CardContent>
            )}
          </Card>
        ))}
      </Box>
    </>
  );
};

export default RequestClient;
