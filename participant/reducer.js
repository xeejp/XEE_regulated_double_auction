import { createReducer } from 'redux-act'

const reducer = createReducer({
  'RECEIVE_CONTENTS': (_, contents) => contents
}, {
  mode: 'waiting',
  buyerBids: [],
  sellerBids: [],
  deals: [],
  regulation: 0,
  personal: {
  }
})

export default reducer
