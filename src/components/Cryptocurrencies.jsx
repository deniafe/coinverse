import React, {useState, useEffect} from 'react'
import millify from 'millify'
import {Link} from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/coinApi'

import Loader from './Loader';

const Cryptocurrencies = ({simplified}) => {
  const count = simplified ? 10 : 100
  // const {data, isFetching} = useGetCryptosQuery()
  const {data: cryptosList, isFetching} = useGetCryptosQuery(count)
  // Come back to fix this later
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  console.log('This is the cryptos from useState', cryptos)

  useEffect(() => {
    setCryptos(cryptosList)
    
    const filteredData = cryptosList?.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(filteredData)

  }, [cryptosList, searchTerm])


  if(isFetching) return <Loader />
  return (
    <>
      {
        !simplified && (
          <div className="search-crypto">
            <Input placeholder="Search Cryptocurrency" onChange={e => setSearchTerm(e.target.value)} />
          </div>
        )
      }
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id} >
            <Link to={`/crypto/${currency.id}`}>
              <Card hoverable title={`${currency.market_cap_rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.image.replace('large', 'small')} />} >
                <p>Price: {millify(currency.current_price)}</p>
                <p>Market Cap: {millify(currency.market_cap)}</p>
                <p>Daily Change: {millify(currency.market_cap_change_percentage_24h)}% </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
