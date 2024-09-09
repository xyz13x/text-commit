<!--
 * @Author: wangsc
 * @Date: 2024-09-07 20:04:20
 * @LastEditTime: 2024-09-08 11:39:57
 * @LastEditors: wangsc
 * @Description: 数据传递关系图
-->
<template>
 <div>
  <div>数据传递信息</div>
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
    xAxis: {
      show: false,
      type: "value",
    },
    yAxis: {
      show: false,
      type: "value",
    },
    series: [
      {
        type: "graph",
        layout: "none",
        coordinateSystem: 'cartesian2d',
        symbolSize: 10, // 节点大小
        z: 3,
        // 边界线条文字
        edgeLabel: {
          show: true,
          color: '#fff',
          fontSize: 14,
          formatter: function(params) {
            return params.data.speed;
          },
        },
        label: {
          show: true,
          position: 'bottom',
          color: '#5e5e5e',
        },
        edgeSymbol: ["none", "arrow"],
        edgeSymbolSize: 8,
        data: props.data.relations.map(item => {
          if(item.id !== 0) {
            return {
              name: item.name,
              category: 0,
              active: true,
              speed: `${item.speed}kb/s`,
              value: item.value,
            }
          } else {
            return {
              name: item.name,
              value: item.value,
              symbolSize: 100,
              itemStyle: {
                color: {
                  colorStops: [
                    {
                      offset: 0,
                      color: '#157eff',
                    },
                    {
                      offset: 1,
                      color: '#35c2ff',
                    }
                  ],
                },
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
              label: {
                fontSize: 14,
              }
            }
          }
        }),
        // 节点间的关系数据
        links: props.data.relations.map((item, index) => ({
          source: item.source,
          target: item.target,
          speed: `${item.speed}kb/s`,
          lineStyle: {
            color: '#12b5d0',
            curveness: 0.2, // 弯曲度
          },
          label: {
            show: true,
            position: 'middle',
            offset: [10, 0], // 偏移量
          },
        })),
      },
      {
        type: 'lines', // 线数据
        coordinateSystem: 'cartesian2d',
        z: 1,
        effect: {
          show: true,
          smooth: false,
          trailLength: 0,
          symbol: 'arrow',
          color: 'rgba(55, 155, 255, 0.5)',
          symbolSize: 12,
        },
        lineStyle: {
          curveness: 0.2, // 弯曲度
        },
        data: [
          [ [0, 300], [50, 200] ],
          [ [0, 100], [50, 200] ],
          [ [50, 200], [100, 100] ],
          [ [50, 200], [100, 300] ]
        ],
      },
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
