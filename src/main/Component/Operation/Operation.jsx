import React, { useState, useEffect, useContext } from 'react';
import 'antd/dist/antd.css';
import { Table, Space, Button, Tag } from 'antd';
import { HistoryContext } from '../../Layout/app';
import { Link } from 'react-router-dom';


const Operation = () => {
    const { history, setHistory } = useContext(HistoryContext);
    const [newHistory, setNewHistory] = useState();

    const columns = [
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Profile ID',
            dataIndex: 'profileId',
            key: 'profileId',
            render: (text, row) => (
                <Link to={"/Profile/" + row.profileId} onClick={() => {
                }}>{text}</Link>
            )
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
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
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
            }
        },
    ];

    const removeHistory = () => {
        const result = [];
        window.localStorage.setItem('history', JSON.stringify(result));
        setHistory(result);
    };


    useEffect(() => {
        let historyCopy = [...history];
        historyCopy = history.map((history, i) => {
            const newHistory = { ...history, key: i };
            return newHistory;
        });
        setNewHistory(historyCopy);
    }, [history])

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Button type='default' onClick={() => { removeHistory() }}>Clear History</Button>
            </Space>
            <Table columns={columns} dataSource={newHistory} />
        </>
    )
}
export default Operation;
