/*
 * @Author: your name
 * @Date: 2020-07-20 07:51:29
 * @LastEditTime: 2020-07-21 13:04:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack\src\index.js
 */

import Vue from "vue";
import App from "./components/App.vue";
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
//import Text from "./components/text.vue";

Vue.directive('focus', {
    bind: function (el) {
        console.log(el)
    },
    inserted: function (el) {
        el.focus();
    }
})
const app = new Vue({
    el: "#app",
    render: (h) => h(App)
})