<!--
 * @Author: wangsc
 * @Date: 2024-09-07 20:04:20
 * @LastEditTime: 2024-09-08 10:12:11
 * @LastEditors: wangsc
 * @Description: 环形图
-->
<template>
  <div>
    <div>大区异常处理</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";

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

const getSeriesData = () => {
  const series = [];

  props.data.abnormals.forEach((item, index) => {
    // 上层
    series.push({
      name: item.name,
      type: "pie", // 饼图
      clockwise: false, // 逆时针
      // 鼠标移入时不展示
      emphasis: {
        scale: true
      },
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"], // 两个值，第一个外间距， 第二个内间距
      center: ["55%", "55%"], // 中心点
      label: {
        show: false,
      },
      data: [
        {
          value: item.value,
          name: item.name,
        },
        {
          value: 1000, // 最大值
          itemStyle: { color: "rgba(0,0,0,0)", borderWidth: 0 },
          tooltip: {
            show: false,
          },
          emphasis: {
            scale: true
          }
        },
      ],
    });

    // 底层
    series.push({
      name: item.name,
      type: "pie", // 饼图
      silent: true, // 不需要任何事件
      z: 1, // 即z-index，最底层
      clockwise: false, // 逆时针
      emphasis: {
        scale: true
      },
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"], // 两个值，第一个外间距， 第二个内间距
      center: ["55%", "55%"], // 中心点
      label: {
        show: false,
      },
      data: [
        // 一个饼图展示其四分之三，剩下四分之一透明即可
        {
          value: 7.5,
          itemStyle: {
            color: "rgb(3, 31, 62)",
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          emphasis: {
            scale: true
          }
        },
        {
          value: 2.5, // 最大值
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          emphasis: {
            scale: true
          }
        },
      ],
    });
  });

  return series;
};

// 2、构建 option 配置对象
const renderChat = () => {
  const options = {
    // 图例配置
    legend: {
      show: true,
      icon: "circle",
      // orient: "horizontal", // 图例文字的位置
      top: "14%",
      left: "60%",
      data: props.data.abnormals.map((item) => item.name),
      width: -5, // 竖向
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 6, // 图例间距
      textStyle: {
        fontSize: 12,
        lineHeight: 5,
        color: "rgba(255, 255, 255, 0.8)",
      },
    },
    // 提示层
    tooltip: {
      show: true,
      trigger: "item",
      formatter: "{a}<br>{b}:{c}({d}%)",
    },
    // Y轴
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisLine: {
          show: false,
        },
      },
    ],
    // X轴
    xAxis: [
      {
        show: false,
      },
    ],
    // 核心配置
    series: getSeriesData(),
  };

  // 3、使用 echarts 实例来绘制图表
  myChart.setOption(options);
};

// 监听数据变化
watch(
  () => props.data,
  () => {
    renderChat();
  }
);
</script>

<style lang="less" scoped></style>
