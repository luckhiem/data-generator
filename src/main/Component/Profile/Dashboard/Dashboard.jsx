import React, { useContext, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { ProfileContext } from '../../../Layout/app';
import SettingModal from '../../Header/SettingModal';
import GenerateButton from '../Action/GenerateButton';
import TeardownButton from '../Action/TeardownButton';
import EditButton from '../Action/EditButton';
import DeleteButton from '../Action/DeleteButton';


const Dashboard = () => {
    const { profiles, setProfiles } = useContext(ProfileContext);
    const [newProfiles, setNewProfiles] = useState();
    const [rowProfileId, setRowProfileId] = useState();
    const [modalVisible, setModalVisible] = useState(false);

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
                        <Tag color={'yellow'} key={text}>{text}</Tag>
                    )
                }
                if (text === "DONE") {
                    return (
                        <Tag color={'green'} key={text}>{text}</Tag>
                    )
                }
                if (text === "ERROR") {
                    return (
                        <Tag color={'red'} key={text}>{text}</Tag>
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
                    <GenerateButton rowProfileId={row.profileId}></GenerateButton>
                    <TeardownButton rowProfileId={row.profileId}></TeardownButton>
                    <EditButton profileId={row.profileId}></EditButton>
                    <DeleteButton profileId={row.profileId}></DeleteButton>
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
export default Dashboard