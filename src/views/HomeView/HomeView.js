/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { url, get_token } from '../../redux/modules/auth'
// import axios from 'axios'
// import classes from './HomeView.scss'

export class HomeView extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    auth: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  /* eslint-disable react/jsx-no-bind */
  /* eslint-disable no-return-assign */
  render () {
    const auth = this.props.auth
    // TODO: надо проверить совпадение рандомного стейта отправленног одля получения кода
    const oauth_button = !auth.token
      ? (<a href={url} className='btn btn-default' role='button'>
        Войти через Vimeo
      </a>)
      : null
    return (
      <div className='text-center'>
        <h1>RSTRM Vimeo albums</h1>
        {oauth_button}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  albums: []
})
export default connect((mapStateToProps), {
  get_token
})(HomeView)
