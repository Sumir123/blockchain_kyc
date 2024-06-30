import React, { useContext, useEffect } from "react";
import { Typography, Box, Avatar, Grid, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import PrintIcon from '@mui/icons-material/Print';

const KycDetails = ({
  userDetails,
  passportPhoto,
  citizenshipBackPhoto,
  citizenshipFrontPhoto,
}) => {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    //cleanup function to remove event listener
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Button
        sx={{
          position: "fixed",
          top: `${dimensions.height - 50}px`,
          left: `${dimensions.width - 200}px`,
        }}
        variant="contained"
        endIcon={<PrintIcon />}
        onClick={handlePrint}
      >
        Print Details
      </Button>
      <Grid id="kycDocument" container sx={{ mt: "80px" }}>
        <Grid id="personalDetails" item xs sx={{ my: "2rem", ml: "120px" }}>
          <PersonIcon color="primary" fontSize="large" />
          <Typography className="titleDetails" variant="h4">
            {" "}
            Personal Details
          </Typography>
          <br />
          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Name
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.firstName} {userDetails.lastName}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Email address
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.paEmail}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Phone Number
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.paMobile}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Father's Name
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.fatherFirstName} {userDetails.fatherLastName}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Grandfather's Name
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.grandfatherFirstName}{" "}
              {userDetails.grandfatherLastName}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Gender
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.gender}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Marital Status
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.maritalStatus}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Date of Birth
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.dateOfBirth}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Permanent Address
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.paMunicipality}-{userDetails.paWard},{" "}
              {userDetails.paDistrict}, {userDetails.paProvince} Province
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Current Address
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.caMunicipality}-{userDetails.caWard},{" "}
              {userDetails.caDistrict}, {userDetails.caProvince} Province
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Citizenship No.{" "}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.citizenshipNumber}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Citizenship Issued From
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.citizenshipIssuedFrom}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Citizenship Issued Date
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.citizenshipIssuedDate}
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Verified By
            </Typography>
            <Typography variant="h6" gutterBottom>
              {userDetails.verifier} ({userDetails.verifiedBy})
            </Typography>
          </Box>
        </Grid>
        <Grid id="documentDetails" item xs sx={{ my: "2rem", ml: "80px" }}>
          <WysiwygIcon color="primary" fontSize="large" />
          <Typography className="titleDetails" variant="h4">
            Document Details
          </Typography>
          <br />
          <Typography variant="h6" color="#a2b2c1">
            Passport Photo{" "}
          </Typography>

          <img
            src={passportPhoto}
            alt="passportPhoto"
            style={{ height: "200px", width: "200px" }}
          />
          <br />
          <br />
          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Citizenship Front
            </Typography>
            <img
              src={citizenshipFrontPhoto}
              style={{ height: "350px", width: "400px" }}
              alt="Citizenship Front Photo"
            />
          </Box>
          <br />
          <Box>
            <Typography variant="h6" color="#a2b2c1">
              Citizenship Back
            </Typography>
            <img
              src={citizenshipBackPhoto}
              style={{ height: "350px", width: "400px" }}
              alt="Citizenship Back Photo"
            />
          </Box>
          <br />
        </Grid>
      </Grid>
    </>
  );
};

export default KycDetails;
