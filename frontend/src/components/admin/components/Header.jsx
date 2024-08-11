/* eslint-disable no-unused-vars */
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { TransactionContext } from "../../../context/TransactionContext";

const Header = () => {
  const { logout } = useContext(TransactionContext);
  return (
    <>
      {/* <CssBaseline /> */}
      <AppBar>
        <Toolbar>
          {/* <IconButton 
                edge="start" 
                size="large" 
                color="inherit"
                sx={{ mr: 2 }}
                >
                    <MenuIcon   />
                </IconButton> */}
          <Typography
            color="inherit"
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Decentralized-KYC
          </Typography>
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={logout}>
            <LogoutIcon />
          </IconButton>
          <Typography color="inherit">Logout</Typography>{" "}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
