import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Input, Card } from 'antd';

const Result = ({ profile }) => {
    const profileCopy = JSON.parse(profile)
    const defaultValue = "This is default value";
    let configData;
    let logData;

    if (profileCopy !== undefined) {
        configData = (profileCopy.config) ? profileCopy.config : defaultValue;
        logData = (profileCopy.log) ? profileCopy.log : defaultValue;
    }
    const [key, setKey] = useState('tab1')
    const tabList = [
        {
            key: 'tab1',
            tab: 'JSON Config',
        },
        {
            key: 'tab2',
            tab: 'Log Result',
        },
    ];


    const contentList = {
        tab1: <Input.TextArea disabled={true} autoSize={true} value={JSON.stringify(configData, null, 2)} style={{ color: "#000000" }}></Input.TextArea>,
        tab2: <Input.TextArea disabled={true} autoSize={true} value={logData} style={{ color: "#000000" }}></Input.TextArea>,
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
