'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./index.module.less";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import ParticlesBg from 'particles-bg';

export default function Home() {
  const router = useRouter();
  type FieldType = {
    username?: string;
    password?: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    fetch('/api/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          if (data.code === 0) {
            console.log(data);
            router.push('/admin/dashboard');
          } else {
            alert('Login failed: ' + data.message);
          }
        })
      }
    })
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <main className={styles.loginWrap}>
      <ParticlesBg type="circle" bg={true} />
      <div className={styles.leftBanner}>
        {/* <span className={styles.logo}>后台管理系统</span> */}
        <div className={styles.logo}><img src="/next.svg" alt="" /></div>
        <h2>下一代后台管理解决方案</h2>
        <div style={{ textAlign: 'center' }}>开箱即用 • Next前后端同构 • 数智化 • 聚合行业最佳实践</div>
        <div className={styles.banner}><img src="/logo_bg.svg" alt="" /></div>
      </div>
      <div className={styles.content}>
        <div className={styles.loginForm}>
          <h1>欢迎登录后台管理系统</h1>
          <Form
            name="basic"
            className={styles.form}
            labelCol={{ span: 8}}
            wrapperCol={{ span: 16 }} 
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              username: 'admin',
              password: '123456',
            }}
          >
            <Form.Item<FieldType>
              label="用户"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            {/* <Form.Item<FieldType>
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox >记住账号</Checkbox>
            </Form.Item> */}

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" size="large">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </main>
  );
}
