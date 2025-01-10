import React from "react";
import {Calendar, Button, Flex, Typography} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import TodoDots from "../TodoDots";
import defaultTheme from "../../constants/defaultTheme";
import locale from 'antd/es/calendar/locale/ko_KR';
import {getDateStyle} from "../../constants/calendarStyles";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const MonthView = ({
  todos,
  currentDate,
  selectedDate,
  setCurrentDate,
  onSelect
}) => {
  const navigateMonth = (direction) => {
    if (setCurrentDate) {
      setCurrentDate((prev) => prev.add(direction, "month"));
    }
  };

  const handlePanelChange = (date) => {
    setCurrentDate(date);
  };

  const dateCellRender = (value) => {
    const style = getDateStyle(value, currentDate, theme, "m");

    return (
        <div style={{marginTop: "8px", padding: "0 4px"}}>
          <div style={{
            overflow: "hidden",
            minHeight: "40px",
            maxHeight: "40px",
            padding: "2px 4px",
            background: value.format("YYYY-MM-DD") === dayjs().format(
                "YYYY-MM-DD")
                ? theme.calenderTodayBg
                : value.format("M") !== currentDate.format("M")
                    ? theme.colorBgSpotlight
                    : theme.colorBgBase,
            borderRadius: "4px",
            border: value.format("YYYY-MM-DD") === selectedDate?.format(
                "YYYY-MM-DD")
                ? `2px solid ${theme.calenderSelectedDate}`
                : "none",
          }}>
            <p style={{
              ...style,
              textAlign: "left",
              fontSize: "0.7rem",
            }}>
              {value.format("D")}
            </p>
            <div style={{
              marginTop: "-9px",
              marginLeft: "-4.5px",
            }}>
              <TodoDots todos={todos} date={value}/>
            </div>
          </div>
        </div>
    );
  };

  const theme = defaultTheme.token;

  return (
      <Flex vertical gap="middle" style={{width: "100%"}}>
        <Flex justify="space-between" align="center">
          <Button
              icon={<LeftOutlined/>}
              onClick={() => navigateMonth(-1)}
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
              onClick={() => navigateMonth(1)}
              style={{
                backgroundColor: 'transparent',
                color: theme.colorPrimary,
                border: 'none'
              }}
          />
        </Flex>

        <Calendar
            locale={locale}
            fullscreen={true}
            value={currentDate}
            onSelect={onSelect}
            fullCellRender={dateCellRender}
            mode="month"
            headerRender={() => null}
            onPanelChange={handlePanelChange}
            onChange={handlePanelChange}
            style={{
              width: "100%",
              padding: "8px 4px 2px",
            }}
        />
      </Flex>
  );
};

export default MonthView;
