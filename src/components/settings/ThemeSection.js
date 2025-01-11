import React from 'react';
import { Typography, Radio, Space } from 'antd';
import { themeNames } from '../../constants/colorThemes';

const ThemeSection = ({ currentTheme, onThemeChange }) => {
  return (
      <div>
        <Typography.Title level={5}>테마 설정</Typography.Title>
        <Radio.Group
            value={currentTheme}
            onChange={(e) => onThemeChange(e.target.value)}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            {Object.entries(themeNames).map(([key, name]) => (
                <Radio.Button
                    key={key}
                    value={key}
                    style={{
                      width: '100%',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '12px'
                    }}
                >
                  {name}
                </Radio.Button>
            ))}
          </Space>
        </Radio.Group>
      </div>
  );
};

export default ThemeSection;