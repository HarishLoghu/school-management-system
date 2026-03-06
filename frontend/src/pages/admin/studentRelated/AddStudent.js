import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userState = useSelector(state => state.user);
  const { status, currentUser, response, error } = userState;
  const { sclassesList } = useSelector((state) => state.sclass);

  const [name, setName] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [password, setPassword] = useState('');
  const [className, setClassName] = useState('');
  const [sclassName, setSclassName] = useState('');

  const adminID = currentUser?._id;
  const role = "Student";
  const attendance = [];

  useEffect(() => {
    if (situation === "Class") {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (adminID) dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const changeHandler = (event) => {
    const val = event.target.value;
    if (!val || val === '') {
      setClassName('');
      setSclassName('');
    } else {
      const selectedClass = sclassesList?.find((c) => c.sclassName === val);
      if (selectedClass) {
        setClassName(selectedClass.sclassName);
        setSclassName(selectedClass._id);
      }
    }
  };

  const fields = { name, rollNum, password, sclassName, adminID, role, attendance };

  const submitHandler = (event) => {
    event.preventDefault();
    if (situation === "Student" && !sclassName) {
      setMessage("Please select a class");
      setShowPopup(true);
      return;
    }
    setLoader(true);
    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl());
      navigate(-1);
    } else if (status === 'failed') {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage("Network Error - Ensure backend is running on http://localhost:5000");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

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
          <PersonAddIcon sx={{ color: 'primary.main', fontSize: 32 }} />
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Add Student
          </Typography>
        </Box>

        <form onSubmit={submitHandler}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student's name"
              required
              autoComplete="name"
            />
            {situation === "Student" && (
              <FormControl fullWidth required>
                <InputLabel>Class</InputLabel>
                <Select
                  value={className}
                  label="Class"
                  onChange={changeHandler}
                >
                  <MenuItem value="">
                    <em>Select Class</em>
                  </MenuItem>
                  {sclassesList?.map((classItem, index) => (
                    <MenuItem key={index} value={classItem.sclassName}>
                      {classItem.sclassName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <TextField
              fullWidth
              type="number"
              label="Roll Number"
              value={rollNum}
              onChange={(e) => setRollNum(e.target.value)}
              placeholder="Enter roll number"
              required
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="new-password"
            />
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, mt: 1 }}>
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
                {loader ? <CircularProgress size={24} color="inherit" /> : 'Add Student'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate(-1)}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default AddStudent;
