<!-- <script lang="ts">
  import { onMount } from "svelte";

  let widget: any;
  export let returnedURL: string;

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
          if (!error && result && result.event === "success") {
            returnedURL = result.info.secure_url;
            // post ?/uploadimage
            // or when including uploadwidget partial, bind returnedURL to a value in the original, then when updated do something
          }
        },
      );
    }
  });

  function handleClick() {
    if (widget) {
      widget.open();
    }
  }
</script>

<button on:click|preventDefault={handleClick}>Upload</button> -->
