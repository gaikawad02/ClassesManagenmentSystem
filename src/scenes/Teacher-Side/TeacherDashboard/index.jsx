import React from "react";
import { Box, Typography, Paper, Grid, useTheme, Tooltip, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaBookOpen, FaUserClock } from "react-icons/fa";
import CountUp from "react-countup";

const MotionPaper = motion(Paper);

const summaryCards = [
  {
    title: "Profile Info",
    details: [
      { label: "Name", value: "Ms. Priya Sharma" },
      { label: "Email", value: "priya.sharma@example.com" },
      { label: "Subject", value: "Mathematics" },
      { label: "Teaching Standards", value: "8th - 10th" },
    ],
    icon: <FaChalkboardTeacher size={30} />,
    gradient: ["#ff7e5f", "#feb47b"],
  },
  {
    title: "Class Assigned",
    details: [
      { label: "Total Classes", value: 5 },
      { label: "Current Batches", value: 3 },
      { label: "Subjects", value: "Maths, Science" },
    ],
    icon: <FaBookOpen size={30} />,
    gradient: ["#43cea2", "#185a9d"],
  },
  {
    title: "Attendance Summary",
    details: [
      { label: "Total Working Days", value: 80 },
      { label: "Days Present", value: 77 },
      { label: "Days Absent", value: 3 },
    ],
    icon: <FaUserClock size={30} />,
    gradient: ["#667eea", "#764ba2"],
  },
];

const coachingInfo = {
  className: "Elite Coaching Academy",
  address: "123 Coaching Street, City, Country",
  establishedYear: 2005,
  phoneNumber: "+1234567890",
};

const TeacherDashboard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        padding: { xs: 3, md: 5 },
        backgroundColor: isDark ? "background.default" : "#f5f7fa",
        minHeight: "100vh",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        sx={{
          fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem" },
          color: isDark ? "white" : "primary.main",
        }}
      >
        Welcome, Ms. Priya Sharma! 👩‍🏫
      </Typography>

      {/* Coaching Class Info */}
      <MotionPaper
        elevation={8}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        sx={{
          borderRadius: 6,
          p: 4,
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "#fff",
          mb: 4,
          boxShadow: 5,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            letterSpacing: "0.5px",
          }}
        >
          Coaching Class Information
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ fontSize: "1.1rem" }}>
          <strong>Class Name:</strong> {coachingInfo.className}
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ fontSize: "1.1rem" }}>
          <strong>Address:</strong> {coachingInfo.address}
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ fontSize: "1.1rem" }}>
          <strong>Established Year:</strong> {coachingInfo.establishedYear}
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ fontSize: "1.1rem" }}>
          <strong>Phone Number:</strong> {coachingInfo.phoneNumber}
        </Typography>
      </MotionPaper>

      {/* Summary Cards */}
      <Grid container spacing={4}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <MotionPaper
              elevation={8}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              sx={{
                borderRadius: 6,
                p: 4,
                background: `linear-gradient(135deg, ${card.gradient[0]}, ${card.gradient[1]})`,
                color: "#fff",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 5,
              }}
            >
              {/* Icon */}
              <Box display="flex" justifyContent="center" mb={3}>
                {card.icon}
              </Box>

              {/* Title */}
              <Typography
                variant="h5"
                align="center"
                gutterBottom
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                }}
              >
                {card.title}
              </Typography>

              {/* Details */}
              <Box mt={2}>
                {card.details.map((item, idx) => (
                  <Tooltip title={`${item.label}: ${item.value}`} placement="top" key={idx}>
                    <Typography
                      variant="body1"
                      textAlign="center"
                      sx={{
                        fontSize: "1.1rem",
                        cursor: "pointer",
                      }}
                    >
                      <strong>{item.label}:</strong>{" "}
                      {typeof item.value === "number" ? (
                        <CountUp end={item.value} duration={2} />
                      ) : (
                        item.value
                      )}
                    </Typography>
                  </Tooltip>
                ))}
              </Box>

              {/* Progress Bars */}
              {card.title === "Attendance Summary" && (
                <Box mt={2}>
                  <LinearProgress
                    variant="determinate"
                    value={(77 / 80) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: "rgba(255,255,255,0.3)",
                    }}
                  />
                </Box>
              )}
            </MotionPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeacherDashboard;
