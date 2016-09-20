import React, { Component } from 'react'

class Regulation extends Component {
  render() {
    const { regulation } = this.props
    if (regulation == 0) {
      return <span>価格規制なし</span>
    } else if (regulation > 0) {
      return <span>上限価格規制{regulation}</span>
    } else {
      return <span>下限価格規制{-regulation}</span>
    }
  }
}

export default Regulation
