'use client'
import React from 'react';
import { Space, Table, Form, Input, Button, Card } from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface DataType {
  id: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年纪',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    id: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    id: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    id: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const User = () => {
  return (
    <Card title='用户管理'>
      <Form layout='inline'>
        <Form.Item 
          label="用户"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} type='primary'>查询</Button>
        </Form.Item>

      </Form>
      <Table style={{marginTop: 20}} rowKey={'id'} columns={columns} dataSource={data} />
    </Card>
  )
}

export default User