<!--
 * @Author: wangsc
 * @Date: 2024-09-07 20:04:20
 * @LastEditTime: 2024-09-07 21:45:30
 * @LastEditors: wangsc
 * @Description: 横向柱状图
-->
<template>
 <div>
  <div>大区数据信息</div>
  <div ref="target" class=" w-full h-full"></div>
 </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import * as echarts from 'echarts';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

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
    // X轴展示数据
    xAxis: {
      show: false, // 不显示X轴
      type: 'value', // 展示数据
      max: function (val) {
        return parseInt(val.max * 1.2) // 防止数据顶到头
      }
    },
    // Y轴展示数据
    yAxis: {
      type: 'category',
      data: props.data.regions.map((item) => item.name),
      inverse: true, // 反向顺序展示
      axisLine: {
        show: false, // 不显示轴线 
      },
      axisTick: {
        show: false, // 不显示刻度 
      },
      axisLabel: {
        color: '#9eb1c8'
      }
    },
    // 当前echarts图表的位置
    grid: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      containLabel: true,
    },
    // 图表的数据项
    series: [{
      type: 'bar', // 图表类型，bar柱形
      // 给数据添加数据
      data: props.data.regions.map((item) => ({
        name: item.name,
        value: item.value,
      })),
      showBackground: true, // 展示背景
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)', // 背景色
        // opacity: 0.1, // 背景透明度
      },
      itemStyle: {
        color: '#479ad3', // 文字颜色
        barBorderRedius: 5, // 圆角
        shadowColor: 'rgba(0, 0, 0, 0.3)', // 阴影
        shadowBlur: 5, // 阴影模糊度
        // opacity: 0.8, // 文字透明度
      },
      barWidth: 12, // 柱子宽度
      label: {
        show: true, // 文字是否显示
        position: 'right', // 文字位置
        color: '#fff', // 文字颜色
      }
    }],
  }


  // 3、使用 echarts 实例来绘制图表
  myChart.setOption(options);
}

// 监听数据变化
watch(() => props.data, () => {
  renderChat();
})
</script>

<style lang="less" scoped>
</style>
