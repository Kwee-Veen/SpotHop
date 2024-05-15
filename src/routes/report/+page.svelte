<script lang="ts">
  import { subTitle} from "$lib/stores";
  import Card from "$lib/ui/Card.svelte";
  import CategoryChart from "$lib/ui/CategoryChart.svelte";
  import UserChart from "$lib/ui/UserChart.svelte";
  import SpotList from "$lib/ui/SpotList.svelte";
  subTitle.set("Spot Report");
  export let data: any;

</script>

<Card>
  <div class="columns is-mobile">
    <div class="column is-half">
      <div class="card">
        <div class="columns is-mobile">
          <div class="column is-one-quarter"></div>
          <div class="column is-one-half">
            <div class= "box has-background-danger-dark">
              <h4 class="text has-text-centered has-text-white">Spots by Category</h4>
            </div>
          </div>
          <div class="column is-one-quarter"></div>
        </div>
        <CategoryChart data={data}/>
      </div>
    </div>
    <div class="column is-half">
      <div class="card">
        <div class="columns is-mobile">
          <div class="column is-one-quarter"></div>
          <div class="column is-one-half">
            <div class= "box has-background-link-dark">
              <h4 class="text has-text-centered has-text-white">Spots by User</h4>
            </div>
          </div>
          <div class="column is-one-quarter"></div>
        </div>
        <UserChart data={data}/>
      </div>
    </div>
  </div>
</Card>
<Card>
  <SpotList spots={data.spots}/>
</Card>
