import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import ButtonAppBar from "./components/navbar";

import { TransactionContext } from "../../context/TransactionContext";
import { ErrorMessage } from "../errorMessage";
import { theme } from "../../theme/theme";

const ConnectBank = () => {
  const {
    connectWallet,
    currentAccount,
    getBankDashboard,
    registerBank,
    checkValidBank,
    validBank,
  } = useContext(TransactionContext);

  useEffect(() => {
    checkValidBank();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get("name"),
      license: data.get("license"),
    };
    registerBank(formData);

    event.currentTarget.reset();
  };

  //some styling
  const paperStyle = {
    padding: 50,
    height: "70vh",
    margin: "10vh 0",
  };

  return currentAccount ? (
    <ThemeProvider theme={theme}>
      <ButtonAppBar></ButtonAppBar>
      <Grid rowSpacing={0} columnSpacing={1} container component="main">
        <CssBaseline />
        <Grid item xs={12} sm={7} md={6} lg={6}>
          <Paper elevation={3} style={paperStyle}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <AppRegistrationIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register Bank
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="license"
                  label="Registration Number"
                  name="license"
                  autoComplete="license"
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  fullWidth
                >
                  Register Account
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={5} md={6} lg={6}>
          <Paper elevation={3} style={paperStyle}>
            <Box
              sx={{
                marginTop: "12vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {validBank ? (
                <>
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <HowToRegIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Already
                  </Typography>
                  <Typography component="h1" variant="h5">
                    Registered?
                  </Typography>
                  <Button
                    component={Link}
                    to="/bank/dashboard"
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Go to Dashboard
                  </Button>
                </>
              ) : (
                <>
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <HowToRegIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Register And
                  </Typography>
                  <Typography component="h1" variant="h5">
                    Get Started
                  </Typography>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  ) : (
    <>
      <ErrorMessage role="any" />
    </>
  );
};

export default ConnectBank;
