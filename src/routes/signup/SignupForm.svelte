<script lang="ts">
    import UserCredentials from "$lib/ui/UserCredentials.svelte";
    import UserDetails from "$lib/ui/UserDetails.svelte";
    import Message from "$lib/ui/Message.svelte";
    import { spotService } from "$lib/services/spot-service";
    import type { User } from "$lib/types/spot-types";
    import { goto } from "$app/navigation";
  
    let firstName = "";
    let lastName = "";
    let email = "";
    let password = "";
    let message = "";
  
    async function signup() {
      let user: User = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        admin: false,
      };
      const success = await spotService.signup(user);
      if (!success) {
        message = "New user not created - some error occurred";
        return;
      }
      else {
        goto('/login');
        return;
      }
    }
  </script>
  
  {#if message}
    <Message {message} />
  {/if}
  <form on:submit|preventDefault={signup}>
    <UserDetails bind:firstName bind:lastName />
    <UserCredentials bind:email bind:password />
    <button class="button is-success is-fullwidth">Create Account</button>
    <br />
  </form>
  