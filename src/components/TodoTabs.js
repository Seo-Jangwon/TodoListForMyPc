import React from "react";

const TodoTabs = ({
  activeTab,
  setActiveTab,
  activeTodosCount,
  completedTodosCount,
}) => (
  <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
    <button
      onClick={() => setActiveTab("active")}
      style={{
        padding: "8px 16px",
        backgroundColor: activeTab === "active" ? "#3b82f6" : "#e5e7eb",
        color: activeTab === "active" ? "white" : "#4b5563",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      진행중 ({activeTodosCount})
    </button>
    <button
      onClick={() => setActiveTab("completed")}
      style={{
        padding: "8px 16px",
        backgroundColor: activeTab === "completed" ? "#3b82f6" : "#e5e7eb",
        color: activeTab === "completed" ? "white" : "#4b5563",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      완료됨 ({completedTodosCount})
    </button>
  </div>
);

export default TodoTabs;
