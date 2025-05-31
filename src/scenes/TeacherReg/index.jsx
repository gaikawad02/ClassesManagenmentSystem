import {
    Box,
    Button,
    TextField,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    IconButton,
    useTheme,
    Grid,
    Paper,
    useMediaQuery
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
    Person,
    Email,
    Lock,
    Phone,
    School,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import * as yup from "yup";
import axios from "axios";

// Validation Schema
const validationSchema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
    subject: yup.string().required("Subject is required"),
    gender: yup.string().required("Gender is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const TeacherRegistration = () => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [classUniqueId, setClassUniqueId] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedClassUniqueId = localStorage.getItem("classUniqueId");
        const storedToken = localStorage.getItem("token");
        if (storedClassUniqueId) setClassUniqueId(storedClassUniqueId);
        if (storedToken) setToken(storedToken);
    }, []);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            subject: "",
            gender: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            if (!classUniqueId || !token) {
                alert("Authentication failed. Please log in again.");
                return;
            }

            try {
                setLoading(true);
                const formattedValues = {
                    ...values,
                    classUniqueId: classUniqueId
                };

                const res = await axios.post("http://localhost:5197/api/Teacher", formattedValues, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                alert("Teacher Registered Successfully!");
                formik.resetForm();
            } catch (err) {
                console.error(err.response?.data || err.message);
                alert("Registration Failed: " + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <Grid
            container
            component={motion.div}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
        >
            <Grid item xs={12} md={8} lg={6}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            align="center"
                            gutterBottom
                            component={motion.h1}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Teacher Registration Form
                        </Typography>

                        <form onSubmit={formik.handleSubmit}>
                            <motion.div variants={fadeInUp}>
                                <Typography variant="h6" mt={2} mb={1}>
                                    Teacher Details
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            name="fullName"
                                            margin="dense"
                                            value={formik.values.fullName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                            helperText={formik.touched.fullName && formik.errors.fullName}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Person />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            margin="dense"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Email />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            name="phone"
                                            margin="dense"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                                            helperText={formik.touched.phone && formik.errors.phone}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Phone />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Subject"
                                            name="subject"
                                            margin="dense"
                                            value={formik.values.subject}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.subject && Boolean(formik.errors.subject)}
                                            helperText={formik.touched.subject && formik.errors.subject}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <School />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            name="gender"
                                            value={formik.values.gender}
                                            onChange={formik.handleChange}
                                        >
                                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                        {formik.touched.gender && formik.errors.gender && (
                                            <Typography color="error" variant="body2">
                                                {formik.errors.gender}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Typography variant="h6" mt={4} mb={1}>
                                    Login Info
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            margin="dense"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Lock />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        mt: 4,
                                        py: 1.5,
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        boxShadow: 2,
                                        transition: "all 0.3s ease-in-out",
                                    }}
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </Button>
                            </motion.div>
                        </form>
                    </Paper>
                </motion.div>
            </Grid>
        </Grid>
    );
};

export default TeacherRegistration;
