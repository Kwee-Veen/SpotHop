<script lang="ts">
  import("$lib/types/spot-types");
  import { enhance } from "$app/forms";
  /**
   * @type {any[]}
   */
  // @ts-ignore
  export let spots = [];
</script>

<div class="columns is-mobile is-centered">
  <div class="column is-narrow">
    <div class= "box has-background-link-dark pb-2 pr-6 pl-6">
      <h2 class="text has-text-centered has-text-white">Spot List</h2>
    </div>
  </div>
</div>
<section class="content box p-2 ">
  
  {#each spots as spot}
    <div class="box has-background-warning-light mb-3 pr-2 pl-2 pt-5">
      <div class="columns">
        <div class="column is-6">
          <div class="box has-background-white p-3">
          <div class="box has-background-info-light">
          <div class="box">
            <table>
              <tr>
                <th>Name</th>
                <th>&nbsp; Category &nbsp;</th>
                <th>&nbsp; Coordinates</th>
              </tr>
              <tr>
                <td>
                  {spot.name}
                </td>
                <td>
                  &nbsp; {spot.category} &nbsp;
                </td>
                <td>
                  &nbsp; {spot.latitude}, {spot.longitude}
                </td>
              </tr>
            </table>
            <table>
              <tr>
                <td>
                  <b>Description:</b>
                  {spot.description}
                </td>
              </tr>
            </table>
          </div>
          <div class="columns is-centered">
            
            <div class="column is-narrow">
              <div class="box">
                <b>Weather + Images</b>
                <form method="POST" action="?/image" use:enhance>
                  <input type="hidden" name="spotImageId" value={spot._id} />
                  <div class="text has-text-centered">
                    <button class="button">
                      <span class="icon is-small">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          ><path
                            fill="#2bdda8"
                            d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
                          /></svg
                        >
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="column is-narrow">
              <div class="box">
                <b class="text has-text-centered">Edit Details</b>
                <form method="POST" action="?/edit" use:enhance>
                  <input type="hidden" name="editSpotId" value={spot._id} />
                  <div class="text has-text-centered">
                    <button class="button">
                      <span class="icon is-small">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="#74C0FC"
                            d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="column is-narrow">
              <div class="box">
                <b>Delete Spot</b>
                <form method="POST" action="?/delete" use:enhance>
                  <input type="hidden" name="deleteSpotId" value={spot._id} />
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
        </div>
        </div>
        </div>
        {#if spot.img}
        <div class="columns is-multiline is-mobile">
          {#each spot.img as image}

            <div class="column is-6">
              <div class="box p-3">
                <img src={image} class="image " alt="uploaded spot"/>
              </div>
            </div>
          {/each}
        </div>
        {/if}
      </div>
    </div>
  {/each}
</section>

