import React from 'react'
import millify from 'millify'
import {Typography, Row, Col, Statistic} from 'antd'
import {Link} from 'react-router-dom'

import Loader from './Loader';

import { useGetCryptoStatsQuery } from '../services/cryptoApi'
import {Cryptocurrencies, News} from '../components'

const {Title} = Typography

const HomePage = () => {
  const {data : cryptoStats, isFetching: fetchingStats} = useGetCryptoStatsQuery()
  
  const globalStats = cryptoStats

  if(fetchingStats) return <Loader />
  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats?.cryptocurrencies_number} />
        </Col>
        <Col span={12}>
          <Statistic title="Bitcoin Dominance Percentage" value={globalStats?.bitcoin_dominance_percentage} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={globalStats?.market_cap_ath_value} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24th Volume" value={globalStats?.volume_24h_ath_value} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap USD" value={globalStats?.market_cap_usd} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">
            Showmore
          </Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Cryptocurrencies news in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">
            Show more
          </Link>
        </Title>
      </div>
      <News simplified />
    </>
  )
}

export default HomePage
