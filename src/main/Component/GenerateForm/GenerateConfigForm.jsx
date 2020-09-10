import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../../Layout/app';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Row, Col, Switch, Button} from 'antd';
import AppConfigTable from './AppTableConfig.jsx';
import SpaceConfigTable from './SpaceTableConfig';

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
        generateApp: false,
        generateSpace: false
    };
    let result;

    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 20,
        },
    };

    result = profiles.filter(obj => obj.profileId === profileIdCopy.profileId);
    if (result.length !== 0) {
        if (result[0].generateConfig !== "") {
            GenerateConfig = result[0].generateConfig;
        }
    }

    useEffect(() => {
        if (result.length !== 0) {
            if (result[0].generateConfig.generateApp === true) {
                setVisibleApp('flex')
            }
            if (result[0].generateConfig.generateSpace === true) {
                setVisibleSpace('flex')
            }
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
            <div disabled={isDisable}>
                <Row>
                    <Col span={20}>
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
                            />
                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    <Col span={20}>
                        <Form.Item label='Config App' style={{ display: isVisibleApp }}>
                            <AppConfigTable profileId={profileIdCopy.profileId} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={20}>
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
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={20}>
                        <Form.Item label='Config Space' style={{ display: isVisibleSpace }}>
                            <SpaceConfigTable profileId={profileIdCopy.profileId} />
                        </Form.Item>
                    </Col>
                </Row>
            </div>
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
                    <Button style={{ margin: '0 8px', zIndex: '1000' }} onClick={() => {
                        setVisibleSaveBtn('inline')
                        setDisable(false)
                    }}>Edit</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default GenerateConfigForm;
