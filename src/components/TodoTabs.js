import React from "react";

const TodoTabs = ({
  activeTab,
  setActiveTab,
  activeTodosCount,
  completedTodosCount,
}) => (
  <div>
    <button onClick={() => setActiveTab("active")}>
      진행중 ({activeTodosCount})
    </button>
    <button onClick={() => setActiveTab("completed")}>
      완료됨 ({completedTodosCount})
    </button>
  </div>
);

export default TodoTabs;
