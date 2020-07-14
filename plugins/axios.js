import ApiService from "~/services/Api"
import Config from "~/helpers/Config"
import get from "lodash.get"
import https from "https"

export default function({ $axios, redirect, app }) {
  ApiService.setAxios($axios)

  $axios.setBaseURL(process.env.KDN_ENDPOINT)

  if (process.server) {
    $axios.defaults.httpsAgent = new https.Agent({
      rejectUnauthorized: false
    })
  }

  $axios.onError(error => {
    console.log(error)

    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect("/400")
    }

    if (code === 401) {
      if (process.server) {
        return app.context.res.redirect(Config.LINK_LOGIN)
      } else {
        window.location.href = `${Config.LINK_LOGIN}`
      }
    }
  })

  $axios.onResponse(response => {
    if (process.client) {
      // const errorCode = get(response, "data.data.error_code", 0)
      if (!get(response, "data.success")) {
        app.$toast.error(get(response, "data.message"))
      }
    }
  })

  // Set header authorization
  const accessToken = app.$cookies.get("KDN_ACCESS_TOKEN")
  $axios.setToken(accessToken, "Bearer")
}
