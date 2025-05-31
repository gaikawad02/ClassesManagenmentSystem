import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  CircularProgress,
  Divider,
  useTheme,
  Card,
  CardContent,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function StudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const studentUniqueId = decoded.StudentUniqueId;

      fetch(`http://localhost:5197/api/Student/me/${studentUniqueId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setStudentData(data))
        .catch((err) =>
          console.error("Error fetching student profile:", err)
        );
    }
  }, []);

  if (!studentData) {
    return (
      <Box
        height="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  const textColor = theme.palette.mode === "dark" ? "white" : "text.primary";
  const subTextColor = theme.palette.mode === "dark" ? "white" : "text.secondary";

  const labelStyle = { fontSize: 18, color: subTextColor };
  const valueStyle = { fontWeight: 500, fontSize: 20, color: textColor };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(to right, #1f1c2c, #928dab)"
            : "linear-gradient(to right,rgb(132, 242, 252),rgb(3, 201, 201))",
        p: 4,
      }}
    >
      <MotionBox
        component={Paper}
        elevation={10}
        maxWidth="md"
        mx="auto"
        p={4}
        borderRadius={5}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90 }}
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {/* Avatar + Basic Info */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Avatar
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt={studentData.fullName}
            sx={{ width: 160, height: 160, mb: 2 }}
          />
          <Typography variant="h4" fontWeight={700} color={textColor}>
            {studentData.fullName}
          </Typography>
          <Typography variant="h6" fontWeight={500} color={textColor}>
            Unique ID: {studentData.studentUniqueId}
          </Typography>
          <Typography variant="subtitle1" color={subTextColor}>
            {studentData.medium} Medium
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Parent Contact */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom color={textColor}>
                  👨‍👩‍👧 Parent Contact
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography sx={labelStyle}>Parent Email</Typography>
                    <Typography sx={valueStyle}>
                      {studentData.parentEmail}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={labelStyle}>Parent Phone</Typography>
                    <Typography sx={valueStyle}>
                      {studentData.parentPhone}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Academic Info */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom color={textColor}>
                  📚 Academic Info
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography sx={labelStyle}>School Name</Typography>
                    <Typography sx={valueStyle}>
                      {studentData.schoolName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={labelStyle}>Standard</Typography>
                    <Typography sx={valueStyle}>
                      {studentData.class}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={labelStyle}>Decided Fees</Typography>
                    <Typography sx={valueStyle}>
                      ₹{studentData.decidedFees}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={labelStyle}>Gender</Typography>
                    <Typography sx={valueStyle}>
                      {studentData.gender}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={labelStyle}>Date of Birth</Typography>
                    <Typography sx={valueStyle}>
                      {new Date(studentData.dateOfBirth).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MotionBox>
    </Box>
  );
}
