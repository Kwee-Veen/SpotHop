<script lang="ts">
  import { currentSession, subTitle} from "$lib/stores";
  import { spotService } from "$lib/services/spot-service";
  import Card from "$lib/ui/Card.svelte";
  import Charts from "$lib/ui/Charts.svelte";
  import SpotList from "$lib/ui/SpotList.svelte";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { Spot } from "$lib/types/spot-types";
  let spots: Spot[] = [];
  let analytics: any[] = [];
  subTitle.set("Spot List");

onMount(async () => {
    spots = await spotService.getSpots(get(currentSession));
  });

</script>

<Card>
  <Charts />
</Card>
<Card>
  <SpotList {spots}/>
</Card>
