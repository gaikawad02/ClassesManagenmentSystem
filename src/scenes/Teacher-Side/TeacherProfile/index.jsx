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
  IconButton,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";

const MotionBox = motion(Box);

export default function TeacherProfile() {
  const [teacherData, setTeacherData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const teacherUniqueId = decoded.TeacherUniqueId;

      fetch(`http://localhost:5197/api/Teacher/${teacherUniqueId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setTeacherData(data))
        .catch((err) =>
          console.error("Error fetching teacher profile:", err)
        );
    }
  }, []);

  if (!teacherData) {
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

  const labelStyle = { fontSize: 20, color: subTextColor };
  const valueStyle = { fontWeight: 500, fontSize: 24, color: textColor };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(to right, #1f1c2c, #928dab)"
            : "linear-gradient(to right,rgb(165, 245, 230),rgb(3, 173, 134))",
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
            alt={teacherData.fullName}
            sx={{ width: 160, height: 160, mb: 2 }}
          />
          <Typography variant="h4" fontWeight={700} color={textColor}>
            {teacherData.fullName}
          </Typography>
          <Typography variant="h6" fontWeight={500} color={textColor}>
            Teacher Unique ID: {teacherData.teacherUniqueId}
          </Typography>
        </Box>

        {/* Info Cards */}
        <Grid container spacing={4}>
          {/* Contact Info */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom color={textColor}>
                  📞 Contact Info
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography sx={labelStyle}>Email</Typography>
                    <Typography sx={valueStyle}>{teacherData.email}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={labelStyle}>Phone</Typography>
                    <Typography sx={valueStyle}>{teacherData.phone}</Typography>
                  </Grid>
                </Grid>

                {/* Gender & Subject */}
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={6}>
                    <Typography sx={labelStyle}>Gender</Typography>
                    <Typography sx={valueStyle}>{teacherData.gender}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={labelStyle}>Subject</Typography>
                    <Typography sx={valueStyle}>{teacherData.subject}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom color={textColor}>
                  🌐 Social Media Links
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" justifyContent="center" alignItems="center">
                  <IconButton
                    color="primary"
                    href={`https://facebook.com/${teacherData.facebook}`}
                    target="_blank"
                    rel="noopener"
                  >
                    <Facebook fontSize="large" sx={{ color: textColor }} />
                  </IconButton>
                  <IconButton
                    color="primary"
                    href={`https://instagram.com/${teacherData.instagram}`}
                    target="_blank"
                    rel="noopener"
                  >
                    <Instagram fontSize="large" sx={{ color: textColor }} />
                  </IconButton>
                  <IconButton
                    color="primary"
                    href={`https://linkedin.com/in/${teacherData.linkedin}`}
                    target="_blank"
                    rel="noopener"
                  >
                    <LinkedIn fontSize="large" sx={{ color: textColor }} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MotionBox>
    </Box>
  );
}
