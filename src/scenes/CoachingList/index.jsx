import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { motion } from "framer-motion";

const CoachingList = () => {
  const [data, setData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5183/api/CoachingClasses");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this class?")) {
      try {
        await fetch(`http://localhost:5183/api/CoachingClasses/${id}`, {
          method: "DELETE",
        });
        fetchData(); // Refresh after delete
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  const handleEditOpen = (item) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    try {
      await fetch(
        `http://localhost:5183/api/CoachingClasses/${selectedItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedItem),
        }
      );
      setEditDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Coaching Classes List
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Owner Name</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Established</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.ownerName}</TableCell>
                <TableCell>{item.coachingName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.establishedYear}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleEditOpen(item)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        PaperProps={{
          component: motion.div,
          initial: { opacity: 0, scale: 0.8, y: -50 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { duration: 0.4 },
          sx: {
            borderRadius: 4,
            background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
            p: 2,
            width: "90%",
            maxWidth: 600,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}>
          ✨ Edit Coaching Class
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Owner Name"
                fullWidth
                value={selectedItem?.ownerName || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, ownerName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Class Name"
                fullWidth
                value={selectedItem?.coachingName || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, coachingName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                value={selectedItem?.email || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                fullWidth
                value={selectedItem?.phone || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Established Year"
                type="number"
                fullWidth
                value={selectedItem?.establishedYear || ""}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    establishedYear: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                multiline
                value={selectedItem?.address || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, address: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", mt: 2 }}>
          <Button onClick={() => setEditDialogOpen(false)} color="error" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoachingList;
