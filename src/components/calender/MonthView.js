import React from "react";
import {Calendar, Button, Flex, Typography, theme} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import TodoDots from "../TodoDots";
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

  const {token} = theme.useToken();

  const navigateMonth = (direction) => {
    if (setCurrentDate) {
      setCurrentDate((prev) => prev.add(direction, "month"));
    }
  };

  const handlePanelChange = (date) => {
    setCurrentDate(date);
  };

  const dateCellRender = (value) => {
    const style = getDateStyle(value, currentDate, token, "m");  // theme -> token

    return (
        <div style={{marginTop: "8px", padding: "0 4px"}}>
          <div style={{
            overflow: "hidden",
            minHeight: "40px",
            maxHeight: "40px",
            padding: "2px 4px",
            background: value.format("YYYY-MM") !== currentDate.format(
                "YYYY-MM")
                ? token.colorBgSpotlight
                : token.colorBgBase,
            borderRadius: "4px",
            border: value.format("YYYY-MM-DD") === selectedDate?.format(
                "YYYY-MM-DD")
                ? `2px solid ${value.format("YYYY-MM-DD") === dayjs().format(
                    "YYYY-MM-DD")
                    ? token.calenderTodayBorder
                    : token.calenderSelectedDate}`
                : value.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
                    ? `2px solid ${token.calenderTodayBorder}`
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

  return (
      <Flex vertical gap="middle" style={{width: "100%"}}>
        <Flex justify="space-between" align="center">
          <Button
              icon={<LeftOutlined/>}
              onClick={() => navigateMonth(-1)}
              style={{
                backgroundColor: 'transparent',
                color: token.colorPrimary,
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
                color: token.colorPrimary,
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