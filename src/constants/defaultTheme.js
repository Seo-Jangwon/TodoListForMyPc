import tokyoNight from './tokyoNight';

const defaultTheme = {
  token: {
    fontFamily: "Pretendard, sans-serif",

    // Base Colors
    colorPrimary: tokyoNight.purple,      // 주요 액션 컬러
    colorSuccess: tokyoNight.green,       // 성공
    colorWarning: tokyoNight.yellow,      // 경고
    colorError: tokyoNight.red,           // 에러
    colorInfo: tokyoNight.cyan,           // 정보

    // Neutral Colors
    colorTextBase: tokyoNight.foreground,
    colorBgBase: tokyoNight.background,

    // Component Colors
    colorBorder: tokyoNight.brightBlack,
    colorBorderSecondary: tokyoNight.black,

    // Functional Colors
    colorLink: tokyoNight.blue,
    colorLinkHover: tokyoNight.brightBlue,
    colorLinkActive: tokyoNight.brightBlue,

    // Status Colors
    colorSuccessText: tokyoNight.green,
    colorSuccessBg: tokyoNight.black,
    colorWarningText: tokyoNight.yellow,
    colorWarningBg: tokyoNight.black,
    colorErrorText: tokyoNight.red,
    colorErrorBg: tokyoNight.black,
    colorInfoText: tokyoNight.cyan,
    colorInfoBg: tokyoNight.black,

    // Background Variations
    colorBgContainer: tokyoNight.black,
    colorBgElevated: tokyoNight.selectionBackground,
    colorBgSpotlight: tokyoNight.brightBlack,

    // Text Variations
    colorText: tokyoNight.foreground,
    colorTextSecondary: tokyoNight.white,
    colorTextTertiary: tokyoNight.brightBlack,
    colorTextQuaternary: tokyoNight.black,

    // Component-specific
    controlOutline: `${tokyoNight.purple}40`,
    colorPrimaryHover: tokyoNight.brightPurple,
    colorPrimaryActive: tokyoNight.purple,

    // Task Item Colors
    taskItemBgActive: tokyoNight.black,        // 미완료 할일 배경
    taskItemBgCompleted: tokyoNight.brightBlack,  // 완료된 할일 배경

    // Task Item Text Colors
    taskItemTextActive: tokyoNight.foreground,   // 미완료 할일 텍스트
    taskItemTextCompleted: tokyoNight.white,     // 완료된 할일 텍스트
    taskItemTextSecondary: tokyoNight.white,     // 부가 정보 텍스트 (우선순위, 날짜 등)

    calenderSundayTxt: tokyoNight.red,
    calenderSaturdayTxt: tokyoNight.cyan,
    calenderWeekdayTxt: tokyoNight.foreground,
    calenderTodayBg: tokyoNight.white,
    calenderDayBg: tokyoNight.background,
    calenderNotThisMonth: tokyoNight.blue,
    calenderSelectedDate: tokyoNight.red,

    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Button: {
      colorPrimary: tokyoNight.purple,
      algorithm: true,
    },
    Input: {
      colorBgContainer: tokyoNight.black,
      colorBorder: tokyoNight.brightBlack,
    },
    Card: {
      colorBgContainer: tokyoNight.black,
    },
    Select: {
      colorBgContainer: tokyoNight.black,
      colorBorder: tokyoNight.brightBlack,
    },
    Modal: {
      colorBgElevated: tokyoNight.black,
    },
  },
};

export default defaultTheme;