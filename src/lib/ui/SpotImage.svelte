<!-- <script lang="ts">
  import type { Spot } from "$lib/types/spot-types";
  export let spot: Spot;

  let files: any;
  // const fileInput = document.querySelector(".file-input");
  // if (fileInput !== null) {
  //   fileInput.onchange = () => {
  //     if (fileInput.files.length > 0) {
  //       const fileName = document.querySelector(".file-name");
  //       if (fileName) fileName.textContent = fileInput.files[0].name;
  //     }
  //   };
  // }
    
  $: if (files) {
    const fileText = files[0].text();
    if (files.length > 0) {
        const fileName = document.querySelector(".file-name");
        if (fileName) fileName.textContent = files[0].name;
      }
    };


</script>

<form
  action="/spot/{spot._id}/uploadimage"
  method="POST"
  enctype="multipart/form-data"
>
  <div id="file-select" class="file has-name is-fullwidth">
    <label class="file-label">
      <input class="file-input" name="imagefile" type="file" accept="image/png, image/jpeg" bind:files/>
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
</form>

<form action="/spot/uploadimage" method="POST" enctype="multipart/form-data">
  <div id="file-select" class="file has-name is-fullwidth">
    <label class="file-label">
      <input
        class="file-input"
        name="imagefile"
        type="file"
        accept="image/png, image/jpeg"
      />
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
