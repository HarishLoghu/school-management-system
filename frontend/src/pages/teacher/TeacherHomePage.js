import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ClassIcon from '@mui/icons-material/Class';
import CampaignIcon from '@mui/icons-material/Campaign';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

  const classID = currentUser?.teachSclass?._id;
  const subjectID = currentUser?.teachSubject?._id;

  useEffect(() => {
    if (subjectID) dispatch(getSubjectDetails(subjectID, "Subject"));
    if (classID) dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  const numberOfStudents = sclassStudents?.length ?? 0;
  const numberOfSessions = subjectDetails?.sessions ?? 0;
  const subjectName = currentUser?.teachSubject?.subName || subjectDetails?.subName || '—';
  const className = currentUser?.teachSclass?.sclassName || subjectDetails?.sclassName?.sclassName || '—';

  const stats = [
    { label: 'Students in Class', value: numberOfStudents, icon: GroupsIcon },
    { label: 'Sessions (Subject)', value: numberOfSessions, icon: MenuBookIcon },
    { label: 'Subject', value: subjectName, icon: ClassIcon, isText: true },
    { label: 'Class', value: className, icon: CampaignIcon, isText: true },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Your assigned class and subject overview
      </Typography>
      <Grid container spacing={3}>
        {stats.map(({ label, value, icon: Icon, isText }) => (
          <Grid item xs={12} sm={6} lg={3} key={label}>
            <StatCard>
              <IconBox>
                <Icon sx={{ fontSize: 36 }} />
              </IconBox>
              <StatLabel>{label}</StatLabel>
              {isText ? (
                <StatText>{value}</StatText>
              ) : (
                <StatValue>
                  <CountUp start={0} end={value} duration={1.5} />
                </StatValue>
              )}
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

const StatText = styled(Box)`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0F172A;
`;

export default TeacherHomePage;
