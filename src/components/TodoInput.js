import React from "react";
import { Plus } from "lucide-react";
import { PRIORITY } from "../constants/priority";

const TodoInput = ({
  newTodo,
  setNewTodo,
  selectedPriority,
  setSelectedPriority,
  addTodo,
}) => (
  <form onSubmit={addTodo} style={{ marginBottom: "16px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="새로운 할 일을 입력하세요"
          style={{
            flex: 1,
            padding: "8px 12px",
            border: "1px solid #e2e8f0",
            borderRadius: "6px 0 0 6px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0 6px 6px 0",
            cursor: "pointer",
          }}
        >
          <Plus size={20} />
        </button>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        {Object.values(PRIORITY).map((priority) => (
          <button
            key={priority.value}
            type="button"
            onClick={() => setSelectedPriority(priority.value)}
            style={{
              padding: "4px 12px",
              backgroundColor:
                selectedPriority === priority.value
                  ? priority.color
                  : "#e2e8f0",
              color: selectedPriority === priority.value ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {priority.label}
          </button>
        ))}
      </div>
    </div>
  </form>
);

export default TodoInput;
