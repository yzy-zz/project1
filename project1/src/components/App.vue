<!--
 * @Author: your name
 * @Date: 2020-07-20 09:29:05
 * @LastEditTime: 2020-07-22 08:21:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \project1\components\App.vue
-->
<template>
  <div id="app" class="box">
    <div id="control" class="box">
      <div class="title">ControlPanel</div>
      <button id="b1" v-on:click="Click">Updata</button>
      <div>
        <input
          type="range"
          value="0"
          max="9"
          id="range"
          v-model="value"
          @change="Range"
        />
        <span id="sp">{{ theme }}</span>
      </div>
    </div>
    <div id="rect" class="box">
      <div class="title">LDASubjectRect</div>
      <div id="rectt"></div>
    </div>
    <div id="textare" class="box">
      <div class="title">TextArea</div>
      <p>输入要解析的文本不少于50词</p>
      <!-- <p>{{ message }}</p> -->
      <textarea v-model="message" v-focus id="text"></textarea>
    </div>
    <div id="wordcloud" class="box">
      <div class="title">WorldCloud</div>
      <div id="ccloud"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
export default {
  data() {
    return {
      message: "",
      value: 0,
      theme: "主题0",
    };
  },
  methods: {
    Range: function() {
      this.theme = "主题" + this.value;
    },
    Click: function() {
      console.log(this.value);
      var that = this;
      console.log(this.message);
      const strr = this.message.replace(/[\r\n]/g, "");
      $.ajax({
        url: "http://localhost:3000/message",
        type: "GET",
        dataType: "text",
        //async:false,
        data: { zhi: strr },
        dataType: "json",
        async: false,
        success: function(res) {
          console.log(res);
          console.log(that.message);
          console.log(that.value);
          that.joke = res.data;
          var text = res[0]["word"][that.value];
          var pin = res[0]["pin"][that.value];
          var myChart = echarts.init(document.getElementById("rectt"));
          var max = Math.max.apply(null, pin);
          var option = {
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999",
                },
              },
            },
            legend: {
              data: ["词频"],
            },
            xAxis: [
              {
                type: "category",
                data: text,
                axisPointer: {
                  type: "shadow",
                },
                axisLabel: {
                  interval: 0,
                  rotate: 30,
                },
              },
            ],
            yAxis: [
              {
                type: "value",
                name: "词频",
                min: 0,
                max: max,
                //interval: 50,
              },
            ],
            series: [
              {
                name: "词频",
                type: "bar",
                data: pin,
              },
            ],
          };
          if (option && typeof option === "object") {
            myChart.setOption(option, true);
          }
          var datamiddle = [];
          for (var i = 0; i < res[0]["pin"][0].length; i++) {
            var dataset = {};
            dataset["name"] = res[0]["word"][that.value][i];
            dataset["value"] = res[0]["pin"][that.value][i];
            datamiddle.push(dataset);
          }
          var datalast = {};
          datalast["value"] = datamiddle;
          console.log(datalast);
          var myChart1 = echarts.init(document.getElementById("ccloud"));
          var option1 = {
            backgroundColor: "#fff",
            tooltip: {
              show: true,
            },
            series: [
              {
                type: "wordCloud",
                gridSize: 1,
                sizeRange: [30, 100],
                rotationRange: [0, 0, 0, 0],
                //shape: 'circle',
                //maskImage: maskImage,
                //drawOutOfBound: true,
                textStyle: {
                  normal: {
                    color: function() {
                      return (
                        "rgb(" +
                        Math.round(Math.random() * 255) +
                        ", " +
                        Math.round(Math.random() * 255) +
                        ", " +
                        Math.round(Math.random() * 255) +
                        ")"
                      );
                    },
                  },
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowColor: "#333",
                },
                left: "center",
                top: "center",
                right: null,
                bottom: null,
                data: datalast.value,
              },
            ],
          };
          if (option1 && typeof option1 === "object") {
            myChart1.setOption(option1, true);
          }
        },
        error: function() {
          alert("false");
        },
      });
    },
  },
};
</script>

<style scoped>
#control {
  width: 35%;
  height: 25%;
  left: 10%;
  top: 1%;
}
.title {
  background-color: antiquewhite;
  height: 30px;
  border-radius: 10px 10px 0 0;
  line-height: 30px;
  font-size: 20px;
}

.box {
  background-color: #fff;
  box-shadow: 5px 5px 5px rgba(255, 228, 225, 1);
  border-radius: 10px;
  position: absolute;
  border: "1px solid black";
}
#app {
  background-color: black;
  width: 100%;
  top: 0;
  bottom: 0;
}
#rect {
  width: 44%;
  height: 25%;
  left: 46%;
  top: 1%;
}
#rectt {
  width: 100%;
  height: 95%;
  position: absolute;
}
#textare {
  width: 35%;
  height: 72%;
  top: 27%;
  left: 10%;
}
#text {
  position: absolute;
  left: 10px;
  top: 10%;
  width: 90%;
  height: 80%;
}
#wordcloud {
  left: 46%;
  top: 27%;
  height: 72%;
  width: 44%;
}
#ccloud {
  width: 100%;
  height: 95%;
  position: absolute;
}
#range {
  width: 50%;
}
</style>
