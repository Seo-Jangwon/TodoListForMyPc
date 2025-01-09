import React from "react";
import {Calendar, Button} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import TodoDots from "../TodoDots";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const MonthView = ({todos, currentDate, setCurrentDate, onSelect}) => {
  console.log("MonthView props:", {currentDate, setCurrentDate});

  const navigateMonth = (direction) => {
    if (setCurrentDate) {
      // setCurrentDate가 있는지 확인
      setCurrentDate((prev) => prev.add(direction, "month"));
    }
  };

  const dateCellRender = (value) => {
    return <TodoDots todos={todos} date={value}/>;
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
              icon={<LeftOutlined/>}
              style={{
                position: "relative",
                zIndex: 10,
              }}
          />
          <span style={{fontSize: "16px", fontWeight: 500}}>
          {currentDate.format("YYYY년 MM월")}
        </span>
          <Button
              onClick={() => navigateMonth(1)}
              icon={<RightOutlined/>}
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
