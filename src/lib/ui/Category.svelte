<script lang="ts">
    const categoryList = [
        "Site",
        "Locale",
        "Activity",
        "Scenery",
        "Structure",
        "Shopping",
        "Uncategorised",
    ];
    export let selectedCategory = "Uncategorised";
  </script>
  
  <div class="control">
    <div class="select">
        <select bind:value={selectedCategory}>
            {#each categoryList as category}
              <option>{category}</option>
            {/each}
          </select>
    </div>
  </div>

  <!-- <div class="field is-narrow">
    <input bind:value={latitude} class="input is-danger is-rounded" type="number" min="-90" max="90" step="0.00001" placeholder="Latitude" name="latitude" required/>
  </div>
  <div class="field is-narrow">
    <input bind:value={longitude} class="input is-danger is-rounded" type="number" min="-180" max="180" step="0.00001" placeholder="Longitude" name="longitude" required/>
  </div> -->