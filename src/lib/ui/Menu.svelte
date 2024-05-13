<script lang="ts">
    import { currentSession } from "$lib/stores";
  </script>
  
  <nav class="navbar is-full-width">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/create">
          <span class="icon"> <i class="fas fa-map-marker-alt"></i></span>
          <span><strong>Welcome {$currentSession.name}</strong>
            </span>
        </a>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item" href="/create"> Create Spot</a>
          <a class="navbar-item" href="/report"> View Reports</a>
          <a class="navbar-item" href="/maps"> Maps </a>
          <a class="navbar-item" href="/logout"> Logout {$currentSession.name}</a>
        </div>
        <div></div>
      </div>
    </div>
  </nav>
  