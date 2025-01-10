import React from "react";
import { Calendar, Button, Flex, Typography } from "antd";
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

const MonthView = ({ todos, currentDate, setCurrentDate, onSelect }) => {
  console.log("MonthView props:", { currentDate, setCurrentDate });

  const navigateMonth = (direction) => {
    if (setCurrentDate) {
      // setCurrentDate가 있는지 확인
      setCurrentDate((prev) => prev.add(direction, "month"));
    }
  };

  const today = dayjs();

  const dateCellRender = (value) => {
    let style;

    if (value.format("YYYY-MM-DD") === today.format("YYYY-MM-DD")) {
      switch (value.format("ddd")) {
        case "일":
          style = { fontWeight: 700, color: theme.colorError };
          break;
        case "토":
          style = { fontWeight: 700, color: "#2374f7" };
          break;
        default:
          style = { fontWeight: 700, color: theme.colorText };
          break;
      }
    } else {
      switch (value.format("ddd")) {
        case "일":
          style = { fontWeight: 500, color: "#cc979a" };
          break;
        case "토":
          style = { fontWeight: 500, color: "#a7bad6" };
          break;
        default:
          style = { fontWeight: 500, color: theme.colorTextTertiary };
          break;
      }
    }

    return (
      <div
        style={{
          marginTop: "8px",
          padding: "0 4px",
        }}>
        <div
          style={{
            overflow: "hidden",
            minHeight: "40px",
            maxHeight: "40px",
            padding: "2px 4px",
            background:
              value.format("M") !== today.format("M")
                ? theme.colorBgContainer
                : theme.colorBgSpotlight,
            borderRadius: "4px",
          }}>
          <p
            style={{
              ...style,
              textAlign: "left",
              fontSize: "0.7rem",
            }}>
            {value.format("D")}
          </p>

          <div
            style={{
              marginTop: "-9px",
              marginLeft: "-4.5px",
            }}>
            <TodoDots todos={todos} date={value} />
          </div>
        </div>
      </div>
    );
  };

  const theme = defaultTheme.token;

  return (
    <Flex vertical gap="middle" style={{ width: "100%" }}>
      <Flex justify="space-between" align="center">
        <Button
          icon={<LeftOutlined />}
          onClick={() => navigateMonth(-1)}
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
          onClick={() => navigateMonth(1)}
          style={{
            backgroundColor: theme.colorPrimary,
            color: theme.colorBgBase,
          }}
        />
      </Flex>

      <Calendar
        fullscreen={true}
        value={currentDate}
        onSelect={onSelect}
        fullCellRender={dateCellRender}
        mode="month"
        headerRender={() => null}
        style={{
          width: "100%",
          padding: "8px 4px 2px",
        }}
      />
    </Flex>
  );
};

export default MonthView;
