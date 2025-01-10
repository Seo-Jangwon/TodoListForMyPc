import dayjs from "dayjs";

export const getDateStyle = (date, current, theme, type) => {
  if (date.format("YYYY-MM") === current.format("YYYY-MM")) {
    switch (date.format("ddd")) {
      case "일":
        return { fontWeight: 700, color: theme.calenderSundayTxt };
      case "토":
        return { fontWeight: 700, color: theme.calenderSaturdayTxt };
      default:
        return { fontWeight: 700, color: theme.calenderWeekdayTxt };
    }
  } else if (type === 'm') {
    return { fontWeight: 700, color: theme.calenderNotThisMonth };
  } else {
    switch (date.format("ddd")) {
      case "일":
        return { fontWeight: 500, color: theme.calenderSundayTxt };
      case "토":
        return { fontWeight: 500, color: theme.calenderSaturdayTxt };
      default:
        return { fontWeight: 500, color: theme.calenderWeekdayTxt };
    }
  }
};