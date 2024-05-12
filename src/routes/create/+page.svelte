<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import { currentSession, latestSpot, subTitle } from "$lib/stores";
  import CreateSpotForm from "./CreateSpotForm.svelte";
  import SpotList from "$lib/ui/SpotList.svelte";

  import type { Spot } from "$lib/types/spot-types";
  import { onMount } from "svelte";
  import { spotService } from "$lib/services/spot-service";
  import { get } from "svelte/store";
  let spots: Spot[] = [];

  subTitle.set("Create a Spot");

  latestSpot.subscribe(async (spot) => {
    if (spot) {
      spots.push(spot);
      spots = [...spots];
    }
  });

  onMount(async () => {
    spots = await spotService.getSpots(get(currentSession));
  });


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

</script>


<Card>
  <CreateSpotForm />
</Card>

<Card>
  <SpotList {spots}/>
</Card>