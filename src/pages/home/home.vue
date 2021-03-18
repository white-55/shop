<template>
  <div id="main"></div>
</template>

<script>
import echarts from "echarts";
export default {
  mounted() {
    var echarts = require("echarts");

    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      xAxis: {
        type: "category",
        data: ["数码", "男装", "女装", "生鲜", "家电", "厨具", "玩具"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [12000, 8000, 15000, 8000, 700, 1000, 1300],
          type: "bar",
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>

<style scoped>
#main{
  width: 700px;
  height: 500px;
  margin: 50px auto;
}
</style>