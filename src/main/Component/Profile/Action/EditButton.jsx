import React, { useState } from 'react';
import SettingModal from '../../Header/SettingModal';
import { Button } from 'antd';

const EditButton = (profileId) => {
    const [modalVisible, setModalVisible] = useState(false);
    console.log('profileId', profileId)
    return (
        <>
            <Button
                type="default"
                style={{ marginRight: '5px' }}
                onClick={() => {
                    setModalVisible(true)
                }}>
                Edit</Button>
            <SettingModal
                profileId={profileId.profileId}
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)} />
        </>
    )
}

export default EditButton