import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import logoTheBooker from "../logoTheBooker.png";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDarkMode } from "../context/DarkModeContext";

const NavBar = styled(Box)({
  width: "95%",
  maxWidth: 1400,
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "18px 32px",
  borderRadius: "18px",
  background: "rgba(10, 24, 55, 0.7)",
  boxShadow: "0 2px 16px 0 rgba(0,0,0,0.12)",
  marginBottom: "10px",
  marginTop: "10px",
});

const Logo = styled("img")({
  height: 32,
  marginRight: 12,
});

const AuthButtons = styled(Box)({
  display: "flex",
  gap: 12,
  alignItems: "center",
});

const MenuLink = styled(Button)({
  color: "#5ea0ef",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "1rem",
  borderRadius: 8,
  "&:hover": { background: "rgba(255,255,255,0.08)" },
  padding: "6px 16px",
});

export default function AppNavBar() {

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();
  const isDarkMode = useDarkMode();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <NavBar>
      <Box display="flex" alignItems="center">
        <Logo src={logoTheBooker} alt="TheBooker Logo" />
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#5ea0ef", letterSpacing: 1 }}>
          TheBooker
        </Typography>
      </Box>
      <AuthButtons>
        {user ? (
          <>
            
            {user.role === "admin" && (
              <>
                <MenuLink component={RouterLink} to="/admin-dashboard">Admin Dashboard</MenuLink>
                <MenuLink component={RouterLink} to="/create-event">Create Event</MenuLink>
                <MenuLink component={RouterLink} to="/add-admin">Add Admin</MenuLink>
              </>
            )}
            {user.role === "user" && (
              <>
                <MenuLink component={RouterLink} to="/user-dashboard">Browse Events</MenuLink>
                <MenuLink component={RouterLink} to="/my-bookings">My Bookings</MenuLink>
                <MenuLink component={RouterLink} to="/my-profile">My Profile</MenuLink>
              </>
            )}
            <MenuLink onClick={handleLogout} component={RouterLink} to="/login">
              Log Out
            </MenuLink>
          </>
        ) : (
          <>
            {location.pathname !== "/login" && (
              <MenuLink component={RouterLink} to="/login">
                Log in
              </MenuLink>
            )}
            {location.pathname !== "/register" && (
              <MenuLink
                component={RouterLink}
                to="/register"
                sx={{
                  background: "#fff",
                  color: "#0a1837",
                  fontWeight: 600,
                  "&:hover": { background: "#e6e6e6" },
                }}
              >
                Sign up
              </MenuLink>
            )}
          </>
        )}
      </AuthButtons>
    </NavBar>
  );
}