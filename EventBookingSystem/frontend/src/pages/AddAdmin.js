import {useState} from 'react'
import { useDarkMode } from "../context/DarkModeContext"; 
import { useAuthContext } from '../hooks/useAuthContext'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
} from "@mui/material";

const URL = process.env.REACT_APP_BACKEND_URL;

const AddAdmin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [nationalId, setNationalId] = useState('');
    const { isDarkMode } = useDarkMode(); 
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false); 


    const {user} = useAuthContext()

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        setIsLoading(true)



        const admin = {
            email,name,password,phone,dob,address,nationalId
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/addAdmin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(admin),
        });


        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        
        }
        else{
            setIsLoading(false)
            setSuccess(true)
            setEmail('')
            setName('')
            setPassword('')
            setPhone('')
            setDob('')
            setAddress('')
            setNationalId('')

            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        }
    }
       
    return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "var(--surface-bg)",
          color: isDarkMode ? "#fff" : "var(--text-main)",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 3,
            color: "var(--primary)",
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          Add Admin
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Admin added successfully!
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} autoComplete="off">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />
          <TextField
            label="National ID"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            fullWidth
            required
            margin="normal"
            sx={{
              input: { color: isDarkMode ? "#fff" : "var(--text-main)" },
              label: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
            InputLabelProps={{
              style: { color: isDarkMode ? "#fff" : "var(--text-main)" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 3, borderRadius: 2, fontWeight: 600 }}
          >
            Add Admin
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddAdmin;