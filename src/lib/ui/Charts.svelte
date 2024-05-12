<script lang="ts">
    
    import CategoryChart from "./CategoryChart.svelte";
    import UserChart from "./UserChart.svelte";
    
  </script>

<br>
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
        <CategoryChart/>
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
        <UserChart/>
      </div>
    </div>
  </div>