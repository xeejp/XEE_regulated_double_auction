import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import Regulation from 'components/Regulation'
import { submitRegulation } from './actions'

const mapStateToProps = ({ regulation, users }) => ({
  regulation,
  equilibriumPrice: Object.keys(users).length * 100 / 2
})

const actionCreators = {
  submitRegulation
}

class RegulationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      regulation: props.regulation,
      text: props.regulation
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.switchRegulation = this.switchRegulation.bind(this)
  }

  handleChange(event) {
    const value = parseInt(event.target.value, 10)
    if (isNaN(value)) {
      this.setState({regulation: 0, text: ''})
    } else {
      if (this.state.regulation < 0) {
        this.setState({regulation: -value, text: value})
      } else {
        this.setState({regulation: value, text: value})
      }
    }
  }

  switchRegulation() {
    this.setState({regulation: - this.state.regulation})
  }

  handleClick() {
    const { submitRegulation } = this.props
    submitRegulation(this.state.regulation)
  }

  renderSwitchButtons() {
    const { regulation } = this.state
    if (regulation == 0) {
      return null
    } else if (regulation > 0) {
      return <RaisedButton
        secondary={true}
        label="下限規制に切り替える"
        onClick={this.switchRegulation}
      />
    } else {
      return <RaisedButton
        secondary={true}
        label="上限規制に切り替える"
        onClick={this.switchRegulation}
      />
    }
  }

  render() {
    const { style, equilibriumPrice } = this.props
    return (
      <div>
        <p>均衡価格: {equilibriumPrice}</p>
        <p>現在の設定: <Regulation regulation={this.props.regulation} /></p>
        <p>変更内容: <Regulation regulation={this.state.regulation} /></p>
        {this.renderSwitchButtons()}
        <br />
        <TextField
          name="regulation"
          value={this.state.text}
          onChange={this.handleChange}
        />
        <br />
        <RaisedButton
          primary={true}
          onClick={this.handleClick}
          style={style}
          disabled={this.state.regulation == this.props.regulation}
          label=" 規制価格の更新"
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(RegulationForm)
