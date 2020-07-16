import React, { useContext } from 'react';
import { Modal, Form, Select, Input } from 'antd';
import {ProfileContext} from '../../Layout/app';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const { Option } = Select;

const defaultValue = {
  name: '',
  domain: '',
  username: '',
  password: ''
};

// const profile = {
//   profileId: null,
//   profileName: null,
//   domain: null,
//   username: null,
//   password: null,
// }


const SettingModal = ({ isVisible = false, onClose }) => {
  const [form] = Form.useForm();
  const { profiles, setProfiles } = useContext(ProfileContext);

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
            // newProfiles.profileId = values.name + Math.random();
            // newProfiles.profileName = values.name;
            // newProfiles.domain = values.domain;
            // newProfiles.username = values.username;
            // newProfiles.password = values.password;
            // let newProfiles = [...profile];
            // console.log(profile)
            // let isEditProfile = false;
            // newProfiles = newProfiles.map((profile) => {
            //   if (profile.profileId === values.profileId) {
            //     isEditProfile = true;
            //     return values;
            //   }
            //   return profile;
            // });

            // if (!isEditProfile) {
            //   values.profileId = values.name + Math.random();
            //   newProfiles = [...profiles, values];
            // }
            console.log(newProfiles)
            newProfiles = [...profiles, values];
            setProfiles(newProfiles);
            window.localStorage.setItem('profiles', JSON.stringify(newProfiles));
            console.log(111, ProfileContext)
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
        {/* <Form.Item
          name="profileId"
          label="Profile"
          hasFeedback
        >
          <Select
            placeholder="Please select a Profile"
            onChange={(value) => {
              const result = profiles.filter(obj => obj.profileId === value);
              form.setFieldsValue(result[0] || defaultValue);
            }}
          >
            {
              profiles.map((profile, i) => {
                return <Option key={i} value={profile.profileId}>{profile.name}</Option>;
              })
            }
            <Option value="profile_add">Add new profile...</Option>
          </Select>
        </Form.Item> */}
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