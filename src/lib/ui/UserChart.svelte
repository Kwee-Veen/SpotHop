<script lang='ts'>
  import type { User } from '$lib/types/spot-types';
  import { onMount } from 'svelte';
  import { Chart, type EChartsOptions } from 'svelte-echarts';
  
  export let data: any;
  let userList: any[] = [];
  let userSpotCount: any[] = []
  let options: EChartsOptions = {};

  onMount(async () => {
    userSpotCount = data.userSpots;
    const users = data.users;
    users.forEach((user: User) => {
          if (user.firstName && user.lastName) {
            let s = `${user.firstName} ${user.lastName}`
            userList.push(s);
          }
        });
    start();
  });

function start () {
  
  let setOptions: EChartsOptions = {

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
          data: userList,
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
          data: userSpotCount,
        }
      ]
    }
    options = setOptions;
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
  