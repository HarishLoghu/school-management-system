import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField, Paper, Typography } from "@mui/material";
import ClassIcon from '@mui/icons-material/Class';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from "../../../components/Popup";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser?._id;
    const address = "Sclass";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = { sclassName, adminID };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id);
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error - Ensure backend is running on http://localhost:5000");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

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
                    <ClassIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                    <Typography variant="h5" fontWeight={700} color="text.primary">
                        Add New Class
                    </Typography>
                </Box>

                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            label="Class Name"
                            variant="outlined"
                            value={sclassName}
                            onChange={(e) => setSclassName(e.target.value)}
                            placeholder="e.g. Class 10-A"
                            required
                        />
                        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
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
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Create Class"}
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate(-1)}
                                sx={{ borderRadius: 2, textTransform: 'none' }}
                            >
                                Go Back
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Paper>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default AddClass;
