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


const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

const standards = Array.from({ length: 12 }, (_, i) => `${i + 1}${["st","nd","rd"][i]||"th"}`);

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
  toStandard: Yup.string().required("Select one")
    .test("gte","Must be ≥ From",function(val){
      return standards.indexOf(val) >= standards.indexOf(this.parent.fromStandard);
    }),
  password: Yup.string().min(6,"Min 6 chars").required("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"),null],"Must match")
    .required("Confirm"),
  address: Yup.string().required("Address is required"),
});

export default function Register() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
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
        console.log("Registered Successfully:", res.data);
        alert("Class Registered!");
        formik.resetForm();
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("Registration Failed!");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <MotionPaper
        sx={{
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.7)",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          borderRadius: 4,
          overflow: "hidden",
          maxWidth: 900,
          width: "100%",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Accent Panel */}
        <Box
          sx={{
            flex: 1,
            background: "linear-gradient(135deg,#FDC830 0%,#F37335 100%)",
            color: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          <Typography
            variant={mobile ? "h5" : "h4"}
            fontWeight="bold"
            textAlign="center"
          >
            Join Your Coaching Journey!
          </Typography>
        </Box>

        {/* Form Panel */}
        <Box
          component={motion.div}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          flex={2}
          p={4}
        >
          <Typography variant="h5" mb={3} fontWeight="600" color="textPrimary">
            Register Your Class
            <IconButton
              size="small"
              onClick={() => formik.resetForm()}
              sx={{ ml: 1 }}
            >
              <RefreshIcon />
            </IconButton>
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {[ 
                { name: "ownerName", label: "Owner Name", icon: <PersonIcon /> },
                { name: "coachingName", label: "Coaching Name", icon: <HomeIcon /> },
                { name: "slogan", label: "Slogan", icon: <MessageIcon /> },
                { name: "email", label: "Email", icon: <EmailIcon /> },
                { name: "phone", label: "Phone Number", icon: <PhoneIcon /> },
                {
                  name: "establishedYear",
                  label: "Established Year",
                  icon: <CalendarIcon />,
                  type: "number",
                },
              ].map((f, i) => (
                <Grid item xs={12} sm={6} key={f.name}>
                  <MotionBox
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <TextField
                      fullWidth
                      name={f.name}
                      label={f.label}
                      type={f.type || "text"}
                      value={formik.values[f.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched[f.name] && Boolean(formik.errors[f.name])}
                      helperText={formik.touched[f.name] && formik.errors[f.name]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">{f.icon}</InputAdornment>
                        ),
                      }}
                    />
                  </MotionBox>
                </Grid>
              ))}

              {/* Wider Standard Fields */}
              {["fromStandard", "toStandard"].map((field, idx) => (
                <Grid item xs={6} sm={6} key={field}>
                  <MotionBox
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                  >
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
                      {standards.map((o) => (
                        <MenuItem key={o} value={o}>
                          {o}
                        </MenuItem>
                      ))}
                    </TextField>
                  </MotionBox>
                </Grid>
              ))}

              {/* Password Fields Side by Side */}
              {[ 
                { name: "password", label: "Password" },
                { name: "confirmPassword", label: "Confirm Password" },
              ].map((f, i) => (
                <Grid item xs={6} sm={6} key={f.name}>
                  <MotionBox
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                  >
                    <TextField
                      fullWidth
                      type="password"
                      name={f.name}
                      label={f.label}
                      value={formik.values[f.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched[f.name] && Boolean(formik.errors[f.name])}
                      helperText={formik.touched[f.name] && formik.errors[f.name]}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MotionBox>
                </Grid>
              ))}

              {/* Address */}
              <Grid item xs={12}>
                <MotionBox
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
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
                </MotionBox>
              </Grid>
            </Grid>

            <Box mt={4} textAlign="center">
              <MotionBox
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.4 }}
                display="inline-block"
              >
                <Button
                  type="submit"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.8,
                    background: "linear-gradient(90deg,#FDC830,#F37335)",
                    color: "black",
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: "none",
                    boxShadow: "0 4px 14px rgba(253,200,48,0.5)",
                    ":hover": { boxShadow: "0 6px 20px rgba(253,200,48,0.7)" },
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={25} /> : "Register"}
                </Button>
              </MotionBox>
            </Box>
          </Box>
        </Box>
      </MotionPaper>
    </Box>
  );
}
