import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import LoginImg from "../../assets/images/books-img.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const MotionPaper = motion(Paper);

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
});

const Login = () => {
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    setLoading(true);

    const endpointMap = {
      student: "http://localhost:5197/api/Auth/student-login",
      teacher: "http://localhost:5197/api/Auth/teacher-login",
      admin: "http://localhost:5197/api/Auth/login",
    };

    try {
      const response = await axios.post(endpointMap[role], values);
      const token = response.data.token;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const classUniqueId = decoded.ClassUniqueId;

      localStorage.setItem("classUniqueId", classUniqueId);
      localStorage.setItem("role", response.data.userRole);

      if (userRole === "Admin") {
        navigate("/dashboard");
      } else if (userRole === "Teacher") {
        navigate("/TeacherDashboard");
      } else if (userRole === "Student") {
        navigate("/StudentDashboard");
      } else {
        alert("Invalid role in token.");
      }

    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials or server error.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const renderForm = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={role}
        initial={{ opacity: 0, x: 50, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -50, scale: 0.95 }}
        transition={{ duration: 0.5 }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Typography variant="h5" fontWeight={600} color="black">
                {role === "student"
                  ? "Student Login"
                  : role === "teacher"
                    ? "Teacher Login"
                    : "Class Owner Login"}
              </Typography>

              <Field
                name="email"
                as={TextField}
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                InputLabelProps={{ style: { color: "black" } }}
              />

              <Field
                name="password"
                as={TextField}
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputLabelProps={{ style: { color: "black" } }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting || loading}
                sx={{
                  background: "linear-gradient(90deg, #1E3C72, #2A5298)",
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "linear-gradient(90deg, #2A5298, #1E3C72)",
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : "Login"}
              </Button>

              <Typography variant="body2" align="center" sx={{ color: "black" }}>
                Don't have an account?{" "}
                <Link to="/regitration" style={{ color: "#2A5298", fontWeight: 600 }}>
                  Register
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        padding: 4,
      }}
    >
      <MotionPaper
        elevation={10}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: "900px",
          width: "100%",
          overflow: "hidden",
          borderRadius: 4,
          backgroundColor: "#ffffff",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left: Form */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {/* Role Switch */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
            {["student", "teacher", "admin"].map((r) => (
              <Button
                key={r}
                variant={role === r ? "contained" : "outlined"}
                onClick={() => setRole(r)}
                sx={{
                  background: role === r ? "linear-gradient(90deg, #1E3C72, #2A5298)" : "",
                  color: role === r ? "#fff" : "black",
                  fontWeight: "bold",
                  borderColor: "#2A5298",
                  "&:hover": {
                    background: "linear-gradient(90deg, #2A5298, #1E3C72)",
                    color: "#fff",
                  },
                }}
              >
                {r === "student" ? "Student" : r === "teacher" ? "Teacher" : "Class Owner"}
              </Button>
            ))}
          </Box>

          {/* Form */}
          {renderForm()}
        </Box>

        {/* Right: Image */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <motion.img
            src={LoginImg}
            alt="Login Visual"
            style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
        </Box>
      </MotionPaper>
    </Box>
  );
};

export default Login;
