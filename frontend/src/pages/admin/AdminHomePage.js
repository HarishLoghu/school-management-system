import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import GroupsIcon from '@mui/icons-material/Groups';
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import CampaignIcon from '@mui/icons-material/Campaign';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { getAllNotices } from '../../redux/noticeRelated/noticeHandle';
import styled from 'styled-components';

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { studentsList } = useSelector((state) => state.student);
  const { sclassesList } = useSelector((state) => state.sclass);
  const { teachersList } = useSelector((state) => state.teacher);
  const { noticesList } = useSelector((state) => state.notice);
  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser?._id;

  useEffect(() => {
    if (adminID) {
      dispatch(getAllStudents(adminID));
      dispatch(getAllSclasses(adminID, "Sclass"));
      dispatch(getAllTeachers(adminID));
      dispatch(getAllNotices(adminID, "Notice"));
    }
  }, [adminID, dispatch]);

  const numberOfStudents = studentsList?.length ?? 0;
  const numberOfClasses = sclassesList?.length ?? 0;
  const numberOfTeachers = teachersList?.length ?? 0;
  const numberOfNotices = noticesList?.length ?? 0;

  const stats = [
    { label: 'Total Students', value: numberOfStudents, icon: GroupsIcon, color: '#0D9488' },
    { label: 'Total Classes', value: numberOfClasses, icon: ClassIcon, color: '#0F766E' },
    { label: 'Total Teachers', value: numberOfTeachers, icon: PersonIcon, color: '#115E59' },
    { label: 'Announcements', value: numberOfNotices, icon: CampaignIcon, color: '#F59E0B' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
        Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Summary of your school's key metrics
      </Typography>
      <Grid container spacing={3}>
        {stats.map(({ label, value, icon: Icon, color }, idx) => (
          <Grid item xs={12} sm={6} lg={3} key={label}>
            <StatCard>
              <IconBox sx={{ bgcolor: `${color}15` }}>
                <Icon sx={{ fontSize: 36, color }} />
              </IconBox>
              <StatLabel>{label}</StatLabel>
              <StatValue sx={{ color }}>
                <CountUp start={0} end={value} duration={1.5} />
              </StatValue>
            </StatCard>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <SeeNotice />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminHomePage;

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
  display: flex;
  align-items: center;
  justify-content: center;
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
`;
