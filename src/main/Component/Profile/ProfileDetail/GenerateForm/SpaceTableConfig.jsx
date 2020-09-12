import React, { useState, useContext, useEffect } from 'react';
import { ProfileContext } from '../../../../Layout/app';
import 'antd/dist/antd.css';
import './style.css';
import { Table, Input, InputNumber, Popconfirm, Form, Button, Select } from 'antd';

const originData = [];

for (let i = 0; i < 1; i++) {
    originData.push({
        key: i.toString(),
        spaceName: `Normal Space`,
        amount: 1,
        spaceType: `normalSpace`,
    });
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = (dataIndex === 'spaceName') ? <Input />
    : (dataIndex === 'amount') ? <InputNumber />
        : <Select defaultValue="normalSpace" style={{ width: 240 }}>
            <Select.Option value="normalSpace">normalSpace</Select.Option>
            <Select.Option value="guestSpace">guestSpace</Select.Option>
        </Select>
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
};

const SpaceConfigTable = (profileIdCopy) => {
    const [form] = Form.useForm();
    const { profiles, setProfiles } = useContext(ProfileContext);
    const [editingKey, setEditingKey] = useState('');

    let profileConfigSpace = profiles.filter(obj => obj.profileId === profileIdCopy.profileId);
    let initialData;
    if (profileConfigSpace.length > 0) {
        if (profileConfigSpace[0].configSpace !== undefined) {
            initialData = profileConfigSpace[0].configSpace
        } else {
            initialData = originData
        }
    }
    const [data, setData] = useState(initialData);

    const isEditing = record => record.key === editingKey;

    const edit = record => {
        form.setFieldsValue({
            spaceName: '',
            amount: '',
            spaceType: '',
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
            spaceName: `Normal Space`,
            amount: 1,
            spaceType: `normalSpace`,
        };
        setData([...data, newData]);
    };

    useEffect(() => {
        const profilesCopy = [...profiles];
        profilesCopy.forEach((item, i) => {
            if (profileIdCopy.profileId === item.profileId) {
                profilesCopy[i].configSpace = data;
            }
        });
        setProfiles(profilesCopy);
    }, [data])

    const columns = [
        {
            title: 'Space Name',
            dataIndex: 'spaceName',
            width: '25%',
            editable: true,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            width: '15%',
            editable: true,
        },
        {
            title: 'Space Type',
            dataIndex: 'spaceType',
            width: '40%',
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
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
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
                rowClassName="editable-row-space"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};
export default SpaceConfigTable