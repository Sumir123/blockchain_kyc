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
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import KeyIcon from "@mui/icons-material/Key";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
const drawerWidth = 0.15 * window.innerWidth;

const Header = () => {
  const navigate = useNavigate();
  const { currentAccount, userDashboard, logout } =
    useContext(TransactionContext);
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* <CssBaseline /> */}
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            size="large"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color="inherit"
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Decentralized KYC
          </Typography>
          {userDashboard ? (
            <>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Typography color="inherit">{userDashboard.name}</Typography>

              <IconButton color="inherit" sx={{ ml: 1 }} onClick={logout}>
                <LogoutIcon />
              </IconButton>
              <Typography color="inherit">Logout</Typography>
            </>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Toolbar />
        <List sx={{ color: "#1976d2" }}>
          <ListItem button>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <DashboardIcon />
            </IconButton>
            <ListItemText
              primary="Dashboard"
              onClick={() => navigate("/user/dashboard")}
            />
          </ListItem>
          <ListItem button>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <AccountBalanceIcon />
            </IconButton>
            <ListItemText
              primary="My Banks"
              onClick={() => navigate("/user/banks")}
            />
          </ListItem>
          <ListItem button>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <RecentActorsIcon />
            </IconButton>
            <ListItemText
              primary="KYC Details"
              onClick={() => navigate("/user/kycForm")}
            />
          </ListItem>
          <ListItem button>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <TouchAppIcon />
            </IconButton>
            <ListItemText
              primary="Request for verification"
              onClick={() => navigate("/user/requestVerification")}
            />
          </ListItem>
          <ListItem button>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <KeyIcon />
            </IconButton>
            <ListItemText
              primary="Grant Access"
              onClick={() => navigate("/user/grantAccess")}
            />
          </ListItem>
        </List>
      </Drawer>

      {/* <SideBar open={open} /> */}
    </>
  );
};

export default Header;
