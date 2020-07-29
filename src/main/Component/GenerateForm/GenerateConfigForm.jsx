import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Row, Col, Switch, Button, Input } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const AdvancedSearchForm = () => {
    const [isVisibleApp, setVisibleApp] = useState('none');
    const [isVisibleSpace, setVisibleSpace] = useState('none');
    const [switchAppChecked, setSwitchAppChecked] = useState(false);
    const [switchSpaceChecked, setSwitchSpaceChecked] = useState(false)
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            span: 14,
        },
        wrapperCol: {
            span: 20,
        },
    };

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            form={form}
            {...formItemLayout}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item label='Do you want to generate users'>
                        <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked />
                    </Form.Item>
                    <Form.Item label='Do you want to generate app'>
                        <Switch
                            checkedChildren="YES"
                            unCheckedChildren="NO"
                            checked={switchAppChecked}
                            onChange={(value) => {
                                setSwitchAppChecked(value)
                                if (value === true) {
                                    setVisibleApp('flex')
                                } else {
                                    setVisibleApp('none')
                                }
                            }} />
                    </Form.Item>
                    <Form.Item label='App Name' style={{ display: isVisibleApp }}>
                        <Input placeholder="Input App Name" />
                    </Form.Item>
                    <Form.Item label='Do you want to generate space'>
                        <Switch
                            checkedChildren="YES"
                            unCheckedChildren="NO"
                            checked={switchSpaceChecked}
                            onChange={(value) => {
                                setSwitchSpaceChecked(value)
                                if (value === true) {
                                    setVisibleSpace('flex')
                                } else {
                                    setVisibleSpace('none')
                                }
                            }} />
                    </Form.Item>
                    <Form.Item label='Space Name' style={{ display: isVisibleSpace }}>
                        <Input placeholder="Input Space Name" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">Save</Button>
                    <Button style={{ margin: '0 8px' }} onClick={() => { form.resetFields() }}>Edit</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default AdvancedSearchForm;
