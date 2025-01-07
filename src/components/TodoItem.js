import React, { useState } from "react";
import { PRIORITY } from "../constants/priority";
import { Edit, Save, X, Calendar } from "lucide-react";

const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onPriorityChange,
  onEdit,
  showPrioritySelect = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || "");

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

    // 날짜가 지났는지 확인
    const isOverdue = today > dueDate;

    // 시간을 제외한 날짜만 비교
    const isToday = today.toDateString() === dueDate.toDateString();
    const isTomorrow = tomorrow.toDateString() === dueDate.toDateString();

    const dateStyle = {
      fontSize: "12px",
      padding: "2px 8px",
      borderRadius: "4px",
      backgroundColor: isOverdue ? "#fee2e2" : isToday ? "#e0f2fe" : "#f3f4f6",
      color: isOverdue ? "#dc2626" : isToday ? "#0369a1" : "#4b5563",
    };

    return (
      <span style={dateStyle}>
        <Calendar size={12} style={{ marginRight: "4px", display: "inline" }} />
        {isToday
          ? "오늘"
          : isTomorrow
          ? "내일"
          : new Date(date).toLocaleDateString("ko-KR")}
      </span>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px",
        marginBottom: "8px",
        backgroundColor: "white",
        borderRadius: "6px",
        borderLeft: `4px solid ${PRIORITY[todo.priority]?.color || "#d1d5db"}`,
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        style={{ marginRight: "12px" }}
      />
      <div style={{ flex: 1 }}>
        {isEditing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{
                padding: "4px 8px",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
              }}
            />
            <input
              type="datetime-local"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              style={{
                padding: "4px 8px",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
              }}
            />
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#9ca3af" : "#1f2937",
              }}
            >
              {todo.text}
            </span>
            {todo.dueDate && formatDueDate(todo.dueDate)}
            {todo.completedAt && (
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                완료: {new Date(todo.completedAt).toLocaleString("ko-KR")}
              </div>
            )}
          </div>
        )}
      </div>
      {showPrioritySelect && (
        <>
          {isEditing ? (
            <button
              onClick={handleSave}
              style={{
                marginLeft: "8px",
                padding: "4px 8px",
                border: "none",
                background: "none",
                color: "#3b82f6",
                cursor: "pointer",
              }}
            >
              <Save size={16} />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                marginLeft: "8px",
                padding: "4px 8px",
                border: "none",
                background: "none",
                color: "#6b7280",
                cursor: "pointer",
              }}
            >
              <Edit size={16} />
            </button>
          )}
          <select
            value={todo.priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            style={{
              marginLeft: "8px",
              padding: "2px",
              border: "1px solid #e2e8f0",
              borderRadius: "4px",
            }}
          >
            {Object.values(PRIORITY).map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </>
      )}
      <button
        onClick={onDelete}
        style={{
          marginLeft: "8px",
          padding: "4px 8px",
          border: "none",
          background: "none",
          color: "#9ca3af",
          cursor: "pointer",
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default TodoItem;
