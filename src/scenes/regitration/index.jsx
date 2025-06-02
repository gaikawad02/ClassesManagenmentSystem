import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  School as SchoolIcon,
  Message as MessageIcon,
  Lock as LockIcon,
  Home as HomeIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const standards = Array.from({ length: 12 }, (_, i) => `${i + 1}${["st", "nd", "rd"][i] || "th"}`);

const validationSchema = Yup.object({
  ownerName: Yup.string().required("Owner Name is required"),
  coachingName: Yup.string().required("Class Name is required"),
  slogan: Yup.string().required("Slogan is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be 10 digits")
    .required("Phone is required"),
  establishedYear: Yup.number()
    .typeError("Enter a valid year")
    .min(1900, "Too old")
    .max(new Date().getFullYear(), "Future?")
    .required("Year is required"),
  fromStandard: Yup.string().required("Select one"),
  toStandard: Yup.string()
    .required("Select one")
    .test("gte", "Must be ≥ From", function (val) {
      return standards.indexOf(val) >= standards.indexOf(this.parent.fromStandard);
    }),
  password: Yup.string().min(6, "Min 6 chars").required("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Must match")
    .required("Confirm"),
  address: Yup.string().required("Address is required"),
});

export default function Register() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      ownerName: "",
      coachingName: "",
      slogan: "",
      email: "",
      phone: "",
      establishedYear: "",
      fromStandard: "",
      toStandard: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (vals) => {
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:5197/api/Auth/register", vals);
        alert("Class Registered!");
        formik.resetForm();
      } catch (err) {
        alert("Registration Failed!");
      } finally {
        setLoading(false);
      }
    },
  });

  const renderField = (name, label, icon, type = "text") => (
    <TextField
      fullWidth
      type={type}
      name={name}
      label={label}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      InputProps={{
        startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
      }}
    />
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fdfdfd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <MotionPaper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          maxWidth: 1100,
          width: "100%",
          borderRadius: 5,
          overflow: "hidden",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            flex: 1,
            background: "linear-gradient(135deg,#2193b0,#6dd5ed)",
            color: "#fff",
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" gutterBottom>
            Welcome to Coaching Hub
          </Typography>
          <Typography variant="subtitle1">
            Start your coaching class with the right tools. Register now and grow smarter!
          </Typography>
        </Box>

        {/* Right Panel */}
        <Box sx={{ flex: 2, p: 4 }}>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ width: "100%" }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h5" fontWeight="bold">
                Register Your Class
              </Typography>
              <IconButton onClick={() => formik.resetForm()}>
                <RefreshIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {renderField("ownerName", "Owner Name", <PersonIcon />)}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField("coachingName", "Coaching Name", <HomeIcon />)}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField("slogan", "Slogan", <MessageIcon />)}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField("email", "Email", <EmailIcon />, "email")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField("phone", "Phone Number", <PhoneIcon />, "tel")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField("establishedYear", "Established Year", <CalendarIcon />, "number")}
              </Grid>

              {/* From and To Standard */}
              {["fromStandard", "toStandard"].map((field, idx) => (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    select
                    fullWidth
                    name={field}
                    label={field === "fromStandard" ? "From Std" : "To Std"}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[field] && Boolean(formik.errors[field])}
                    helperText={formik.touched[field] && formik.errors[field]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SchoolIcon />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {standards.map((std) => (
                      <MenuItem key={std} value={std}>
                        {std}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              ))}

              {/* Password Fields */}
              <Grid item xs={12} sm={6}>
                {renderField("password", "Password", <LockIcon />, "password")}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderField("confirmPassword", "Confirm Password", <LockIcon />, "password")}
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="address"
                  label="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* Submit */}
            <Box mt={4} textAlign="center">
              <Button
                type="submit"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,
                  background: "linear-gradient(90deg,#2193b0,#6dd5ed)",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 4,
                  textTransform: "none",
                  boxShadow: "0 4px 14px rgba(33,147,176,0.4)",
                  ":hover": { boxShadow: "0 6px 20px rgba(33,147,176,0.6)" },
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
              </Button>
            </Box>
          </Box>
        </Box>
      </MotionPaper>
    </Box>
  );
}
