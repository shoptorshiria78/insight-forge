" use client"

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar, Badge, ListItemIcon, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import NotificationsIcon from '@mui/icons-material/Notifications';

import EditNoteIcon from "@mui/icons-material/EditNote";
import Image from 'next/image';
import useAuth from '@/app/hooks/useAuth';
import { useTheme } from '@emotion/react';
import bg2 from "../../../assets/logo3.png"
import { useRouter } from 'next/navigation';
import useSingleUser from '@/app/hooks/useSingleUser';
import useAxiosSecure from '@/app/hooks/useAxiosSecure';



const drawerWidth = 240;
const navItems = [
  {
    id: "1",
    route: "Home",
    pathname: "/",
    icon: <HomeIcon />,
  },
  {
    id: "2",
    route: "Blogs",
    pathname: "/blogs",
    icon: <EditNoteIcon />,
  },
  {
    id: "3",
    route: "Contact",
    pathname: "/contact",
    icon: <PhoneIcon />,
  },
  {
    id: "4",
    route: "Job Board",
    pathname: "/job",
    icon: < PhoneIcon />,
  },
  {
    id: "5",
    route: "About",
    pathname: "/about",
    icon: < PhoneIcon />,
  }
];

const settings = [
  {
    id: "1",
    route: "Dashboard ",
    pathname: "/dashboard",

  }]

const DrawerAppBar = (props, item) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, logOut } = useAuth()
  const [users] = useSingleUser()
  const theme = useTheme();
  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  console.log(user)


  const handleLogOut = () => {
    logOut()
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', color: "black" }}>

      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton href={item.pathname} sx={{ textAlign: 'start' }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  color: "black"
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.route} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const seeNotification = () => {
    if (user && user?.email) {

      const userIfo = {
        userId: users[0]?._id
      }
      axiosSecure.post("/seeAllNotification", userIfo)
        .then(res => {
          console.log(res.data);
          refetch();
        })
        .catch(error => {
          console.error("Error:", error);
        });
    } else {
      toast.success("You are not Logged In!");
      router.push("/login");
    }
  }


  const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <Box sx={{ display: 'flex', color: "white" }}>

      <CssBaseline />
      <AppBar component="" style={{ background: "linear-gradient(to right, rgba(53, 84, 68, 0.9), rgba(53, 84, 68, 0.9))" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { sm: 'none', md: 'none' },
              width: '80px'
            }}
          >
            <MenuIcon />
          </IconButton>

          <Image
            src={bg2}
            alt='company'
            width={109}
            height={100}
            style={{
              marginLeft: {
                sm: '14px',
                md: '15px',
                lg: '107px',
              },
              marginRight: '184px',
              display: { xs: 'none', sm: 'none', md: 'block' }
            }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' }, ml: 3 }}>
            {navItems.map((item) => (
              <Button variant="" href={item.pathname} key={item.id} sx={{ color: 'white', right: '10px' }}>
                {item.route}
              </Button>
            ))}
          </Box>
          {
            user && user?.email ?
              <Stack spacing={2} direction="row" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <IconButton onClick={seeNotification} sx={{ color: 'white', cursor: "pointer", right: '12px' }}>
                  <Badge badgeContent={users[0]?.notifications?.length} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                {/* <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon sx={{ color: 'white', cursor: "pointer" , right: '12px' }} />
                </Badge> */}

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={user?.photoURL} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                        <Button href={setting.pathname} key={setting.id} sx={{ color: 'black' }}>
                          {setting.route}
                        </Button>
                      </MenuItem>
                    ))}
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Button onClick={handleLogOut} sx={{ color: 'black' }}>
                        Log Out
                      </Button>
                    </MenuItem>
                  </Menu>
                </Box>
              </Stack>
              :
              <Box sx={{ flexGrow: 0 }}>
                <Button variant="contained" href='/login' sx={{ color: 'white', background: '#6f817a', right: '12px' }}>
                  Login
                </Button>
                <Button variant="outlined" href='/register' sx={{ color: 'white', border: '2px solid #6f817a', borderRadius: '10px' }}>
                  Register
                </Button>

              </Box>
          }
        </Toolbar >
      </AppBar >
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar />
        <Typography>
        </Typography>
      </Box>
    </Box >
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;