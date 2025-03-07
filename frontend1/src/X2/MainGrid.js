import React, { useState } from "react";
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Pagination,
    Checkbox,
    Menu,
    FormControlLabel
} from "@mui/material";
import { Add, UploadFile, Download, ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";

const data = [
    {
        firstName: "Masroor",
        lastName: "Shaikh",
        email: "masroor.shaikh@gmail.com",
        phone: "+14166244423",
        stage: "New Lead",
        assignedAgent: "Agent A",
        created: "March 22, 2024 05:51 AM",
        tag: "VIP",
        deals: "3",
        lastCommunication: "March 21, 2024",
    },
];

const allColumns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "stage", label: "Stage" },
    { key: "assignedAgent", label: "Assigned Agent" },
    { key: "created", label: "Created" },
    { key: "tag", label: "Tag" },
    { key: "deals", label: "Deals" },
    { key: "lastCommunication", label: "Last Communication" },
];

const ColumnsDropdown = ({ selectedColumns, setSelectedColumns }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleColumn = (columnKey) => {
        setSelectedColumns((prev) =>
            prev.includes(columnKey) ? prev.filter((c) => c !== columnKey) : [...prev, columnKey]
        );
    };

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />}
                style={{ backgroundColor: "#008ECC", color: "#fff", textTransform: "none", marginRight: 10 }}
            >
                Columns
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: 10 }}>
                    {allColumns.map(({ key, label }) => (
                        <FormControlLabel
                            key={key}
                            control={<Checkbox checked={selectedColumns.includes(key)} onChange={() => toggleColumn(key)} />}
                            label={label}
                        />
                    ))}
                </div>
            </Menu>
        </div>
    );
};

const LeadTable = () => {
    const [selectedColumns, setSelectedColumns] = useState(allColumns.map(col => col.key));

    return (
        <Container maxWidth="lg" >
            <div style={{ display: "flex", flexDirection: "row", gap: 0, marginBottom: 30 }}>
                <ColumnsDropdown selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} />
                <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
                    <InputLabel>Select Agent</InputLabel>
                    <Select>
                        <MenuItem value="">None</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <Button variant="contained" startIcon={<UploadFile />}>Import People</Button>
                    <Button variant="contained" startIcon={<Download />} style={{ marginLeft: 10 }}>
                        Export People
                    </Button>
                    <Button variant="contained" startIcon={<Add />} style={{ marginLeft: 10 }}>
                        Add List
                    </Button>
                </div>
            </div>
            <TableContainer component={Paper} style={{ maxHeight: 600, overflow: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell> <Checkbox /> </TableCell>
                            {allColumns.map(({ key, label }) => selectedColumns.includes(key) && (
                                <TableCell key={key} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' }}>{label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell> <Checkbox /> </TableCell>
                                {allColumns.map(({ key }) => selectedColumns.includes(key) && (
                                    <TableCell key={key} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' }}>{row[key]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={12} variant="outlined" shape="rounded" style={{ marginTop: 10, display: "flex", justifyContent: "center" }} />
        </Container>
    );
};

export default LeadTable;
