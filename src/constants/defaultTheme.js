import {themes} from './colorThemes'

const createTheme = (colorTheme) => ({
  token: {
    fontFamily: "Pretendard, sans-serif",

    // Base Colors
    colorPrimary: colorTheme.purple,      // 주요 액션 컬러
    colorSuccess: colorTheme.green,       // 성공
    colorWarning: colorTheme.yellow,      // 경고
    colorError: colorTheme.red,           // 에러
    colorInfo: colorTheme.cyan,           // 정보

    // Neutral Colors
    colorTextBase: colorTheme.foreground,
    colorBgBase: colorTheme.background,

    // Component Colors
    colorBorder: colorTheme.brightBlack,
    colorBorderSecondary: colorTheme.black,

    // Functional Colors
    colorLink: colorTheme.blue,
    colorLinkHover: colorTheme.brightBlue,
    colorLinkActive: colorTheme.brightBlue,

    // Status Colors
    colorSuccessText: colorTheme.green,
    colorSuccessBg: colorTheme.black,
    colorWarningText: colorTheme.yellow,
    colorWarningBg: colorTheme.black,
    colorErrorText: colorTheme.red,
    colorErrorBg: colorTheme.black,
    colorInfoText: colorTheme.cyan,
    colorInfoBg: colorTheme.black,

    // Background Variations
    colorBgContainer: colorTheme.black,
    colorBgElevated: colorTheme.selectionBackground,
    colorBgSpotlight: colorTheme.brightBlack,

    // Text Variations
    colorText: colorTheme.foreground,
    colorTextSecondary: colorTheme.white,
    colorTextTertiary: colorTheme.brightBlack,
    colorTextQuaternary: colorTheme.black,

    // Component-specific
    controlOutline: `${colorTheme.purple}40`,
    colorPrimaryHover: colorTheme.brightPurple,
    colorPrimaryActive: colorTheme.purple,

    // Task Item Colors
    taskItemBgActive: colorTheme.black,        // 미완료 할일 배경
    taskItemBgCompleted: colorTheme.brightBlack,  // 완료된 할일 배경

    // Task Item Text Colors
    taskItemTextActive: colorTheme.foreground,   // 미완료 할일 텍스트
    taskItemTextCompleted: colorTheme.white,     // 완료된 할일 텍스트
    taskItemTextSecondary: colorTheme.white,     // 부가 정보 텍스트 (우선순위, 날짜 등)

    calenderSundayTxt: colorTheme.red,
    calenderSaturdayTxt: colorTheme.cyan,
    calenderWeekdayTxt: colorTheme.foreground,
    calenderTodayBg: colorTheme.white,
    calenderDayBg: colorTheme.background,
    calenderNotThisMonth: colorTheme.blue,
    calenderSelectedDate: colorTheme.red,

    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Button: {
      colorPrimary: colorTheme.purple,
      algorithm: true,
    },
    Input: {
      colorBgContainer: colorTheme.black,
      colorBorder: colorTheme.brightBlack,
    },
    Card: {
      colorBgContainer: colorTheme.black,
    },
    Select: {
      colorBgContainer: colorTheme.black,
      colorBorder: colorTheme.brightBlack,
    },
    Modal: {
      colorBgElevated: colorTheme.black,
    },
  },
});

export const getTheme = (themeName = 'tokyoNight') => {
  return createTheme(themes[themeName]);
};

export default getTheme('tokyoNight');