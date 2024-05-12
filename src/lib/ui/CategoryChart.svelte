<script lang='ts'>
  import { spotService } from '$lib/services/spot-service';
  import { currentSession } from '$lib/stores';
  import type { Spot } from '$lib/types/spot-types';
  import { onMount } from 'svelte';
  import { Chart, type EChartsOptions } from 'svelte-echarts';
  import { get } from 'svelte/store';

  let spotList: Spot[] = [];
  let options: EChartsOptions = {};
  let dataInput: any = [
    { value: 0, name: 'Site' },
    { value: 0, name: 'Locale' },
    { value: 0, name: 'Activity' },
    { value: 0, name: 'Scenery' },
    { value: 0, name: 'Structure' },
    { value: 0, name: 'Shopping' },
    { value: 0, name: 'Uncategorised' },
  ]

onMount(async () => {
    const spots = await spotService.getSpots(get(currentSession)) as Spot[];
    spotList = spots;
    spotList.forEach((spot) => {
      if (spot.category == "Site") {
        dataInput[0].value += 1;
      }  
      if (spot.category == "Locale") {
        dataInput[1].value += 1;
      } 
      if (spot.category == "Activity") {
        dataInput[2].value += 1;
      }  
      if (spot.category == "Scenery") {
        dataInput[3].value += 1;
      }  
      if (spot.category == "Structure") {
        dataInput[4].value += 1;
      }  
      if (spot.category == "Shopping") {
        dataInput[5].value += 1;
      }  
      if (spot.category == "Uncategorised") {
        dataInput[6].value += 1;
      }   
    });
    start();
  });

function start () {
  let setOptions: EChartsOptions = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '0%',
        left: 'center'
      },
      responsive: true,
      maintainAspectRatio: false,
      series: [
        {
          name: 'Spot Category',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 7,
            borderColor: '#fff',
            borderWidth: 5
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: dataInput
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
    width: 40vw;
    height: 45vh;
  }
</style>
