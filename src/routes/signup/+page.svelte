<script lang="ts">
  import SignupForm from "./SignupForm.svelte";
</script>

<section class="hero is-fullheight is-default is-bold">
  <div class="hero-head"></div>
  <div class="hero-body">
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column is-5 is-offset-1">
          <h1 class="title has-text-centered">Signup to SpotHop</h1>
          <div class="box">
            <SignupForm></SignupForm>
            <p class="has-text-centered">Already have an account? <a href="/login" data-cy="login-redirect">Login Here</a></p>
          </div>
        </div>
        <div class="column is-4 is-offset-1">
          <figure class="image">
            <img class="object-fit" src="/spotHop_init2.jpg" alt="Spothop signup" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</section>

