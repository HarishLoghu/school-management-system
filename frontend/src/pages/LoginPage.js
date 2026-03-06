import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === "Student") {
      const rollNum = event.target.rollNumber?.value;
      const studentName = event.target.studentName?.value;
      const password = event.target.password?.value;
      if (!rollNum || !studentName || !password) {
        if (!rollNum) setRollNumberError(true);
        if (!studentName) setStudentNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      setLoader(true);
      dispatch(loginUser({ rollNum, studentName, password }, role));
    } else {
      const email = event.target.email?.value;
      const password = event.target.password?.value;
      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }
      setLoader(true);
      dispatch(loginUser({ email, password }, role));
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === 'email') setEmailError(false);
    if (name === 'password') setPasswordError(false);
    if (name === 'rollNumber') setRollNumberError(false);
    if (name === 'studentName') setStudentNameError(false);
  };

  const guestModeHandler = () => {
    const password = "zxc";
    if (role === "Admin") {
      setGuestLoader(true);
      dispatch(loginUser({ email: "yogendra@12", password }, role));
    } else if (role === "Student") {
      setGuestLoader(true);
      dispatch(loginUser({ rollNum: "1", studentName: "Dipesh Awasthi", password }, role));
    } else if (role === "Teacher") {
      setGuestLoader(true);
      dispatch(loginUser({ email: "tony@12", password }, role));
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') navigate('/Admin/dashboard');
      else if (currentRole === 'Student') navigate('/Student/dashboard');
      else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error - Please ensure the backend is running on http://localhost:5000");
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

  return (
    <Grid container component="main" sx={{ minHeight: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center', bgcolor: 'background.paper' }}>
        <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto', p: 4 }}>
          <Typography variant="h4" fontWeight={800} color="text.primary" gutterBottom>
            {role} Login
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Welcome back. Sign in to your account.
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            {role === "Student" ? (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="rollNumber"
                  label="Roll Number"
                  name="rollNumber"
                  autoComplete="off"
                  type="number"
                  error={rollNumberError}
                  helperText={rollNumberError && 'Required'}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="studentName"
                  label="Full Name"
                  name="studentName"
                  autoComplete="name"
                  error={studentNameError}
                  helperText={studentNameError && 'Required'}
                  onChange={handleInputChange}
                />
              </>
            ) : (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                error={emailError}
                helperText={emailError && 'Required'}
                onChange={handleInputChange}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={toggle ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
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
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
              Forgot password? Contact your administrator.
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
              {loader ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={guestModeHandler}
              sx={{ mt: 2, py: 1.5, borderRadius: 2, borderColor: 'primary.main', color: 'primary.main' }}
            >
              Try demo account
            </Button>
            {role === "Admin" && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Don't have an account? <StyledLink to="/Adminregister">Create school</StyledLink>
              </Typography>
            )}
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
      <Backdrop open={guestLoader} sx={{ color: '#fff', zIndex: 1400 }}>
        <Box textAlign="center">
          <CircularProgress color="inherit" sx={{ mb: 2 }} />
          <Typography>Signing in...</Typography>
        </Box>
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Grid>
  );
};

export default LoginPage;

const StyledLink = styled(Link)`
  color: #0D9488;
  font-weight: 600;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;
