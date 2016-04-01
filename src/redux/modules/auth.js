import axios from 'axios'

const Vimeo = require('vimeo').Vimeo

const CLIENT_ID = 'fb9cf2aa9fefdf0f3c81b754deee3096d104c42a'
const CLIENT_SECRET = '2wSA8dGdxHWwi1yaxZQIwbdYBtZkDMOIqpKMVulOCu1aa7gYQx6fwqBROhmEZH4l/grsL6c8BkCSphWV5HT0XQ2TDCNGolL8RWwDqBDfhdFNxTuHGW1PGK2T672kGjis'

const lib = new Vimeo(CLIENT_ID, CLIENT_SECRET)

const redirect_uri = 'http://localhost:3000'
const scopes = ['public', 'private', 'create', 'create', 'delete', 'interact']
const state_random = getRandomInt(100000, 500000)

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const url = lib.buildAuthorizationEndpoint(redirect_uri, scopes, state_random)
/* eslint-disable arrow-parens */

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  ['@@router/LOCATION_CHANGE']: (state, { payload: { query } }) => {
    return { ...state, random: +query.state, code: query.code }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  random: null,
  code: null,
  token: null,
  scopes
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

export const get_token = () => async (dispatch, getState) => {
  const { auth: { code } } = getState()
  // console.log('get_token', code, redirect_uri)

  try {
    // Authorization = 'Basic ' + new Buffer(this._client_id + ':' + this._client_secret).toString('base64')
    // 'Authorization: basic ' + base64(client_id + ':' + client_secret)
    // axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    // axios.defaults.headers.common['Accept'] = '*/*' // 'application/vnd.vimeo.*+json;version=3.2'
    // axios.defaults.headers.common['User-Agent'] = 'Vimeo.js/1.2.0'
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

    // const auth_base64 = btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    // console.log('get_token auth_base64', auth_base64)

    let { data } = await axios.post('http://localhost:3000/api', {
      code, redirect_uri, grant_type: 'authorization_code'
    }, {
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET
      },
      headers: {
        // Authorization: 'Basic ' + auth_base64 // ,
        'Content-Type': 'application/x-www-form-urlencoded'
        // Accept: 'application/vnd.vimeo.*+json;version=3.2'
      }
    })
    console.log('get_token', data)
  } catch (error) {
    console.log('get_token error', error)
  }
}
