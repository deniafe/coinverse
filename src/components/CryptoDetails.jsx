import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/coinApi'

import LineChart from './LineChart'
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;


const CryptoDetails = ({volume}) => {
  const { coinId } = useParams()
  const [timeperiod, setTimeperiod] = useState('7')
  const { data: cryptoDetail, isFetching: isFetchingDetails } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod })
  const cryptoDetails = cryptoDetail && cryptoDetail

  console.log(coinHistory)

  if (isFetchingDetails) return <Loader />

  const time = ['1', '2', '3', '5', '7', '10', '20', '30']

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.market_data?.current_price?.usd && millify(cryptoDetails?.market_data?.current_price?.usd)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.market_cap_rank, icon: <NumberOutlined /> },
    { title: 'Total Volume', value: `$ ${cryptoDetails?.market_data?.total_volume?.usd && millify(cryptoDetails?.market_data?.total_volume?.usd)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.market_data?.market_cap?.usd && millify(cryptoDetails?.market_data?.market_cap?.usd)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.market_data?.high_24h?.usd && millify(cryptoDetails?.market_data?.high_24h?.usd)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.market_data?.max_supply >= 1 ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.market_data?.total_supply && millify(cryptoDetails?.market_data?.total_supply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.market_data?.circulating_supply && millify(cryptoDetails?.market_data?.circulating_supply)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </Title>
        <p>{cryptoDetails?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </Col>
      <Select defaultValue="7" className="select-timeperiod" placeholder="Select Timeperiod" onChange={(value) => setTimeperiod(value)}>
        {time.map((date) => <Option key={date}>{date} days</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory?.prices} currentPrice={millify(cryptoDetails?.market_data?.current_price?.usd)} coinName={cryptoDetails?.name} />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">{cryptoDetails?.name} Value Statistics</Title>
            <p>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p>
          </Col>
          {genericStats?.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
          <div>
          {HTMLReactParser(cryptoDetails?.description.en)}
          </div>
        </Row>
        {/* <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
          {cryptoDetails?.links?.map((link) => (
            <Row className="coin-link" key={link?.name}>
              <Title level={5} className="link-name">{link?.type}</Title>
              <a href={link?.url} target="_blank" rel="noreferrer">{link?.name}</a>
            </Row>
          ))}
        </Col> */}
      </Col>
    </Col>

  )
}

export default CryptoDetails
