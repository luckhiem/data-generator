import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../../Layout/app';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Row, Col, Switch, Button, Input, InputNumber, Checkbox } from 'antd';


const GenerateConfigForm = (profileIdCopy) => {
    const { profiles, setProfiles } = useContext(ProfileContext);
    const [isDisable, setDisable] = useState(true);
    const [isVisibleSaveBtn, setVisibleSaveBtn] = useState('none');
    const [isVisibleApp, setVisibleApp] = useState('none');
    const [isVisibleSpace, setVisibleSpace] = useState('none');
    const [form] = Form.useForm();
    let GenerateConfig = {
        generateGroup: true,
        generateUser: true,
        generateOrg: true,
        generateApp: '',
        generateSpace: '',
        appName: '',
        appNumbers: '',
        appTypes: '',
        spaceName: '',
        spaceTypes: ''
    }

    const formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    let result;

    if (profileIdCopy !== undefined) {
        result = profiles.filter(obj => obj.profileId === profileIdCopy.profileId);
        if (result[0].generateConfig !== "") {
            GenerateConfig = result[0].generateConfig;
        }
    }

    useEffect(() => {
        if (result[0].generateConfig.generateApp === true) {
            setVisibleApp('flex')
        }
        if (result[0].generateConfig.generateSpace === true) {
            setVisibleSpace('flex')
        }
    }, [profiles])

    return (
        <Form
            form={form}
            {...formItemLayout}
            name="advanced_search"
            className="ant-advanced-search-form"
            initialValues={GenerateConfig}
        >
            <Row>
                <Col span={16}>
                    <Form.Item label='Generate organization' name="generateOrg" valuePropName="checked">
                        <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked disabled={true} />
                    </Form.Item>
                    <Form.Item label='Generate group' name="generateGroup" valuePropName="checked">
                        <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked disabled={true} />
                    </Form.Item>
                    <Form.Item label='Generate users' name="generateUser" valuePropName="checked">
                        <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked disabled={true} />
                    </Form.Item>
                    <Form.Item label='Generate app' name="generateApp" valuePropName="checked">
                        <Switch
                            checkedChildren="YES"
                            unCheckedChildren="NO"
                            onChange={(value) => {
                                if (value === true) {
                                    setVisibleApp('flex')
                                } else {
                                    setVisibleApp('none')
                                }
                            }}
                            disabled={isDisable}
                        />
                    </Form.Item>
                    <Form.Item label='App Name' name="appName" style={{ display: isVisibleApp }}>
                        <Input placeholder="Input App Name" disabled={isDisable} />
                    </Form.Item>
                    <Form.Item label='Select App Generate' name="appTypes" style={{ display: isVisibleApp }}>
                        <Checkbox.Group style={{ width: '100%' }} disabled={isDisable}>
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
                    </Form.Item>
                    <Form.Item label='Number of Apps' name="appNumbers" style={{ display: isVisibleApp }}>
                        <InputNumber disabled={isDisable} />
                    </Form.Item>
                    <Form.Item label='Generate space' name="generateSpace" valuePropName="checked">
                        <Switch
                            checkedChildren="YES"
                            unCheckedChildren="NO"
                            onChange={(value) => {
                                if (value === true) {
                                    setVisibleSpace('flex')
                                } else {
                                    setVisibleSpace('none')
                                }
                            }}
                            disabled={isDisable}
                        />
                    </Form.Item>
                    <Form.Item label='Space Name' name="spaceName" style={{ display: isVisibleSpace }}>
                        <Input placeholder="Input Space Name" disabled={isDisable} />
                    </Form.Item>
                    <Form.Item label='Select Space Type' name="spaceTypes" style={{ display: isVisibleSpace }}>
                        <Checkbox.Group style={{ width: '100%' }} disabled={isDisable}>
                            <Row>
                                <Col span={12}>
                                    <Checkbox value="Guest Space">Guest Space</Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox value="Normal Space">Normal Space</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button
                        type="primary"
                        style={{ display: isVisibleSaveBtn }}
                        onClick={() => {
                            form.validateFields()
                                .then((values) => {
                                    const newProfile = [...profiles];
                                    profiles.forEach((item, i) => {
                                        if (profileIdCopy.profileId === item.profileId) {
                                            newProfile[i].generateConfig = values;
                                        }
                                    });
                                    setProfiles(newProfile);
                                    window.localStorage.setItem('profiles', JSON.stringify(newProfile));
                                    setDisable(true);
                                    setVisibleSaveBtn('none');
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                        }}>Save</Button>
                    <Button style={{ margin: '0 8px' }} onClick={() => {
                        setVisibleSaveBtn('inline')
                        setDisable(false)
                    }}>Edit</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default GenerateConfigForm;
