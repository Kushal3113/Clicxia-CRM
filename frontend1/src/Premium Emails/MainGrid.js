import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DrawIcon from "@mui/icons-material/Draw";

// Custom Dropdown Component
const CustomDropdown = () => {
  const [selected, setSelected] = useState("All");

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      style={{
        borderRadius: 5,
        padding: "5px 10px",
        fontSize: 12,
        fontWeight: "bold",
        width: 200,
        background: "transparent",
        border: "1px solid ",
      }}
    >
      <option value="All" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>All</option>
      <option value="My Templates" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>My Templates</option>
      <option value="Festive Greetings" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Festive Greetings</option>
      <option value="Housing Market Tips" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Housing Market Tips</option>
      <option value="Pre Construction" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Pre Construction</option>
    </select>
  );
};

const data = [
  {
    title: "Upper Joshua Creek Phase 6 Townhomes",
    image: "thumbnail1.jpg",
    lastUpdated: "Jan 23, 2025",
  },
  {
    title: "The Garden Series 2",
    image: "thumbnail2.jpg",
    lastUpdated: "Jan 22, 2025",
  },
  {
    title: "The Castello Cornerbrook",
    image: "thumbnail3.jpg",
    lastUpdated: "Jan 21, 2025",
  },
  {
    title: "The Wilde Condos",
    image: "thumbnail1.jpg",
    lastUpdated: "Jan 17, 2025",
  },
  {
    title: "The Castello Cornerbrook",
    image: "thumbnail3.jpg",
    lastUpdated: "Jan 21, 2025",
  },
  {
    title: "The Castello Cornerbrook",
    image: "thumbnail3.jpg",
    lastUpdated: "Jan 21, 2025",
  },
  {
    title: "The Castello Cornerbrook",
    image: "thumbnail3.jpg",
    lastUpdated: "Jan 21, 2025",
  },
  {
    title: "The Castello Cornerbrook",
    image: "thumbnail3.jpg",
    lastUpdated: "Jan 21, 2025",
  },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Open modal when clicking VisibilityIcon
  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      {/* Top Navigation */}
      <AppBar position="static" color="transparent" variant="outlined">
        <Toolbar>
          <Button variant="outlined" style={{ marginRight: 10 }}>
            Email Campaigns
          </Button>
          <Button variant="outlined" style={{ marginRight: 10 }}>
            Email Signatures
          </Button>
          <Button variant="outlined" style={{ marginRight: 10 }}>
            Monthly Planner
          </Button>

          {/* Replacing Categories with CustomDropdown */}
          <div style={{ marginLeft: "auto", marginRight: 10 }}>
            <CustomDropdown />
          </div>

          <TextField variant="outlined" placeholder="Search" size="small" />
        </Toolbar>
      </AppBar>

      {/* Grid Layout */}
      <Grid container spacing={2} style={{ padding: 20 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              textAlign: "center",
              padding: 20,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease",
              boxShadow: "0 0 10px rgb(255, 255, 255)",
            }}
          
          onMouseOver={(e) => {
            e.target.style.boxShadow = "0 0 20px rgb(255, 255, 255)";
          }}
          onMouseOut={(e) => {
            e.target.style.boxShadow = "0 0 10px rgb(3, 3, 3)";
          }}
            className="card-glow"
            onClick={() => window.location.href = '/blank-template'}
          >
            <DrawIcon style={{ fontSize: 35, marginBottom: 0 }} />
            <div className="card-text">
              <Typography variant="h6">Blank</Typography>
              <Typography variant="body2">Start From Scratch</Typography>
            </div>
          </Card>
        </Grid>

        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              style={{ height: "100%", position: "relative" }}
            >

              <CardMedia
                component="img"
                height="400"
                image={item.image}
                alt={item.title}
                style={{
                  transition: "transform 0.5s ease",
                }}
                className="hover-effect"
              />

              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">
                  Last updated: {item.lastUpdated}
                </Typography>
                <IconButton
                  style={{ position: "absolute", bottom: 5, right: 5 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen(item);
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* MODAL (Dialog) */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {selectedItem && (
          <>
            <DialogTitle>{selectedItem.title}</DialogTitle>
            <DialogContent>
              <CardMedia
                component="img"
                image={selectedItem.image}
                alt={selectedItem.title}
                style={{ width: "100%", borderRadius: 5 }}
              />
              <Typography variant="body2" style={{ marginTop: 10 }}>
                Last Edited: {selectedItem.lastUpdated}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary">
                Edit
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <style>
        {`
          .hover-effect:hover {
            transform: translateY(-10px);
          }
        `}
      </style>
    </div>
  );
}
