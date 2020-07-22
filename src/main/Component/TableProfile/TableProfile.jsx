import React, { useContext, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../../Layout/app';
import SettingModal from '../Header/SettingModal';
import { ipcRenderer } from 'electron';


const TableProfile = () => {
    const { profiles, setProfiles } = useContext(ProfileContext);
    const [newProfiles, setNewProfiles] = useState();
    const [rowProfileId, setRowProfileId] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(true);

    const CONFIRM_DELETE_WARNING = "Are you sure to delete this profile ? This action CAN NOT be reverted."

    const removeProfile = (profileId) => {
        let profilesRemain = [...profiles]
        const result = profilesRemain.filter(obj => obj.profileId !== profileId);
        window.localStorage.setItem('profiles', JSON.stringify(result));
        setProfiles(result);
    };

    const columns = [
        {
            title: 'Profile',
            dataIndex: 'name',
            key: 'name',
            render: (text, row) => (
                <Link to={"/Profile/" + row.profileId} onClick={() => {
                }}>{text}</Link>
            ),
        },
        {
            title: 'Domain',
            dataIndex: 'domain',
            key: 'domain',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (text) => {
                if (text === "PROCESSING") {
                    return (
                        <Tag color={'green'} key={text}>{text}</Tag>
                    )
                }
                if (text === "DONE") {
                    return (
                        <Tag color={'yellow'} key={text}>{text}</Tag>
                    )
                }
                return (
                    <Tag color={'blue'} key={text}>{text}</Tag>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (row) => (
                <div className="action-btn">
                    <Button
                        type="primary"
                        style={{ marginRight: '5px' }}
                        onClick={() => {
                            let index;
                            let arg = {
                                domain: '',
                                username: '',
                                password: '',
                                profileId: ''
                            }
                            const newProfile = [...profiles];
                            profiles.forEach((item, i) => {
                                if (row.profileId === item.profileId) {
                                    index = i;
                                    newProfile[i].status = 'PROCESSING';
                                }
                            });
                            setProfiles(newProfile);
                            arg.domain = newProfile[index].domain;
                            arg.username = newProfile[index].username;
                            arg.password = newProfile[index].password;
                            arg.profileId = newProfile[index].profileId;
                            ipcRenderer.send('request-to-kintone', arg);
                            const listener = (event, response) => {
                                const newProfile = [...profiles];
                                profiles.forEach((item, i) => {
                                    if (row.profileId === item.profileId) {
                                        newProfile[i].status = response.status;
                                        newProfile[i].config = response.config;
                                        newProfile[i].log = response.log;
                                    }
                                });
                                setProfiles(newProfile);
                                ipcRenderer.removeListener('kintone-reply', listener);
                            };
                            ipcRenderer.on('kintone-reply', listener);
                        }}>
                        Generate</Button>
                    <Button
                        type="default"
                        style={{ marginRight: '5px' }}
                        onClick={() => {
                            setRowProfileId(row.profileId)
                            setModalVisible(true)
                        }}>
                        Edit</Button>
                    <Button
                        type="primary"
                        danger
                        onClick={() => {
                            Modal.confirm({
                                title: 'Delete Profile',
                                content: CONFIRM_DELETE_WARNING,
                                isVisible: deleteModalVisible,
                                onOk() {
                                    removeProfile(row.profileId);
                                },
                                onCancel() {
                                    setDeleteModalVisible(false);
                                },
                            })
                        }}>
                        Delete
                        </Button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        let profilesCopy = [...profiles];
        profilesCopy = profiles.map((profile, i) => {
            const newProfile = { ...profile, key: i };
            return newProfile;
        });
        setNewProfiles(profilesCopy);
    }, [profiles])

    return (
        <div>
            <SettingModal
                profileId={rowProfileId}
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)} />
            <Table columns={columns} dataSource={newProfiles}></Table>
        </div>
    );
}
export default TableProfile