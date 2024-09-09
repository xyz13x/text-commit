<!--
 * @Author: wangsc
 * @Date: 2024-09-07 20:04:20
 * @LastEditTime: 2024-09-08 11:05:30
 * @LastEditors: wangsc
 * @Description: 文档云图
-->
<template>
 <div>
  <div>关键词条</div>
  <div ref="target" class="w-full h-full"></div>
 </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import * as echarts from 'echarts';
import 'echarts-wordcloud';

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

const randomRGB = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

// 2、构建 option 配置对象
const renderChat = () => {
  const options = {
    series: [
      {
        type: 'wordCloud',
        sizeRange: [8, 46],
        rotationRange: [0, 0],
        gridSize: 8,
        layoutAnimation: true,
        textStyle: {
          color: randomRGB,
        },
        emphasis: {
          fontWeight: 'bold',
          color: '#000',
        },
        data: props.data.datas,
      }
    ],
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
