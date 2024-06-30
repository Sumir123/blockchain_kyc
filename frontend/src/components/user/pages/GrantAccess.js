import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TransactionContext } from "../../../context/TransactionContext";
import BasicTable from "../components/BasicTable";
import { Typography, Box } from "@mui/material";
import { ErrorMessage, KycStatusMessage } from "../../errorMessage";

const GrantAccess = () => {
  const {
    validUser,
    checkValidUser,
    getUserDashboard,
    userDashboard,
    addBankAccess,
    getKycAccessRequestsForClient,
    KycRequestedBanks,
  } = useContext(TransactionContext);

  useEffect(() => {
    getUserDashboard();
    checkValidUser();
    getKycAccessRequestsForClient();
  }, []);

  return (
    <>
      {validUser ? (
        <>
          <Header />
          <Box
            sx={{
              marginTop: "100px",
              marginBottom: "50px",
              textAlign: "center",
            }}
          >

          {(userDashboard.kycStatus=="VERIFIED" && !KycRequestedBanks.length)?(
            <>
              <Typography variant="h5">
                No pending requests
              </Typography>
            </>
          )
          :
          (userDashboard.kycStatus == "VERIFIED" && KycRequestedBanks.length) ? (
            <>
              <Typography variant="h5" sx={{mb:"30px"}}>Grant Access to your KYC</Typography>
              <BasicTable banks={KycRequestedBanks} />
              <Footer />
            </>
          ) : (
            <KycStatusMessage status={userDashboard.kycStatus}/>
            )}
          </Box>
        </>
      ) : (
        <>
          <ErrorMessage role="registered" />
        </>
      )}
    </>
  );
};

export default GrantAccess;
