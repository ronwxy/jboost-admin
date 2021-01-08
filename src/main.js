import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import '@/styles/index.scss' // global css

import App from './App';
import router from './router/routers';
import permission from './components/permission';
import store from './store';

import '@/icons'; // icon
import './router/index'; // permission control
import './mixins/index'; // permission control

Vue.use(mavonEditor);
Vue.use(permission);
Vue.use(ElementUI, {locale});
Vue.config.productionTip = false;
require('babel-polyfill');

window.$$settings = require('./settings');
import {get, initLocale} from '@/api/locale'
import {getToken} from '@/utils/auth'
import VueI18n from 'vue-i18n';
//初始化国际化插件
Vue.use(VueI18n);
let language = (navigator.language || navigator.browserLanguage).toLowerCase();
const message_zh = {};
const message_en = {};

if (getToken()) {
    get().then((res) => {
        let zh =[];
        let en = [];
        res.data.records.forEach((item)=>{
            if(item.locale === 'zh-CN'){
                zh.push(item);
            }
        });
    
        res.data.records.forEach((item)=>{
            if(item.locale === 'en'){
                en.push(item);
            }
        });
        zh.forEach((data) => {
            message_zh[data.code] = data.name;
        });
        en.forEach((data) => {
            message_en[data.code] = data.name;
        });
    });
} else {
    initLocale().then((res) => {
        let zh =[];
        let en = [];
        res.data.forEach((item)=>{
            if(item.locale === 'zh-CN'){
                zh.push(item);
            }
        });
    
        res.data.forEach((item)=>{
            if(item.locale === 'en'){
                en.push(item);
            }
        });
    
        zh.forEach((data) => {
            message_zh[data.code] = data.name;
        });
        en.forEach((data) => {
            message_en[data.code] = data.name;
        });
    });
}


/**
 * 引入 socket.io
 */

// import VueSocketIO from 'vue-socket.io'

// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: process.env.VUE_APP_SOCKET,
// }));
setTimeout(() => {
    let i18n = new VueI18n({
        locale: language === 'zh'?'zh-cn':language,//当前语言环境
        messages: {//语言文件对应语言环境的map集合，value值代表着语言文件的相对地址
            en: message_en,
            'zh-cn': message_zh,
        }
    });
    new Vue({
        el: '#app',
        i18n,
        router,
        store,
        render: h => h(App)
    });
}, 200);