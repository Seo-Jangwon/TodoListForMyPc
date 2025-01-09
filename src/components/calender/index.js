import React, { useState } from "react";
import { Card, Radio } from "antd";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import defaultTheme from "../../constants/defaultTheme";

dayjs.locale("ko");

const TodoCalendar = ({ todos, selectedDate, onSelect }) => {
  const [viewMode, setViewMode] = useState("week");
  const [currentDate, setCurrentDate] = useState(dayjs());

  const theme = defaultTheme.token;

  return (
    <Card
      bordered={false}
      title={
        <Radio.Group
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}>
          <Radio.Button value="week">주간</Radio.Button>
          <Radio.Button value="month">월간</Radio.Button>
        </Radio.Group>
      }>
      {viewMode === "week" ? (
        <WeekView
          todos={todos}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          onSelect={onSelect}
        />
      ) : (
        <MonthView
          todos={todos}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          onSelect={onSelect}
        />
      )}
    </Card>
  );
};

export default TodoCalendar;
