import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  TEXT: "text",
  IMAGE: "image",
  BUTTON: "button",
};

const DraggableElement = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={drag}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        padding: 1,
        border: "1px solid gray",
        cursor: "grab",
        marginBottom: 1,
      }}
    >
      {children}
    </Box>
  );
};

const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.TEXT, ItemTypes.IMAGE, ItemTypes.BUTTON],
    drop: (item) => onDrop(item.type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={drop}
      sx={{
        minHeight: 300,
        border: "2px dashed gray",
        padding: 2,
        backgroundColor: isOver ? "lightgray" : "white",
      }}
    >
      <Typography variant="body1" align="center">
        Drag elements here
      </Typography>
    </Box>
  );
};

const EmailEditor = () => {
  const [elements, setElements] = useState([]);

  const handleDrop = (type) => {
    setElements((prev) => [...prev, type]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Email Editor
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ width: "30%" }}>
            <Typography variant="h6">Elements</Typography>
            <DraggableElement type={ItemTypes.TEXT}>Text</DraggableElement>
            <DraggableElement type={ItemTypes.IMAGE}>Image</DraggableElement>
            <DraggableElement type={ItemTypes.BUTTON}>Button</DraggableElement>
          </Box>
          <Box sx={{ width: "70%" }}>
            <DropZone onDrop={handleDrop} />
            <Box>
              {elements.map((el, index) => (
                <Box key={index} sx={{ padding: 1, border: "1px solid gray", marginY: 1 }}>
                  {el === ItemTypes.TEXT && <Typography>Sample Text</Typography>}
                  {el === ItemTypes.IMAGE && <img src="https://via.placeholder.com/150" alt="Placeholder" />}
                  {el === ItemTypes.BUTTON && <Button variant="contained">Click Me</Button>}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </DndProvider>
  );
};

export default EmailEditor;
