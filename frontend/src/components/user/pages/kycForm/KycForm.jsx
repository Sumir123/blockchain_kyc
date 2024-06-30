import { Grid, Typography, ThemeProvider, Button } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputText from "./formInputs/InputText";
import InputRadio from "./formInputs/InputRadio";
import { Buffer } from "buffer";
import { TransactionContext } from "../../../../context/TransactionContext";
import {
  getCryptographyKeys,
  encryptMessage,
} from "../../../../utils/cryptography";
import { ErrorMessage, KycStatusMessage } from "../../../errorMessage";
import Header from "../../components/Header";
import { File } from "web3.storage";
import { toast } from "react-toastify";
import {
  HeadingContainer,
  Container,
  SubHeadingContainer,
  FormGroup,
  StyledButton,
} from "./KycFormStyles";
import { theme } from "../../../../theme/theme";
import InputDate from "./formInputs/InputDate";

import { makeStorageClient } from "../../../../utils/ipfsConnection";

export const KycForm = () => {
  const navigate = useNavigate();

  const {
    validUser,
    getUserDashboard,
    userDashboard,
    uploadKYC,
    currentAccount,
    genKeys,
    keys,
    checkValidUser,
    getKYC,
    kycDetail,
    passportPhoto,
    citizenshipFrontPhoto,
    citizenshipBackPhoto,
    passportHash,
    citizenshipFrontHash,
    citizenshipBackHash,
    getUserKeys,
  } = useContext(TransactionContext);
  const [imagesHash, setImagesHash] = useState({});
  const [passFile, setPassFile] = useState({});
  const [images, setImages] = useState({});
  const [editData, setEditData] = useState(false);

  useEffect(() => {
    checkValidUser();
    getKYC();
    getUserDashboard();
  }, []);

  const userDetails = kycDetail.userDetails ? kycDetail.userDetails : null;

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    getKeys();
  }, [userDetails]);

  useEffect(() => {
    if (userDetails) {
      console.log(userDetails);
      setValue("firstName", userDetails.firstName);
      setValue("lastName", userDetails.lastName);
      setValue("fatherFirstName", userDetails.fatherFirstName);
      setValue("fatherLastName", userDetails.fatherLastName);
      setValue("grandfatherFirstName", userDetails.grandfatherFirstName);
      setValue("grandfatherLastName", userDetails.grandfatherLastName);
      setValue("gender", userDetails.gender);
      setValue("maritalStatus", userDetails.maritalStatus);
      setValue("dateOfBirth", userDetails.dateOfBirth);
      setValue("caProvince", userDetails.caProvince);
      setValue("caDistrict", userDetails.caDistrict);
      setValue("caWard", userDetails.caWard);
      setValue("caMunicipality", userDetails.caMunicipality);
      setValue("caMobile", userDetails.caMobile);
      setValue("caEmail", userDetails.caEmail);
      setValue("paProvince", userDetails.paProvince);
      setValue("paDistrict", userDetails.paDistrict);
      setValue("paWard", userDetails.paWard);
      setValue("paMunicipality", userDetails.paMunicipality);
      setValue("paMobile", userDetails.paMobile);
      setValue("paEmail", userDetails.paEmail);
      setValue("citizenshipNumber", userDetails.citizenshipNumber);
      setValue("citizenshipIssuedFrom", userDetails.citizenshipIssuedFrom);
      setValue("citizenshipIssuedDate", userDetails.citizenshipIssuedDate);
      setImages({
        passportPhoto: passportPhoto,
        citizenshipFront: citizenshipFrontPhoto,
        citizenshipBack: citizenshipBackPhoto,
      });
      setImagesHash({
        passportPhotoHash: passportHash,
        citizenshipFrontHash: citizenshipFrontHash,
        citizenshipBackHash: citizenshipBackHash,
      });
    }
  }, [userDetails, passportPhoto, citizenshipFrontPhoto, citizenshipBackPhoto]);

  const getKeys = () => {
    if (userDetails) {
      getUserKeys();
    } else {
      genKeys();
    }
  };

  const captureFile = (event) => {
    event.preventDefault();
    console.log("file captured : ", event);
    addFilesToIPFS(event);
  };
  // processFileForIPFS(event);

  const addFilesToIPFS = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let name = event.target.name + "Hash";
      let reader = new FileReader();
      reader.onload = async () => {
        let dataURL = reader.result;
        let encryptedData = encryptMessage(
          JSON.stringify(dataURL),
          keys[0],
          keys[2]
        );

        const files = new File([encryptedData], name);
        const client = makeStorageClient();
        const cid = await client.upload(files);
        const mcid = cid.split("/")[2];
        console.log("cid", cid, mcid);

        // const hash = await ipfs.add(encryptedData);
        setImagesHash((prevState) => ({
          ...prevState,
          [name]: mcid,
        }));
        setImages((prevState) => ({
          ...prevState,
          [event.target.name]: dataURL,
        }));
      };
      reader.readAsDataURL(event.target.files[0]);
      toast.info(`${name} is uploaded to IPFS server.`);
      // let imageFile=new Blob([event.target.files[0]],{type:"image/png"});
    }
  };

  const onSubmit = async (data) => {
    console.log("onSubmit", data);
    const encryptedJSON = encryptMessage(
      JSON.stringify(data),
      keys[0],
      keys[2]
    );
    //const json = JSON.stringify(data);
    //console.log(json);
    const files = new File([encryptedJSON], "form.json");
    const client = makeStorageClient();
    const cid = await client.upload(files);
    const mcid = cid.split("/")[2];
    console.log("cid", cid, mcid);

    // const jsonHash = await ipfs.add(encryptedJSON);
    //console.log(jsonHash.path);
    //console.log("sumbitData", data);
    //console.log(imagesHash);

    //const kycData = mainpulateData(data);
    //console.log(kycData);

    uploadKYC(
      mcid,
      imagesHash.passportPhotoHash,
      imagesHash.citizenshipFrontHash,
      imagesHash.citizenshipBackHash,
      keys[1],
      keys[2],
      keys[0]
    );
  };

  return (
    <>
      {validUser ? (
        <>
          <ThemeProvider theme={theme}>
            <Header />
            <HeadingContainer>
              <Typography variant="h3"></Typography>
            </HeadingContainer>

            {userDashboard.kycStatus == "NOT_UPLOADED" || editData ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <SubHeadingContainer>
                  <Typography variant="h4">A. Identity Details</Typography>
                </SubHeadingContainer>
                <Container>
                  <FormGroup>
                    <Typography variant="h6">
                      1. Name of the Applicant
                    </Typography>

                    <Grid mt={1} container spacing={2}>
                      <Grid md={5} item>
                        <InputText
                          register={register}
                          name="firstName"
                          errors={errors}
                          label="First Name"
                        />
                      </Grid>
                      <Grid md={5} item>
                        <InputText
                          register={register}
                          name="lastName"
                          errors={errors}
                          label="Last Name"
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>

                  <FormGroup>
                    <Typography variant="h6">2. Father's Name</Typography>
                    <Grid mt={1} container spacing={2}>
                      <Grid md={5} item>
                        <InputText
                          register={register}
                          name="fatherFirstName"
                          errors={errors}
                          label="First Name"
                        />
                      </Grid>
                      <Grid md={5} item>
                        <InputText
                          register={register}
                          name="fatherLastName"
                          errors={errors}
                          label="Last Name"
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>

                  <FormGroup>
                    <Typography variant="h6">3. Grandfather's Name</Typography>
                    <Grid mt={1} container spacing={2}>
                      <Grid md={5} item>
                        <InputText
                          register={register}
                          name="grandfatherFirstName"
                          errors={errors}
                          label="First Name"
                        />
                      </Grid>
                      <Grid md={5} item>
                        <InputText
                          register={register}
                          name="grandfatherLastName"
                          errors={errors}
                          label="Last Name"
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>

                  <Grid container spacing={2}>
                    <Grid md={5} item>
                      <FormGroup>
                        <Typography variant="h6">4. Gender</Typography>
                        <Box mt={1}>
                          {/*For different labels and values we have to pass options as in
                    const options = [
                        {
                          label: "Radio Option 1",
                          value: "1",
                        },
                        {
                          label: "Radio Option 2",
                          value: "2",
                        },
                    ];

                    and code like

                    options.map((singleOption) => (
                      <FormControlLabel
                        value={singleOption.value}
                        label={singleOption.label}
                        control={<Radio />}
                      /> 
                    )); instead of values.map in the component Input radio.jsx

                    Here the label of the radio is dyanamically given by capitalizing the first letter from the values array

                  */}
                          <InputRadio
                            name="gender"
                            values={["male", "female", "others"]}
                            control={control}
                            errors={errors}
                          />
                        </Box>
                      </FormGroup>
                    </Grid>

                    <Grid md={5} item>
                      <FormGroup>
                        <Typography variant="h6">5. Marital Status</Typography>
                        <Box mt={1}>
                          <InputRadio
                            name="maritalStatus"
                            values={["single", "married"]}
                            control={control}
                            errors={errors}
                          />
                        </Box>
                      </FormGroup>
                    </Grid>
                  </Grid>

                  <FormGroup>
                    <Typography variant="h6">6. Date of Birth</Typography>
                    <Box mt={1}>
                      <InputDate
                        register={register}
                        name="dateOfBirth"
                        errors={errors}
                      />
                    </Box>
                  </FormGroup>
                </Container>
                {/* Task: Make address Details as in license form by including api to query data for provinces, districts, municipalities.
        For now it's a text field only */}
                <SubHeadingContainer>
                  <Typography variant="h4">B. Address Details</Typography>
                </SubHeadingContainer>
                <Container>
                  <FormGroup>
                    <Typography variant="h6">1. Current Address</Typography>
                    <Grid mt={1} container spacing={2}>
                      <Grid md={4} item>
                        <InputText
                          register={register}
                          name="caProvince"
                          errors={errors}
                          label="Province"
                        />
                      </Grid>
                      <Grid md={4} item>
                        <InputText
                          register={register}
                          name="caDistrict"
                          errors={errors}
                          label="District"
                        />
                      </Grid>
                      <Grid md={4} item>
                        <InputText
                          register={register}
                          name="caMunicipality"
                          errors={errors}
                          label="Municipality"
                        />
                      </Grid>
                      <Grid md={4} item>
                        <InputText
                          register={register}
                          name="caWard"
                          type="number"
                          errors={errors}
                          label="Ward No"
                        />
                      </Grid>
                      <Grid md={4} item>
                        <InputText
                          register={register}
                          name="caMobile"
                          type="phone"
                          errors={errors}
                          label="Mobile"
                        />
                      </Grid>
                      <Grid md={4} item>
                        <InputText
                          register={register}
                          name="caEmail"
                          type="email"
                          errors={errors}
                          label="Email"
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>
                  {/* This is for the Permanent address field, commented out for testing purposes so as we don't  have to enter data everytime */}
                  <FormGroup>
                    <Typography variant="h6">2. Permanent Address</Typography>
                    <Grid mt={1} container spacing={2}>
                      <Grid md={4} item>
                        <InputText
                          register={register}
                          name="paProvince"
                          errors={errors}
                          label="Province"
                        />
                      </Grid>
                      <Grid md={4} item>
                        <InputText
                          register={register}
                          name="paDistrict"
                          errors={errors}
                          label="District"
                        />
                      </Grid>
                      <Grid md={4} item>
                        <InputText
                          register={register}
                          name="paMunicipality"
                          errors={errors}
                          label="Municipality"
                        />
                      </Grid>
                      <Grid md={4} item>
                        <InputText
                          register={register}
                          name="paWard"
                          type="number"
                          errors={errors}
                          label="Ward No"
                        />
                      </Grid>
                      <Grid md={4} item>
                        <InputText
                          register={register}
                          name="paMobile"
                          type="phone"
                          errors={errors}
                          label="Mobile"
                        />
                      </Grid>
                      <Grid md={4} item>
                        <InputText
                          register={register}
                          name="paEmail"
                          type="email"
                          errors={errors}
                          label="Email"
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>
                </Container>
                <SubHeadingContainer>
                  <Typography variant="h4">C. Document Details</Typography>
                </SubHeadingContainer>
                <Container>
                  <FormGroup>
                    <Typography variant="h6">
                      1. Passport Sized Photo
                    </Typography>

                    <Grid mt={1} container spacing={2}>
                      <Grid item>
                        <input
                          type="file"
                          accept="image/*"
                          name="passportPhoto"
                          required={!imagesHash.passportPhotoHash}
                          onChange={captureFile}
                        ></input>
                        {imagesHash.passportPhotoHash && (
                          <img
                            style={{ height: "300px", width: "300px" }}
                            src={images.passportPhoto}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </FormGroup>
                  <FormGroup>
                    <Typography variant="h6">
                      2. Citizenship Certificate
                    </Typography>

                    <Grid mt={1} container spacing={2}>
                      <Grid item>
                        <Typography variant="h8">
                          Front <br />{" "}
                        </Typography>
                        <input
                          type="file"
                          accept="image/*"
                          required={!imagesHash.citizenshipFrontHash}
                          name="citizenshipFront"
                          onChange={captureFile}
                        ></input>
                        {imagesHash.citizenshipFrontHash && (
                          <img
                            style={{ height: "300px", width: "450px" }}
                            src={images.citizenshipFront}
                          />
                        )}
                      </Grid>
                    </Grid>
                    <Grid mt={1} container spacing={2}>
                      <Grid item>
                        <Typography variant="h8">
                          Back <br />{" "}
                        </Typography>
                        <input
                          type="file"
                          accept="image/*"
                          required={!imagesHash.citizenshipBackHash}
                          name="citizenshipBack"
                          onChange={captureFile}
                        ></input>
                        {imagesHash.citizenshipBackHash && (
                          <img
                            style={{ height: "300px", width: "450px" }}
                            src={images.citizenshipBack}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </FormGroup>
                  <FormGroup>
                    <Grid mt={1} container spacing={2}>
                      <Grid md={5} item>
                        <Typography
                          variant="h6"
                          style={{ marginBottom: "15px" }}
                        >
                          3. Citizenship Number
                        </Typography>
                        <InputText
                          register={register}
                          type="citizenshipNumber"
                          name="citizenshipNumber"
                          errors={errors}
                          label="Citizenship Number"
                        />
                      </Grid>
                      <Grid md={5} item>
                        <Typography
                          variant="h6"
                          style={{ marginBottom: "15px" }}
                        >
                          4. Citizenship Issued From
                        </Typography>
                        <InputText
                          register={register}
                          name="citizenshipIssuedFrom"
                          errors={errors}
                          label="Municipality"
                        />
                      </Grid>
                    </Grid>
                  </FormGroup>
                  <FormGroup>
                    <Typography variant="h6" style={{ marginBottom: "15px" }}>
                      5. Citizenship Issued Date
                    </Typography>
                    <Box mt={1}>
                      <InputDate
                        register={register}
                        name="citizenshipIssuedDate"
                        errors={errors}
                      />
                    </Box>
                  </FormGroup>

                  <FormGroup>
                    <StyledButton type="submit" variant="contained">
                      Submit
                    </StyledButton>
                  </FormGroup>
                </Container>
              </form>
            ) : (
              <Box sx={{ textAlign: "center" }}>
                {/* <Typography variant="h5" sx={{ mb: "10px" }}>
              Your KYC Status : {userDashboard.kycStatus}
            </Typography> */}
                <KycStatusMessage status={userDashboard.kycStatus} />
                {userDashboard.kycStatus == "REJECTED" && (
                  <Button
                    sx={{ mr: "10px", mt: "20px" }}
                    variant="contained"
                    onClick={() => setEditData(true)}
                  >
                    Edit KYC
                  </Button>
                )}
                <Button
                  sx={{ mt: "20px" }}
                  variant="contained"
                  onClick={() => navigate(`/user/viewKyc/${currentAccount}`)}
                >
                  View KYC
                </Button>
              </Box>
            )}
          </ThemeProvider>
        </>
      ) : (
        <>
          <ErrorMessage role="Registered" />
        </>
      )}
    </>
  );
};
