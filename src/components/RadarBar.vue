<!--
 * @Author: wangsc
 * @Date: 2024-09-07 20:04:20
 * @LastEditTime: 2024-09-07 22:39:18
 * @LastEditors: wangsc
 * @Description: 雷达图
-->
<template>
 <div>
  <div>云端报警风险</div>
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

// 2、构建 option 配置对象
const renderChat = () => {
  const options = {
    // 雷达图的坐标系配置
    radar: {
      axisName: {
        color: "#05d5ff",
        fontSize: 14,
      },
      shape: 'polygon', // 形状
      center: ['50%', '50%'],
      radius: '80%', 
      startAngle: 120, // 起始角度
      // 轴线配置
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(5, 213, 255, 0.8)",
        },
      },
      // 网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(5, 213, 255, 0.8)",
          // type: "dashed",
          width: 1,
        },
      },
      indicator: props.data.risks.map((item) => ({
        name: item.name,
        max: 100, // 最大值
      })),
      // 拆分区
      splitArea: {
        show: false,
      },
    },
    // 坐标极点
    polar: {
      center: ['50%', '50%'],
      radius: '0%', 
    },
    // 坐标角度
    angleAxis: {
      min: 0,
      interval: 5, // 分割间隔
      clockwise: false, // 刻度增长是否按顺时针，默认顺时针
      splitLine: true, // 展示分割线,
    },
    // 径向轴
    radiusAxis: {
      min: 0,
      interval: 20, // 分割间隔
      splitLine: true, // 展示分割线,
    },
    // 图标核心配置
    series: {
      type: 'radar',
      symbol: 'circle',
      symbolSize: 10,
      // 图表数据
      data: [{
        value: props.data.risks.map((item) => item.value),
        name: '风险值', // 名称
        label: {
          show: true,
          color: '#fff',
        },
        itemStyle: {
          color: '#05d5ff',
        },
      }], 
      lineStyle: {
        width: 2,
        color: '#05d5ff',
      },
      areaStyle: {
        color: '#05d5ff',
        opacity: 0.5,
      },
      label: {
        show: true,
        color: '#fff',
      },
      itemStyle: {
        color: '#05d5ff',
      },
    },
  };

  // 3、使用 echarts 实例来绘制图表
  myChart.setOption(options);
};

// 监听数据变化
watch(() => props.data, () => {
  renderChat();
})
</script>

<style lang="less" scoped>
</style>
