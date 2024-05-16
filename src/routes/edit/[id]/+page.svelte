<script lang="ts">
  import { enhance } from "$app/forms";
  import { subTitle } from "$lib/stores";

  subTitle.set("Edit Spot");
  export let data: any;
</script>

<div class="columns is-centered">
  <div class="column is-6">
    <section class="content box">
      <div class="box has-background-info-light">
        <h3 class="text has-text-centered">Original Spot Details:</h3>
        <div class="box">
          <table>
            <tr>
              <th>Name</th>
              <th>&nbsp; Category &nbsp;</th>
              <th>&nbsp; Coordinates</th>
            </tr>
            <tr>
              <td>
                {data.spot.name}
              </td>
              <td>
                &nbsp; {data.spot.category} &nbsp;
              </td>
              <td>
                &nbsp; {data.spot.latitude}, {data.spot.longitude}
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td>
                <b>Description:</b>
                {data.spot.description}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </section>
  </div>
  <div class="column is-6">
    <section class="content box">
      <div class="box has-background-danger-light">
        <h3 class="text has-text-centered">New Spot Details:</h3>
        <div class="box">
          <form method="POST" action="?/edit" use:enhance>
            <input type="hidden" name="editSpotId" value={data.spot._id} />
            <div class="field is-grouped-horizontal">
              <div class="field-body">
                <div class="field is-narrow">
                  <input
                    class="input is-success"
                    type="text"
                    placeholder="Enter name"
                    name="name"
                  />
                </div>
                <div class="control">
                  <div class="select">
                    <select
                      class="input is-link is-rounded"
                      name="category"
                      placeholder="Choose Category"
                    >
                      <option value="">Choose Category</option>
                      <option value="Site">Site</option>
                      <option value="Locale">Locale</option>
                      <option value="Activity">Activity</option>
                      <option value="Scenery">Scenery</option>
                      <option value="Structure">Structure</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Uncategorised">Uncategorised</option>
                    </select>
                  </div>
                </div>
                <div class="field is-narrow"></div>
                <div class="field is-narrow">
                  <input
                    class="input is-warning is-rounded"
                    type="number"
                    min="-90"
                    max="90"
                    step="0.00001"
                    placeholder="Latitude"
                    name="latitude"
                  />
                </div>
                <div class="field is-narrow">
                  <input
                    class="input is-warning is-rounded"
                    type="number"
                    min="-180"
                    max="180"
                    step="0.00001"
                    placeholder="Longitude"
                    name="longitude"
                  />
                </div>
              </div>
            </div>
            <div class="field">
              <input
                class="input is-success"
                type="text"
                placeholder="Enter description"
                name="description"
              />
            </div>
            <div class="text has-text-centered">
              <button class="button is-warning">Edit Spot</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</div>
