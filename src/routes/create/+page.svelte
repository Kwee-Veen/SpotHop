<script lang="ts">
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/stores";
  import CreateSpotForm from "./CreateSpotForm.svelte";

  subTitle.set("Create a Spot");

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


<Card title="Create a Spot">
  <!-- below's userList is also unnecessary here, but would be in account admin. -->
  <!-- <CreateSpotForm {userList} /> -->
  <CreateSpotForm />
</Card>
