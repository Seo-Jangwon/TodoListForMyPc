import React from 'react';
import {Button} from 'antd';
import {GoogleOutlined} from '@ant-design/icons';

const LoginSection = ({auth, onLogin, onLogout}) => {
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
            <div>
              <div style={{marginBottom: '12px'}}>
                {auth.user?.email} 으로 로그인됨
              </div>
              <Button onClick={onLogout} block danger>
                로그아웃
              </Button>
            </div>
        )}
      </div>
  );
};

export default LoginSection;