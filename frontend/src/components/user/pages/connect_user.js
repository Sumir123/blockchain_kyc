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
import ButtonAppBar from "../../bank/components/navbar";

import { TransactionContext } from "../../../context/TransactionContext";
import { ErrorMessage } from "../../errorMessage";
import { theme } from "../../../theme/theme";

const ConnectUser = () => {
  const {
    currentAccount,
    registerUser,
    validUser,
    checkValidUser,
    getUserDashboard,
  } = useContext(TransactionContext);

  useEffect(() => {
    checkValidUser();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
    };
    registerUser(formData);

    event.currentTarget.reset();
  };

  //some styling
  const paperStyle = {
    padding: 50,
    height: "75vh",
    margin: "10vh 0",
  };

  return currentAccount ? (
    <ThemeProvider theme={theme}>
      <ButtonAppBar />
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
                Register User
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
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
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
              {validUser ? (
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
                    to="/user/dashboard"
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Go to Dashboard
                  </Button>{" "}
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

export default ConnectUser;
