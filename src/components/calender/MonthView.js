import React from "react";
import { Calendar, Badge, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const MonthView = ({ todos, currentDate, setCurrentDate, onSelect }) => {
  console.log("MonthView props:", { currentDate, setCurrentDate });

  const navigateMonth = (direction) => {
    if (setCurrentDate) {
      // setCurrentDate가 있는지 확인
      setCurrentDate((prev) => prev.add(direction, "month"));
    }
  };

  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const todayTodos = todos.filter((todo) => {
      if (!todo.dueDate) return false;
      return dayjs(todo.dueDate).format("YYYY-MM-DD") === dateStr;
    });

    const groupedTodos = {
      HIGH: todayTodos.filter((todo) => todo.priority === "HIGH"),
      MEDIUM: todayTodos.filter((todo) => todo.priority === "MEDIUM"),
      LOW: todayTodos.filter((todo) => todo.priority === "LOW"),
    };

    return (
      <ul
        className="events"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        {Object.entries(groupedTodos).map(([priority, todos]) => {
          if (todos.length === 0) return null;
          return (
            <li key={priority}>
              <Badge
                status={
                  priority === "HIGH"
                    ? "error"
                    : priority === "MEDIUM"
                    ? "warning"
                    : "success"
                }
                text={`${todos.length}개`}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          padding: "0 16px",
          backgroundColor: "white",
          border: "1px solid #ddd",
          position: "relative",
        }}
      >
        <Button
          onClick={() => navigateMonth(-1)}
          icon={<LeftOutlined />}
          style={{
            position: "relative",
            zIndex: 10,
          }}
        />
        <span style={{ fontSize: "16px", fontWeight: 500 }}>
          {currentDate.format("YYYY년 MM월")}
        </span>
        <Button
          onClick={() => navigateMonth(1)}
          icon={<RightOutlined />}
          style={{
            position: "relative",
            zIndex: 10,
          }}
        />
      </div>
      <Calendar
        fullscreen={true}
        value={currentDate}
        onSelect={onSelect}
        dateCellRender={dateCellRender}
        mode="month"
        headerRender={() => null}
        style={{
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default MonthView;
