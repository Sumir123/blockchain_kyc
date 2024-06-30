import React, { useState } from "react";
import { useEffect } from "react";
import Header from "./components/header";
import { ErrorMessage } from "../errorMessage";

import {
  ThemeProvider,
  CssBaseline,
  Typography,
  Grid,
  Box,
  Avatar,
  Paper,
} from "@mui/material";
import bankLogo from "../../utils/bank.png";

import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

const BankDashboard = () => {
  const {
    currentAccount,
    bankDashboard,
    getBankDashboard,
    validBank,
    checkValidBank,
  } = useContext(TransactionContext);

  useEffect(() => {
    getBankDashboard();
    checkValidBank();
  }, []);

  return (
    <>
      {validBank ? (
        <>
          <Header />

          {/* <CssBaseline /> */}
          <Paper
            elevation={10}
            style={{
              padding: 30,
              height: "65vh",
              width: "85vw",
              margin: "120px auto",
            }}
          >
            <Grid container>
              <Grid item sx={{ my: "1rem", ml: "15px" }}>
                <Avatar
                  src={bankLogo}
                  alt="passportPhoto"
                  sx={{ width: 300, height: 300 }}
                />
              </Grid>
              <Grid item sx={{ my: "1rem", ml: "150px" }}>
                <Typography variant="h4">Account Details</Typography>
                <br />
                <div>
                  <Typography variant="h6" color="#a2b2c1">
                    Bank Name
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {bankDashboard.name}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="#a2b2c1">
                    Registration Number
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {bankDashboard.license}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="#a2b2c1">
                    Wallet Address
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {currentAccount}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="#a2b2c1">
                    Status
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {bankDashboard.verified ? `Verified` : `Not verified`}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </>
      ) : (
        <>
          <ErrorMessage role="registered" />
        </>
      )}
    </>
  );
};
export default BankDashboard;
