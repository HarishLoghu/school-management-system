import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import SubjectIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';

const StudentHomePage = () => {
  const dispatch = useDispatch();
  const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
  const { subjectsList } = useSelector((state) => state.sclass);
  const [subjectAttendance, setSubjectAttendance] = useState([]);

  const classID = currentUser?.sclassName?._id;

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getUserDetails(currentUser._id, "Student"));
    }
    if (classID) {
      dispatch(getSubjectList(classID, "ClassSubjects"));
    }
  }, [dispatch, currentUser?._id, classID]);

  const numberOfSubjects = subjectsList?.length ?? 0;

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = Math.max(0, 100 - overallAttendancePercentage);

  const chartData = [
    { name: 'Present', value: overallAttendancePercentage },
    { name: 'Absent', value: overallAbsentPercentage },
  ];

  const stats = [
    { label: 'Enrolled Subjects', value: numberOfSubjects, icon: SubjectIcon },
    { label: 'Attendance Recorded', value: subjectAttendance?.length ?? 0, icon: AssignmentIcon },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Your overview and attendance
      </Typography>
      <Grid container spacing={3}>
        {stats.map(({ label, value, icon: Icon }) => (
          <Grid item xs={12} sm={6} md={3} key={label}>
            <StatCard>
              <IconBox>
                <Icon sx={{ fontSize: 36 }} />
              </IconBox>
              <StatLabel>{label}</StatLabel>
              <StatValue>
                <CountUp start={0} end={value} duration={1.5} />
              </StatValue>
            </StatCard>
          </Grid>
        ))}
        <Grid item xs={12} md={6}>
          <StatCard sx={{ height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Attendance Overview
            </Typography>
            {loading ? (
              <Typography color="text.secondary">Loading...</Typography>
            ) : response || !subjectAttendance?.length ? (
              <Typography color="text.secondary">No attendance data yet</Typography>
            ) : (
              <CustomPieChart data={chartData} />
            )}
          </StatCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <StatCard sx={{ height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <TrendingUpIcon color="primary" />
              <Typography variant="subtitle1" fontWeight={600}>
                Overall Attendance
              </Typography>
            </Box>
            <Typography variant="h3" fontWeight={800} color="primary.main">
              <CountUp start={0} end={Math.round(overallAttendancePercentage)} duration={1.5} />%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Based on recorded sessions
            </Typography>
          </StatCard>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <SeeNotice />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const StatCard = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
  }
`;

const IconBox = styled(Box)`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.12) 0%, rgba(15, 118, 110, 0.08) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0D9488;
  margin-bottom: 16px;
`;

const StatLabel = styled.p`
  font-size: 0.95rem;
  color: #64748B;
  margin: 0 0 8px 0;
`;

const StatValue = styled(Box)`
  font-size: 2rem;
  font-weight: 800;
  color: #0D9488;
`;

export default StudentHomePage;
