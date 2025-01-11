import React from 'react';
import {Typography, Card, theme} from 'antd';
import {themeNames} from '../../constants/colorThemes';
import {CheckOutlined} from '@ant-design/icons';

const ThemeSection = ({currentTheme, onThemeChange}) => {
  const {token} = theme.useToken();

  return (
      <div>
        <Typography.Title level={5}>테마 설정</Typography.Title>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          maxHeight: '300px',
          overflowY: 'auto',
          padding: '4px'
        }}>
          {Object.entries(themeNames)
          .sort(([, a], [, b]) => a.localeCompare(b))
          .map(([key, name]) => (
              <Card
                  key={key}
                  size="small"
                  hoverable
                  style={{
                    cursor: 'pointer',
                    borderColor: currentTheme === key ? token.colorPrimary
                        : 'transparent',
                    background: currentTheme === key ? `${token.colorPrimary}15`
                        : token.colorBgContainer,
                    position: 'relative'
                  }}
                  bodyStyle={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    fontSize: '13px'
                  }}
                  onClick={() => onThemeChange(key)}
              >
                {currentTheme === key && (
                    <CheckOutlined
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          fontSize: '12px',
                          color: token.colorPrimary
                        }}
                    />
                )}
                {name}
              </Card>
          ))}
        </div>
      </div>
  );
};

export default ThemeSection;