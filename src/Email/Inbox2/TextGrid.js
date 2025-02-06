import React, { useState } from "react";
import {
    Container, Grid, Card, CardContent, Typography, Button, List,
    ListItem, ListItemText, IconButton, Avatar, Box, TextField
} from "@mui/material";
import SmsIcon from "@mui/icons-material/Sms";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SendIcon from "@mui/icons-material/Send";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTheme } from '@mui/material/styles';

const initialMessages = [
    {
        name: "John Doe", phone: "+1234567890", date: "02/01/2025", messages: [
            { sender: "John Doe", text: "Hey, how are you?", time: "10:00 AM" },
            { sender: "You", text: "I'm good! How about you?", time: "10:05 AM" }
        ]
    },
    {
        name: "Jane Smith", phone: "+9876543210", date: "02/01/2025", messages: [
            { sender: "Jane Smith", text: "Meeting at 3 PM?", time: "9:30 AM" },
            { sender: "You", text: "Sounds good!", time: "9:35 AM" }
        ]
    }
];

export default function TextDashboard() {
    const theme = useTheme();
    const [selectedMessage, setSelectedMessage] = useState(initialMessages[0]);
    const [messagesList, setMessagesList] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");

    // Handle sending a new message
    const handleSend = () => {
        if (newMessage.trim() !== "") {
            const updatedMessages = messagesList.map((msg) =>
                msg.name === selectedMessage.name
                    ? { ...msg, messages: [...msg.messages, { sender: "You", text: newMessage, time: new Date().toLocaleTimeString() }] }
                    : msg
            );

            setMessagesList(updatedMessages);
            setSelectedMessage((prev) => ({

                ...prev,
                messages: [...prev.messages, { sender: "You", text: newMessage, time: new Date().toLocaleTimeString() }]
            }));
            setNewMessage("");
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, display: "flex", gap: 1 }}>
            <Grid container spacing={1}>
                {/* Left Side - Conversations List */}
                <Grid item xs={5}>
                    <Card>
                        <CardContent>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">Text Conversations</Typography>

                            </Grid>
                            <List sx={{ maxHeight: 400, overflowY: 'auto' }}>
                                {messagesList.map((msg, index) => (
                                    <ListItem key={index} button onClick={() => setSelectedMessage(msg)}>
                                        <SmsIcon sx={{ marginRight: 2 }} />
                                        <ListItemText primary={msg.name} secondary={msg.phone} />
                                        <Typography variant="caption">{msg.date}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Side - Chat Window */}
                <Grid item xs={7} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {selectedMessage ? (
                        <Card sx={{ width: "100%", padding: 2, boxShadow: 3 }}>
                            <CardContent>
                                {/* Header */}
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Typography variant="h5"> {selectedMessage.name}
                                    
                                    </Typography>
                                    

                                </Grid>
                                <Typography variant="body2">{selectedMessage.phone}</Typography>

                                {/* Messages */}
                                <Box sx={{ mt: 2, maxHeight: 200, overflowY: "auto" }}>
                                    {selectedMessage.messages.map((msg, index) => (
                                        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1, justifyContent: msg.sender === "You" ? "flex-end" : "flex-start" }}>
                                            {msg.sender !== "You" && (
                                                <Avatar sx={{ width: 30, height: 30, mr: 1 }}>{msg.sender.charAt(0)}</Avatar>
                                            )}
                                            <Box sx={{
                                                backgroundColor: msg.sender === "You" ? theme.palette.primary.useTheme : theme.palette.background.useTheme,
                                                padding: 1,
                                                borderRadius: 1,
                                                maxWidth: "70%",
                                                wordBreak: "break-word"
                                            }}>
                                                <Typography variant="body2" sx={{ fontWeight: "bold", color: msg.sender === "You" ? theme.palette.text.primary : theme.palette.text.primary }}>{msg.sender}</Typography>
                                                <Typography variant="body2" dangerouslySetInnerHTML={{ __html: msg.text }} sx={{ color: msg.sender === "You" ? theme.palette.text.secondary : theme.palette.text.secondary }} />
                                                <Typography variant="caption" color="gray">{msg.time}</Typography>
                                            </Box>
                                            {msg.sender === "You" && (
                                                <Avatar sx={{ width: 30, height: 30, ml: 1 }}>Y</Avatar>
                                            )}
                                        </Box>
                                    ))}
                                </Box>

                                {/* Text Editor + Send Button */}
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle1" sx={{ mb: 1 }}>New Message</Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={1}
                                        maxRows={5}
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."

                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        endIcon={<SendIcon />}
                                        sx={{ mt: 2 }}
                                        onClick={handleSend}
                                    >
                                        Send
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ) : (
                        <Typography variant="h6" align="center">Select a conversation to view</Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}