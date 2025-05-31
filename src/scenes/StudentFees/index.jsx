import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Grid,
  InputLabel,
  FormControl,
  Select,
  Box
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PaymentIcon from "@mui/icons-material/Payment";
import VisibilityIcon from "@mui/icons-material/Visibility";

const FeesPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState("All");
  const [standards, setStandards] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [newPayment, setNewPayment] = useState({
    amountPaid: "",
    paymentMode: "Cash",
    remarks: ""
  });

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const classUniqueId = decodedToken?.ClassUniqueId;

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`http://localhost:5197/api/Fees/class`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const studentList = res.data;
      setStudents(studentList);
      setFilteredStudents(studentList);

      const standardList = Array.from(new Set(studentList.map(s => s.class))).sort();
      setStandards(["All", ...standardList]);
    } catch (err) {
      console.error("Failed to fetch students", err);
      alert("Failed to fetch students");
    }
  };

  const handleAddPayment = async () => {
    if (isNaN(parseFloat(newPayment.amountPaid)) || parseFloat(newPayment.amountPaid) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      await axios.post("http://localhost:5197/api/Fees", {
        studentUniqueId: selectedStudent.studentUniqueId,
        amountPaid: parseFloat(newPayment.amountPaid),
        paymentMode: newPayment.paymentMode,
        remarks: newPayment.remarks,
        classUniqueId: classUniqueId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Payment added successfully");
      setOpenAdd(false);
      setNewPayment({ amountPaid: "", paymentMode: "Cash", remarks: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Failed to add payment");
    }
  };

  const handleViewPayments = async (student) => {
    try {
      setSelectedStudent(student);
      const res = await axios.get(`http://localhost:5197/api/Fees/student/${student.studentUniqueId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPaymentHistory(res.data);
      setOpenView(true);
    } catch (error) {
      console.error("Error fetching payments:", error);
      alert("Failed to fetch payment history");
    }
  };

  const handleFilterChange = (standard) => {
    setSelectedStandard(standard);
    if (standard === "All") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter(s => s.class === standard));
    }
  };

  useEffect(() => {
    if (classUniqueId) {
      fetchStudents();
    }
  }, [classUniqueId]);

  return (
    <Box mx={{ xs: 2, sm: 4, md: 8, lg: 10 }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3, color: "#1976d2" }}>
          💸 Manage Student Fees
        </Typography>

        {/* Filter Dropdown */}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Filter by Standard</InputLabel>
          <Select
            value={selectedStandard}
            label="Filter by Standard"
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            {standards.map((std, index) => (
              <MenuItem key={index} value={std}>{std}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Student Cards */}
        {filteredStudents.length === 0 ? (
          <Typography>No students found.</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredStudents.map((student, index) => {
              const paid = student.paidFee || 0;
              const remaining = student.decidedFees - paid;

              return (
                <Grid item xs={12} sm={6} md={4} key={student.studentUniqueId}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      sx={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)"
                        }
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" gutterBottom>{student.fullName}</Typography>
                        <Typography variant="body2">Class: <strong>{student.class}</strong></Typography>
                        <Typography variant="body2">Total Fees: ₹{student.decidedFees}</Typography>
                        <Typography variant="body2">Paid: ₹{paid}</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>Remaining: ₹{remaining}</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Button
                              variant="contained"
                              fullWidth
                              startIcon={<PaymentIcon />}
                              onClick={() => {
                                setSelectedStudent(student);
                                setOpenAdd(true);
                              }}
                              sx={{
                                background: "linear-gradient(135deg, #42a5f5, #1e88e5)",
                                color: "#fff",
                                "&:hover": {
                                  background: "linear-gradient(135deg, #1e88e5, #1565c0)"
                                }
                              }}
                            >
                              Add
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              variant="outlined"
                              fullWidth
                              startIcon={<VisibilityIcon />}
                              onClick={() => handleViewPayments(student)}
                              sx={{
                                borderColor: "#1976d2",
                                color: "#1976d2",
                                "&:hover": {
                                  backgroundColor: "#e3f2fd",
                                  borderColor: "#1565c0"
                                }
                              }}
                            >
                              View
                            </Button>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Add Payment Dialog */}
        <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth>
          <DialogTitle sx={{ backgroundColor: "#1976d2", color: "#fff" }}>Add Fee Payment</DialogTitle>
          <DialogContent>
            <TextField
              label="Amount Paid (₹)"
              type="number"
              fullWidth
              margin="dense"
              value={newPayment.amountPaid}
              onChange={(e) => setNewPayment({ ...newPayment, amountPaid: e.target.value })}
            />
            <TextField
              label="Payment Mode"
              select
              fullWidth
              margin="dense"
              value={newPayment.paymentMode}
              onChange={(e) => setNewPayment({ ...newPayment, paymentMode: e.target.value })}
            >
              {["Cash", "UPI", "Bank Transfer"].map(mode => (
                <MenuItem key={mode} value={mode}>{mode}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Remarks"
              fullWidth
              margin="dense"
              value={newPayment.remarks}
              onChange={(e) => setNewPayment({ ...newPayment, remarks: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAdd(false)} color="error">Cancel</Button>
            <Button variant="contained" onClick={handleAddPayment}>Submit</Button>
          </DialogActions>
        </Dialog>

        {/* View Payment History Dialog */}
        <Dialog open={openView} onClose={() => setOpenView(false)} fullWidth>
          <DialogTitle sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
            Payment History
          </DialogTitle>
          <DialogContent>
            {paymentHistory.length === 0 ? (
              <Typography>No payments found.</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Amount</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Mode</strong></TableCell>
                    <TableCell><strong>Remarks</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paymentHistory.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>₹{p.amountPaid}</TableCell>
                      <TableCell>{new Date(p.paymentDate).toLocaleDateString()}</TableCell>
                      <TableCell>{p.paymentMode}</TableCell>
                      <TableCell>{p.remarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenView(false)} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Box>
  );
};

export default FeesPage;
