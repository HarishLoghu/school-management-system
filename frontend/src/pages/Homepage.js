import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Students from "../assets/students.svg";

const Homepage = () => {
  return (
    <HeroWrapper>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: '100vh', py: 4 }}>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <HeroContent>
              <Badge>Modern School Management</Badge>
              <HeroTitle>
                Manage Your School
                <br />
                <GradientText>Effortlessly</GradientText>
              </HeroTitle>
              <HeroSubtitle>
                One powerful platform to handle classes, attendance, grades, and communication. 
                Built for administrators, teachers, and students.
              </HeroSubtitle>
              <FeatureRow>
                <FeatureItem>
                  <SchoolIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                  <span>Classes & Subjects</span>
                </FeatureItem>
                <FeatureItem>
                  <GroupsIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                  <span>Students & Faculty</span>
                </FeatureItem>
                <FeatureItem>
                  <AssignmentIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                  <span>Attendance & Grades</span>
                </FeatureItem>
                <FeatureItem>
                  <TrendingUpIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                  <span>Track Progress</span>
                </FeatureItem>
              </FeatureRow>
              <ButtonRow>
                <StyledLink to="/choose">
                  <PrimaryButton variant="contained" fullWidth size="large">
                    Get Started — Login
                  </PrimaryButton>
                </StyledLink>
                <StyledLink to="/chooseasguest">
                  <OutlineButton variant="outlined" fullWidth size="large">
                    Try Demo
                  </OutlineButton>
                </StyledLink>
              </ButtonRow>
              <SignUpText>
                New here? <StyledLink to="/Adminregister">Create your school</StyledLink>
              </SignUpText>
            </HeroContent>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <IllustrationBox>
              <img src={Students} alt="Students learning" />
            </IllustrationBox>
          </Grid>
        </Grid>
      </Container>
    </HeroWrapper>
  );
};

export default Homepage;

const HeroWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 50%, #F1F5F9 100%);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 80%;
    height: 120%;
    background: radial-gradient(ellipse, rgba(13, 148, 136, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  animation: fadeInUp 0.8s ease-out;
`;

const Badge = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, rgba(13, 148, 136, 0.12) 0%, rgba(15, 118, 110, 0.08) 100%);
  color: #0D9488;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 50px;
  margin-bottom: 24px;
  border: 1px solid rgba(13, 148, 136, 0.2);
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #0F172A;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #0D9488 0%, #0F766E 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  color: #64748B;
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 480px;
`;

const FeatureRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
  margin-bottom: 40px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #475569;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 320px;
  margin-bottom: 24px;
`;

const PrimaryButton = styled(Button)`
  && {
    padding: 14px 28px;
    font-size: 1rem;
    border-radius: 12px;
    text-transform: none;
  }
`;

const OutlineButton = styled(Button)`
  && {
    padding: 14px 28px;
    font-size: 1rem;
    border-radius: 12px;
    text-transform: none;
    border-color: #0D9488;
    color: #0D9488;
    &:hover {
      border-color: #0F766E;
      background: rgba(13, 148, 136, 0.06);
    }
  }
`;

const SignUpText = styled.p`
  font-size: 0.95rem;
  color: #64748B;
  & a {
    color: #0D9488;
    font-weight: 600;
    &:hover { text-decoration: underline; }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const IllustrationBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInUp 0.8s ease-out 0.2s both;
  img {
    max-width: 100%;
    height: auto;
  }
`;
