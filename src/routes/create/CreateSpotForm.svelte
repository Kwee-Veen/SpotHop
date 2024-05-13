<script lang="ts">
  import Category from "$lib/ui/Category.svelte";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import { spotService } from "$lib/services/spot-service";
  import { get } from "svelte/store";
  import { currentSession, latestSpot } from "$lib/stores";

  let name = "";
  let selectedCategory = "Uncategorised";
  let latitude = 0;
  let longitude = 0;
  let description = "";
  let message = "Type in your new Spot's details above before hitting the red button";

  async function create() {
    if (name) {
      let spot = {
        name: name,
        category: selectedCategory,
        latitude: latitude,
        longitude: longitude,
        description: description,
        userid: $currentSession._id,
      };
      const success = await spotService.createSpot(spot, get(currentSession));
      if (!success) {
        message = "Spot not created - some error occurred";
        return;
      }
      else {
        latestSpot.set(spot);
        message = "Spot created! Scroll to the bottom of the page to see it";
        return
      }
    } else {
      message = "Please specify your new spot's details";
    }
  }
</script>

<div class="box has-background-white">
  <form on:submit|preventDefault={create}>
    <div class="field is-grouped-horizontal">
      <div class="field-body">
        <div class="field is-narrow">
          <input bind:value={name} class="input is-success" placeholder="Spot name" type="text" name="name" required/>
        </div>
        <Category bind:selectedCategory />
        <div class="field is-narrow"></div>
        <Coordinates bind:latitude bind:longitude />
      </div>
    </div>  
    <div class="field">
      <input bind:value={description} class="input is-success" type="text" placeholder="Enter description" name="description"/>
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


<!-- <script>
  // import type { User, Spot } from "$lib/types/spot-types";
  // export let spots: Spot[] = [];
  // // This may be unnecessary here; make a new folder for accounts, put this in there instead,
  // // as will need to see the userList in that (if the current user is an admin, else only see current user)
  // export let userList: User[] = [];

</script> -->

<!-- Shows the current list of users. Will be useful in the account modification section -->
<!-- <section class="content box">
  <h1 class="text has-text-centered has-text-success-light">Users</h1>
  {#each userList as user}
  <div class="box has-background-success-light">
    <div class="columns is-centered">
      <div class="column is-9">
        <div class="box">
          <table>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>User ID</th>
            </tr>
            <tr>
              <td>
                {user.firstName}
              </td>
              <td>
                {user.lastName}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                {user._id}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
  {/each}
</section> -->
