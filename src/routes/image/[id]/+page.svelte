<script lang="ts">
  import { enhance } from "$app/forms";
  import { subTitle } from "$lib/stores";
  import { onMount } from "svelte";
  import ForecastChart from "$lib/ui/ForecastChart.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  subTitle.set("Weather & Images");

  export let widget: any;
  export let imageFiles: any;
  export let data: any;
  let spot = data.spot;
  let returnedURL: string;
  let map: LeafletMap;

  onMount(async () => {
    const leaflet = await import("leaflet");
    if (spot) {
      const popup = `Spot "${spot.name}" (${spot.latitude} ${spot.longitude}), category: ${spot.category}`;
      map.addMarker(spot.latitude, spot.longitude, popup);
      map.moveTo(spot.latitude, spot.longitude);
    }

    if ("cloudinary" in window) {
      // @ts-ignore
      widget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dx2zbn7jb",
          uploadPreset: "cvcdhrcq",
        },
        (error: any, result: any) => {
          console.log(result);
          if (result.event === "success") {
            returnedURL = result.info.secure_url as string;
            imageFiles.elements.returnedURL.value = result.info
              .secure_url as string;
            imageFiles.submit();
          }
        },
      );
    }
  });

  function openWidget() {
    if (widget) {
      widget.open();
    }
  }
</script>

<div class="box has-background-warning">
  <div class="columns has-background-white is-vcentered">
    <div class="column is-half">
      <ForecastChart {data} />
    </div>
    <div class="column is-half">
      <LeafletMap
        height={44}
        zoom={7}
        activeLayer="Transportation"
        bind:this={map}
        {data}
      />
    </div>
    
  </div>
</div>

<form bind:this={imageFiles} method="POST" action="?/uploadImage">
  <input
    bind:value={returnedURL}
    type="hidden"
    placeholder="Image URL"
    name="returnedURL"
  />
</form>
<section class="content box has-background-link-light">
  <div class="columns is-centered mt-2 mb-4">
    <box class="box">
      <button
        on:click|preventDefault={openWidget}
        class="button is-danger is-medium has-text-weight-bold"
        >Upload New Image</button
      >
    </box>
  </div>
  <div class="columns is-centered">
    <div class="column is-10">
      {#if spot.img}
        <div class="columns is-multiline is-mobile">
          {#each spot.img as image}
            <div class="column is-6">
              <div class="box p-2">
                <img src={image} class="image" alt="uploaded spot" />
                <div class="column is-narrow has-text-centered">
                  <b>Delete</b>
                  <form method="POST" action="?/deleteImage" use:enhance>
                    <input type="hidden" name="deleteImageId" value={image} />
                    <div class="text has-text-centered">
                      <button class="button">
                        <span class="icon is-small">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="#FF0000"
                              d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
