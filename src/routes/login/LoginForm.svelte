<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentSession } from "$lib/stores";
  import { spotService } from "$lib/services/spot-service";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = "";
  let password = "";
  let message = "";

  async function login() {
    console.log(`attemting to log in email: ${email} with password: ${password}`);
    let session = await spotService.login(email, password);
    if (session) {
      currentSession.set(session);
      goto("/create");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>
  
  {#if message}
    <Message {message} />
  {/if}
  <form on:submit|preventDefault={login}>
    <UserCredentials bind:email bind:password />
    <button class="button is-success is-fullwidth">Log In</button>
  </form>
  