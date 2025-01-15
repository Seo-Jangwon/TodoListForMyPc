const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
};

const rgbToHex = (rgb) => {
  return (
    "#" +
    rgb
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

const getLuminance = (rgb) => {
  const [r, g, b] = rgb.map((color) => {
    color /= 255;

    return color <= 0.03928
      ? color / 12.92
      : Math.pow((color + 0.055) / 1.055, 2.4);
  });

  return r * 0.2126 + g * 0.7152 + b * 0.0722;
};

const getContrast = (textLuminance, backgroundLuminance) => {
  return (
    (Math.max(textLuminance, backgroundLuminance) + 0.05) /
    (Math.min(textLuminance, backgroundLuminance) + 0.05)
  );
};

// 현재 컬러 테마의 시인성이 기준을 충족한 상태인지 확인
const isGoodContrast = (textRgb, background) => {
  return (
    getContrast(getLuminance(textRgb), getLuminance(hexToRgb(background))) >= 7
  );
};

// 현재 컬러 테마의 배경 색상 기준, 텍스트 색상이 흰색과 검은색 중 어디에 가까워야 시인성이 좋아지는지 확인
// true = 밝은 명도의 텍스트 색상, false = 어두운 명도의 텍스트 색상
const hasLightText = (background) => {
  const rgb = hexToRgb(background);

  const backgroundLuminance = getLuminance(rgb);
  const whiteLuminance = getLuminance([255, 255, 255]);
  const blackLuminance = getLuminance([0, 0, 0]);

  const lightContrast = getContrast(backgroundLuminance, whiteLuminance);
  const darkContrast = getContrast(backgroundLuminance, blackLuminance);

  return lightContrast < darkContrast;
};

// 명도 조절
const adjustLightness = (rgb, intensity) => {
  const factor = intensity / 50;

  if (factor <= 1) return rgb.map((color) => Math.round(color * factor));
  else
    return rgb.map((color) => Math.round(color + (255 - color) * (factor - 1)));
};

// 대비율에 따라 최종 변경된 텍스트 색상
const convertTextColor = (text, background) => {
  if (isGoodContrast(hexToRgb(text), background)) return text;
  else {
    let rgb = hexToRgb(text);

    if (hasLightText) {
      for (let i = 50; i < 101; i++) {
        rgb = adjustLightness(rgb, i);
        if (isGoodContrast(rgb, background)) return rgbToHex(rgb);
      }
    } else {
      for (let i = 50; i > -1; i--) {
        rgb = adjustLightness(rgb, i);
        if (isGoodContrast(rgb, background)) return rgbToHex(rgb);
      }
    }
  }
};
