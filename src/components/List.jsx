import React, { useState } from "react";
import { Box, IconButton, ButtonGroup, TextField } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as SaveIcon,
  Close as CancelIcon,
} from "@mui/icons-material";
import Item from "./Item";

const List = ({ items, toggleResolved, removeItem, updateItemName }) => {
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const startEditing = (id, name) => {
    setEditingItemId(id);
    setEditedName(name);
  };

  const saveEditedName = (id) => {
    if (!editedName.trim()) return;
    updateItemName(id, editedName);
    setEditingItemId(null);
    setEditedName("");
  };

  return (
    <Box>
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            p: 2,
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          {editingItemId === item.id ? (
            <TextField
              fullWidth
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ flex: 1, mr: 2 }}
              placeholder="Edit item name"
            />
          ) : (
            <Item item={item} toggleResolved={toggleResolved} />
          )}

          <ButtonGroup>
            {editingItemId === item.id ? (
              <>
                <IconButton
                  onClick={() => saveEditedName(item.id)}
                  color="primary"
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  onClick={() => setEditingItemId(null)}
                  color="secondary"
                >
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  onClick={() => startEditing(item.id, item.name)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => removeItem(item.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </ButtonGroup>
        </Box>
      ))}
    </Box>
  );
};

export default List;
