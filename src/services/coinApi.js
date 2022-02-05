import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const coinApiHeaders = {
  'x-rapidapi-host': 'coingecko.p.rapidapi.com',
  'x-rapidapi-key': '0a28e72c48msh999a4db173f3550p181e40jsn93205d4f4a63'
}

const baseUrl = 'https://coingecko.p.rapidapi.com/'

const createRequest = (url) => ({url, headers: coinApiHeaders})

export const coinApi = createApi({
  reducerPath: 'coinApi',
  baseQuery: fetchBaseQuery({baseUrl}), 
  endpoints: (builder) => ({
    // Get the list of all cryptos
    getCryptos: builder.query({
      query: (count) => createRequest(`coins/markets?vs_currency=usd&per_page=${count}`)
    }),
    // Get the details for one crypto currency
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`coins/${coinId}`)
    }),
    // Get the history for one crypto currency
    getCryptoHistory: builder.query({
      query: ({timeperiod, coinId}) => createRequest(`coins/${coinId}/market_chart?vs_currency=usd&days=${timeperiod}`)
    }),
    // Note: To access this endpoint you need premium plan
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
  })
})

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetExchangesQuery,
  useGetCryptoHistoryQuery
} = coinApi