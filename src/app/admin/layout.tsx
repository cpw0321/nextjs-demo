'use client'
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/navigation';
import UserMenu from './compontents/UserMenu';

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }: any) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      
      <div className="flex items-center justify-center h-16 text-center gap-2">
        <TwitterOutlined
          style={{ fontSize: '30px', color: '#fff' }}
        />

        <span
          className="text-2xl"
          style={{
            display: collapsed ? 'none' : 'block',
            color: '#fff' 
          }}
        >
          NEXTJS
        </span>
      </div>

        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => {
            router.push(key);
          }}
          items={[
            {
              key: '/admin/dashboard',
              icon: <UserOutlined />,
              label: '看板',
            },
            {
              key: '/admin/user',
              icon: <VideoCameraOutlined />,
              label: '用户信息',
            },
            {
              key: '/admin/articles',
              icon: <UploadOutlined />,
              label: '文章管理',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            float: 'right',
            marginRight: 50,
            border: '2px solid #ccc',
            borderRadius: '50%',
            width: '50px',
            height: '50px'
          }}>
            <UserMenu />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout