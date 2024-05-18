<script lang="ts">
    import UserCredentials from "$lib/ui/UserCredentials.svelte";
    import UserDetails from "$lib/ui/UserDetails.svelte";
    import { enhance } from "$app/forms";
  
    let firstName = "";
    let lastName = "";
    let email = "";
    let password = "";
  
  </script>
  
  <form method="POST" action="?/signup" use:enhance>
    <UserDetails bind:firstName bind:lastName />
    <UserCredentials bind:email bind:password />
    <button class="button is-success is-fullwidth">Create Account</button>
    <br />
  </form>

  