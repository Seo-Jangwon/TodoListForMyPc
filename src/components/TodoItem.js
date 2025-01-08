import React, { useState } from "react";
import { PRIORITY } from "../constants/priority";

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

    return <div>formatDueDate</div>;
  };

  return <div>item</div>;
};

export default TodoItem;
