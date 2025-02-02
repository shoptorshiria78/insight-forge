/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import logo from "@/assets/logo3.png";
import Image from "next/image";
import { Container } from "@mui/material";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.down("md")]: {
    width: `calc(${theme.spacing(0)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const navItems = [
  {
    route: "Home",
    pathname: "/",
    icon: <HomeIcon />,
  },
  {
    route: "Blogs",
    pathname: "/blogs",
    icon: <EditNoteIcon />,
  },
  {
    route: "Login",
    pathname: "/login",
    icon: <LoginIcon />,
  },
  {
    route: "Register",
    pathname: "/register",
    icon: <AppRegistrationIcon />,
  },
  {
    route: "Contact",
    pathname: "/contact",
    icon: <PhoneIcon />,
  },
  {
    route: "Discussion ",
    pathname: "/discussion ",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 55 55" fill="none">
      <path d="M20.6248 32.0833C20.6248 35.2487 18.061 37.8125 14.8957 37.8125C11.7303 37.8125 9.1665 35.2487 9.1665 32.0833C9.1665 28.918 11.7303 26.3542 14.8957 26.3542C18.061 26.3542 20.6248 28.918 20.6248 32.0833Z" fill="#984900" />
      <path d="M3.4375 46.2152C3.4375 42.1514 11.0716 40.1042 14.8958 40.1042C18.7201 40.1042 26.3542 42.1514 26.3542 46.2152V49.2708H3.4375V46.2152Z" fill="#984900" />
      <path d="M45.8333 32.0833C45.8333 35.2487 43.2695 37.8125 40.1042 37.8125C36.9388 37.8125 34.375 35.2487 34.375 32.0833C34.375 28.918 36.9388 26.3542 40.1042 26.3542C43.2695 26.3542 45.8333 28.918 45.8333 32.0833Z" fill="#984900" />
      <path d="M32.0832 30.9375C32.0832 33.4698 30.0321 35.5208 27.4998 35.5208C24.9675 35.5208 22.9165 33.4698 22.9165 30.9375C22.9165 28.4052 24.9675 26.3542 27.4998 26.3542C30.0321 26.3542 32.0832 28.4052 32.0832 30.9375Z" fill="#984900" />
      <path d="M28.646 46.2152C28.646 42.1514 36.2801 40.1042 40.1043 40.1042C43.9285 40.1042 51.5627 42.1514 51.5627 46.2152V49.2708H28.646V46.2152Z" fill="#984900" />
      <path fillRule="evenodd" clipRule="evenodd" d="M32.9435 39.1703C32.6377 39.2827 32.336 39.4021 32.0403 39.5284C30.6984 40.1019 29.3433 40.8766 28.2905 41.9129C28.0086 42.1905 27.7411 42.4948 27.4999 42.8255C27.2587 42.4948 26.9911 42.1905 26.7092 41.9129C25.6565 40.8766 24.3013 40.1019 22.9594 39.5284C22.6638 39.4021 22.3621 39.2827 22.0562 39.1703C23.8008 38.2664 26.0445 37.8125 27.4999 37.8125C28.9552 37.8125 31.1989 38.2664 32.9435 39.1703Z" fill="#984900" />
      <path fillRule="evenodd" clipRule="evenodd" d="M21.8783 20.625C27.8902 20.625 32.7637 16.7774 32.7637 12.0312C32.7637 7.28505 27.8902 3.4375 21.8783 3.4375C15.8665 3.4375 10.9929 7.28505 10.9929 12.0312C10.9929 13.1842 11.2805 14.2841 11.8021 15.2886C10.65 16.7007 10.3678 18.8388 10.313 20.1826C10.293 20.6716 10.8835 20.9218 11.2756 20.6288C12.062 20.0411 13.3108 19.244 14.9331 18.6488C16.8177 19.8831 19.2383 20.625 21.8783 20.625Z" fill="#984900" />
      <path fillRule="evenodd" clipRule="evenodd" d="M30.2124 20.4709C33.1747 18.4748 35.0665 15.4355 35.0665 12.0312C35.0665 11.1154 34.9296 10.226 34.6718 9.37613C35.3479 9.23934 36.0559 9.16666 36.7852 9.16666C41.5314 9.16666 45.379 12.2447 45.379 16.0417C45.379 17.1284 45.0639 18.1561 44.5027 19.0698C45.0326 19.9674 45.221 21.093 45.2822 21.9398C45.3174 22.428 44.7266 22.6839 44.3254 22.4034C43.8289 22.0563 43.1528 21.6481 42.3228 21.2993C40.8272 22.3085 38.895 22.9167 36.7852 22.9167C34.1483 22.9167 31.7887 21.9665 30.2124 20.4709Z" fill="#984900" />
    </svg>,
  },
];

const Navbar = ({children}) => {
  const theme = useTheme();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <Box >
        <CssBaseline />

        <Drawer variant="permanent" open={open} >
          <DrawerHeader >
            <Image
              className="logo"
              src={logo}
              alt="logo"
            />

            <AppBar position="fixed" open={open} maxWidth="xl" >
              <Toolbar>
                <IconButton
                  color="#B2533E"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography color="#B2533E" variant="h4" noWrap component="div" sx={{ fontWeight: 600 }}>
                  Insight Forge
                </Typography>
              </Toolbar>
            </AppBar>


            <IconButton className="closeIcon" onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <ChevronRightIcon /> : <CloseIcon />}
            </IconButton>
          </DrawerHeader>

          <List  >
            {navItems.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  href={item.pathname}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: "#B2533E"
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#B2533E"
                    }}
                  >
                    {item.icon}
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.route}
                    sx={{ opacity: open ? 1 : 0, color: "#B2533E" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </Container>
  );
};

export default Navbar;