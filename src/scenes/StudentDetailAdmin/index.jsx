import { Box, Typography, useTheme, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion for animation

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [teamData, setTeamData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    class: "",
    schoolName: "",
    medium: "",
    decidedFees: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
  });
  const navigate = useNavigate();

  const fetchStudents = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const ClassUniqueId = decoded.ClassUniqueId;

      if (userRole === "Admin") {
        const apiUrl = `http://localhost:5197/api/Student/class/${ClassUniqueId}`;

        fetch(apiUrl, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
          .then(data => {
            const updatedData = data.map((item, index) => ({
              ...item,
              id: index + 1
            }));
            setTeamData(updatedData);
          })
          .catch(error => console.error("Error fetching data:", error));
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = (studentUniqueId) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5197/api/Student/${studentUniqueId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          fetchStudents(); // Refresh the list after deletion
        } else {
          console.error("Failed to delete student");
        }
      })
      .catch(error => console.error("Error deleting student:", error));
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      fullName: student.fullName,
      gender: student.gender,
      dateOfBirth: student.dateOfBirth,
      class: student.class,
      schoolName: student.schoolName,
      medium: student.medium,
      decidedFees: student.decidedFees,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      parentEmail: student.parentEmail,
    });
    setOpenDialog(true);
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5197/api/Student/${selectedStudent.studentUniqueId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          fetchStudents(); // Refresh the list after updating
          setOpenDialog(false); // Close the dialog
        } else {
          console.error("Failed to update student");
        }
      })
      .catch(error => console.error("Error updating student:", error));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Name", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 0.5 },
    {
      field: "dateOfBirth",
      headerName: "DOB",
      flex: 1,
      valueGetter: (params) => new Date(params.value).toLocaleDateString(),
    },
    { field: "class", headerName: "Class", flex: 0.5 },
    { field: "schoolName", headerName: "School", flex: 1 },
    { field: "medium", headerName: "Medium", flex: 0.8 },
    { field: "decidedFees", headerName: "Fees", flex: 0.5 },
    { field: "parentName", headerName: "Parent Name", flex: 1 },
    { field: "parentPhone", headerName: "Parent Phone", flex: 1 },
    { field: "parentEmail", headerName: "Parent Email", flex: 1.5 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon style={{ color: "#4caf50" }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.studentUniqueId)}>
            <DeleteIcon style={{ color: "#f44336" }} />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box m="10px">
      <Header title="STUDENTS" subtitle="List of all registered students" />
      
      {/* Table Section */}
      <Box
        mt="20px"
        height="65vh"
        flex={1}
        sx={{
          fontFamily: "Poppins, sans-serif",
          backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "#f5f5f5",
          "& .MuiDataGrid-root": {
            border: `1px solid ${theme.palette.mode === "dark" ? "#26c6da" : "#00BFFF"}`,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#4cceac",  // Header Background Color
            color: "#ffffff",  // Header Font Color
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#4cceac",  // Footer Background Color
            color: "#ffffff",  // Footer Font Color
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#e0f7fa",  // Hover row background color
          }
        }}
      >
        <DataGrid
          rows={teamData}
          columns={columns}
          getRowId={(row) => row.studentUniqueId}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          checkboxSelection
        />
      </Box>

      {/* Edit Form Dialog with Framer Motion animation */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Grid container spacing={2}>

              {/* Form fields with better layout and spacing */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Class"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="School Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Medium"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.medium}
                  onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Decided Fees"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.decidedFees}
                  onChange={(e) => setFormData({ ...formData, decidedFees: e.target.value })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Parent Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Parent Phone"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Parent Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                />
              </Grid>
            </Grid>
          </motion.div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
