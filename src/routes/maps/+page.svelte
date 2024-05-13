<script lang="ts">
    import Card from "$lib/ui/Card.svelte";
    import { currentSession, subTitle } from "$lib/stores";
    import { spotService } from "$lib/services/spot-service";

    import LeafletMap from "$lib/ui/LeafletMap.svelte";
    import { onMount } from "svelte";
    import type { Spot } from "$lib/types/spot-types";
    import { get } from "svelte/store";

    subTitle.set("Map of Spots");

    let map: LeafletMap;

    onMount(async () => {
        const spots = await spotService.getSpots(get(currentSession));
        spots.forEach((spot: Spot) => {
            const popup = `Spot "${spot.name}" (${spot.latitude} ${spot.longitude}), category: ${spot.category}`;
            map.addMarker(spot.latitude, spot.longitude, popup);
        });
        const lastSpot = spots[spots.length - 1];
        if (lastSpot) map.moveTo(lastSpot.latitude, lastSpot.longitude);
    });
  </script>
  
  <Card>
    <LeafletMap height={65} bind:this={map}/>
  </Card>
  