import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  useMediaQuery,
  Box,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [standards, setStandards] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState("");
  const [markedAttendance, setMarkedAttendance] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const token = localStorage.getItem("token");

  let decoded = {};
  let role = "";
  let classUniqueId = "";
  let teacherUniqueId = "";

  try {
    decoded = jwtDecode(token);
    role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    classUniqueId = decoded.ClassUniqueId;
    teacherUniqueId = decoded.TeacherUniqueId;
  } catch (err) {
    setSnackbar({ open: true, message: "Invalid or expired token", severity: "error" });
  }

  useEffect(() => {
    if (!token || role !== "Teacher" || !classUniqueId) return;

    axios
      .get(`http://localhost:5197/api/Student/class/${classUniqueId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data;
        const uniqueStandards = [...new Set(data.map((s) => s.class))];
        setStandards(uniqueStandards);
        setStudents(data);
      })
      .catch((error) => {
        setSnackbar({ open: true, message: "Failed to fetch student data", severity: "error" });
        console.error("Error fetching students:", error);
      });
  }, [token]);

  const handleMarkAttendance = async (studentId, status) => {
    if (markedAttendance[studentId]) return;

    const attendanceData = {
      studentUniqueId: studentId,
      classUniqueId,
      teacherUniqueId,
      date: new Date().toISOString(),
      status,
      remarks: "Marked via portal",
    };

    try {
      const response = await axios.post("http://localhost:5197/api/Attendance/mark", attendanceData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMarkedAttendance((prev) => ({ ...prev, [studentId]: true }));
      setSnackbar({
        open: true,
        message: response.data.message || `Student ${status.toLowerCase()}ed!`,
        severity: "success",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ===
        "Attendance already marked for this student on this date by you."
          ? error.response.data.message
          : "Error marking attendance";

      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const filteredStudents = selectedStandard
    ? students.filter((s) => s.class === selectedStandard)
    : students;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: isMobile ? "1rem" : "2rem",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
        📋 Mark Attendance
      </Typography>

      <FormControl fullWidth style={{ marginBottom: "1rem" }}>
        <InputLabel>Select Standard</InputLabel>
        <Select value={selectedStandard} label="Select Standard" onChange={(e) => setSelectedStandard(e.target.value)}>
          <MenuItem value="">All</MenuItem>
          {standards.map((std) => (
            <MenuItem key={std} value={std}>
              {std}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Gender</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Class</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>School</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.studentUniqueId}>
                <TableCell>{student.fullName}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.schoolName}</TableCell>
                <TableCell>
                  <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={1}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        "&:hover": { backgroundColor: "#43A047" },
                      }}
                      disabled={markedAttendance[student.studentUniqueId]}
                      onClick={() => handleMarkAttendance(student.studentUniqueId, "Present")}
                    >
                      Present
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#F44336",
                        color: "white",
                        "&:hover": { backgroundColor: "#E53935" },
                      }}
                      disabled={markedAttendance[student.studentUniqueId]}
                      onClick={() => handleMarkAttendance(student.studentUniqueId, "Absent")}
                    >
                      Absent
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No students found.
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

export default AttendancePage;
