import React, { useState } from "react";

import { Box, Card, CardContent, Typography, Grid, CircularProgress, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {  List, ListItem, ListItemText } from "@mui/material";

const MainGrid = () => {
  const [selected, setSelected] = useState("All");

  const emailStats = [
    { label: "Send", percentage: 75, color: "red" },
    { label: "Open", percentage: 50, color: "blue" },
    { label: "Click", percentage: 10, color: "green" },
  ];

  const updates = [
    { date: "23 Jan", text: "Upper Joshua Creek Phase 6 Townhomes - Pre Construction" },
    { date: "21 Jan", text: "The Castello Cornerbrook - Pre Construction" },
    { date: "20 Jan", text: "The Garden Series 2 - Pre Construction" },
    { date: "17 Jan", text: "The Wilde Condos - Pre Construction" },
  ];

  return (
    <Box sx={{ padding: 2, minHeight: "100vh", width: "100%" }}>
      <Grid container spacing={2}>
        {/* Sidebar */}
        <Grid item xs={12} sm={4} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">Premium Emails</Typography>
                <IconButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                    },
                  }}
                  onClick={() => window.location.href = '/premium-emails'}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: 1.5 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">Create Email</Typography>
                <IconButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                    },
                  }}
                  onClick={() => window.location.href = '/create-email'}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: 1.5 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">Email Signature</Typography>
                <IconButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                    },
                  }}
                  onClick={() => window.location.href = '/email-signature'}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
          {/* Updates Component */}
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0097A7" }}>
                Updates
              </Typography>
              <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
                <List>
                  {updates.map((update, index) => (
                    <ListItem key={index} divider>
                      <ListItemText
                        primary={<Typography sx={{ fontWeight: "bold" }}>{update.date}</Typography>}
                        secondary={<Typography variant="body2">{update.text}</Typography>}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        

        {/* Main Content */}
        <Grid item xs={12} sm={8} md={9}>
          <Card>
            <CardContent>
              <Typography variant="h6">Daily Email Limits</Typography>
              <Typography>Total: 15000</Typography>
              <Typography>Used: 0</Typography>
              <Typography>Balance: 15000</Typography>
              <CircularProgress variant="determinate" value={0} />
            </CardContent>
          </Card>
          

          {/* Enhanced Email Statistics */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Email Statistics
            </Typography>
            <Grid container spacing={1}>
              {emailStats.map((stat, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    sx={{
                      textAlign: "center",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                        boxShadow: 4,
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          position: "relative",
                          display: "inline-flex",
                          justifyContent: "center",
                          marginBottom: 2,
                        }}
                      >
                        <CircularProgress
                          variant="determinate"
                          value={stat.percentage}
                          size={80}
                          thickness={4}
                          sx={{ color: stat.color }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="h6">{`${stat.percentage}%`}</Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1">{stat.label}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          
          {/* Custom Dropdown and Search Bar in one row */}
          <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
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
                marginRight: 10,
              }}
            >
              <option value="All" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>All</option>
              <option value="Draft" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Draft</option>
              <option value="Send" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Send</option>
              <option value="Scheduled" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Scheduled</option>
            </select>

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
                marginRight: 10,
                maxHeight: '50px',       // Set the maximum height for the dropdown
                overflowY: 'auto',        // Enable vertical scrolling
              }}
            >
              <option value="Latest" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Latest</option>
              <option value="Oldest" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Oldest</option>
              <option value="Name A-Z" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Name A-Z</option>
              <option value="Name Z-A" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Name Z-A</option>
              <option value="Last Modified" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Last Modified </option>
              <option value="Date Created" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Date Created</option>
              <option value="Open High" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Open High</option>
              <option value="Open Low" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Open Low</option>
              <option value="Click High" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Click High</option>
              <option value="Click Low" style={{ color: "#f5f5f5", backgroundColor: "#000000" }}>Click Low</option>
            </select>
            <TextField variant="outlined" placeholder="Search here" size="small" fullWidth />
            <IconButton
              sx={{
                marginLeft: 0.5,
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          {/* Space Between */}
          <Box sx={{ marginTop: 20 }} />
          {/* Draft Emails */}
          {["Untitled-1", "Untitled-2", "Untitled-3", "Untitled-4", "Untitled-5", "Untitled-6"].map((title, index) => (
            <Card key={index} sx={{ marginTop: 2 }}>
              <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Draft
                </Typography>
                <Typography variant="body2">No Preview Available</Typography>
                <Typography variant="body2">Created on Yesterday at 11:59 AM</Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  {["Sends", "Opens", "Clicks"].map((stat, idx) => (
                    <Grid item xs={12} sm={4} key={idx}>
                      <Card
                        sx={{
                          "&:hover": {
                            backgroundColor: "white",
                            boxShadow: 3,
                            color: "black",
                          },
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6">0</Typography>
                          <Typography>{stat}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainGrid;
