<script lang="ts">
    export let latitude = 0.0;
    export let longitude = 0.0;
  </script>
  
  <div class="field is-narrow">
    <input bind:value={latitude} class="input is-danger is-rounded" type="number" min="-90" max="90" step="0.00001" placeholder="Latitude" name="latitude" required/>
  </div>
  <div class="field is-narrow">
    <input bind:value={longitude} class="input is-danger is-rounded" type="number" min="-180" max="180" step="0.00001" placeholder="Longitude" name="longitude" required/>
  </div>