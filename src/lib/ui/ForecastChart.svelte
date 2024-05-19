<script lang="ts">
  import { onMount } from "svelte";
  import { Chart, type EChartsOptions } from "svelte-echarts";

  export let data: any;
  let tempTrend: any[];
  let trendLabels: any[];
  let options: EChartsOptions = {};

  // Chart attribution: inspired by https://echarts.apache.org/examples/en/editor.html?c=area-stack&theme=dark&lang=ts

  onMount(async () => {
    tempTrend = data.weatherTrends.tempTrend;
    trendLabels = data.weatherTrends.trendLabels;
    start();
  });

  function start() {
    let setOptions: EChartsOptions = {
      title: {
        text: `${data.spot.name}: Five-day Temperature Forecast`,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#a1360b",
          },
        },
      },
      toolbox: {
        feature: {
          dataZoom: {},
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: trendLabels,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: `°C`,
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: tempTrend,
          color: [

        '#f7d50f',
        '#73a373',
        '#73b9bc',
        '#7289ab',
        '#91ca8c',
        '#f49f42'
      ]
        },
      ],
    };
    options = setOptions;
  }
</script>

<div class="app">
  <Chart {options} />
</div>

<style>
  .app {
    width: auto;
    height: 45vh;
  }
</style>
