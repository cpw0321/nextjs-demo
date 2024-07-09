'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card, Form, Input, Button, Table, Modal, Space, Popconfirm } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MyUpload from '../compontents/MyUpload';
import MyEditor from '../compontents/MyEditor';

type Article = {
    id: string
    title: string
    image: string
    content: string
    createdAt: string
}

const ArticlePage = () => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm(); // 获取form组件

    const [imageUrl, setImageUrl] = useState<string>('');
    const [html, setHtml] = useState('')

    const [list, setList] = useState<Article[]>([])
    const [query, setQuery] = useState({
        currentPage: 1,
        pageSize: 10,
        title: ''
    
    })
    const [current, setCurrent] = useState('') // 使用当前id判断是修改还是新增
    const [total, setTotal] = useState(0) // 页数

    useEffect(() => {
        fetch(`/api/articles?currentPage=${query.currentPage}&pageSize=${query.pageSize}&title=${query.title}`)
            .then((res) => res.json())
            .then((res) => {
                setList(res.data.list);
                setTotal(res.data.total);
            });

    }, [query]);

    useEffect(() => {
        if (!open) {
            form.resetFields();
            setCurrent('');
            setImageUrl('');
            setHtml('');
        }
    }, [open]);

    return (
        <Card title="文章管理" extra={<Button icon={<PlusOutlined />} type="primary" onClick={() => setOpen(true)}>新增文章</Button>}>
            <Form form={form} layout="inline" onFinish={(v) => { 
                setQuery({ currentPage: 1, pageSize: 10, title: v.title })
            }} > 
                <Form.Item label="文章标题" name='title'>
                    <Input placeholder="文章标题" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" icon={<SearchOutlined />} htmlType='submit'>搜索</Button>
                </Form.Item>
            </Form>
            <Table
                style={{ marginTop: 20 }}
                dataSource={list}
                rowKey={'id'}
                pagination={{
                    total,
                    onChange: (currentPage) => {
                        setQuery({ ...query, currentPage, pageSize: 10 })
                    }
                }}
                columns={[
                    {
                        title: '序号',
                        render(v, r, i) {
                            return i + 1;
                        }
                    },
                    {
                        title: '文章标题',
                        dataIndex: 'title',
                    },
                    {
                        title: '封面',
                        render(v, r) {
                            console.log(r)
                            return <img src={r.image} alt={r.title} />
                        }
                    },
                    {
                        title: '文章内容',
                        dataIndex: 'content',
                    },
                    {
                        title: '操作',
                        render(v, r) { // v是当前单元格数据 r是当前行
                            return <Space>
                                <Button size='small' icon={<EditOutlined />} type='primary' onClick={
                                    () => {
                                        setOpen(true)
                                        setCurrent(r.id)
                                        setImageUrl(r.image)
                                        setHtml(r.content)
                                        form.setFieldsValue(r)
                                    }
                                }></Button>
                                <Popconfirm title='是否确认删除？' onConfirm={async () => {
                                    await fetch('/api/articles/' + r.id, {
                                        method: 'DELETE'
                                    }).then((res) => res.json())
                                    setQuery({ ...query, currentPage: 1, pageSize: 10}) // 重置查询条件，重新加载数据
                                }}>
                                    <Button size='small' icon={<DeleteOutlined />} type='primary' danger></Button>
                                </Popconfirm>
                            </Space>
                        }
                    },
                ]}></Table>

            <Modal 
                title="新增文章"
                width={'80vw'}
                // destroyOnClose={true} // 关闭窗口之后销毁
                maskClosable={false} // 点击空白区域不关闭
                open={open}
                onCancel={() => setOpen(false)}
                onOk={() => form.submit()}>
                <Form
                    // preserve={false} // 和modal结合使用时需要加上，否则不销毁
                    layout='vertical' form={form} onFinish={async (v) => {
                        console.log("value:", v)
                        if (current) { // id存在就修改，否则就新增
                            await fetch('/api/articles/' + current, {
                                method: 'PUT',
                                body: JSON.stringify({...v, image: imageUrl, content: html})
                            }).then((res) => res.json())
                        } else {
                            await fetch('/api/articles', {
                                method: 'POST',
                                body: JSON.stringify({...v, image: imageUrl, content: html})
                            }).then((res) => res.json())
                        }
                        setOpen(false);
                        setQuery({ ...query, currentPage: 1, pageSize: 10
                         }); // 改变query重新取数据
                    }}>
                    <Form.Item label="文章标题" name="title" rules={[{
                        message: 'Please input your title!', required: true
                    }]}>
                        <Input placeholder="文章标题" />
                    </Form.Item>
                    {/* <Form.Item label="文章内容" name="content">
                        <Input.TextArea placeholder="文章内容" />
                    </Form.Item> */}
                    <Form.Item label="文章封面">
                        <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl}/>
                    </Form.Item>
                    <Form.Item label="文章内容">
                        <MyEditor html={ html } setHtml={ setHtml }/>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}

export default ArticlePage