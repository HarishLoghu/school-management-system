import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') navigate('/Admin/dashboard');
      else if (currentRole === 'Student') navigate('/Student/dashboard');
      else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error - Ensure backend is running on http://localhost:5000");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  const roles = [
    {
      id: 'Admin',
      icon: AdminPanelSettingsIcon,
      title: 'Administrator',
      description: 'Manage classes, subjects, teachers, and students. Oversee the entire system.',
    },
    {
      id: 'Student',
      icon: SchoolIcon,
      title: 'Student',
      description: 'View your subjects, attendance, exam marks, and submit feedback.',
    },
    {
      id: 'Teacher',
      icon: PersonIcon,
      title: 'Teacher',
      description: 'Take attendance, enter marks, and manage your assigned classes.',
    },
  ];

  return (
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box textAlign="center" mb={5}>
          <Typography variant="h4" fontWeight={800} color="text.primary" gutterBottom>
            Who are you?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Select your role to continue
          </Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {roles.map(({ id, icon: Icon, title, description }) => (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <RoleCard onClick={() => navigateHandler(id)}>
                <IconWrapper>
                  <Icon sx={{ fontSize: 40 }} />
                </IconWrapper>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </RoleCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Backdrop open={loader} sx={{ color: '#fff', zIndex: 1400 }}>
        <Box textAlign="center">
          <CircularProgress color="inherit" sx={{ mb: 2 }} />
          <Typography>Signing you in...</Typography>
        </Box>
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </PageWrapper>
  );
};

export default ChooseUser;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%);
  padding: 2rem 0;
`;

const RoleCard = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 32px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.06);
  height: 100%;

  &:hover {
    border-color: #0D9488;
    box-shadow: 0 12px 40px rgba(13, 148, 136, 0.15);
    transform: translateY(-4px);
  }
`;

const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.12) 0%, rgba(15, 118, 110, 0.08) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0D9488;
  margin-bottom: 20px;
`;
