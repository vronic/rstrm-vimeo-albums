import Vimeo from 'vimeo'

const CLIENT_ID = 'fb9cf2aa9fefdf0f3c81b754deee3096d104c42a'
const CLIENT_SECRET = '2wSA8dGdxHWwi1yaxZQIwbdYBtZkDMOIqpKMVulOCu1aa7gYQx6fwqBROhmEZH4l/grsL6c8BkCSphWV5HT0XQ2TDCNGolL8RWwDqBDfhdFNxTuHGW1PGK2T672kGjis'

const lib = new Vimeo(CLIENT_ID, CLIENT_SECRET)

// var url = lib.buildAuthorizationEndpoint(redirect_uri, scopes, state)
const redirect_uri = '/'
const scopes = ['public', 'private', 'create', 'create', 'delete', 'interact']
const state_random = getRandomInt(100000, 500000)

export const url = lib.buildAuthorizationEndpoint(redirect_uri, scopes, state_random)

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
