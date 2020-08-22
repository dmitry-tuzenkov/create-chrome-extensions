import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { createEvent, publish, EVENTS_MAP } from '../../../common/event-api'

import classes from './newtab.scss'

export default class NewTab extends Component {
  static propTypes = {}

  componentDidMount() {
    publish(createEvent('event/unknown'))
    publish(
      createEvent(EVENTS_MAP.ANALYTICS_TRACK, {
        name: 'impression',
        payload: {
          component: 'newtab',
        },
      })
    )
  }

  render() {
    return (
      <div className={classes.NewTab}>
        <h1> Welcome to newtab! </h1>
      </div>
    )
  }
}
