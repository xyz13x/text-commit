<!--
 * @Author: wangsc
 * @Date: 2024-09-09 19:49:04
 * @LastEditTime: 2024-09-09 20:13:01
 * @LastEditors: wangsc
 * @Description: 首页
-->
<template>
  <div
    class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-5 flex overflow-hidden"
    v-if="data"
  >
    <!-- 左边 -->
    <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!-- 横向柱状图 -->
      <HorizontalBar class="h-1/3 box-border pb-4" :data="data.regionData" />
      <!-- 雷达图 -->
      <RadarBar class="h-1/3 box-border pb-4" :data="data.riskData"/>
      <!-- 关系图 -->
      <Relation class="h-1/3" :data="data.relationData"/>
    </div>
    <!-- 中间 -->
    <div class="w-1/2 mr-5 flex flex-col">
      <!-- 数据总览图 -->
      <TotalDate class="bg-opacity-50 bg-slate-800 p-3" :data="data.totalData"/>
      <!-- 地图可视化 -->
      <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-4 flex-1" :data="data.mapData"/>
    </div>
    <!-- 右边 -->
    <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!-- 竖向柱状图 -->
      <VerticalBar class="h-1/3 box-border pb-4" :data="data.serverData"/>
      <!-- 环形图 -->
      <RingBar class="h-1/3 box-border pb-4" :data="data.abnormalData"/>
      <!-- 文档云图 -->
      <WordCloud class="h-1/3" :data="data.wordCloudData"/>
    </div>
  </div>
</template>

<script setup>
import HorizontalBar from "./components/HorizontalBar.vue";
import RadarBar from "./components/RadarBar.vue";
import Relation from "./components/Relation.vue";
import TotalDate from "./components/TotalDate.vue";
import MapChart from "./components/MapChart.vue";
import VerticalBar from "./components/VerticalBar.vue";
import RingBar from "./components/RingBar.vue";
import WordCloud from "./components/WordCloud.vue";

import { ref } from "vue";
import { getVisualization } from "./api/visualization.js";

// 总数居
const data = ref(null);
const localData = async () => {
  data.value = await getVisualization();
  console.log('%c Line:58 🥒 data.value', 'color:#465975', data.value);
};
localData();

// 间隔三秒调用一次
setInterval(() => {
  localData();
}, 3000);
</script>

<style scoped></style>
