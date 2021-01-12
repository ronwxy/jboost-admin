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

import i18n from './i18n/';

new Vue({
    el: '#app',
    i18n,
    router,
    store,
    render: h => h(App)
});

