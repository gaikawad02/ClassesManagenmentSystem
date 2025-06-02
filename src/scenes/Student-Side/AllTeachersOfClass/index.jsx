import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Avatar,
  IconButton,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const AllTeachersOfClass = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const classUniqueId = decoded.ClassUniqueId;

      fetch(`http://localhost:5197/api/Teacher/class/${classUniqueId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTeachers(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching teachers:", err);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <Box
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(to right, #232526, #414345)"
            : "linear-gradient(to right, #e0eafc, #cfdef3)",
        p: 4,
      }}
    >
      <Typography
        variant="h2"
        fontWeight="bold"
        textAlign="center"
        mb={6}
        color={theme.palette.text.primary}
      >
        Our Teachers
      </Typography>

      <Grid container spacing={4}>
        {teachers.map((teacher, index) => (
          <Grid item xs={12} sm={6} md={4} key={teacher.teacherUniqueId}>
            <MotionCard
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              elevation={8}
              sx={{
                borderRadius: 4,
                p: 3,
                height: "400px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Avatar
                src="https://th.bing.com/th/id/OIP.8gzuZP7CrElihtJeFkuLYQHaHa?rs=1&pid=ImgDetMain"
                alt={teacher.fullName}
                sx={{ width: 120, height: 120, mb: 3 }}
              />
              <Box textAlign="center">
                <Typography variant="h2" fontWeight={700}>
                  {teacher.fullName}
                </Typography>
                <Typography
                  variant="h3"
                  color="text.secondary"
                  fontStyle="italic"
                  mt={1}
                >
                  {teacher.subject}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="center" gap={3} mt={2}>
                <IconButton
                  href={`https://facebook.com/${teacher.facebook}`}
                  target="_blank"
                  rel="noopener"
                >
                  <Facebook fontSize="large" />
                </IconButton>
                <IconButton
                  href={`https://instagram.com/${teacher.instagram}`}
                  target="_blank"
                  rel="noopener"
                >
                  <Instagram fontSize="large" />
                </IconButton>
                <IconButton
                  href={`https://linkedin.com/in/${teacher.linkedin}`}
                  target="_blank"
                  rel="noopener"
                >
                  <LinkedIn fontSize="large" />
                </IconButton>
              </Box>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllTeachersOfClass;
