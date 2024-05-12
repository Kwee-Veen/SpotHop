<script lang='ts'>
  import { spotService } from '$lib/services/spot-service';
  import { currentSession } from '$lib/stores';
  import type { User } from '$lib/types/spot-types';
  import { onMount } from 'svelte';
  import { Chart, type EChartsOptions } from 'svelte-echarts';
  import { get } from 'svelte/store';

  let userList: any[] = [];
  let displayonlyspotcount: Number[] = [];
  let userSpotCount: any[] = []
  let options: EChartsOptions = {};

  onMount(async () => {
    const userSpots = await spotService.getUserSpotCount(get(currentSession)) as any[];
    userSpotCount = userSpots;
    displayonlyspotcount = userSpots;
    
    const users = await spotService.getUsers(get(currentSession));
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
  