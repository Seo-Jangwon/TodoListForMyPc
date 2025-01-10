import tokyoNight from './tokyoNight';

export const PRIORITY = {
  HIGH: {
    value: "HIGH",
    label: "높음",
    color: tokyoNight.brightRed
  },
  MEDIUM: {
    value: "MEDIUM",
    label: "보통",
    color: tokyoNight.brightGreen
  },
  LOW: {
    value: "LOW",
    label: "낮음",
    color: tokyoNight.white
  },
};

export default PRIORITY;