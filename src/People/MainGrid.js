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
    Pagination,
    Checkbox,
    Menu,
    FormControlLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    TextField,
} from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { UploadFile, Download, ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { useTheme } from '@mui/material/styles';  // Importing the theme hook from MUI

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
    { key: "source", label: "Source" },
    { key: "lastCommunication", label: "Last Communication" },
];

// Static data with 40 entries
const staticData = [
    {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        stage: "New",
        assignedAgent: "Agent 1",
        created: "2025-01-01",
        tag: "Lead",
        deals: "1",
        source: "Facebook",
        lastCommunication: "2025-01-28"
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phone: "2345678901",
        stage: "Contacted",
        assignedAgent: "Agent 2",
        created: "2025-01-02",
        tag: "Lead",
        deals: "2",
        source: "Instagram",
        lastCommunication: "2025-01-27"
    },

    // Add more entries here to reach 40 static data items...

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
                variant="outlined"
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />}
                style={{ textTransform: "none", marginRight: 10 }}
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
    const theme = useTheme();  // Call useTheme() at the top level
    const [selectedColumns, setSelectedColumns] = useState(allColumns.map(col => col.key));
    const [data, setData] = useState(staticData);// Static data
    const [openExportDialog, setOpenExportDialog] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState("pdf");
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [newEntry, setNewEntry] = useState({});

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);  // Number of items per page (20)

    // Checkbox state for all rows
    const [checkedItems, setCheckedItems] = useState(new Array(data.length).fill(false)); // Initialize all checkboxes as unchecked

    // Get current page data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    // Handle the header checkbox click event
    const handleHeaderCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setCheckedItems(new Array(data.length).fill(isChecked)); // Toggle all checkboxes
    };

    // Handle the row checkbox click event
    const handleRowCheckboxChange = (index, event) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = event.target.checked;
        setCheckedItems(newCheckedItems);
    };

    // Function to export data as PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        const img = new Image();
        img.src = './Clicxia-Logo-1.png'; // Ensure the correct path

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const headerHeight = 40;
        const footerHeight = 20;
        const margin = 10;

        // Custom background color
        doc.setFillColor(253, 255, 252); // Light gray background
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        // Add header with logo and title
        doc.addImage(img, 'PNG', margin, 5, 50, 30);
        doc.setFontSize(22);
        doc.setTextColor(0, 0, 128); // Dark blue company name
        doc.text("KUSHAL DON", margin + 60, 20);

        doc.setFontSize(16);
        doc.setTextColor(50, 50, 50);
        doc.text("People Data", margin + 60, 30);

        const headers = selectedColumns.map(key => allColumns.find(col => col.key === key)?.label);
        const rows = data.map(row => selectedColumns.map(key => row[key]));

        doc.autoTable({
            head: [headers],
            body: rows,
            startY: headerHeight + 10,
            theme: "grid",
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [0, 0, 128], textColor: 255, fontStyle: "bold" },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            margin: { top: headerHeight, bottom: footerHeight },
            didDrawPage: function (data) {
                // Footer with page number
                const pageCount = doc.internal.getNumberOfPages();
                doc.setFontSize(10);
                doc.setTextColor(100);
                doc.text(`Page ${pageCount}`, pageWidth - margin - 20, pageHeight - 10);
            },
        });

        doc.save("People_Data.pdf");
    };

    // Function to export data as CSV
    const exportToCSV = () => {
        const csvData = [
            selectedColumns.map(key => allColumns.find(col => col.key === key)?.label),
            ...data.map(row => selectedColumns.map(key => row[key])),
        ];

        const csvContent = csvData.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'People_Data.csv');
            link.click();
        }
    };

    // Function to export data as Text
    const exportToText = () => {
        const textData = [
            selectedColumns.map(key => allColumns.find(col => col.key === key)?.label).join("\t"),
            ...data.map(row => selectedColumns.map(key => row[key]).join("\t")),
        ].join("\n");

        const blob = new Blob([textData], { type: 'text/plain;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'People_Data.txt');
            link.click();
        }
    };

    // Function to export data as DOC
    const exportToDoc = () => {
        const doc = new jsPDF();
        const headers = selectedColumns.map(key => allColumns.find(col => col.key === key)?.label);
        const rows = data.map(row => selectedColumns.map(key => row[key]));
        doc.autoTable({
            head: [headers],
            body: rows,
        });
        doc.save("People_Data.doc");
    };

    // Function to export data as Image
    const exportToImage = () => {
        const tableElement = document.querySelector("table");
        if (tableElement) {
            html2canvas(tableElement).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const doc = new jsPDF();
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save('People_Data.png');
            });
        }
    };

    // Function to handle format selection and trigger the export
    const handleExport = () => {
        switch (selectedFormat) {
            case "pdf":
                exportToPDF();
                break;
            case "csv":
                exportToCSV();
                break;
            case "text":
                exportToText();
                break;
            case "doc":
                exportToDoc();
                break;
            case "image":
                exportToImage();
                break;
            default:
                break;
        }
        setOpenExportDialog(false);
    };

    const handleOpenForm = () => {
        setNewEntry({});
        setOpenFormDialog(true);
    };

    const handleCloseForm = () => {
        setOpenFormDialog(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewEntry((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddEntry = () => {
        setData((prev) => [...prev, newEntry]);
        setOpenFormDialog(false);
    };

    return (
        <Container style={{ maxWidth: '100%', paddingLeft: '0px', paddingRight: '1px', borderRadius: 0 }}>
            <div style={{ display: "flex", flexDirection: "row", gap: 0, marginBottom: 50 }}>
                <ColumnsDropdown selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '600%' }}>
                    <Button variant="contained" startIcon={<UploadFile />} onClick={() => alert("File upload is disabled in static data version.")}>Import People</Button>
                    <Button variant="contained" startIcon={<Download />} style={{ marginLeft: 10 }} onClick={() => setOpenExportDialog(true)}>
                        Export People
                    </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Button variant="outlined" sx={{ marginLeft: 1, display: 'flex', alignItems: 'center', gap: 1 }} onClick={handleOpenForm}>
                        Add People
                        <AddCircleIcon />
                    </Button>
                </div>
            </div>
            <TableContainer component={Paper} style={{ display: "flex", width: '100%', maxHeight: 600, overflow: 'auto', borderRadius: 0 }}>
                <Table stickyHeader style={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow style={{
                            backgroundColor: "#f4f4f4",
                            position: "sticky",
                            top: 0,
                            zIndex: 5,
                            width: '100%',
                            overflow: 'hidden', // Prevents the header from wrapping
                        }}>
                            <TableCell style={{
                                whiteSpace: 'nowrap',
                                width: '50px',
                                position: 'sticky',
                                left: 0,
                                zIndex: 1,
                                backgroundColor: theme.palette.background.paper,  // Use the stored theme

                            }} padding="checkbox">

                                <Checkbox
                                    checked={checkedItems.every(Boolean)}
                                    indeterminate={checkedItems.some(Boolean) && !checkedItems.every(Boolean)}
                                    onChange={handleHeaderCheckboxChange}
                                />
                            </TableCell>
                            {/* Sticky First Name Column in Header */}
                            {allColumns.map(({ key, label }) => selectedColumns.includes(key) && (
                                <TableCell
                                    key={key}
                                    style={{
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap', // Prevent wrapping for all headers
                                        width: '150px', // Fixed width to avoid wrapping and overflow
                                        borderLeft: 'none', //Ensures no left border
                                        borderRight: 'none', //Ensure no right border
                                        position: key === "firstName" ? "sticky" : "static", // Sticky for First Name only
                                        left: key === "firstName" ? 50 : 0, // Adjust left position for first column
                                        zIndex: key === "firstName" ? 2 : 1, // Higher z-index for sticky columns
                                        backgroundColor: theme.palette.background.paper,  // Use the stored theme
                                    }}>
                                    {label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell style={{
                                    position: 'sticky',
                                    left: 0,
                                    zIndex: 2,
                                    backgroundColor: theme.palette.background.paper,  // Use the stored theme
                                }} padding="checkbox">
                                    <Checkbox
                                        checked={checkedItems[rowIndex]}
                                        onChange={(e) => handleRowCheckboxChange(rowIndex, e)}
                                    />
                                </TableCell>
                                {allColumns.map(({ key }) => selectedColumns.includes(key) && (
                                    <TableCell
                                        key={key}
                                        style={{
                                            textAlign: 'center',
                                            whiteSpace: 'nowrap',
                                            width: '150px', // Same fixed width for each cell in the body
                                            position: key === "firstName" ? "sticky" : "static", // Sticky for First Name only
                                            left: key === "firstName" ? 50 : 0, // Adjust left position for first column
                                            zIndex: key === "firstName" ? 1 : 0, // Higher z-index for sticky columns
                                            backgroundColor: theme.palette.background.paper,  // Use the stored theme
                                        }}>
                                        {row[key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Add Entry Dialog */}
                <Dialog open={openFormDialog} onClose={handleCloseForm}>
                    <DialogTitle>Add New Entry</DialogTitle>
                    <DialogContent>
                        {allColumns.map(({ key, label }) => {
                            // Check if the field is 'email', 'phone', or 'stage' and apply validation accordingly
                            let inputProps = {};
                            let errorMessage = '';

                            if (key === 'email') {
                                inputProps = { type: 'email', required: true };
                                errorMessage = 'Email must contain "@"';
                            } else if (key === 'phone' || key === 'deals' || key === 'stage') {
                                inputProps = { type: 'number', required: true, inputMode: 'numeric' };
                                errorMessage = 'Only numbers are allowed';
                            } else if (key === 'firstName' || key === 'lastName') {
                                inputProps = { required: true };
                            }

                            return (
                                <TextField
                                    key={key}
                                    name={key}
                                    label={label}
                                    fullWidth
                                    margin="dense"
                                    onChange={handleInputChange}
                                    {...inputProps}
                                    error={Boolean(errorMessage)}  // This triggers the error state
                                    helperText={errorMessage && errorMessage}
                                    InputProps={{
                                        sx: {
                                            // You can modify the error color here (e.g., to black or any other color)
                                            '&.Mui-error': {
                                                color: 'white', // Customize error text color
                                            },
                                        },
                                    }}
                                    FormHelperTextProps={{
                                        sx: {
                                            // Modify the helper text color
                                            color: 'white', // Change to any color you want
                                        }
                                    }}
                                />
                            );
                        })}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleAddEntry}
                            color="secondary"
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'green', // Green hover for Add
                                }
                            }}
                        >
                            Add
                        </Button>
                        <Button
                            onClick={handleCloseForm}
                            color="secondary"
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'red', // Red hover for Cancel
                                },
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

            </TableContainer>
            <Pagination count={Math.ceil(data.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} variant="outlined" shape="rounded" style={{ marginTop: 10, display: "flex", justifyContent: "center" }} />

            {/* Export Dialog */}
            <Dialog open={openExportDialog} onClose={() => setOpenExportDialog(false)}>
                <DialogTitle>Select Export Format</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <FormLabel>Export Format</FormLabel>
                        <RadioGroup value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
                            <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
                            <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                            <FormControlLabel value="text" control={<Radio />} label="Text" />
                            <FormControlLabel value="doc" control={<Radio />} label="DOC" />
                            <FormControlLabel value="image" control={<Radio />} label="Image" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleExport} color="primary">Export</Button>
                    <Button onClick={() => setOpenExportDialog(false)} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default LeadTable;