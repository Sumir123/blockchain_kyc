import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, ThemeProvider, Avatar, Grid } from "@mui/material";
import theme from "./utils/theme";
import { TransactionContext } from "../../context/TransactionContext";
import Header from "./components/header";
import KycDetails from "../kycDetails";

const UserKyc = () => {
  const {
    getUserKYC,
    kycDetail,
    passportPhoto,
    citizenshipFrontPhoto,
    citizenshipBackPhoto,
    getBankDashboard,
  } = useContext(TransactionContext);
  const params = useParams();

  useEffect(() => {
    console.log(params.id);
    getUserKYC(params.id);
    getBankDashboard();
  }, []);

  const userDetails = kycDetail.userDetails ? kycDetail.userDetails : [];
  console.log(userDetails);
  return (
    <>
      <Header />
      <KycDetails
        userDetails={userDetails}
        passportPhoto={passportPhoto}
        citizenshipFrontPhoto={citizenshipFrontPhoto}
        citizenshipBackPhoto={citizenshipBackPhoto}
      />
    </>
  );
};

export default UserKyc;
