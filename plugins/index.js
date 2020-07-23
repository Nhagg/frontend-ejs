import Vue from 'vue'
import get from 'lodash.get'
import Cookies from 'vue-cookies'
Vue.use(Cookies)
Vue.$cookies.config('1d')

Vue.prototype.$_get = get
Vue.prototype.$scrollToTop = () => window.scrollTo(0, 0)

Vue.prototype.$domainAPI = process.env.DOMAIN_API
Vue.prototype.$shuffler = (arr) => {
  return arr.sort(() => 0.5 - Math.random())
}
let replaceSpecialText = (text) => {
  text = text.replace(/（/g, '(')
  text = text.replace(/）/g, ')')
  text = text.replace(/／/g, '/')
  return text
}
Vue.prototype.$getNativeName = (text) => {
  if (!text) {
    return ''
  }
  let res = replaceSpecialText(text)
  res = res.replace(/\(/g, '')
  res = res.replace(/\)/g, '')
  let arr = res.split('/')
  let s = ''
  arr.forEach((splitText, index) => {
    if (index % 2 == 0) {
      s += splitText
    }
  })
  return s
}
Vue.prototype.$convertNameToHtml = (text) => {
  if (!text) {
    return ''
  }
  let res = replaceSpecialText(text)
  let arr = res.split('/')
  let s = ''
  arr.forEach((splitText, index) => {
    if (index % 2 == 1) {
      s += '<span>' + splitText + '</span>'
    } else {
      s += splitText
    }
  })
  res = s.replace(/\(/g, '<span>')
  res = res.replace(/\)/g, '</span>')
  return res
}
Vue.prototype.$getItemImg = (unit, item = {}, i = 1) => {
  const api = window.DOMAIN_API
  return api + '/images/' + unit.type + '/' + item.content['image' + i]
}
Vue.prototype.$playVolume = (text) => {
  let msg = new SpeechSynthesisUtterance(text)
  msg.lang = 'ja-JP'
  window.speechSynthesis.speak(msg)
}
