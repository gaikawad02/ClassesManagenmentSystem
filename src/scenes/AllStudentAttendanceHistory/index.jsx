import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, TextField,
  Snackbar, Alert, Box, Typography, Chip, IconButton, useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

const AllStudentAttendanceHistory = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editedStatus, setEditedStatus] = useState('');
  const [editedRemarks, setEditedRemarks] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const theme = useTheme();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const classUniqueId = decodedToken.ClassUniqueId;

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:5197/api/Attendance/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Failed to fetch attendance records.', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'success';
      case 'Absent': return 'error';
      default: return 'default';
    }
  };

  const handleEdit = (record) => {
    setEditRowId(record.attendanceId);
    setEditedStatus(record.status);
    setEditedRemarks(record.remarks || '');
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditedStatus('');
    setEditedRemarks('');
  };

  const handleSave = async (record) => {
    try {
      await axios.put(`http://localhost:5197/api/Attendance/update/${record.attendanceId}`, {
        classUniqueId,
        studentUniqueId: record.studentUniqueId,
        teacherUniqueId: record.teacherUniqueId,
        status: editedStatus,
        remarks: editedRemarks
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSnackbar({ open: true, message: 'Attendance updated successfully.', severity: 'success' });
      setEditRowId(null);
      fetchAttendance();
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error updating attendance.', severity: 'error' });
    }
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(`http://localhost:5197/api/Attendance/delete/${record.attendanceId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSnackbar({ open: true, message: 'Attendance deleted successfully.', severity: 'success' });
      fetchAttendance();
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error deleting attendance.', severity: 'error' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box p={3}>
        <Typography variant="h5" align="center" fontWeight="bold" mb={3}>
          All Student Attendance History
        </Typography>

        <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 4, p: 1 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#222' : '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Student Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Standard</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Remarks</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceRecords.map((record) => {
                const isEditing = editRowId === record.attendanceId;

                return (
                  <TableRow key={record.attendanceId} hover>
                    <TableCell>{record.studentName}</TableCell>
                    <TableCell>{record.standard}</TableCell>
                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          select
                          fullWidth
                          size="small"
                          SelectProps={{ native: true }}
                          value={editedStatus}
                          onChange={(e) => setEditedStatus(e.target.value)}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                        </TextField>
                      ) : (
                        <Chip label={record.status} color={getStatusColor(record.status)} />
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={editedRemarks}
                          onChange={(e) => setEditedRemarks(e.target.value)}
                        />
                      ) : (
                        record.remarks || '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <>
                          <IconButton color="success" onClick={() => handleSave(record)}>
                            <SaveIcon />
                          </IconButton>
                          <IconButton color="inherit" onClick={handleCancel}>
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton color="primary" onClick={() => handleEdit(record)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDelete(record)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default AllStudentAttendanceHistory;
