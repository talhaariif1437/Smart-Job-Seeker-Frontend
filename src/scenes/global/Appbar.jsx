import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  styled,
  Badge,
  InputBase,
  Button,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const [personAnchorEl, setPersonAnchorEl] = useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const fetchedNotifications = response.data.slice(0, 3);
        setNotifications(fetchedNotifications);
        setNotificationCount(fetchedNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handlePersonMenuOpen = (event) => {
    setPersonAnchorEl(event.currentTarget);
  };

  const handlePersonMenuClose = () => {
    setPersonAnchorEl(null);
  };

  const handleSettingsMenuOpen = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleAllNotificationsRead = () => {
    setNotificationCount(0);
    setNotificationsAnchorEl(null);
  };

  const handleChangePassword = () => {
    // Navigate to the change password page
    navigate("/ChangePassword");
    setSettingsAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear user session data (this can vary depending on your auth setup)
    localStorage.removeItem("token");
    navigate("/login");
    setSettingsAnchorEl(null);
  };

  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  return (
    <Box display="flex" justifyContent="space-between" p={2} alignItems="center">
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex" justifyContent="center" flex={1}>
        <Button color="inherit"></Button>
      </Box>

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleNotificationsMenuOpen}>
          <Badge badgeContent={notificationCount} color="error">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={notificationsAnchorEl}
          open={Boolean(notificationsAnchorEl)}
          onClose={handleNotificationsMenuClose}
        >
          {notifications.length > 0 ? (
            <>
              {notifications.map((notification) => (
                <StyledMenuItem key={notification.id}>
                  {notification.title}
                </StyledMenuItem>
              ))}
              <StyledMenuItem onClick={handleAllNotificationsRead}>
                Mark all as read
              </StyledMenuItem>
            </>
          ) : (
            <MenuItem>No new notifications</MenuItem>
          )}
        </Menu>

        <IconButton onClick={handlePersonMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={personAnchorEl}
          open={Boolean(personAnchorEl)}
          onClose={handlePersonMenuClose}
        >
          <StyledMenuItem onClick={handlePersonMenuClose}>Profile</StyledMenuItem>
          <StyledMenuItem onClick={handlePersonMenuClose}>Account</StyledMenuItem>
          <StyledMenuItem onClick={handlePersonMenuClose}>Dashboard</StyledMenuItem>
        </Menu>

        <IconButton onClick={handleSettingsMenuOpen}>
          <SettingsOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={settingsAnchorEl}
          open={Boolean(settingsAnchorEl)}
          onClose={handleSettingsMenuClose}
        >
          <StyledMenuItem onClick={handleChangePassword}>Change Password</StyledMenuItem>
          <StyledMenuItem onClick={handleLogout}>Logout</StyledMenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Appbar;
