/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { Button, Card, Typography, Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";
import Header from "./components/Header";
import { ErrorMessage } from "../errorMessage";

const TitleText = styled(Typography)(() => ({
  textAlign: "center",
  marginBottom: "50px",
}));

const AdminDashboard = () => {
  const {
    checkValidAdmin,
    validAdmin,
    userCount,
    getUserCount,
    bankCount,
    getBankCount,
    getAllBanks,
    allBanks,
    verifyBank,
  } = useContext(TransactionContext);

  const [verifiedBank, setVerifiedBank] = useState([]);
  const [unverifiedBank, setUnverifiedBank] = useState([]);

  const classifyBanks = () => {
    const vbank = [];
    const unbank = [];
    allBanks.forEach((bank) => {
      if (bank.isVerified === true) vbank.push(bank);
      else unbank.push(bank);
    });
    setVerifiedBank(vbank);
    setUnverifiedBank(unbank);
  };

  useEffect(() => {
    checkValidAdmin();
    getUserCount();
    getBankCount();
    getAllBanks();
  }, []);

  useEffect(() => {
    classifyBanks();
  }, [allBanks]);

  const BankList = ({ bank, isVerified }) => {
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
          {!isVerified ? (
            <Button
              sx={{ marginTop: "10px" }}
              onClick={() => verifyBank(bank.address)}
              variant="contained"
            >
              Verify
            </Button>
          ) : (
            <>
              <Button
                sx={{ marginTop: "10px" }}
                variant="contained"
                color="success"
              >
                Verified
              </Button>
            </>
          )}
        </Card>
      </Grid>
    );
  };

  return (
    <>
      {validAdmin ? (
        <>
          <Header />
          <Box sx={{ marginTop: "100px", marginBottom: "50px" }}>
            <Box display="flex" justifyContent="center">
              <Card sx={{ width: "220px", padding: "25px" }} elevation={5}>
                <Typography variant="h6" align="center">
                  Total Users : {userCount}
                </Typography>
                <Typography variant="h6" align="center">
                  Total Banks : {bankCount}
                </Typography>
              </Card>
            </Box>

            <Grid mt={1} container spacing={4}>
              {unverifiedBank.map((bank) => {
                return <BankList bank={bank} isVerified={false} />;
              })}
            </Grid>
            <Grid mt={1} container spacing={4}>
              {verifiedBank.map((bank) => {
                return <BankList bank={bank} isVerified={true} />;
              })}
            </Grid>
          </Box>
        </>
      ) : (
        <ErrorMessage role="Admin's" />
      )}
    </>
  );
};

export default AdminDashboard;
