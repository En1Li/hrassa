import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './message/en'
import zh from './message/zh'
import Cookies from 'js-cookie'

Vue.use(VueI18n)
export const messages = {
  en,
  zh
}
export const i18n = new VueI18n({
  locale: Cookies.get('lang'), // 设置地区
  messages, // 设置地区信息
})
