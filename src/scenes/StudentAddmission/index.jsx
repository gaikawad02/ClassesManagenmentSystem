import {
    Box,
    Button,
    TextField,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    MenuItem,
    InputAdornment,
    IconButton,
    Grid,
    Paper,
    useTheme,
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
    CurrencyRupee,
    CalendarMonth,
    Groups,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import * as yup from "yup";
import axios from "axios";

// Validation Schema
const validationSchema = yup.object({
    fullName: yup.string().required("Full Name is required"),
    dateOfBirth: yup.date().required("Date of Birth is required"),
    gender: yup.string().required("Gender is required"),
    class: yup.string().required("Class/Standard is required"),
    schoolName: yup.string().required("School Name is required"),
    medium: yup.string().required("Medium is required"),
    decidedFees: yup.number().typeError("Enter a valid number").required("Fees required"),
    parentName: yup.string().required("Parent Name is required"),
    parentPhone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Parent Phone is required"),
    parentEmail: yup.string().email("Invalid email").required("Parent Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const StudentAdmissionForm = () => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [classUniqueId, setClassUniqueId] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedClassUniqueId = localStorage.getItem("classUniqueId");
        const storedToken = localStorage.getItem("token"); // Assuming 'token' is the key
        if (storedClassUniqueId) setClassUniqueId(storedClassUniqueId);
        if (storedToken) setToken(storedToken);
    }, []);

    const formik = useFormik({
        initialValues: {
            fullName: "",
            dateOfBirth: "",
            gender: "",
            class: "",
            schoolName: "",
            medium: "",
            parentName: "",
            parentPhone: "",
            parentEmail: "",
            decidedFees: "",
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
                    dateOfBirth: new Date(values.dateOfBirth).toISOString(),
                    decidedFees: Number(values.decidedFees),
                    classUniqueId: classUniqueId
                };

                const res = await axios.post("http://localhost:5197/api/Student", formattedValues, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                alert("Student Registered Successfully!");
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
                            Student Admission Form
                        </Typography>

                        <form onSubmit={formik.handleSubmit}>
                            <motion.div variants={fadeInUp}>
                                <Typography variant="h6" mt={2} mb={1}>
                                    Student Details
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="fullName"
                                            label="Full Name"
                                            fullWidth
                                            margin="dense"
                                            value={formik.values.fullName}
                                            onChange={formik.handleChange}
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
                                            name="dateOfBirth"
                                            label="Date of Birth"
                                            type="date"
                                            fullWidth
                                            margin="dense"
                                            InputLabelProps={{ shrink: true }}
                                            value={formik.values.dateOfBirth}
                                            onChange={formik.handleChange}
                                            error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                                            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CalendarMonth />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormLabel>Gender</FormLabel>
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

                                    <Grid item xs={12}>
                                        <TextField
                                            name="class"
                                            label="Class/Standard"
                                            select
                                            fullWidth
                                            margin="dense"
                                            value={formik.values.class}
                                            onChange={formik.handleChange}
                                            error={formik.touched.class && Boolean(formik.errors.class)}
                                            helperText={formik.touched.class && formik.errors.class}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <School />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((s) => (
                                                <MenuItem key={s} value={s}>
                                                    {s}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            name="schoolName"
                                            label="School Name"
                                            fullWidth
                                            margin="dense"
                                            value={formik.values.schoolName}
                                            onChange={formik.handleChange}
                                            error={formik.touched.schoolName && Boolean(formik.errors.schoolName)}
                                            helperText={formik.touched.schoolName && formik.errors.schoolName}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Groups />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            name="medium"
                                            label="Medium"
                                            select
                                            fullWidth
                                            margin="dense"
                                            value={formik.values.medium}
                                            onChange={formik.handleChange}
                                            error={formik.touched.medium && Boolean(formik.errors.medium)}
                                            helperText={formik.touched.medium && formik.errors.medium}
                                        >
                                            {["English", "Hindi", "Marathi", "Semi-English"].map((medium) => (
                                                <MenuItem key={medium} value={medium}>
                                                    {medium}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Typography variant="h6" mt={4} mb={1}>
                                    Parent Details
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="parentName"
                                            label="Parent Name"
                                            fullWidth
                                            margin="dense"
                                            value={formik.values.parentName}
                                            onChange={formik.handleChange}
                                            error={formik.touched.parentName && Boolean(formik.errors.parentName)}
                                            helperText={formik.touched.parentName && formik.errors.parentName}
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
                                            name="parentPhone"
                                            label="Parent Phone"
                                            fullWidth
                                            margin="dense"
                                            value={formik.values.parentPhone}
                                            onChange={formik.handleChange}
                                            error={formik.touched.parentPhone && Boolean(formik.errors.parentPhone)}
                                            helperText={formik.touched.parentPhone && formik.errors.parentPhone}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Phone />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="parentEmail"
                                            label="Parent Email"
                                            fullWidth
                                            margin="dense"
                                            value={formik.values.parentEmail}
                                            onChange={formik.handleChange}
                                            error={formik.touched.parentEmail && Boolean(formik.errors.parentEmail)}
                                            helperText={formik.touched.parentEmail && formik.errors.parentEmail}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Email />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <Typography variant="h6" mt={4} mb={1}>
                                    Fees & Login Info
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="decidedFees"
                                            label="Decided Fees"
                                            fullWidth
                                            margin="dense"
                                            value={formik.values.decidedFees}
                                            onChange={formik.handleChange}
                                            error={formik.touched.decidedFees && Boolean(formik.errors.decidedFees)}
                                            helperText={formik.touched.decidedFees && formik.errors.decidedFees}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CurrencyRupee />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            name="password"
                                            label="Password"
                                            type={showPassword ? "text" : "password"}
                                            fullWidth
                                            margin="dense"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
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
                                                        <IconButton
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </motion.div>

                            <Box mt={4}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                >
                                    {loading ? "Registering..." : "Register Student"}
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </motion.div>
            </Grid>
        </Grid>
    );
};

export default StudentAdmissionForm;
