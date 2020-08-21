import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classes from './newtab.scss'

export default class NewTab extends Component {
  static propTypes = {}

  render() {
    return (
      <div className={classes.NewTab}>
        <h1> Welcome to newtab! </h1>
      </div>
    )
  }
}
