import React from 'react'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Highcharts from 'react-highcharts'

const Chart = ({users, regulation}) => {
  const usersCount = Object.keys(users).length
  const buyerBids = [], sellerBids = []
  for (let id of Object.keys(users)) {
    const user = users[id]
    if (user.bidded || user.dealt) {
      if (user.role == "buyer") {
        buyerBids.push(user.bid)
      } else {
        sellerBids.push(user.bid)
      }
    }
  }
  buyerBids.push(0 - 100)
  sellerBids.push(usersCount * 100 + 100)
  const plotLines = [];
  if (regulation > 0) {
    plotLines.push({
      value: regulation,
      color: 'red',
      width: 1,
      label: {
        text: "上限価格規制"
      }
    })
  } else if (regulation < 0) {
    plotLines.push({
      value: -regulation,
      color: 'green',
      width: 1,
      label: {
        text: "下限価格規制"
      }
    })
  }
  const config = {
    chart: {
      type: 'area',
      animation: false,
      inverted: true
    },
    title: {
      text: null
    },
    xAxis: {
      title: {
        text: '価格'
      },
      min: 0,
      max: usersCount * 100,
      tickInterval: 100,
      reversed: false,
      plotLines
    },
    yAxis: {
      title: {
        text: '数量'
      },
      min: 0,
      max: usersCount / 2
    },
    plotOptions: {
      area: {
        fillOpacity: 0.5,
        marker: {
          enabled: false
        }
      }
    },
    series: [{
      animation: false,
      name: '需要',
      step: 'right',
      data: buyerBids.sort((a, b) => a - b).map((x, y, a) => [x, a.length - y])
    }, {
      animation: false,
      name: '供給',
      step: 'left',
      data: sellerBids.sort((a, b) => a - b).map((x, y) => [x, y + 1])
    }]
  }
  return (
    <Card>
      <CardHeader
        title="市場均衡グラフ"
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <Highcharts config={config} />
    </CardText>
  </Card>
  )
}

export default throttle(Chart, 200)
