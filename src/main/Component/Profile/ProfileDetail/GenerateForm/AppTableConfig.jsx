import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../../../../Layout/app';
import 'antd/dist/antd.css';
import './style.css';
import { Table, Input, InputNumber, Popconfirm, Form, Button, Select } from 'antd';

const originData = [];


for (let i = 0; i < 1; i++) {
    originData.push({
        key: i.toString(),
        appName: `Test App`,
        amount: 1,
        appType: `appWithMultipleFields`,
        recordAmount: 0
    });
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = (dataIndex === 'appName') ? <Input />
        : (dataIndex === 'amount') ? <InputNumber />
        : (dataIndex === 'recordAmount') ? <InputNumber />
            : <Select defaultValue="appWithMultipleFields" style={{ width: 240 }}>
                <Select.Option value="appWithMultipleFields">appWithMultipleFields</Select.Option>
                <Select.Option value="appWithRequiredFields">appWithRequiredFields</Select.Option>
                <Select.Option value="appWithoutField">appWithoutField</Select.Option>
            </Select>
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}>
                    {inputNode}
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
};

const AppConfigTable = (profileIdCopy) => {
    const [form] = Form.useForm();
    const { profiles, setProfiles } = useContext(ProfileContext);
    const [editingKey, setEditingKey] = useState('');
    let initialData;
    let profileConfigApp = profiles.filter(obj => obj.profileId === profileIdCopy.profileId);
    console.log('profileConfigApp', profileConfigApp)
    if (profileConfigApp.length > 0) {
        if (profileConfigApp[0].configApp !== undefined) {
            initialData = profileConfigApp[0].configApp
        } else {
            initialData = originData
        }
    }
    const [data, setData] = useState(initialData);
    const isEditing = record => record.key === editingKey;

    const edit = record => {
        form.setFieldsValue({
            appName: '',
            amount: '',
            appType: '',
            recordAmount: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = key => {
        const dataSource = [...data];
        setData(dataSource.filter(item => item.key !== key));
    };

    const handleAdd = () => {
        const newData = {
            key: data.length + 1,
            appName: `Test App`,
            amount: 1,
            appType: `appWithMultipleFields`,
            recordAmount: 0
        };
        setData([...data, newData]);
    };

    useEffect(() => {
        const profilesCopy = [...profiles];
        profilesCopy.forEach((item, i) => {
            if (profileIdCopy.profileId === item.profileId) {
                profilesCopy[i].configApp = data;
            }
        });
        setProfiles(profilesCopy);
    }, [data])

    const columns = [
        {
            title: 'App Name',
            dataIndex: 'appName',
            width: '25%',
            editable: true,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            width: '10%',
            editable: true,
        },
        {
            title: 'App Type',
            dataIndex: 'appType',
            width: '30%',
            editable: true,
        },
        {
            title: 'Record Amount',
            dataIndex: 'recordAmount',
            width: '20%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >Save</a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <span>
                            <a disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 8 }}>Edit</a>
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                                <a disabled={editingKey !== ''} > Delete</a>
                            </Popconfirm>
                        </span>
                    );
            },
        },
    ];
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Button
                onClick={handleAdd}
                type="submit"
                style={{
                    marginBottom: 16,
                }}>Add a row</Button>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row-app"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};
export default AppConfigTable