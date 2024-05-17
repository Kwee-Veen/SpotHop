<script lang="ts">
  import { subTitle } from "$lib/stores";
  import { onMount } from "svelte";
  subTitle.set("Edit Spot Images");

  export let widget: any;
  export let imageFiles: any;
  let returnedURL: string;

  onMount(() => {
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
            imageFiles.elements.returnedURL.value = result.info.secure_url as string;
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

<button on:click|preventDefault={openWidget} class="button is-danger">Upload</button>

<form bind:this={imageFiles} method="POST" action="?/uploadImage">
  <input bind:value={returnedURL} type="hidden" placeholder="Image URL" name="returnedURL"/>
</form>



<!-- <form action="?/uploadImage" method="POST" enctype="multipart/form-data" use:enhance >
  <input type="hidden" name="idSpotImage" value={data.spot._id} />
  <div id="file-select" class="file has-name is-fullwidth">
    <label class="file-label">
      <input class="file-input" name="imagefile" type="file" accept="image/png, image/jpeg" bind:files />
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label"> Select Image File </span>
      </span>
      <span class="file-name"></span>
    </label>
    <button type="submit" class="button is-link">Upload</button>
  </div>
</form> -->
