import React, { useState, useEffect } from "react";
import { mockShoppingList } from "../mocks/mockShoppingList";
import List from "../components/List";
import Member from "../components/Member";
import {
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Detail = ({ isOwner }) => {
  const [listName, setListName] = useState(mockShoppingList.name);
  const [items, setItems] = useState(mockShoppingList.items);
  const [newItemName, setNewItemName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState("");
  const [removedItems, setRemovedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isOwner ? "Owner" : "Member");
  }, [isOwner]);

  const toggleResolved = (id) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, resolved: !item.resolved } : item
        )
        .sort((a, b) => a.resolved - b.resolved)
    );
  };

  const addItem = () => {
    if (!newItemName.trim()) return;
    setItems((prevItems) => [
      ...prevItems,
      { id: Date.now().toString(), name: newItemName, resolved: false },
    ]);
    setNewItemName("");
  };

  const removeItem = (id) => {
    const itemToRemove = items.find((item) => item.id === id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setRemovedItems((prev) => [...prev, { ...itemToRemove, open: true }]);
  };

  const undoRemove = (id) => {
    const restoredItem = removedItems.find((item) => item.id === id);
    if (restoredItem) {
      setItems((prevItems) => [...prevItems, restoredItem]);
      setRemovedItems((prev) =>
        prev.filter((item) => item.id !== restoredItem.id)
      );
    }
  };

  const saveListName = () => {
    if (!isOwner) {
      alert("You do not have permissions to save this list");
      return;
    }
    setIsEditing(false);
    console.log("Saved list name:", listName);
  };

  const goBack = () => navigate(-1);

  const removeList = () => {
    if (!isOwner) {
      alert("You do not have permissions to delete this list");
      return;
    }
    if (window.confirm("Are you sure you want to delete this list?")) {
      console.log("List deleted");
      navigate("/");
    }
  };

  const updateItemName = (id, newName) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button variant="outlined" onClick={goBack}>
          Go Back
        </Button>
        <Member isOwner={isOwner} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <TextField
          fullWidth
          variant="standard"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          disabled={!isEditing || !isOwner}
          label="List Name"
          InputProps={{ sx: { py: 0.5 } }}
        />
        <Button
          variant={isEditing ? "contained" : "outlined"}
          onClick={isEditing ? saveListName : () => setIsEditing(true)}
          sx={{
            ml: 2,
            minWidth: "40px",
            width: "40px",
            height: "40px",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Edit />
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={removeList}
          sx={{
            ml: 2,
            minWidth: "40px",
            width: "40px",
            height: "40px",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Delete />
        </Button>
      </Box>

      {/* Add New Item */}
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          fullWidth
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          label="New Item"
        />
        <Button
          variant="contained"
          onClick={addItem}
          sx={{
            ml: 2,
            width: "40px",
            height: "55px",
            minWidth: "95px",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Add />
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        label="Filter Items"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 3 }}
      />

      {filteredItems.length > 0 && (
        <>
          <List
            items={filteredItems.filter((item) => !item.resolved)}
            toggleResolved={toggleResolved}
            removeItem={removeItem}
            updateItemName={updateItemName}
            title="Active Items"
          />
          <Divider sx={{ my: 3 }} />
          <List
            items={filteredItems.filter((item) => item.resolved)}
            toggleResolved={toggleResolved}
            removeItem={removeItem}
            updateItemName={updateItemName}
            title="Resolved Items"
          />
        </>
      )}

      {removedItems.map((item) => (
        <Snackbar
          key={item.id}
          open={item.open}
          autoHideDuration={6000}
          onClose={() =>
            setRemovedItems((prev) =>
              prev.map((x) => (x.id === item.id ? { ...x, open: false } : x))
            )
          }
        >
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => undoRemove(item.id)}
              >
                UNDO
              </Button>
            }
          >
            {`Item "${item.name}" removed`}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

export default Detail;
