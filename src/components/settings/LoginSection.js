import React, {useState} from 'react';
import {Button, Flex, Space, Switch, theme} from 'antd';
import {GoogleOutlined} from '@ant-design/icons';

const LoginSection = ({auth, onLogin, onLogout}) => {

  const {token} = theme.useToken();

  const [syncEnabled, setSyncEnabled] = useState(() => {
    const savedSync = localStorage.getItem(`sync_enabled_${auth.user?.email}`);
    return savedSync ? JSON.parse(savedSync) : false;
  });

  const handleSyncChange = (checked) => {
    setSyncEnabled(checked);
    if (auth.user?.email) {
      localStorage.setItem(`sync_enabled_${auth.user?.email}`,
          JSON.stringify(checked));
    }
  };

  return (
      <div>
        {!auth?.isAuthenticated ? (
            <Button
                icon={<GoogleOutlined/>}
                onClick={onLogin}
                block
                style={{
                  backgroundColor: 'white',
                  color: '#000000DE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '40px',
                  border: '1px solid #DADCE0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
            >
              Google로 로그인
            </Button>
        ) : (
            <Space direction="vertical" style={{width: '100%'}} size="middle">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  marginBottom: 8,
                  fontWeight: 500
                }}>{auth.user?.email}</div>
                <Flex align="center" gap="small">
                  <Switch
                      checked={syncEnabled}
                      onChange={handleSyncChange}
                      size="small"
                      style={{
                        marginLeft: 8,
                        backgroundColor: syncEnabled ? token.colorPrimary
                            : token.colorText
                      }}
                  />
                  <span style={{
                    fontSize: 14,
                    color: syncEnabled ? token.colorPrimary : token.colorText,
                    fontWeight: syncEnabled ? 500 : 400
                  }}>
                      {syncEnabled ? "동기화 사용 중" : "동기화 사용 중지"}
                    </span>
                </Flex>
              </div>
              <Button onClick={onLogout} danger block>
                로그아웃
              </Button>
            </Space>
        )}
      </div>
  );
};

export default LoginSection;