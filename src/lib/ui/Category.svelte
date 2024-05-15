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
      <select bind:value={selectedCategory} name="category">
          {#each categoryList as category}
            <option>{category}</option>
          {/each}
        </select>
  </div>
</div>