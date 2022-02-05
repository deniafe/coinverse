import React from 'react';
import millify from 'millify';
import { Card, Row, Col, Typography, Avatar } from 'antd';

import { useGetExchangesQuery } from '../services/coinApi';
import Loader from './Loader';

const { Text } = Typography

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Trust Score</Col>
        <Col span={6}>url</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
              <Card
              style={{marginTop: '2px', marginBottom: '2px'}}
              hoverable
                key={exchange.id}
              >
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}> $ {millify(exchange.trade_volume_24h_btc)} </Col>
                    <Col span={6}>{millify(exchange.trust_score)}</Col>
                    <Col span={6}><a href={exchange.url} target="_blank" rel="noreferrer">Visit {exchange.name}</a></Col>
                  </Row>
              </Card>
          </Col>
        ))};
      </Row>
    </>
  );
};

export default Exchanges;