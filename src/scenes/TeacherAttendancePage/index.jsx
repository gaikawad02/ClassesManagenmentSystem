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
  Snackbar,
  Alert,
  Button,
  Box,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const TeacherAttendancePage = () => {
  const [teachers, setTeachers] = useState([]);
  const [markedAttendance, setMarkedAttendance] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [classUniqueId, setClassUniqueId] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const classId = decoded.ClassUniqueId;

      if (role !== "Admin" || !classId) {
        setSnackbar({ open: true, message: "Unauthorized or invalid role", severity: "error" });
        return;
      }

      setClassUniqueId(classId);

      axios
        .get(`http://localhost:5197/api/Teacher/class/${classId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setTeachers(res.data);
        })
        .catch((err) => {
          console.error("Error fetching teachers", err);
          setSnackbar({ open: true, message: "Failed to fetch teacher data", severity: "error" });
        });
    } catch (err) {
      console.error("Token decode failed", err);
      setSnackbar({ open: true, message: "Invalid or expired token", severity: "error" });
    }
  }, [token]);

  const handleMarkAttendance = async (teacherUniqueId, status) => {
    if (markedAttendance[teacherUniqueId]) return;

    const attendanceData = {
      teacherUniqueId,
      classUniqueId,
      date: new Date().toISOString(),
      status,
      remarks: "Marked by admin",
    };

    try {
      const res = await axios.post(`http://localhost:5197/api/TeacherAttendance/mark`, attendanceData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMarkedAttendance((prev) => ({ ...prev, [teacherUniqueId]: true }));
      setSnackbar({
        open: true,
        message: res.data.message || `${status} marked successfully.`,
        severity: "success",
      });
    } catch (error) {
      if (error.response && error.response.data) {
        const backendMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message || "Something went wrong";
        setSnackbar({ open: true, message: backendMessage, severity: "warning" });
      } else {
        setSnackbar({ open: true, message: "Network error or unexpected issue", severity: "error" });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: isMobile ? "1rem" : "2rem",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#1976d2" }}>
        📘 Mark Teacher Attendance
      </Typography>

      <Box sx={{ width: isMobile ? "100%" : "80%" }}>
        <TableContainer component={Paper} elevation={6} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Subject</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Teacher ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", width: "180px" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.teacherUniqueId}>
                  <TableCell>{teacher.fullName}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.teacherUniqueId}</TableCell>
                  <TableCell>
                    {markedAttendance[teacher.teacherUniqueId] ? (
                      <Chip label="✅ Marked" color="success" />
                    ) : (
                      <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={1}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ backgroundColor: "#4CAF50", "&:hover": { backgroundColor: "#388E3C" } }}
                          onClick={() => handleMarkAttendance(teacher.teacherUniqueId, "Present")}
                        >
                          Present
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ backgroundColor: "#F44336", "&:hover": { backgroundColor: "#D32F2F" } }}
                          onClick={() => handleMarkAttendance(teacher.teacherUniqueId, "Absent")}
                        >
                          Absent
                        </Button>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {teachers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No teachers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

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

export default TeacherAttendancePage;
