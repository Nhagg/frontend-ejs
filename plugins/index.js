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
  if (!text) {
    return ''
  }
  text = text.toString()
  text = text.replace(/（/g, '(')
  text = text.replace(/）/g, ')')
  text = text.replace(/／/g, '/')
  return text
}
Vue.prototype.$replaceSpecialText = replaceSpecialText
Vue.prototype.$clearSpecialText = (text) => {
  if (!text) {
    return ''
  }
  text = text.toString().toLowerCase()
  text = text.replace(/（/g, '')
  text = text.replace(/）/g, '')
  text = text.replace(/／/g, '')
  text = text.replace(/ /g, '')
  text = text.replace(/\./g, '')
  return text
}
Vue.prototype.$getNativeName = (text) => {
  text = 'この（傘／かさ）は（私／わたし／）のです'
  console.log(text)
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
  console.log('final text: ', s)
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
  const api = process.env.DOMAIN_API
  const folderUrl = api + '/images/' + unit.type + '/'
  return folderUrl + item.content['image' + i]
}
Vue.prototype.$getItemAudio = (item = {}) => {
  const api = process.env.DOMAIN_API
  const folderUrl = api + '/mp3s/'
  if (!item || !item.content) {
    return folderUrl + 'default.mp3'
  }
  if (item.content.title2.indexOf('.mp3') > -1) {
    return folderUrl + item.content.title2
  } else {
    return folderUrl + item.content.title2 + '.mp3'
  }
}
Vue.prototype.$playVolume = (text, speed = 0) => {
  if (Vue.prototype.$cookies.get('settingSpeed')) {
    speed = Vue.prototype.$cookies.get('settingSpeed')
  }
  console.log('$playVolume', text, speed)
  let msg = new SpeechSynthesisUtterance(text)
  msg.lang = 'ja-JP'
  msg.rate = speed
  window.speechSynthesis.speak(msg)
}
Vue.prototype.$errorImage = (event) => {
  event.target.src = require('~/assets/img/default.png')
}
