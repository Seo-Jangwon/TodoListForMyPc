const defaultTheme = {
  token: {
    fontFamily: "Pretendard, sans-serif", // Default font

    // Base Colors
    colorPrimary: "#ff7edb", // Neon pink - primary actions and highlights
    colorSuccess: "#72f1b8", // Neon green - success states
    colorWarning: "#fede5d", // Neon yellow - warnings
    colorError: "#fe4450", // Bright red - errors
    colorInfo: "#36f9f6", // Cyan - info states

    // Neutral Colors
    colorTextBase: "#ffffff", // White text
    colorBgBase: "#262335", // Deep purple background

    // Component Colors
    colorBorder: "#495495", // Muted blue for borders
    colorBorderSecondary: "#383d5d", // Darker blue for secondary borders

    // Functional Colors
    colorLink: "#36f9f6", // Cyan for links
    colorLinkHover: "#ff7edb", // Pink hover state
    colorLinkActive: "#ff7edb", // Pink active state

    // Status Colors
    colorSuccessText: "#72f1b8",
    colorSuccessBg: "#072f2f",
    colorWarningText: "#fede5d",
    colorWarningBg: "#2f2f07",
    colorErrorText: "#fe4450",
    colorErrorBg: "#2f0707",
    colorInfoText: "#36f9f6",
    colorInfoBg: "#072f2f",

    // Background Variations
    colorBgContainer: "#2a2139", // Slightly lighter than base for containers
    colorBgElevated: "#34294f", // Elevated components like cards
    colorBgSpotlight: "#461e5c", // Spotlight/focus areas

    // Text Variations
    colorText: "#ffffff", // Primary text
    colorTextSecondary: "#b6b6b6", // Secondary text
    colorTextTertiary: "#8e8e8e", // Tertiary text
    colorTextQuaternary: "#6e6e6e", // Disabled text

    // Component-specific
    controlOutline: "#ff7edb40", // Focus outline with opacity
    colorPrimaryHover: "#ff9fe9", // Lighter pink for hover states
    colorPrimaryActive: "#ff5ed2", // Darker pink for active states

    // Additional Customization
    borderRadius: 6, // Rounded corners
    wireframe: false, // Enable for more depth
  },
  components: {
    Button: {
      colorPrimary: "#ff7edb",
      algorithm: true, // Enable algorithm
    },
    Input: {
      colorBgContainer: "#34294f",
      colorBorder: "#495495",
    },
    Card: {
      colorBgContainer: "#34294f",
    },
    Select: {
      colorBgContainer: "#34294f",
      colorBorder: "#495495",
    },
    Modal: {
      colorBgElevated: "#34294f",
    },
  },
};

export default defaultTheme;
