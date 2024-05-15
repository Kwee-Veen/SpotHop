<script lang="ts">
  import Category from "$lib/ui/Category.svelte";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import { enhance } from "$app/forms";

  let selectedCategory = "Uncategorised";
  let latitude = 0;
  let longitude = 0;
  let message = "Type in your new Spot's details above before hitting the red button";
</script>

<div class="box has-background-white" style="height: 43vh">
  <form method="POST" action="?/create" use:enhance>
    <div class="field is-grouped-horizontal">
      <div class="field-body">
        <div class="field is-narrow">
          <input class="input is-success" id="name" placeholder="Spot name" type="text" name="name" required/>
        </div>
        <Category bind:selectedCategory />
        <div class="field is-narrow"></div>
        <Coordinates bind:latitude bind:longitude />
      </div>
    </div>  
    <div class="field">
      <input id="description" class="input is-success" type="text" placeholder="Enter description" name="description"/>
    </div>
    <br>
    <div class="text has-text-centered">
      <button class="button is-danger is-rounded has-text-weight-bold is-size-5">Create Spot</button>
    </div>
    <br>
    <div class="columns is-mobile is-centered">
      <div class= "column is-narrow">
        <div class="box has-background-warning-light">
          <div class="content has-text-centered is-italic">
            {message}
          </div>
        </div>
      </div>
    </div>
  </form>
</div>