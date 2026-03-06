import * as React from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../redux/userRelated/userSlice';
import { underStudentControl } from '../redux/studentRelated/studentSlice';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const Popup = ({ message, setShowPopup, showPopup }) => {
    const dispatch = useDispatch();

    const vertical = "top"
    const horizontal = "right"

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopup(false);
        dispatch(underControl())
        dispatch(underStudentControl())
    };

    const isSuccess = message === "Done Successfully" || message === "Added Successfully";

    return (
        <>
            <Snackbar
                open={showPopup}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}
                sx={{ '& .MuiPaper-root': { borderRadius: 2, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' } }}
            >
                <MuiAlert
                    onClose={handleClose}
                    severity={isSuccess ? 'success' : 'error'}
                    variant="filled"
                    sx={{
                        width: '100%',
                        borderRadius: 2,
                        fontWeight: 500,
                    }}
                >
                    {message}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default Popup;
