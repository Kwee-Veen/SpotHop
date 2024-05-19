<script lang="ts">
    import { subTitle } from "$lib/stores";
    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";

    subTitle.set("Spot Maps");

    export let data: any;
    let map1: LeafletMap;
    let map2: LeafletMap;

    onMount(async () => {
      const leaflet = await import("leaflet");
      const spots = data.spots;
      const lastSpot = spots[spots.length - 1];
      if (lastSpot) {
        const popup = `Spot "${lastSpot.name}" (${lastSpot.latitude} ${lastSpot.longitude}), category: ${lastSpot.category}`;
        map1.addMarker(lastSpot.latitude, lastSpot.longitude, popup);
        map1.moveTo(lastSpot.latitude, lastSpot.longitude);
        map2.addMarker(lastSpot.latitude, lastSpot.longitude, popup);
        map2.moveTo(lastSpot.latitude, lastSpot.longitude);
      }
    });
  </script>
  
    <LeafletMap height={75} bind:this={map1} data={data} id={"firstMap"}  zoom={7}/>
    <LeafletMap height={75} bind:this={map2} data={data} activeLayer = {"Transportation"} id={"secondMap"} />
  
  