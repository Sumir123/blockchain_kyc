/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { TransactionContext } from "../../../context/TransactionContext";
import { useState } from "react";

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
