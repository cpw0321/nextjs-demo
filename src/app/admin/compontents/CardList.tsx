import React from 'react'
import type { ColProps } from "antd";
import { Card, Col, Row } from "antd";


const { Meta } = Card;

type cardData = {
    icon: any
    title: string
    description: string
}

const wrapperCol: ColProps = {
	xs: 24,
	sm: 24,
	md: 12,
	lg: 12,
	xl: 12,
	xxl: 6,
};
const CardList = ( { cardData} : { cardData: cardData[] } ) => {
  return (
    <Row justify="space-between" gutter={[20, 20]}>
    {cardData.map((card, index) => (
      <Col key={index} {...wrapperCol}>
        <Card>
          <Meta
            avatar={card.icon}
            title={card.title}
            description={card.description}
          />
        </Card>
      </Col>
    ))}
  </Row>
  )
}

export default CardList