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
import TaskIcon from "@mui/icons-material/Task";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TouchAppIcon from "@mui/icons-material/TouchApp";
const drawerWidth = 0.15 * window.innerWidth;

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useContext(TransactionContext);

  const { bankDashboard } = useContext(TransactionContext);
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
          {bankDashboard ? (
            <>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Typography color="inherit">{bankDashboard.name}</Typography>

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
        {/* Render this on the condtion if the bankDashboard is there and render another for bank dashboard */}
        <List sx={{ color: "#1976d2" }}>
          <ListItem button>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <DashboardIcon />
            </IconButton>
            <ListItemText
              primary="My Dashboard"
              IconButton=""
              onClick={() => navigate("/bank/dashboard")}
            />
          </ListItem>
          <ListItem button>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <PeopleAltIcon />
            </IconButton>
            <ListItemText
              primary="Clients"
              onClick={() => navigate("/bank/allclients/")}
            />
          </ListItem>
          <ListItem button>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <TaskIcon />
            </IconButton>

            <ListItemText
              primary="Verification Requests"
              onClick={() => navigate("/bank/clients")}
            />
          </ListItem>
          <ListItem button>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <TouchAppIcon />
            </IconButton>
            <ListItemText
              primary="Request Clients"
              onClick={() => navigate("/bank/requestClient")}
            />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
