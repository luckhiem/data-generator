import React, { useContext, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { ProfileContext } from '../../Layout/app';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

let defaultValue = {
  name: '',
  domain: '',
  username: '',
  password: ''
}

const SettingModal = ({ isVisible = false, onClose, profileId }) => {
  const [form] = Form.useForm();
  const { profiles, setProfiles } = useContext(ProfileContext);

  useEffect(() => {
    if (profileId) {
      const result = profiles.filter(obj => obj.profileId === profileId);
      form.setFieldsValue(result[0] || defaultValue);
    }
  }, [isVisible])

  return (
    <Modal
      title="Setting"
      visible={isVisible}
      okText="Save"
      onCancel={() => {
        form.resetFields();
        onClose && onClose();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            let newProfiles = [...profiles];
            if (profileId) {
              newProfiles = newProfiles.map((profile) => {
                if (profile.profileId === profileId) {
                  values.profileId = profileId;
                  profile.name = values.name;
                  profile.domain = values.domain;
                  profile.username = values.username;
                  profile.password = values.password;
                  profile.status = profile.status;
                  profile.generateConfig = profile.generateConfig;
                  return profile;
                }
                return profile;
              });
              newProfiles = [...profiles];
            }
            if (profileId === undefined || profileId === null) {
              values.profileId = values.name + '-' + Math.floor(Math.random() * 999999);
              values.status = "NEW";
              values.generateConfig = {
                generateGroup: true,
                generateUser: true,
                generateOrg: true,
                generateApp: false,
                generateSpace: false
              };
              newProfiles = [...profiles, values];
            }
            setProfiles(newProfiles);
            window.localStorage.setItem('profiles', JSON.stringify(newProfiles));
            onClose && onClose();
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="form_in_modal"
        initialValues={defaultValue}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your profile name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="domain"
          label="Domain"
          rules={[{ required: true, message: 'Please input your kintone domain!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your kintone username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your kintone password!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SettingModal;