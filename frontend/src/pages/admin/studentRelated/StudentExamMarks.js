import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { underStudentControl } from '../../../redux/studentRelated/studentSlice';

import {
  Box,
  Paper,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stack,
  TextField,
  CircularProgress,
  FormControl,
  Button,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Popup from '../../../components/Popup';

const StudentExamMarks = ({ situation }) => {
  const dispatch = useDispatch();
  const { currentUser, userDetails, loading } = useSelector((state) => state.user);
  const { subjectsList } = useSelector((state) => state.sclass);
  const { response, error, statestatus } = useSelector((state) => state.student);
  const params = useParams();

  const [studentID, setStudentID] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [chosenSubName, setChosenSubName] = useState("");
  const [marksObtained, setMarksObtained] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (situation === "Student") {
      setStudentID(params.id);
      dispatch(getUserDetails(params.id, "Student"));
    } else if (situation === "Subject") {
      const { studentID: sid, subjectID } = params;
      setStudentID(sid);
      setChosenSubName(subjectID);
      dispatch(getUserDetails(sid, "Student"));
    }
  }, [situation, params.id, params.studentID, params.subjectID, dispatch]);

  useEffect(() => {
    if (userDetails?.sclassName?._id && situation === "Student") {
      dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
    }
  }, [dispatch, userDetails, situation]);

  const changeHandler = (event) => {
    const selectedSubject = subjectsList?.find((s) => s.subName === event.target.value);
    if (selectedSubject) {
      setSubjectName(selectedSubject.subName);
      setChosenSubName(selectedSubject._id);
    }
  };

  const fields = { subName: chosenSubName, marksObtained };

  const submitHandler = (event) => {
    event.preventDefault();
    if (situation === "Student" && !chosenSubName) {
      setMessage("Please select a subject");
      setShowPopup(true);
      return;
    }
    setLoader(true);
    dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"));
  };

  useEffect(() => {
    if (response) {
      setLoader(false);
      setShowPopup(true);
      setMessage(response);
      dispatch(underStudentControl());
    } else if (error) {
      setLoader(false);
      setShowPopup(true);
      setMessage("Network Error - Ensure backend is running on http://localhost:5000");
      dispatch(underStudentControl());
    } else if (statestatus === "added") {
      setLoader(false);
      setShowPopup(true);
      setMessage("Marks saved successfully");
      dispatch(underStudentControl());
    }
  }, [response, statestatus, error, dispatch]);

  if (loading || !userDetails) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', minHeight: '60vh' }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: 520,
          width: '100%',
          borderRadius: 3,
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <AssignmentIcon sx={{ color: 'primary.main', fontSize: 32 }} />
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Enter Exam Marks
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 3 }}>
          <strong>Student:</strong> {userDetails?.name || '—'}
        </Typography>
        {currentUser?.teachSubject && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Subject: {currentUser.teachSubject?.subName}
          </Typography>
        )}

        <form onSubmit={submitHandler}>
          <Stack spacing={3}>
            {situation === "Student" && (
              <FormControl fullWidth required>
                <InputLabel>Select Subject</InputLabel>
                <Select
                  value={subjectName}
                  label="Select Subject"
                  onChange={changeHandler}
                >
                  {subjectsList?.length > 0 ? (
                    subjectsList.map((subject, index) => (
                      <MenuItem key={index} value={subject.subName}>
                        {subject.subName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>No subjects available</MenuItem>
                  )}
                </Select>
              </FormControl>
            )}
            <TextField
              fullWidth
              type="number"
              label="Marks Obtained"
              value={marksObtained}
              onChange={(e) => setMarksObtained(e.target.value)}
              required
              inputProps={{ min: 0, max: 100 }}
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loader}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              {loader ? <CircularProgress size={24} color="inherit" /> : "Submit Marks"}
            </Button>
          </Stack>
        </form>
      </Paper>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default StudentExamMarks;
