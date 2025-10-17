<template>
    <v-chart class="chart" autoresize :option="option" />
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GraphChart } from "echarts/charts";
import {
  TooltipComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { computed } from 'vue';
import type { GlossaryItem, GlossaryLink } from 'src/api/data-contracts/glossary-contracts';
import type { GraphSeriesOption } from 'echarts';

use([
  CanvasRenderer,
  GraphChart,
  TooltipComponent,
]);

const props = defineProps<{data: GlossaryItem[]; links: GlossaryLink[]}>()

const formattedData = computed(() => props.data.map((item) => ({...item, id: String(item.id)})))
const formattedLinks = computed(() => props.links.map(({source, target, name}) => ({name, target: String(target), source: String(source)})))

function tooltipFormatter(item: {data: GlossaryItem | GlossaryLink}){
  if('source' in item.data){
    console.log(item.data)
    return `<strong>${item.data?.name}</strong>`;
  }
  return `<strong>${item.data?.name}</strong> <br> ${item.data?.description}`;
}

const option = computed(() => ({
  tooltip: {
    trigger: "item",
    formatter: tooltipFormatter,
  },
  series: [
    {
      type: 'graph',
      roam: true,
      draggable: true,
      layout: 'force',
      data: formattedData.value,
      edges: formattedLinks.value,
      width: '25%',
      height: '25%',
      symbolSize: 20,
      label: {
        show: true,
        position: 'top',
        formatter: '{b}'
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeLabel: {
        show: true,
        color: 'black',
        formatter: (item) => {
          if(item?.data && typeof item?.data ==='object' && 'name' in item.data) return item.data?.name
        },

      },
      lineStyle: {
        width: 5,
      },
      edgeSymbolSize: [4, 12],
      force: {
        repulsion: 400,
        edgeLength: 2
      },
    } as GraphSeriesOption
  ]
}));
</script>

<style scoped>
.chart {
  flex: 1;
}
</style>
