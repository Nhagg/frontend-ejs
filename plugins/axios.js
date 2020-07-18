import ApiService from '~/services/Api'
import get from 'lodash.get'
import https from 'https'

export default function({ $axios, app }) {
  ApiService.setAxios($axios)
  $axios.setBaseURL(process.env.DOMAIN_API)
  $axios.setHeader('Content-Type', 'application/octet-stream')
  $axios.setHeader('Access-Control-Allow-Origin', true)
  if (process.server) {
    $axios.defaults.httpsAgent = new https.Agent({
      rejectUnauthorized: false
    })
  }

  $axios.onError((error) => {
    console.log('axios err', error)
  })

  $axios.onResponse((response) => {
    if (process.client) {
      // const errorCode = get(response, "data.data.error_code", 0)
      if (!get(response, 'data.success')) {
        app.$toast.error(get(response, 'data.message'))
      }
    }
  })

  // Set header authorization
  const accessToken = app.$cookies.get('KDN_ACCESS_TOKEN')
  $axios.setToken(accessToken, 'Bearer')
}
