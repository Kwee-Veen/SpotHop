<script lang='ts'>
  import { Chart, type EChartsOptions } from 'svelte-echarts';

  // See routers/create/+page.svelte for userList generation. 
  // Maybe set this list into a store of User[]? Then extract the first + surname from each here
  
  // export let userList: any[] = [];

  
  const options: EChartsOptions = {

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '2%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // data: userList
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]

    }
  </script>

  <div class="app">
    <Chart {options} />
  </div>
  
  <style>
    .app {
      width: 42.25vw;
      height: 45vh;
    }
  </style>
  