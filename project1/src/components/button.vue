<!--
 * @Author: your name
 * @Date: 2020-07-20 10:57:10
 * @LastEditTime: 2020-07-20 22:47:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project1\src\components\button.html
-->
<template>
  <div id="box3">
    <p>{{ joke }}</p>
    <button id="bu" v-on:click="Click">点击</button>
    <button id="bu1" v-on:click="Click1">点击</button>
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
export default {
  data() {
    return {
      joke: "",
    };
  },
  methods: {
    Click: function() {
      //document.getElementById("bu").innerHTML = "已点击";
      var that = this;
      $.ajax({
        url: "http://localhost:3000/data",
        // type: "GET",
        // dataType: "json",
        // async: false,
        success: function(res) {
          //that.joke = res.data;
          console.log(res);
        },
        error: function() {
          alert("false");
        },
      });
      //   axios.get("https://autumnfish.cn/api/joke").then(
      //     function(response) {
      //       console.log(response);
      //       that.joke = response.data;
      //     },
      //     function(error) {}
      //   );
      //this.joke = "ppppp";
    },
    Click1: function() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>
