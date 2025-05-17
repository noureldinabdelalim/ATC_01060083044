import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Alert,
  TextField,
} from "@mui/material";
import { useDarkMode } from "../context/DarkModeContext";

const MyProfile = () => {
  const { user } = useAuthContext();

  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const { isDarkMode } = useDarkMode();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/myUser`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
        setFormData({
          name: data.name,
          address: data.address,
          phone: data.phone,
        });
      } else {
        setError("Failed to fetch user data");
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (formData.name.trim().length < 3) {
      setError("Name must be at least 3 characters long");
      return;
    }
    if (formData.address.trim().length < 3) {
      setError("Address must be at least 3 characters long");
      return;
    }
    if (formData.phone.trim().length < 10) {
      setError("Phone number must be at least 10 characters long");
      return;
    }
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/updateUser`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
    } else {
      setError("Failed to update user data");
    }
  };

  if (!userData) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "var(--surface-bg)",
          color: isDarkMode ? "#fff" :"var(--text-main)",
          marginBottom: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 3,
            color: "var(--primary)",
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          My Profile
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 , color: isDarkMode ? "#fff" : "var(--text-main)" }}>Name</TableCell>
                <TableCell sx={{ color: isDarkMode ? "#fff" : "var(--text-main)" }}>                
                    {isEditing ? (
                  <TextField
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    required
                    inputProps={{ minLength: 3 }}
                  />
                ) : (
                  userData.name
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 , color: isDarkMode ? "#fff" : "var(--text-main)" }}>Address</TableCell>
                <TableCell sx={{ color: isDarkMode ? "#fff" : "var(--text-main)" }}>  
                {isEditing ? (
                  <TextField
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    required
                    inputProps={{ minLength: 3 }}
                  />
                ) : (
                  userData.address
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 , color: isDarkMode ? "#fff" : "var(--text-main)" }}>Phone Number</TableCell>
                <TableCell sx={{ color: isDarkMode ? "#fff" : "var(--text-main)" }}>  
                {isEditing ? (
                  <TextField
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    required
                    inputProps={{ minLength: 10 }}
                  />
                ) : (
                  userData.phone
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 , color: isDarkMode ? "#fff" : "var(--text-main)" }}>Email</TableCell>
                <TableCell sx={{ color: isDarkMode ? "#fff" : "var(--text-main)" }}>  {userData.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 , color: isDarkMode ? "#fff" : "var(--text-main)" }}>National Id</TableCell>
                <TableCell sx={{ color: isDarkMode ? "#fff" : "var(--text-main)" }}>  {userData.nationalId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 , color: isDarkMode ? "#fff" : "var(--text-main)" }}>Date Of Birth</TableCell>
                <TableCell sx={{ color: isDarkMode ? "#fff" : "var(--text-main)" }}>  
                {new Date(userData.dob).toISOString().split("T")[0]}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          {isEditing ? (
            <Button
              variant="contained"
              color="success"
              onClick={handleUpdate}
              sx={{ mr: 2, borderRadius: 2, fontWeight: 600 }}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              Edit
            </Button>
          )}
        </div>
      </Paper>
    </Container>
  );
};

export default MyProfile;