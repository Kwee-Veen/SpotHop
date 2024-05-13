<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import { currentSession, latestSpot, subTitle } from "$lib/stores";
  import CreateSpotForm from "./CreateSpotForm.svelte";
  import SpotList from "$lib/ui/SpotList.svelte";

  import type { Spot } from "$lib/types/spot-types";
  import { onMount } from "svelte";
  import { spotService } from "$lib/services/spot-service";
  import { get } from "svelte/store";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";

  let spots: Spot[] = [];
  let map: LeafletMap;

  subTitle.set("Create a Spot");

  latestSpot.subscribe(async (spot) => {
    if (spot) {
      spots.push(spot);
      spots = [...spots];
      map.moveTo(spot.latitude, spot.longitude);
      const popup = `Spot "${spot.name}" (${spot.latitude} ${spot.longitude}), category: ${spot.category}`;
      map.addMarker(spot.latitude, spot.longitude, popup);
      spots = [];
      spots.push(spot);
    }
  });

  onMount(async () => {
      spots = await spotService.getSpots(get(currentSession));
      spots.forEach((spot: Spot) => {
          const popup = `Spot "${spot.name}" (${spot.latitude} ${spot.longitude}), category: ${spot.category}`;
          map.addMarker(spot.latitude, spot.longitude, popup);
      });
      const lastSpot = spots[spots.length - 1];
      if (lastSpot) map.moveTo(lastSpot.latitude, lastSpot.longitude);
      spots = [];
      spots.push(lastSpot);
  });
</script>

<div class="columns is-mobile is-centered">
  <div class="column is-6">
    <box class="box has-background-danger-light">
      <CreateSpotForm />
    </box>
  </div>
  <div class="column is-6">
    <box class="box">
      <LeafletMap height={43} activeLayer = "Terrain" bind:this={map}/>
    </box>
  </div>
</div>

<Card>
  <div class="columns is-mobile is-centered">
    <div class="column is-3">
      <box class="box has-background-white">
        <h2 class="h2 has-text-centered">Latest Spot</h2>
      </box>
    </div>
  </div> 

  <SpotList {spots}/>
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