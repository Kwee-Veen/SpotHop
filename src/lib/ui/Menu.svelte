<script lang="ts">
    import { currentSession } from "$lib/stores";
  </script>
  
  <nav class="navbar is-full-width">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/dashboard">
          <span class="icon"> <i class="fas fa-map-marker-alt"></i></span><span class="icon mr-1"> 
            <i class="far fa-money-bill-alt"></i></span><span><strong>Welcome [{$currentSession.name}]</strong>
            </span>
        </a>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item" href="/report"> See Spots</a>
          <a class="navbar-item" href="/create"> Create New Spot</a>
          <a class="navbar-item" href="/logout"> Logout [{$currentSession.name}]</a>
        </div>
        <div></div>
      </div>
    </div>
  </nav>
  