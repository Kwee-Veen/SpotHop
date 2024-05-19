<script lang="ts">
  import LoginForm from "./LoginForm.svelte";
</script>

<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="column is-4 is-offset-4">
        <h3 class="title has-text-black has-text-centered">Login to SpotHop</h3>
        <div class="box">
          <LoginForm />
          <br>
          <p class="has-text-centered">Don't have an account? <a href="/signup" data-cy="login-redirect">Create One Here</a></p>
        </div>
      </div>
      
    </div>
  </div>
</section>
