import React, { useEffect, useState, useMemo } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Snackbar, Alert,
  IconButton, Select, MenuItem, FormControl, InputLabel, TextField
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { motion } from "framer-motion";

const AllTeacherAttendanceHistory = () => {
  const [attendance, setAttendance] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({ status: "", remarks: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [loading, setLoading] = useState(true);

  // Secure token handling with error catching
  const token = localStorage.getItem("token");
  let decoded = null;
  let role = "";
  let currentTeacherId = "";
  let classUniqueId = "";

  try {
    decoded = token ? jwtDecode(token) : null;
    role = decoded?.role || "";
    currentTeacherId = decoded?.TeacherUniqueId || "";
    classUniqueId = decoded?.ClassUniqueId || "";
  } catch (error) {
    console.error("Error decoding token:", error);
    setSnackbar({
      open: true,
      message: "Session error. Please login again.",
      severity: "error",
    });
  }

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`http://localhost:5197/api/TeacherAttendance/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);
      
      if (response.data && Array.isArray(response.data)) {
        setAttendance(response.data);
        
        const uniqueTeachers = [...new Set(response.data
          .filter(record => record.teacherName)
          .map(record => record.teacherName))];
        setTeachers(uniqueTeachers);
      } else {
        setAttendance([]);
        setTeachers([]);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setSnackbar({
        open: true,
        message: "Unable to fetch attendance data.",
        severity: "error",
      });
      setAttendance([]);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAttendanceData();
    }
  }, [token]);

  const filteredAttendance = useMemo(() => {
    if (!attendance || !Array.isArray(attendance)) return [];
    
    return selectedTeacher
      ? attendance.filter(record => 
          record.teacherName && 
          record.teacherName === selectedTeacher
        )
      : attendance;
  }, [attendance, selectedTeacher]);

  const handleEdit = (index) => {
    if (!filteredAttendance[index]) return;
    
    setEditRow(index);
    setEditData({
      status: filteredAttendance[index].status || "",
      remarks: filteredAttendance[index].remarks || "",
    });
  };

  const handleSave = async (attendanceId) => {
    try {
      const recordToUpdate = filteredAttendance[editRow];
      if (!recordToUpdate) return;

      await axios.put(`http://localhost:5197/api/TeacherAttendance/update/${attendanceId}`, {
        status: editData.status,
        remarks: editData.remarks,
        classUniqueId: classUniqueId,
        teacherUniqueId: recordToUpdate.teacherUniqueId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSnackbar({
        open: true,
        message: "Attendance updated successfully.",
        severity: "success",
      });
      setEditRow(null);
      fetchAttendanceData();
    } catch (error) {
      console.error("Error updating attendance:", error);
      setSnackbar({
        open: true,
        message: "Error updating attendance.",
        severity: "error",
      });
    }
  };

  const handleDelete = async (attendanceId) => {
    try {
      await axios.delete(`http://localhost:5197/api/TeacherAttendance/delete/${attendanceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSnackbar({
        open: true,
        message: "Attendance deleted successfully.",
        severity: "success",
      });
      fetchAttendanceData();
    } catch (error) {
      console.error("Error deleting attendance:", error);
      setSnackbar({
        open: true,
        message: "Error deleting attendance.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "info" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ padding: "2rem" }}
    >
      <Typography variant="h5" gutterBottom>
        All Teachers' Attendance History
      </Typography>

      {/* Debug info - remove in production */}
      <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <Typography variant="body2">
          Debug Info: Role: {role || 'Not set'}, Teacher ID: {currentTeacherId || 'Not set'}
        </Typography>
      </div>

      {role === "Admin" && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Teacher</InputLabel>
          <Select
            value={selectedTeacher}
            label="Select Teacher"
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <MenuItem value="">All Teachers</MenuItem>
            {teachers.map((teacher, index) => (
              <MenuItem key={index} value={teacher}>
                {teacher}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <TableContainer component={Paper} elevation={4} sx={{ maxHeight: '70vh', overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Teacher Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Remarks</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', minWidth: '150px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading attendance...
                </TableCell>
              </TableRow>
            ) : filteredAttendance.length > 0 ? (
              filteredAttendance.map((record, index) => (
                <TableRow key={index} hover>
                  <TableCell>{record.teacherName || '-'}</TableCell>
                  <TableCell>{record.teacherSubject || '-'}</TableCell>
                  <TableCell>
                    {record.date ? new Date(record.date).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    {editRow === index ? (
                      <Select
                        value={editData.status}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                        size="small"
                        fullWidth
                      >
                        <MenuItem value="Present">Present</MenuItem>
                        <MenuItem value="Absent">Absent</MenuItem>
                      </Select>
                    ) : (
                      <span style={{ 
                        color: record.status === "Present" ? "green" : "red",
                        fontWeight: 'bold'
                      }}>
                        {record.status || '-'}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editRow === index ? (
                      <TextField
                        value={editData.remarks}
                        onChange={(e) => setEditData({ ...editData, remarks: e.target.value })}
                        size="small"
                        fullWidth
                        variant="outlined"
                      />
                    ) : (
                      record.remarks || "-"
                    )}
                  </TableCell>
                  <TableCell sx={{ minWidth: '150px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {editRow === index ? (
                        <>
                          <IconButton 
                            onClick={() => handleSave(record.attendanceId)}
                            color="success"
                            size="small"
                            sx={{ 
                              backgroundColor: '#4caf50',
                              '&:hover': { backgroundColor: '#388e3c' }
                            }}
                          >
                            <Save fontSize="small" />
                          </IconButton>
                          <IconButton 
                            onClick={() => setEditRow(null)}
                            color="error"
                            size="small"
                            sx={{ 
                              backgroundColor: '#f44336',
                              '&:hover': { backgroundColor: '#d32f2f' }
                            }}
                          >
                            <Cancel fontSize="small" />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton 
                            onClick={() => handleEdit(index)}
                            color="primary"
                            size="small"
                            sx={{ 
                              backgroundColor: '#2196f3',
                              '&:hover': { backgroundColor: '#1976d2' }
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton 
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this record?')) {
                                handleDelete(record.attendanceId);
                              }
                            }}
                            color="error"
                            size="small"
                            sx={{ 
                              backgroundColor: '#f44336', 
                              '&:hover': { backgroundColor: '#d32f2f' }
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No attendance records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default AllTeacherAttendanceHistory;