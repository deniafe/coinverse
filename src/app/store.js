import {configureStore} from '@reduxjs/toolkit'

import {cryptoApi} from '../services/cryptoApi'
import {coinApi} from '../services/coinApi'
import {cryptoNewsApi} from '../services/cryptoNewsApi'

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [coinApi.reducerPath]: coinApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer

  },
})