import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

// import { createTheme } from "@mui/material/styles";

// const themeOptions = {
//   palette: {
//     type: "light",
//     primary: {
//       main: "#1976d2",
//     },
//     secondary: {
//       main: "#01364A",
//     },
//   },
// };

// export const theme = createTheme(themeOptions);

export const HeadingContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(10, 10, 4, 10),
}));

export const Container = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 10, 0, 10),
}));

export const SubHeadingContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(3, 0, 1, 0),
  // background: theme.palette.primary.main,
  padding: theme.spacing(5, 5),
}));

export const FormGroup = styled(Box)(({ theme }) => ({
  marginBottom: 30,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: "12px 30px",
  fontSize: "16px",
  textTransform: "capitalize",
}));

export const StyledDatePicker = styled("input")(({ theme }) => ({
  padding: "15px",
  borderRadius: "4px",
  border: "1px solid #aaa",
  width: "300px",
}));

export const ErrorTypography = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: "red",
}));
