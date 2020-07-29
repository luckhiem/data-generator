import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Row, Col, Switch, Button, Input, InputNumber, Checkbox } from 'antd';


const CheckboxApp = () => {
    return (
        <Checkbox.Group style={{ width: '100%' }} onChange={(value) => { console.log('checkbox', value) }}>
            <Row>
                <Col span={12}>
                    <Checkbox value="appInGuestSpace">App In Guest Space</Checkbox>
                </Col>
                <Col span={12}>
                    <Checkbox value="appInSpace">App In Space</Checkbox>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Checkbox value="appWithMultipleFields">App With Multiple Fields</Checkbox>
                </Col>
                <Col span={12}>
                    <Checkbox value="appWithRequiredFields">App With Required Fields</Checkbox>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Checkbox value="appWithUniqueFields">App With Unique Fields</Checkbox>
                </Col>
                <Col span={12}>
                    <Checkbox value="appWithoutField">App Without Field</Checkbox>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Checkbox value="appWithThoroughFields">App With Thorough Fields</Checkbox>
                </Col>
                <Col span={12}>
                    <Checkbox value="appWithProcess">App With Process</Checkbox>
                </Col>
            </Row>
        </Checkbox.Group>
    )
}

const GenerateConfigForm = () => {
    const [isVisibleApp, setVisibleApp] = useState('none');
    const [isVisibleSpace, setVisibleSpace] = useState('none');
    const [switchAppChecked, setSwitchAppChecked] = useState(false);
    const [switchSpaceChecked, setSwitchSpaceChecked] = useState(false)
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
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
            <Row>
                <Col span={16}>
                    <Form.Item label='Generate organization'>
                        <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked disabled={true} />
                    </Form.Item>
                    <Form.Item label='Generate group'>
                        <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked disabled={true} />
                    </Form.Item>
                    <Form.Item label='Generate users'>
                        <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked disabled={true} />
                    </Form.Item>
                    <Form.Item label='Generate app'>
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
                    <Form.Item label='Select App Generate' style={{ display: isVisibleApp }}>
                        <CheckboxApp />
                    </Form.Item>
                    <Form.Item label='Number of Apps' style={{ display: isVisibleApp }}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label='Generate space'>
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
                    <Form.Item label='Number of spaces' style={{ display: isVisibleSpace }}>
                        <InputNumber />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">Use Default</Button>
                    <Button type="primary" htmlType="submit">Save</Button>
                    <Button style={{ margin: '0 8px' }} onClick={() => { form.resetFields() }}>Edit</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default GenerateConfigForm;
