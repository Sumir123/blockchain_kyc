import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { TransactionContext } from "../../../context/TransactionContext";
import { ErrorMessage } from "../../errorMessage";
import Header from "../components/Header";

const UserDashboard = () => {
  const {
    validUser,
    checkValidUser,
    getUserDashboard,
    userDashboard,
    getKYC,
    passportPhoto,
    currentAccount,
  } = useContext(TransactionContext);

  useEffect(() => {
    getUserDashboard();
    checkValidUser();
    getKYC();
    //addBankAccess();
  }, []);

  return (
    <>
      {validUser ? (
        <>
          <Header />

          {/* <CssBaseline /> */}
          <Paper
            elevation={10}
            style={{
              padding: 30,
              height: "75vh",
              width: "85vw",
              margin: "100px auto",
            }}
          >
            <Grid container>
              <Grid item sx={{ my: "1rem", ml: "10px" }}>
                <Avatar
                  src={passportPhoto}
                  alt="passportPhoto"
                  sx={{ width: 300, height: 300 }}
                />
              </Grid>
              <Grid item sx={{ my: "1rem", ml: "160px" }}>
                <Typography variant="h4">Account Details</Typography>

                <br />
                <div>
                  <Typography variant="h6" color="#a2b2c1">
                    Name
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {userDashboard.name}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="#a2b2c1">
                    Email
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {userDashboard.email}
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="#a2b2c1">
                    Phone
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {userDashboard.phone}
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
                    KYC Status
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color:
                        userDashboard.kycStatus === "VERIFIED"
                          ? "#4CAF50"
                          : "#FF5722",
                    }}
                    gutterBottom
                  >
                    {userDashboard.kycStatus}
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

export default UserDashboard;
