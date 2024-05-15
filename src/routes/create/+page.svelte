<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/stores";
  import CreateSpotForm from "./CreateSpotForm.svelte";
  import SpotList from "$lib/ui/SpotList.svelte";
  import { onMount } from "svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";

  export let data: any;
  let map: LeafletMap;

  subTitle.set("Create a Spot");

  onMount(async () => {
    const leaflet = await import("leaflet");
    const spots = data.spots;
    const lastSpot = spots[spots.length - 1];
    if (lastSpot) {
      const popup = `Spot "${lastSpot.name}" (${lastSpot.latitude} ${lastSpot.longitude}), category: ${lastSpot.category}`;
      map.addMarker(lastSpot.latitude, lastSpot.longitude, popup);
      map.moveTo(lastSpot.latitude, lastSpot.longitude);
    }
  });
</script>

<div class="columns is-mobile is-centered">
  <div class="column is-6">
    <box class="box has-background-danger-light">
      <CreateSpotForm/>
    </box>
  </div>
  <div class="column is-6">
    <box class="box">
      <LeafletMap height={43} activeLayer = "Terrain" bind:this={map} data={data}/>
    </box>
  </div>
</div>

<Card>
  <div class="columns is-mobile is-centered">
    <div class="column is-3">
      <box class="box has-background-white">
        <h2 class="h2 has-text-centered">Spot List</h2>
      </box>
    </div>
  </div> 
  <SpotList spots = {data.spots}/>
</Card>

<!-- <script>
    // // This may be unnecessary here; make a new folder for accounts, put this in there instead,
  // // as will need to see the userList in that (if the current user is an admin, else only see current user) 

  // import { currentSession } from "$lib/stores";
  // import { spotService } from "$lib/services/spot-service";
  // import { onMount } from "svelte";
  // import { get } from "svelte/store";
  // import type { User } from "$lib/types/spot-types";
  // let userList: User[] = [];

  // onMount(async () => {
  //     userList = await spotService.getUsers(get(currentSession));
  //   });

  //   // ... end of above comment
</script> -->