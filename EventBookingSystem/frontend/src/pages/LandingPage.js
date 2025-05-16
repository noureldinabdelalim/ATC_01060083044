import React from "react";
import { Box, Button, Typography, TextField, Container, Paper, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import logoTheBooker from "../logoTheBooker.png";

const GradientBackground = styled(Box)({
  minHeight: "100vh",
  width: "100vw",
  background: "radial-gradient(ellipse at 50% 0%, #0a1837 0%, #0a0f1a 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingTop: "40px",
});

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
  marginBottom: "40px",
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

const MainContent = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "60vh",
  color: "#fff",
});

const EmailBox = styled(Paper)({
  display: "flex",
  alignItems: "center",
  background: "#10192b",
  borderRadius: 12,
  padding: "8px 16px",
  marginTop: 32,
  marginBottom: 12,
  boxShadow: "none",
});

const StartNowButton = styled(Button)({
  marginLeft: 12,
  background: "#fff",
  color: "#0a1837",
  fontWeight: 600,
  borderRadius: 8,
  textTransform: "none",
  "&:hover": {
    background: "#e6e6e6",
  },
});

const LandingPage = () => {
  return (
    <GradientBackground>
      {/* NavBar */}
      

      {/* Main Content */}
      <MainContent maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            mb: 2,
            fontSize: { xs: "2.2rem", md: "3.5rem" },
          }}
        >
          Our latest <Box component="span" sx={{ color: "#5ea0ef" }}>products</Box>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#b0b8c7",
            textAlign: "center",
            maxWidth: 700,
            mb: 4,
            fontWeight: 400,
          }}
        >
          Explore our cutting-edge event booking platform, delivering high-quality experiences tailored to your needs. Elevate your events with top-tier features and seamless management.
        </Typography>
        <EmailBox elevation={0}>
          <TextField
            variant="standard"
            placeholder="Your email address"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: "#fff",
                background: "transparent",
                fontSize: "1.1rem",
                px: 1,
                width: 240,
              },
            }}
            sx={{
              background: "transparent",
              borderRadius: 2,
              "& input": { color: "#fff" },
            }}
          />
          <StartNowButton variant="contained">
            Start now
          </StartNowButton>
        </EmailBox>
        <Typography variant="body2" sx={{ color: "#b0b8c7", mt: 1 }}>
          By clicking "Start now" you agree to our{" "}
          <Link href="#" underline="hover" sx={{ color: "#fff", fontWeight: 500 }}>
            Terms & Conditions
          </Link>.
        </Typography>
      </MainContent>
    </GradientBackground>
  );
};

export default LandingPage;