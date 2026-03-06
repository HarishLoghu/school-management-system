import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, CircularProgress, Box } from '@mui/material';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import TableViewTemplate from './TableViewTemplate';

const SeeNotice = () => {
  const dispatch = useDispatch();
  const { currentUser, currentRole } = useSelector(state => state.user);
  const { noticesList, loading, error, response } = useSelector((state) => state.notice);

  useEffect(() => {
    if (currentUser && currentRole === "Admin") {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    } else if (currentUser?.school?._id) {
      dispatch(getAllNotices(currentUser.school._id, "Notice"));
    }
  }, [dispatch, currentUser, currentRole]);

  const noticeColumns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'details', label: 'Details', minWidth: 200 },
    { id: 'date', label: 'Date', minWidth: 120 },
  ];

  const noticeRows = Array.isArray(noticesList)
    ? noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = isNaN(date.getTime()) ? '—' : date.toLocaleDateString();
        return {
          title: notice.title,
          details: notice.details,
          date: dateString,
          id: notice._id,
        };
      })
    : [];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (response) {
    return (
      <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
        No announcements yet. Add one from the Notices section.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Recent Announcements
      </Typography>
      {noticeRows.length > 0 ? (
        <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
      ) : (
        <Typography color="text.secondary" sx={{ py: 3 }}>
          No announcements to display.
        </Typography>
      )}
    </Box>
  );
};

export default SeeNotice;
