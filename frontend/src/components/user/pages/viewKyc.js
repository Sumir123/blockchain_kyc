import React,{useContext,useEffect} from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Typography, Box,Avatar,Grid } from "@mui/material";
import { TransactionContext } from "../../../context/TransactionContext";
import { ErrorMessage } from "../../errorMessage";
import KycDetails from "../../kycDetails";

const ViewKyc=()=>{
    const { validUser, checkValidUser,getKYC,kycDetail,passportPhoto,citizenshipFrontPhoto,citizenshipBackPhoto}=useContext(TransactionContext);
    const params=useParams();


    useEffect(()=>{checkValidUser();getKYC()},[])

    const userDetails=kycDetail.userDetails?kycDetail.userDetails:[];

    return(
        <>
        {validUser ? (
          <>
          <Header />
          <KycDetails 
          userDetails={userDetails}
          passportPhoto={passportPhoto}
          citizenshipFrontPhoto={citizenshipFrontPhoto}
          citizenshipBackPhoto={citizenshipBackPhoto} 
          />
          </>
          ) : (
            <>
              <ErrorMessage role="Registered" />
            </>
          )}
          </>
    

       
    )
}

export default ViewKyc;