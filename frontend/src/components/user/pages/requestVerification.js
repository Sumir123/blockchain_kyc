import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { TransactionContext } from "../../../context/TransactionContext";
import {
  Typography,
  Box,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { KycStatusMessage } from "../../errorMessage";

const RequestVerification = () => {
  const {
    getAllBanks,
    allBanks,
    userDashboard,
    getUserDashboard,
    requestVerification,
  } = useContext(TransactionContext);

  const [requestBank, setRequestBank] = useState("");
  const [verifiedBanks, setVerifiedBanks] = useState([]);

  const getVerifiedBanks = () => {
    const vbanks = [];
    allBanks.forEach((bank) => {
      if (bank.isVerified === true) vbanks.push(bank);
    });
    setVerifiedBanks(vbanks);
  };

  const handleSubmit = () => {
    requestVerification(requestBank);
  };

  useEffect(() => {
    getUserDashboard();
    getAllBanks();
  }, []);

  useEffect(() => {
    getVerifiedBanks();
  }, [allBanks]);

  return (
    <>
      <Header />
      <Box
        component={userDashboard.kycStatus == "UPLOADED" && Paper}
        elevation={3}
        sx={{
          alignContent: "center",
          textAlign: "center",
          margin: "100px 100px 0 100px",
          textAlign: "center",
        }}
      >
        {userDashboard.kycStatus == "UPLOADED" ? (
          <>
            <Box sx={{ paddingTop: "100px", paddingBottom: "50px" }}>
              <Typography variant="h5">
                Request Banks For KYC Verification...
              </Typography>
            </Box>
            <Box sx={{ paddingBottom: "100px" }}>
              <FormControl sx={{ width: "30em" }}>
                <InputLabel>Request Verification</InputLabel>
                <Select
                  align="left"
                  id="requestBank"
                  value={requestBank}
                  label="Request Verification"
                  onChange={(e) => {
                    setRequestBank(e.target.value);
                  }}
                >
                  {verifiedBanks.map((bank) => (
                    <MenuItem key={bank.address} value={bank.address}>
                      {bank.name}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  sx={{ width: "10em", marginTop: "20px" }}
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </FormControl>
            </Box>
          </>
        ) : (
          // <Typography variant="h5">
          //   Your KYC Status : {userDashboard.kycStatus}
          // </Typography>
          <KycStatusMessage status={userDashboard.kycStatus} />
        )}
      </Box>
    </>
  );
};

export default RequestVerification;
