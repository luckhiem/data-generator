import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Timeline, Row, Col } from 'antd';

const Operation = () => {
    const [mode, setMode] = useState('right');

    return (
        <Timeline mode={mode}>
            <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
            <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
            <Timeline.Item label="2015-09-01">Technical testing</Timeline.Item>
            <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
            <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
            <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
            <Timeline.Item label="2015-09-01">Technical testing</Timeline.Item>
            <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
            <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
            <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
            <Timeline.Item label="2015-09-01">Technical testing</Timeline.Item>
            <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
            <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
            <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
            <Timeline.Item label="2015-09-01">Technical testing</Timeline.Item>
        </Timeline>
    )
}
export default Operation;
