import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Snackbar, Alert
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { motion } from "framer-motion";

const StudentAttendanceHistory = () => {
  const [attendance, setAttendance] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const studentUniqueId = decoded.StudentUniqueId;

  useEffect(() => {
    if (!token || !studentUniqueId) return;

    axios
      .get(`http://localhost:5197/api/Attendance/student/history`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAttendance(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
        setSnackbar({
          open: true,
          message: "Unable to fetch attendance history.",
          severity: "error",
        });
      });
  }, [token]);

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
        Your Attendance History
      </Typography>

      <TableContainer component={Paper} elevation={4}>
        <Table>
          <TableHead style={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell style={{ color: "#fff" }}>Date</TableCell>
              <TableCell style={{ color: "#fff" }}>Teacher</TableCell>
              <TableCell style={{ color: "#fff" }}>Subject</TableCell>
              <TableCell style={{ color: "#fff" }}>Status</TableCell>
              <TableCell style={{ color: "#fff" }}>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.length > 0 ? (
              attendance.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.teacherName || "N/A"}</TableCell>
                  <TableCell>{record.subject || "N/A"}</TableCell>
                  <TableCell style={{ color: record.status === "Present" ? "green" : "red" }}>
                    {record.status}
                  </TableCell>
                  <TableCell>{record.remarks || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
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

export default StudentAttendanceHistory;
