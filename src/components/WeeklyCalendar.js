import React from "react";
import { Calendar, Badge } from "antd";
import dayjs from "dayjs";

const WeeklyCalendar = ({ todos, selectedDate, onSelect }) => {
  const dateCellRender = (value) => {
    const date = value.format("YYYY-MM-DD");
    const todayTodos = todos.filter((todo) => {
      const todoDate = dayjs(todo.dueDate).format("YYYY-MM-DD");
      return todoDate === date;
    });

    return (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todayTodos.map((todo) => (
          <li key={todo.id}>
            <Badge
              status={
                todo.priority === "HIGH"
                  ? "error"
                  : todo.priority === "MEDIUM"
                  ? "warning"
                  : "success"
              }
              text={todo.text}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar
      fullscreen={false}
      value={selectedDate}
      onSelect={onSelect}
      dateCellRender={dateCellRender}
    />
  );
};

export default WeeklyCalendar;
