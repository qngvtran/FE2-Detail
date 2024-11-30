import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Typography, Paper } from "@mui/material";
import { mockShoppingList } from "../mocks/mockShoppingList";

const Home = () => {
  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Welcome to your Shopping List!
      </Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {mockShoppingList.name}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/detail"
        >
          View List
        </Button>
      </Paper>
    </Box>
  );
};

export default Home;
