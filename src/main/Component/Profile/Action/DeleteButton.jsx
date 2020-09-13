import React, { useState , useContext} from 'react';
import {Button, Modal } from 'antd';
import { ProfileContext } from '../../../Layout/app';

const DeleteButton = (profileId) => {
    const { profiles, setProfiles } = useContext(ProfileContext);
    const [deleteModalVisible, setDeleteModalVisible] = useState(true);
    const CONFIRM_DELETE_WARNING = "Are you sure to delete this profile ? This action CAN NOT be reverted."

    const removeProfile = (profileId) => {
        let profilesRemain = [...profiles]
        const result = profilesRemain.filter(obj => obj.profileId !== profileId);
        window.localStorage.setItem('profiles', JSON.stringify(result));
        setProfiles(result);
    };
    return (
        <Button
            key="1"
            type="primary"
            danger
            onClick={() => {
                Modal.confirm({
                    title: 'Delete Profile',
                    content: CONFIRM_DELETE_WARNING,
                    isVisible: deleteModalVisible,
                    onOk() {
                        window.history.back();
                        removeProfile(profileId.profileId);
                    },
                    onCancel() {
                        setDeleteModalVisible(false);
                    },
                })
            }}>
            Delete
        </Button>
    )
}

export default DeleteButton