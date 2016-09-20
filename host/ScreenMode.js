import React, { Component } from 'react'
import { connect } from 'react-redux'

import BidsTable from 'components/BidsTable'
import Chart from 'components/Chart'

const mapStateToProps = ({ buyerBids, sellerBids, deals, users, regulation }) => ({
  buyerBids,
  sellerBids,
  deals,
  users,
  regulation
})

const ScreenMode = ({ buyerBids, sellerBids, deals, users, regulation }) => (
  <div>
    <BidsTable
      buyerBids={buyerBids}
      sellerBids={sellerBids}
      deals={deals}
    />
    <Chart
      users={users}
      regulation={regulation}
    />
  </div>
)

export default connect(mapStateToProps)(ScreenMode)
