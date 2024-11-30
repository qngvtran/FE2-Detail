import React from "react";
import { Checkbox, Typography, Box } from "@mui/material";

const Item = ({ item, toggleResolved }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Checkbox
        checked={item.resolved}
        onChange={() => toggleResolved(item.id)}
        color="primary"
      />
      <Typography
        variant="body1"
        sx={{
          textDecoration: item.resolved ? "line-through" : "none",
          color: item.resolved ? "text.disabled" : "text.primary",
        }}
      >
        {item.name}
      </Typography>
    </Box>
  );
};

export default Item;
