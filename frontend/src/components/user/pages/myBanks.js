import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TransactionContext } from "../../../context/TransactionContext";
import { ErrorMessage, KycStatusMessage } from "../../errorMessage";
import { Box, Typography, Card, Grid, Button } from "@mui/material";

const UserBanks = () => {
  const {
    validUser,
    checkValidUser,
    getUserDashboard,
    userDashboard,
    getAllBanksDetailsofUser,
    userAllBanks,
  } = useContext(TransactionContext);

  useEffect(() => {
    getUserDashboard();
    checkValidUser();
    getAllBanksDetailsofUser();
  }, []);

  const BankList = ({ bank }) => {
    return (
      <Grid md={6} item elevation={4}>
        <Card
          key={bank.name}
          sx={{ margin: "10px", padding: "25px" }}
          elevation={6}
        >
          <Typography>Address : {bank.address}</Typography>
          <Typography>Name : {bank.name}</Typography>
          <Typography>Registration Number : {bank.license}</Typography>

          <Button
            sx={{ marginTop: "10px" }}
            variant="contained"
            color="success"
          >
            Connected
          </Button>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      {validUser ? (
        <>
          <Header />
          <Box
            sx={{
              marginTop: "100px",
              marginBottom: "50px",
              marginLeft: "70px",
              marginRight: "70px",
            }}
          >
            {userDashboard.kycStatus == "NOT_UPLOADED" ||
            userDashboard.kycStatus == "UPLOADED" ||
            userDashboard.kycStatus == "REQUESTED" ||
            userDashboard.kycStatus == "REJECTED" ? (
              <KycStatusMessage status={userDashboard.kycStatus} />
            ) : (
              <>
                <Typography
                  sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
                  variant="h5"
                  component="div"
                >
                  Connected Banks Overview
                </Typography>
                <Grid mt={1} container spacing={4}>
                  {userAllBanks.map((bank) => {
                    return <BankList bank={bank} />;
                  })}
                </Grid>
              </>
            )}
          </Box>
          <Footer />
        </>
      ) : (
        <>
          <ErrorMessage role="registered" />
        </>
      )}
    </>
  );
};
export default UserBanks;
