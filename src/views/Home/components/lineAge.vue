<template>
  <div class="lineAge"></div>
</template>

<script setup>
import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { nextTick, ref, computed, watch } from 'vue'
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition])
const lineAgeList = ref([])
const props = defineProps({
  ageList: Array
})
const ageList = computed(() => props.ageList)
watch(ageList, (newVal) => {
  lineAgeList.value = newVal
  nextTick(() => {
    setCharts()
  })
})

const setCharts = () => {
  const chartBox = document.querySelector('.lineAge')

  // 检查是否已经存在图表实例
  if (chartBox && chartBox.echartsInstance) {
    // 销毁现有的实例
    chartBox.echartsInstance.dispose()
  }

  var myChart = echarts.init(chartBox)
  chartBox.echartsInstance = myChart // 将实例保存到容器中

  myChart.setOption({
    title: {
      text: '用户年龄分布'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: lineAgeList.value.map((item) => item.age),
      name: '年龄'
    },
    yAxis: {
      type: 'value',
      name: '数量'
    },
    series: [
      {
        data: lineAgeList.value.map((item) => item.count),
        type: 'line',
        areaStyle: {}
      }
    ]
  })

  // 手动触发 resize，确保图表尺寸适应容器
  myChart.resize()
}

// 监听窗口或容器尺寸变化，确保图表动态调整
window.addEventListener('resize', () => {
  const chartBox = document.querySelector('.lineAge')
  if (chartBox && chartBox.echartsInstance) {
    chartBox.echartsInstance.resize()
  }
})
</script>

<style lang="scss" scoped>
.lineAge {
  margin: 2rem 0;
  padding: 1rem;
  width: 95%; /* 或使用固定宽度 */
  height: 55%; /* 或使用固定高度 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>