import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinpaprika1.p.rapidapi.com',
  'x-rapidapi-key': '0a28e72c48msh999a4db173f3550p181e40jsn93205d4f4a63'
}

const baseUrl = 'https://coinpaprika1.p.rapidapi.com'

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl}), 
  endpoints: (builder) => ({
    // Get the list of all cryptos
    getCryptos: builder.query({
      query: (count) => createRequest(`/tickers?limit=${count}`)
    }),
    // Get the crypto global statistics from the
    getCryptoStats: builder.query({
      query: () => createRequest('/global')
    })
  })
})

export const {
  useGetCryptosQuery,
  useGetCryptoStatsQuery,
} = cryptoApi