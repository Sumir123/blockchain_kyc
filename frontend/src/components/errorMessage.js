import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export const ErrorMessage = ({role}) => {
  return(
  <Box sx={{mt:5,textDecoration:"none", textAlign:"center", fontWeight:500}}>
  <Typography sx={{mb:2}} variant="h4">Please connect {role} wallet.</Typography >
  <Link to="/">Go to Home</Link>
</Box>);
};

export const KycStatusMessage = ({status}) =>{
  const renderContent = () => {
    if (status=="NOT_UPLOADED"){
      return (<>
        <Typography variant="h5" sx={{mb: "10px"}}>
          You have not uploaded your KYC
        </Typography>
        <Typography variant="h5">
          Upload your KYC <Link to="/user/kycForm">Here</Link>
        </Typography>
      </>) 
    }
    else if (status=="UPLOADED"){
      return (<>
        <Typography variant="h5" sx={{mb: "10px"}}>
          You have successfully uploaded your KYC
        </Typography>
        <Typography variant="h5">
          Request your KYC for verification <Link to="/user/requestVerification">Here</Link>
        </Typography>
      </>) 
    }
    else if (status=="REQUESTED"){
      return (<>
        <Typography variant="h5" sx={{mb: "10px"}}>
          KYC verification is in process
        </Typography>
        <Typography variant="h5">
          You can view your KYC <Link to="/user/kycForm">Here</Link>
        </Typography>
      </>) 
    }
    else if (status=="VERIFIED"){
      return (<>
        <Typography variant="h5" sx={{mb: "10px"}}>
          Congratulations, Your KYC is already verified
        </Typography>
        <Typography variant="h5">
          Grant access to the requested banks <Link to="/user/grantAccess">Here</Link>
        </Typography>
      </>) 
    }
    else if (status=="REJECTED"){
      return (<>
        <Typography variant="h5" sx={{mb: "10px"}}>
          Oops, Your KYC is rejected
        </Typography>
        <Typography variant="h5">
          Edit and Upload your kyc again <Link to="/user/kycForm">Here</Link>
        </Typography>
      </>) 
    }
  }
  return(
    <Box sx={{mt:5,textDecoration:"none", textAlign:"center", fontWeight:500}}>
      {renderContent()}
  </Box>);

}

