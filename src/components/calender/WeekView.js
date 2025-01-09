import React from "react";
import { Button, Flex, Space, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import TodoDots from "../TodoDots";
import defaultTheme from "../../constants/defaultTheme";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const WeekView = ({ todos, currentDate, setCurrentDate, onSelect }) => {
  const getWeekDays = () => {
    const startOfWeek = currentDate.startOf("week");
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
  };

  const navigateWeek = (direction) => {
    setCurrentDate((prev) => prev.add(direction * 7, "day"));
  };

  const dateCellRender = (date) => {
    return <TodoDots todos={todos} date={date} />;
  };

  const weekDays = getWeekDays();
  const today = dayjs();

  const theme = defaultTheme.token;

  return (
    <Flex vertical gap="middle" style={{ width: "100%" }}>
      <Flex justify="space-between" align="center">
        <Button
          icon={<LeftOutlined />}
          onClick={() => navigateWeek(-1)}
          style={{
            backgroundColor: theme.colorPrimary,
            color: theme.colorBgBase,
          }}
        />

        <Typography.Title level={4} style={{ margin: 0, fontWeight: 700 }}>
          {currentDate.format("YYYY년 M월")}
        </Typography.Title>

        <Button
          icon={<RightOutlined />}
          onClick={() => navigateWeek(1)}
          style={{
            backgroundColor: theme.colorPrimary,
            color: theme.colorBgBase,
          }}
        />
      </Flex>

      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 8,
        }}>
        {weekDays.map((date) => {
          const isToday =
            date.format("YYYY-MM-DD") === today.format("YYYY-MM-DD");
          return (
            <div
              key={date.format()}
              style={{
                minHeight: "44px",
                maxHeight: "44px",
                padding: 0,
                textAlign: "center",
                borderRadius: 5,
                cursor: "pointer",
                backgroundColor: isToday ? theme.colorWarning : "#FFF",
              }}
              onClick={() => onSelect(date)}>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: isToday ? "700" : "500",
                  letterSpacing: 0,
                  textAlign: "left",
                  padding: "0 5px",
                  margin: "0 auto",
                  color:
                    date.format("ddd") === "일"
                      ? theme.colorError
                      : date.format("ddd") === "토"
                      ? "#2374f7"
                      : theme.colorBgBase,
                }}>
                <Flex
                  justify="space-between"
                  style={{
                    background: "transparent",
                  }}>
                  <div>{date.format("D")}</div>
                  <div>{date.format("ddd")}</div>
                </Flex>
              </div>

              {dateCellRender(date)}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .events {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </Flex>
  );
};

export default WeekView;
