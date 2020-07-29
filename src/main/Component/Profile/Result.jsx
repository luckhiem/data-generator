import React, { useState, useEffect } from 'react';
import GenerateConfigForm from '../GenerateForm/GenerateConfigForm';
import 'antd/dist/antd.css';
import { Input, Card } from 'antd';

const Result = ({ profile }) => {
    const defaultValue = "This is default value";
    let configData;
    let logData;

    if (profile !== undefined) {
        const profileCopy = JSON.parse(profile)
        configData = (profileCopy.config) ? profileCopy.config : defaultValue;
        logData = (profileCopy.log) ? profileCopy.log : defaultValue;
    }
    const [key, setKey] = useState('tab1')
    const tabList = [
        {
            key: 'tab1',
            tab: 'Generate Config',
        },
        {
            key: 'tab2',
            tab: 'JSON Config',
        },
        {
            key: 'tab3',
            tab: 'Log Result',
        },
    ];


    const contentList = {
        tab1: <GenerateConfigForm/>,
        tab2: <Input.TextArea disabled={true} autoSize={true} value={JSON.stringify(configData, null, 2)} style={{ color: "#000000" }}></Input.TextArea>,
        tab3: <Input.TextArea disabled={true} autoSize={true} value={logData} style={{ color: "#000000" }}></Input.TextArea>,
    };

    return (
        <>
            <Card
                style={{ width: '100%' }}
                tabList={tabList}
                activeTabKey={key}
                onTabChange={key => {
                    setKey(key);
                }}
            >
                {contentList[key]}
            </Card>
        </>
    );
}

export default Result;
