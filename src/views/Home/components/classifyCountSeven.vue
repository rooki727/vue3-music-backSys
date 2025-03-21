<template>
  <div class="classifyCountSeven"></div>
</template>

<script setup>
import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { ref, nextTick, computed, watch } from 'vue'
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
])
const props = defineProps({
  styleTopList: Array
})
const styleTopList = computed(() => props.styleTopList)
const styleTopListUse = ref([])

watch(styleTopList, (newVal) => {
  newVal.forEach((item) => {
    styleTopListUse.value.push({
      name: item.name,
      value: item.count
    })
  })

  nextTick(() => {
    setCharts()
  })
})
// 绘制图
const setCharts = () => {
  const chartBox = document.querySelector('.classifyCountSeven')

  // 检查是否已经存在图表实例
  if (chartBox && chartBox.echartsInstance) {
    // 销毁现有的实例
    chartBox.echartsInstance.dispose()
  }

  var myChart = echarts.init(chartBox)
  chartBox.echartsInstance = myChart // 将实例保存到容器中
  // 绘制图表
  myChart.setOption({
    title: {
      text: '歌单热播Top7',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: styleTopListUse.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })

  // 手动触发 resize，确保图表尺寸适应容器
  myChart.resize()
}

// 监听窗口或容器尺寸变化，确保图表动态调整
window.addEventListener('resize', () => {
  const chartBox = document.querySelector('.classifyCountSeven')
  if (chartBox && chartBox.echartsInstance) {
    chartBox.echartsInstance.resize()
  }
})
</script>

<style lang="scss" scoped>
.classifyCountSeven {
  padding: 1rem;
  width: 95%; /* 或使用固定宽度 */
  height: 55%; /* 或使用固定高度 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>