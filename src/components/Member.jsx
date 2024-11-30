import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import mockMembers from "../mocks/mockMembers";

import { useNavigate } from "react-router-dom";

const Members = ({ isOwner }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState(mockMembers);
  const [newMemberName, setNewMemberName] = useState("");
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [leavingMember, setLeavingMember] = useState(null);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const removeMember = (id) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== id)
    );
  };

  const addMember = () => {
    if (!newMemberName.trim()) return;
    setMembers((prevMembers) => [
      ...prevMembers,
      { id: Date.now(), name: newMemberName, isOwner: false },
    ]);
    setNewMemberName("");
  };

  const handleLeave = () => {
    if (leavingMember) {
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== leavingMember.id)
      );
      setOpenLeaveDialog(false);
      navigate("/");
    }
  };

  return (
    <Box>
      <Button
        sx={{ paddingLeft: 1.5 }}
        variant="contained"
        onClick={handleToggle}
      >
        Members
      </Button>

      <Modal
        open={open}
        onClose={handleToggle}
        aria-labelledby="member-list-modal"
        aria-describedby="modal-to-display-members"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="member-list-modal" variant="h6" sx={{ mb: 2 }}>
            Members
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <List>
            {members.map((member) => (
              <ListItem
                key={member.id}
                sx={{ py: 1, display: "flex", justifyContent: "space-between" }}
              >
                <ListItemText
                  primary={`${member.name}${member.isOwner ? " (Owner)" : ""}`}
                />
                {isOwner
                  ? !member.isOwner && (
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => removeMember(member.id)}
                      >
                        <Delete />
                      </IconButton>
                    )
                  : member.name === "Bob" && (
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => {
                          setLeavingMember(member);
                          setOpenLeaveDialog(true);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    )}
              </ListItem>
            ))}
          </List>

          {isOwner && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <TextField
                fullWidth
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                label="New Member"
                size="small"
              />
              <IconButton
                color="primary"
                onClick={addMember}
                sx={{ ml: 1 }}
                disabled={!newMemberName.trim()}
              >
                <Add />
              </IconButton>
            </Box>
          )}

          <Button
            variant="outlined"
            fullWidth
            onClick={handleToggle}
            sx={{ mt: 3 }}
          >
            Close
          </Button>
        </Box>
      </Modal>

      {!isOwner && leavingMember && (
        <Modal
          open={openLeaveDialog}
          onClose={() => setOpenLeaveDialog(false)}
          aria-labelledby="leave-dialog"
          aria-describedby="dialog-to-confirm-leaving"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Leave the List
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Are you sure you want to leave this list? You won't be able to
              return.
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleLeave}
            >
              Leave
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => setOpenLeaveDialog(false)}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default Members;
