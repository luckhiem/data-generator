import React, { useState, createContext } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

const Operation = () => {
    const [mode, setMode] = useState('right');

    const columns = [
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Profile ID',
            dataIndex: 'PID',
            key: 'PID',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Profile Name',
            dataIndex: 'profileName',
            key: 'profileName',
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            key: 'operation',
        },
    ];

    const data = [
        {
            key: '1',
            time: '29-03-1995',
            PID: 'PID-123456',
            profileName: 'John Brown',
            operation: 'Generate data',
        }
    ];

    return (
        <Table columns={columns} dataSource={data} />
    )
}
export default Operation;
