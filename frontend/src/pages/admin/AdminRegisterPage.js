import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Box,
  Typography,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Button,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import { registerUser } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [adminNameError, setAdminNameError] = useState(false);
  const [schoolNameError, setSchoolNameError] = useState(false);
  const role = "Admin";

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.adminName?.value;
    const schoolName = event.target.schoolName?.value;
    const email = event.target.email?.value;
    const password = event.target.password?.value;

    if (!name || !schoolName || !email || !password) {
      if (!name) setAdminNameError(true);
      if (!schoolName) setSchoolNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    setLoader(true);
    dispatch(registerUser({ name, email, password, role, schoolName }, role));
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'adminName') setAdminNameError(false);
    if (name === 'schoolName') setSchoolNameError(false);
  };

  useEffect(() => {
    if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
      navigate('/Admin/dashboard');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error - Ensure backend is running on http://localhost:5000");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, currentUser, currentRole, navigate, error, response]);

  return (
    <Grid container component="main" sx={{ minHeight: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center', bgcolor: 'background.paper' }}>
        <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto', p: 4 }}>
          <Typography variant="h4" fontWeight={800} color="text.primary" gutterBottom>
            Create Your School
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Register as admin to set up your school and start managing classes, teachers, and students.
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="adminName"
              label="Your name"
              name="adminName"
              autoComplete="name"
              error={adminNameError}
              helperText={adminNameError && 'Required'}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="schoolName"
              label="School name"
              name="schoolName"
              autoComplete="organization"
              error={schoolNameError}
              helperText={schoolNameError && 'Required'}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              error={emailError}
              helperText={emailError && 'Required'}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={toggle ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              error={passwordError}
              helperText={passwordError && 'Required'}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setToggle(!toggle)} edge="end">
                      {toggle ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
              {loader ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>
            <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account? <StyledLink to="/Adminlogin">Log in</StyledLink>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        md={7}
        sx={{
          background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #115E59 100%)',
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Grid>
  );
};

export default AdminRegisterPage;

const StyledLink = styled(Link)`
  color: #0D9488;
  font-weight: 600;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;
