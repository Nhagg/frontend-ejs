import Vue from 'vue'
import GAuth from 'vue-google-oauth2'
let gClientId =
  '133178251870-39j7b3egprn2ab978id2094r7toq3tjf.apps.googleusercontent.com'
const gauthOption = {
  clientId: process.env.GOOGLE_CLIEN_ID ? process.env.GOOGLE_KEY : gClientId,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
