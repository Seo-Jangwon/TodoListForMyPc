import React from 'react';
import {Modal, Space} from 'antd';
import LoginSection from './LoginSection';
import ThemeSection from './ThemeSection';

const SettingsModal = ({
  visible,
  onClose,
  auth,
  onLogin,
  onLogout,
  currentTheme,
  onThemeChange
}) => {
  return (
      <Modal
          title="설정"
          open={visible}
          onCancel={onClose}
          footer={null}
      >
        <Space direction="vertical" size="large" style={{width: '100%'}}>
          <LoginSection
              auth={auth}
              onLogin={onLogin}
              onLogout={onLogout}
          />
          <ThemeSection
              currentTheme={currentTheme}
              onThemeChange={onThemeChange}
          />
        </Space>
      </Modal>
  );
};

export default SettingsModal;