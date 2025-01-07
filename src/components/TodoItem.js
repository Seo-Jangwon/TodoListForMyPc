import React, { useState } from "react";
import { PRIORITY } from "../constants/priority";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Checkbox,
  Typography,
  Menu,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || "");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(todo.id);
    handleClose();
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, {
        text: editText.trim(),
        dueDate: editDueDate,
      });
      setIsEditing(false);
    }
  };

  const formatDueDate = (date) => {
    if (!date) return null;
    const dueDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isOverdue = today > dueDate;
    const isToday = today.toDateString() === dueDate.toDateString();
    const isTomorrow = tomorrow.toDateString() === dueDate.toDateString();

    return (
      <Typography
        variant="caption"
        sx={{
          px: 1,
          py: 0.5,
          borderRadius: 1,
          bgcolor: isOverdue
            ? "error.lightest"
            : isToday
            ? "info.lightest"
            : "grey.100",
          color: isOverdue
            ? "error.main"
            : isToday
            ? "info.main"
            : "text.secondary",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          mt: 0.5,
        }}
      >
        <CalendarIcon fontSize="inherit" />
        {isToday
          ? "오늘"
          : isTomorrow
          ? "내일"
          : new Date(date).toLocaleDateString("ko-KR")}
      </Typography>
    );
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        borderLeft: 4,
        borderColor: PRIORITY[todo.priority]?.color,
      }}
    >
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <Box sx={{ flex: 1 }}>
        {isEditing ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSave();
                }
              }}
            />
            <TextField
              type="datetime-local"
              size="small"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select
                  size="small"
                  value={todo.priority}
                  onChange={(e) =>
                    onEdit(todo.id, {
                      ...todo,
                      priority: e.target.value,
                    })
                  }
                >
                  {Object.values(PRIORITY).map((priority) => (
                    <MenuItem
                      key={priority.value}
                      value={priority.value}
                      sx={{ color: priority.color }}
                    >
                      {priority.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <button
                onClick={handleSave}
                style={{
                  padding: "6px 12px",
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                저장
              </button>
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  padding: "6px 12px",
                  background: "#gray",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                취소
              </button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography>{todo.text}</Typography>
            {todo.dueDate && formatDueDate(todo.dueDate)}
          </Box>
        )}
      </Box>
      {!todo.completed && !isEditing && (
        <>
          <IconButton
            size="small"
            onClick={handleClick}
            aria-controls={open ? "todo-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="todo-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleEdit}>수정</MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
              삭제
            </MenuItem>
          </Menu>
        </>
      )}
    </Paper>
  );
};

export default TodoItem;
