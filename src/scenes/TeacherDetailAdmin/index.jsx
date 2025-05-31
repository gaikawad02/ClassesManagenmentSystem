import {
    Box,
    Typography,
    useTheme,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Grid,
  } from "@mui/material";
  import { Header } from "../../components";
  import { DataGrid } from "@mui/x-data-grid";
  import { tokens } from "../../theme";
  import { jwtDecode } from "jwt-decode";
  import { useEffect, useState } from "react";
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
  import { motion } from "framer-motion";
  
  const TeacherDetail = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [teacherData, setTeacherData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      gender: "",
    });
  
    const fetchTeachers = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const classId = decoded.ClassUniqueId;
  
        if (role === "Admin") {
          fetch(`http://localhost:5197/api/Teacher/class/${classId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              const updated = data.map((item, index) => ({
                ...item,
                id: index + 1,
              }));
              setTeacherData(updated);
            })
            .catch((err) => console.error("Error fetching teachers:", err));
        }
      }
    };
  
    useEffect(() => {
      fetchTeachers();
    }, []);
  
    const handleEdit = (row) => {
      setFormData(row);
      setOpenDialog(true);
    };
  
    const handleDelete = (teacherUniqueId) => {
      const token = localStorage.getItem("token");
      if (window.confirm("Are you sure you want to delete this teacher?")) {
        fetch(`http://localhost:5197/api/Teacher/${teacherUniqueId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(() => {
            fetchTeachers();
          })
          .catch((err) => console.error("Error deleting:", err));
      }
    };
  
    const handleSave = () => {
      const token = localStorage.getItem("token");
  
      fetch(`http://localhost:5197/api/Teacher/${formData.teacherUniqueId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then(() => {
          setOpenDialog(false);
          fetchTeachers();
        })
        .catch((err) => console.error("Error updating:", err));
    };
  
    const columns = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "fullName", headerName: "Name", flex: 1 },
      { field: "gender", headerName: "Gender", flex: 0.5 },
      { field: "subject", headerName: "Subject", flex: 1 },
      { field: "email", headerName: "Email", flex: 1.5 },
      { field: "phone", headerName: "Phone", flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params) => (
          <Box>
            <IconButton onClick={() => handleEdit(params.row)}>
              <EditIcon style={{ color: "#4caf50" }} />
            </IconButton>
            <IconButton onClick={() => handleDelete(params.row.teacherUniqueId)}>
              <DeleteIcon style={{ color: "#f44336" }} />
            </IconButton>
          </Box>
        ),
      },
    ];
  
    return (
      <Box m="10px">
        <Header title="TEACHERS" subtitle="List of all registered teachers" />
  
        <Box
          mt="20px"
          height="65vh"
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "#f5f5f5",
            "& .MuiDataGrid-root": {
              border: `1px solid ${theme.palette.mode === "dark" ? "#26c6da" : "#00BFFF"}`,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#4cceac",
              color: "#ffffff",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#4cceac",
              color: "#ffffff",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#e0f7fa",
            },
          }}
        >
          <DataGrid
            rows={teacherData}
            columns={columns}
            getRowId={(row) => row.teacherUniqueId}
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
  
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Edit Teacher</DialogTitle>
          <DialogContent>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Grid container spacing={2}>
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
                    label="Subject"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
  
  export default TeacherDetail;
  