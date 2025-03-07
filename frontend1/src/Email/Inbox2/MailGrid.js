import React, { useState } from "react";
import {
    Container, Grid, Card, CardContent, Typography, TextField, Button,
    List, ListItem, ListItemText, IconButton, Box, Dialog, DialogActions, DialogContent, DialogTitle,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from "@mui/material/styles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const initialConversations = [
    { name: "Mujeeb Ahmed", email: "mujeeb.general@gmail.com", date: "03/16/2024" },
    { name: "Amir Shamsi", email: "Amir@universalpromitions.ca", date: "03/16/2024" },
    { name: "Sonia Nath", email: "iamsonianath@gmail.com", date: "03/15/2024" },
    { name: "Dil Se Indian Restaurant & Bar", email: "dilse.ca335@gmail.com", date: "03/15/2024" },
    { name: "Shahrzad Fayzi", email: "Shahrzad_fayzi@yahoo.com", date: "03/15/2024" },
    { name: "Mujeeb Ahmed", email: "mujeeb.general@gmail.com", date: "03/16/2024" },
    { name: "Amir Shamsi", email: "Amir@universalpromitions.ca", date: "03/16/2024" },
    { name: "Sonia Nath", email: "iamsonianath@gmail.com", date: "03/15/2024" },
    { name: "Dil Se Indian Restaurant & Bar", email: "dilse.ca335@gmail.com", date: "03/15/2024" },
    { name: "Shahrzad Fayzi", email: "Shahrzad_fayzi@yahoo.com", date: "03/15/2024" }
];

const Dashboard = () => {
    const [selectedMail, setSelectedMail] = useState(initialConversations[0]);
    const [message, setMessage] = useState("");
    const [openEmailPopup, setOpenEmailPopup] = useState(false);
    const [file, setFile] = useState(null);  // For storing file
    const [conversationsList, setConversationsList] = useState(initialConversations);
    const theme = useTheme();
    const handleMailClick = (mail) => {
        setSelectedMail(mail);
    };

    const handleDeleteClick = () => {
        // Remove the selected mail from the list
        const updatedConversations = conversationsList.filter(
            (conv) => conv.email !== selectedMail.email
        );
        setConversationsList(updatedConversations); // Update the conversations list
        setSelectedMail(null); // Clear the selected mail after deletion
    };

    const handleOpenCompose = () => {
        setOpenEmailPopup(true); // Opens the compose email popup
    };

    const handleClosePopup = () => {
        setOpenEmailPopup(false);
    };

    const handleRemoveFile = () => {
        setFile(null); // Clear the file state
    };

    // Handle file upload
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile({
                    name: selectedFile.name,
                    dataUrl: reader.result,
                });
            };
            reader.readAsDataURL(selectedFile); // Converts file to a base64 URL
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, display: "flex", gap: 1 }}>
            <Grid container spacing={1}>
                {/* Sidebar */}
                <Grid item xs={5}>
                    <Card>
                        <CardContent>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">Select Conversations</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={handleOpenCompose}
                                    sx={{ height: "fit-content" }}
                                >
                                    Compose
                                </Button>
                            </Grid>

                            <List sx={{ maxHeight: 400, overflowY: 'auto' }}> {/* Set maxHeight and enable scrolling */}
                                {conversationsList.map((conv, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        onClick={() => handleMailClick(conv)}

                                    >
                                        <EmailIcon sx={{ marginRight: 2 }} />
                                        <ListItemText primary={conv.name} secondary={conv.email} />
                                        <Typography variant="caption">{conv.date}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Main Chat Section */}
                <Grid item xs={7} sx={{ height: "29.5vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {selectedMail ? (
                        <Card sx={{ width: "90%", height: "auto", padding: 2, boxShadow: 3 }}>
                            <CardContent sx={{ position: "relative" }}>
                                {/* Delete Icon at the top-right of CardContent */}
                                <IconButton
                                    onClick={handleDeleteClick}
                                    sx={{ position: "absolute", top: 8, right: 8, color: "error.main" }}
                                >
                                    <DeleteRoundedIcon />
                                </IconButton>

                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6">{selectedMail.name}</Typography>
                                </Grid>

                                <Typography variant="body2">{selectedMail.email}</Typography>
                                <img
                                    src="/Clicxia-logo-1.png"
                                    alt="Signature"
                                    style={{ width: "100%", height: "auto", marginTop: 10, borderRadius: 8 }}
                                />
                            </CardContent>
                        </Card>
                    ) : (
                        <Box sx={{ textAlign: "center", padding: 2, height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <Typography
                                variant="h4"
                                align="center"
                                color="textSecondary"
                            >
                                You haven't opened any mail yet,
                                please select a conversation
                            </Typography>
                            <img
                                src="/People.jpg"
                                alt="No Mail Selected"
                                style={{ width: "50%", height: "100%", borderRadius: 2 }}
                            />
                        </Box>
                    )}
                    
                </Grid>

                {/* Email Popup */}
                <Dialog
                    open={openEmailPopup}
                    onClose={handleClosePopup}
                    maxWidth="md"
                    fullWidth
                    sx={{
                        "& .MuiDialogContent-root": {
                            padding: 2,
                        },
                        "& .MuiDialog-paper": {
                            minHeight: "400px",
                            width: "80%",
                            maxHeight: "80vh",
                        },
                    }}
                >
                    <DialogTitle>New Message</DialogTitle>
                    <DialogContent>
                        <TextField fullWidth label="To" variant="standard" sx={{ mb: 2 }} />
                        <TextField fullWidth label="Subject" variant="standard" sx={{ mb: 2 }} />

                        {/* ReactQuill with File Attachment */}
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                            <ReactQuill
                                value={message}
                                onChange={setMessage}
                                theme="snow"
                                style={{ backgroundColor: theme.palette.background.paper, }}
                            />

                            {/* File Upload within ReactQuill section */}
                            <input
                                type="file"
                                id="file-upload"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                            <Button
                                variant="outlined"
                                color="primary"
                                component="label"
                                htmlFor="file-upload"
                                startIcon={<AttachFileIcon />}
                                sx={{ mt: 2 }}
                            >
                                Attach File
                            </Button>

                            {/* Show attached file name */}
                            {file && (
                                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                                    <Typography variant="body2">
                                        Attached: {file.name}
                                    </Typography>
                                    {/* Cancel button to remove file */}
                                    <IconButton
                                        onClick={handleRemoveFile}
                                        sx={{
                                            ml: 1,
                                            backgroundColor: 'transparent', // Removes the background
                                            border: 'none', // Ensures no border
                                            outline: 'none', // Ensures no outline when clicked
                                            '&:hover': {
                                                backgroundColor: 'transparent', // Keeps the background transparent on hover
                                                border: 'red', // No border on hover
                                                outline: 'none', // No outline on hover
                                            }
                                        }}
                                    >
                                        <ClearRoundedIcon color="error" />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={handleClosePopup}>Send</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Container>
    );
};

export default Dashboard;