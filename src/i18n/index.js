import Vue from 'vue';
import VueI18n from 'vue-i18n';
//初始化国际化插件
Vue.use(VueI18n);

import en from './lang/en';
import zh from './lang/zh';

const i18n = new VueI18n({
    locale: localStorage.getItem('locale') || (navigator.language || navigator.browserLanguage).toLowerCase(),
    messages: {
        en,
        zh,
    }
})

export default i18n;