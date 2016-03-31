
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
  ['@@router/LOCATION_CHANGE']: (state, { payload: { query } }) => (
    { ...state, random: +query.state, code: query.code }
  )
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
  // redirect_uri must be provided, and must match your configured uri
    // lib.accessToken(code, redirect_uri, function (err, token) {
    //     if (err) {
    //             return response.end("error\n" + err);
    //     }

    //     if (token.access_token) {
    //             // At this state the code has been successfully exchanged for an access token
    //             lib.access_token = token.access_token;

    //             // Other useful information is included alongside the access token
    //             // We include the final scopes granted to the token. This is important because the user (or api) might revoke scopes during the authentication process
    //             var scopes = token.scope;

    //             // We also include the full user response of the newly authenticated user.
    //             var user = access_token.user;
    //     }
    // });
}
