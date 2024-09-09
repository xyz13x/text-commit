<!--
 * @Author: wangsc
 * @Date: 2024-09-07 20:04:20
 * @LastEditTime: 2024-09-08 13:56:20
 * @LastEditors: wangsc
 * @Description: 地图可视化
-->
<template>
  <div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import mapJson from "../assets/MapData/china.json";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// 1、初始化 echarts 实例
let myChart = null;
const target = ref(null);
onMounted(() => {
  myChart = echarts.init(target.value);
  renderChat();
});

// 2、构建 option 配置对象
const renderChat = () => {
  // echarts 渲染
	echarts.registerMap('china', mapJson);

  const options = {
    // 时间线
    timeline: {
      data: props.data.voltageLevel,
      axisType: 'category',
      autoPlay: true,
      playInterval: 3000,
      left: "10%",
      right: "10%",
      bottom: "0%",
      width: "80%",
      label: {
        color: "#ddd",
      },
      emphasis: {
        label: {
          color: "#fff",
        },
        controlStyle: {
          color: "#aaa",
          borderColor: "#aaa",
        },
      },
      symbolSize: 10,
      itemStyle: {
        color: "#555",
      },
      checkpointStyle: {
        borderColor: "#888",
        borderWidth: 2,
      },
      controlStyle: {
        showNextBtn: true,
        showPrevBtn: true,
        color: "#666",
        borderColor: "#666",
      },
    },
    // 柱形图展示范围
    baseOption: {
      grid: {
        right: "2%",
        top: "15%",
        bottom: "10%",
        width: "20%",
      },
      geo: {
        show: true,
        map: "china",
        roam: true,
        zoom: 0.8,
        center: [113.83531246, 34.0267395887],
        itemStyle: {
          borderColor: "rgba(147,235,248,1)",
          borderWidth: 1,
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: "rgba(147,235,248,0)",
              },
              {
                offset: 1,
                color: "rgba(231,137,193,.2)",
              },
            ],
            // 缺省为 false
						globalCoord: false
          },
          // 鼠标移入的色值
          emphasis: {
            areaColor: '#389BB7',
            borderWidth: 0
          }
        },
      },
    },
    options: [],
  };

  props.data.voltageLevel.forEach((item, index) => {
    options.options.push({
      backgroundColor: "#142037",
      title: [
        {
          text: "2019-2023 年度数据统计",
          left: "0%",
          top: "0%",
					textStyle: {
						color: '#ccc',
						fontSize: 30
					}
        },
        {
          id: "statistic",
          text: item + "年数据统计情况",
          right: "0%",
          top: "4%",
					textStyle: {
						color: '#ccc',
						fontSize: 20
					}
        },
      ],
      xAxis: {
        type: "value",
        scale: true,
        position: "top",
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 2,
          color: "#aaa",
        },
      },
      yAxis: {
        type: "category",
        data: props.data.categoryData[item].map((item) => item.name),
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#ddd",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: "#ddd",
        },
      },
      series: [
        {
          type: "bar",
          zlevel: 1.5,
          itemStyle: {
            color: props.data.colors[index],
          },
          data: props.data.categoryData[item].map((item) => item.value),
        },
        {
          type: "effectScatter",
          coordinateSystem: 'geo',
          data: props.data.topData[item],
          symbolSize: function (val) {
            return val[2] / 4
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
          },
          label: {
            formatter: '{b}',
            position: 'right',
            show: true,
          },
          itemStyle: {
            color: props.data.colors[index],
            shadowBlur: 5,
            shadowColor: props.data.colors[index],
          },
        },
      ],
    });
  });

  // 3、使用 echarts 实例来绘制图表
  myChart.setOption(options);
};
</script>

<style lang="less" scoped></style>
