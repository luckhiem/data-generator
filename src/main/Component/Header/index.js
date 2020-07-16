import React, { useState } from 'react';
import './style.css';
import { Button} from 'antd';
import SettingModal from './SettingModal';

const SettingProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div>
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
      >Add Profile
      </Button>
      <SettingModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>

  );
};

export default SettingProfile;