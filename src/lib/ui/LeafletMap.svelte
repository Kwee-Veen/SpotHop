<script lang="ts">
    import "leaflet/dist/leaflet.css";
    import { onMount } from "svelte";
    import type { Control, Map as LeafletMap } from "leaflet";
    import L from "leaflet";
    import type { Spot } from "$lib/types/spot-types";
    import { browser } from "$app/environment";
  
    export let id = "home-map-id";
    export let height = 80;
    export let location = { lat: 53.2734, lng: -7.7783203 };
    export let zoom = 4;
    export let minZoom = 3;
    export let activeLayer = "Terrain";
  
    let imap: LeafletMap;
    let control: Control.Layers;
    let overlays: Control.LayersObject = {};
    let baseLayers: any;
    let spots: Spot[] = [];
    let All_Spots = L.layerGroup([]);
    let Sites = L.layerGroup([]);
    let Locales = L.layerGroup([]);
    let Activities = L.layerGroup([]);
    let Scenery = L.layerGroup([]);
    let Structures = L.layerGroup([]);
    let Shopping = L.layerGroup([]);
    let Uncategorised = L.layerGroup([]);

    export let data: any;

    export function addMarker(lat: number, lng: number, popupText: string) {
      const marker = L.marker([lat, lng]).addTo(imap);
      const popup = L.popup({ autoClose: false, closeOnClick: false });
      popup.setContent(popupText);
      marker.bindPopup(popup);
    }

    export function moveTo(lat: number, lng: number) {
      imap.flyTo({ lat: lat, lng: lng });
    }
    
    onMount(async () => {
      if (browser) {
        spots = data.spots;
        spots.forEach((spot: Spot) => {
            const popup = `Spot "${spot.name}" (${spot.latitude} ${spot.longitude}), category: ${spot.category}`;
            const newMark = L.marker([spot.latitude, spot.longitude]).bindPopup(popup);
            newMark.addTo(All_Spots);
            if (spot.category == "Site") newMark.addTo(Sites);
            if (spot.category == "Locale") newMark.addTo(Locales);
            if (spot.category == "Activity") newMark.addTo(Activities);
            if (spot.category == "Scenery") newMark.addTo(Scenery);
            if (spot.category == "Structure") newMark.addTo(Structures);
            if (spot.category == "Shopping") newMark.addTo(Shopping);
            if (spot.category == "Uncategorised") newMark.addTo(Uncategorised);
        });

        const leaflet = await import("leaflet");
        baseLayers = {
          Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          }),
          Transportation: leaflet.tileLayer("https://tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}", {
            attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            accessToken: 'kuYRHbThoHMWdZbQx3B0ZgqX850GZnVZFf63DAKiU5SnMJa3s3LrdoINWmD2iEP9'
          }),
        };
        overlays = {
          All_Spots,
          Sites,
          Locales,
          Activities,
          Scenery,
          Structures,
          Shopping,
          Uncategorised,
          "Show Temperature": leaflet.tileLayer(`https://{s}.tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=0c109ad6bb8a0b5d8a284ce6061f12c6`, {
            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
          }), 
          "Show Clouds": leaflet.tileLayer(`https://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=0c109ad6bb8a0b5d8a284ce6061f12c6`, {
            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
          }), 
          "Show Pressure": leaflet.tileLayer(`https://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png?appid=0c109ad6bb8a0b5d8a284ce6061f12c6`, {
            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
          }), 
          "Show Wind": leaflet.tileLayer(`https://{s}.tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=0c109ad6bb8a0b5d8a284ce6061f12c6`, {
            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
          }), 
          "Show Snow": leaflet.tileLayer(`https://{s}.tile.openweathermap.org/map/snow/{z}/{x}/{y}.png?appid=0c109ad6bb8a0b5d8a284ce6061f12c6`, {
            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
          }), 

        };

        let defaultLayer = baseLayers[activeLayer];
        imap = leaflet.map(id, {
          center: [location.lat, location.lng],
          zoom: zoom,
          minZoom: minZoom,
          layers: [defaultLayer]
        });

        control = leaflet.control.layers(baseLayers, overlays).addTo(imap);
      }
    });

  </script>
  
  <div {id} class="box" style="height: {height}vh" />
  