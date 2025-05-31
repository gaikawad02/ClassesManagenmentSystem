import React from "react";
import { Box, Typography, Paper, Grid, useTheme, LinearProgress, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { FaUserGraduate, FaMoneyBillWave, FaCalendarCheck } from "react-icons/fa";
import CountUp from "react-countup";

const MotionPaper = motion(Paper);

const summaryCards = [
  {
    title: "Profile Info",
    details: [
      { label: "Name", value: "John Doe" },
      { label: "Email", value: "john@example.com" },
      { label: "Standard", value: "10th" },
      { label: "Class", value: "A" },
    ],
    icon: <FaUserGraduate size={30} />,
    gradient: ["#ff7e5f", "#feb47b"],
  },
  {
    title: "Fees Details",
    details: [
      { label: "Total Fees", value: "₹15,000" },
      { label: "Paid", value: "₹10,000" },
      { label: "Pending", value: "₹5,000" },
    ],
    icon: <FaMoneyBillWave size={30} />,
    gradient: ["#43cea2", "#185a9d"],
  },
  {
    title: "Attendance",
    details: [
      { label: "Total Days", value: 80 },
      { label: "Present", value: 75 },
      { label: "Absent", value: 5 },
    ],
    icon: <FaCalendarCheck size={30} />,
    gradient: ["#667eea", "#764ba2"],
  },
];

const coachingInfo = {
  className: "Elite Coaching Academy",
  address: "123 Coaching Street, City, Country",
  establishedYear: 2005,
  phoneNumber: "+1234567890",
};

const StudentDashboard = () => {
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
          color: isDark ? "white" : "primary.main",  // Dynamically adjust color based on theme
        }}
      >
        Welcome Back, John Doe! 🎉
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
                        cursor: "pointer", // Added cursor pointer for better UX
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

              {/* Progress Bar for Fees */}
              {card.title === "Fees Details" && (
                <Box mt={2}>
                  <LinearProgress
                    variant="determinate"
                    value={(100 * 10000) / 15000} // Paid vs Total
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: "rgba(255,255,255,0.3)",
                    }}
                  />
                </Box>
              )}

              {/* Progress Bar for Attendance */}
              {card.title === "Attendance" && (
                <Box mt={2}>
                  <LinearProgress
                    variant="determinate"
                    value={(75 / 80) * 100} // Present vs Total
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

export default StudentDashboard;
