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
  <form onSubmit={addTodo}>
    <div>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="새로운 할 일을 입력하세요"
        />
        <button type="submit">
          <Plus size={20} />
        </button>
      </div>
      <div>
        {Object.values(PRIORITY).map((priority) => (
          <button
            key={priority.value}
            type="button"
            onClick={() => setSelectedPriority(priority.value)}>
            {priority.label}
          </button>
        ))}
      </div>
    </div>
  </form>
);

export default TodoInput;
