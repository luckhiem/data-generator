import React, { useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';
import { ProfileContext } from '../../Layout/app'

const columns = [
    {
        title: 'Profile',
        dataIndex: 'profile',
        key: 'profile',
        render: text => <a>{text}</a>,
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
        render: tags => (
            <>
                {tags.map(tag => {
                    let color;
                    if (tag === 'fail') {
                        color = 'red';
                    }
                    if (tag === 'success') {
                        color = 'green';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <a>Generate</a>
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const TableProfile = () => {
    const { profiles} = useContext(ProfileContext);

    useEffect(() => {
        console.log('aaaaa', profiles)
    }, [profiles])
    
    const data = [
        {
            key: '1',
            profileName: 'John Brown',
            domain: 'khiem-test-1.cybozu-dev.com',
            status: ['success'],
        },
        {
            key: '2',
            profileName: 'Jim Green',
            domain: 'khiem-test-2.cybozu-dev.com',
            status: ['fail'],
        },
        {
            key: '3',
            profileName: 'Joe Black',
            domain: 'khiem-test-3.cybozu-dev.com',
            status: ['success'],
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={[]} />
    );
}
export default TableProfile