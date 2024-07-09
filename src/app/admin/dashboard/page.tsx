'use client'
import React, { useState, useEffect } from 'react';
import { Card, Col } from 'antd'
import CardList from '../compontents/CardList'
import {
	MessageOutlined,
	MoneyCollectOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from "@ant-design/icons";

const DashboardPage = () => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetch("/api/statistics")
    .then((res) => res.json())
    .then((res) => {
        res.data.forEach((item: any) => {
            if (item.title === 'newVisits') {
                item.icon = <UserOutlined style={{ fontSize: 30 }} />
            } else if (item.title === 'messages') {
                item.icon = <MessageOutlined style={{ fontSize: 30 }} />
            } else if (item.title === 'purchases') {
                item.icon = <ShoppingCartOutlined style={{ fontSize: 30 }} />
            } else if (item.title === 'shoppings') {
                item.icon = <MoneyCollectOutlined style={{ fontSize: 30 }} />
            }
        })
        setCardData(res.data);
    });
  }, []);

  return (
    <Card title='看板'> 
      <Col span={24}>
					<CardList cardData={cardData} />
				</Col>
    </Card>
  )
}

export default DashboardPage