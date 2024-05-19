<script lang="ts">
  import { subTitle} from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import CategoryChart from "$lib/ui/CategoryChart.svelte";
  import UserChart from "$lib/ui/UserChart.svelte";
  import SpotList from "$lib/ui/SpotList.svelte";
  subTitle.set("Spot Report");
  export let data: any;

</script>

<div class="box has-background-link-dark pt-5 pb-5">
  <div class="columns is-mobile">
    <div class="column is-half">
      <div class="card">
        <div class="columns is-mobile is-centered">
          <div class="column is-narrow">
            <div class= "box has-background-link-dark pb-2">
              <h4 class="text has-text-centered has-text-white">Spots by Category</h4>
            </div>
          </div>
        </div>
        <CategoryChart data={data}/>
      </div>
    </div>
    <div class="column is-half">
      <div class="card">
        <div class="columns is-mobile is-centered">
          <div class="column is-narrow">
            <div class= "box has-background-link-dark pb-2">
              <h4 class="text has-text-centered has-text-white">Spots by User</h4>
            </div>
          </div>
        </div>
        <UserChart data={data}/>
      </div>
    </div>
  </div>
</div>
<Card>
  <SpotList spots={data.spots}/>
</Card>
