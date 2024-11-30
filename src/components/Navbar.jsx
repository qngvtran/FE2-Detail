import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setIsOwner }) => {
  const [isOwner, setIsOwnerState] = React.useState(true);
  const navigate = useNavigate();

  const handleSwitchChange = (event) => {
    const ownerStatus = event.target.checked;
    setIsOwnerState(ownerStatus);
    setIsOwner(ownerStatus);
  };

  const goHome = () => navigate("/");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={goHome}
          >
            uuShoppingList
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={isOwner}
                onChange={handleSwitchChange}
                color="default"
              />
            }
            label={isOwner ? "Owner" : "Member"}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
