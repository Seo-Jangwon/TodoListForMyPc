import React from "react";
import {Button, Flex, Typography} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import TodoDots from "../TodoDots";
import defaultTheme from "../../constants/defaultTheme";
import {getDateStyle} from "../../constants/calendarStyles";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const WeekView = ({
  todos,
  currentDate,
  selectedDate,
  setCurrentDate,
  onSelect
}) => {
  const getWeekDays = () => {
    const startOfWeek = currentDate.startOf("week");
    return Array.from({length: 7}, (_, i) => startOfWeek.add(i, "day"));
  };

  const navigateWeek = (direction) => {
    setCurrentDate((prev) => prev.add(direction * 7, "day"));
  };

  const dateCellRender = (date) => {
    return <TodoDots todos={todos} date={date}/>;
  };

  const weekDays = getWeekDays();
  const today = dayjs();
  const theme = defaultTheme.token;

  return (
      <Flex vertical gap="middle" style={{width: "100%"}}>
        <Flex justify="space-between" align="center">
          <Button
              icon={<LeftOutlined/>}
              onClick={() => navigateWeek(-1)}
              style={{
                backgroundColor: 'transparent',
                color: theme.colorPrimary,
                border: 'none'
              }}
          />

          <Typography.Title level={4} style={{margin: 0, fontWeight: 700}}>
            {currentDate.format("YYYY년 M월")}
          </Typography.Title>

          <Button
              icon={<RightOutlined/>}
              onClick={() => navigateWeek(1)}
              style={{
                backgroundColor: 'transparent',
                color: theme.calenderSelectedDate,
                border: 'none'
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
            const dateStyle = getDateStyle(date, today, theme, "w");

            return (
                <div
                    key={date.format()}
                    onClick={() => onSelect(date)}
                    style={{
                      minHeight: "44px",
                      maxHeight: "44px",
                      padding: 0,
                      textAlign: "center",
                      borderRadius: 5,
                      cursor: "pointer",
                      backgroundColor: date.format("YYYY-MM-DD")
                      === today.format("YYYY-MM-DD")
                          ? theme.calenderTodayBg
                          : theme.colorBgBase,
                      border: date.format("YYYY-MM-DD")
                      === selectedDate?.format("YYYY-MM-DD")
                          ? `2px solid ${theme.colorPrimary}`
                          : "none",
                    }}>
                  <div
                      style={{
                        fontSize: "0.75rem",
                        letterSpacing: 0,
                        textAlign: "left",
                        padding: "0 5px",
                        margin: "0 auto",
                        ...dateStyle,
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
      </Flex>
  );
};

export default WeekView;