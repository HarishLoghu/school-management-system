import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';

const Logout = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: 420,
          width: '100%',
          borderRadius: 3,
          textAlign: 'center',
          boxShadow: '0 8px 40px rgba(15,23,42,0.08)',
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {currentUser?.name}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Are you sure you want to sign out?
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" color="error" onClick={handleLogout} sx={{ borderRadius: 2 }}>
            Sign out
          </Button>
          <Button variant="outlined" onClick={handleCancel} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Logout;
