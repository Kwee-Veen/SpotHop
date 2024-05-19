import { spotService } from "$lib/services/spot-service";
import type { Spot } from "$lib/types/spot-types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { spotStore } from "$lib/models/mongo/spot-store.js";
import { cloudinary_name } from "$env/static/private";
import { cloudinary_preset } from "$env/static/private";
import { cloudinary_key } from "$env/static/private";
import { cloudinary_secret } from "$env/static/private";
import { v2 as cloudinary } from "cloudinary";


export const ssr = false;
let id: string;
let spot: Spot | null;
let index: number;

const credentials = {
  cloud_name: cloudinary_name,
  api_key: cloudinary_key,
  api_secret: cloudinary_secret,
};
cloudinary.config(credentials);

let weatherTrends: any;

export const load: PageServerLoad = async ({ cookies, params }) => {
  const cookieStr = cookies.get("spot-user") as string;
  if (cookieStr) {
    id = encodeURI(params.id);
    spot = await spotService.getSpotById(id);

    let data: any;

    if (spot) {
      const lat = spot.latitude;
      const long = spot.longitude;
      const apiKey = "0c109ad6bb8a0b5d8a284ce6061f12c6";
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=` + lat + `&lon=` + long + `&appid=` + apiKey;
      const search = await fetch(url);
      data = await search.json();
      let trends: any = {
        tempTrend: [],
        trendLabels: [],
      };
      let j = 0;
      for (let i = 0; i < data.list.length; i += 1) {
        let tempTrend = ((data.list[i].main.temp) - 273.15).toFixed(1);
        if (tempTrend) trends.tempTrend.push(tempTrend);
        const date = data.list[i].dt_txt;
        trends.trendLabels.push(`${date}`);
        j++;
      }
      weatherTrends = trends;
    }

    return {
      spot: spot,
      weatherTrends: weatherTrends,
      cloudinary_name: cloudinary_name,
      cloudinary_preset: cloudinary_preset,
      cloudinary_key: cloudinary_key,
      cloudinary_secret: cloudinary_secret,
    }
  }
};


export const actions = {
  uploadImage: async ({ request, cookies }) => {
    const cookieStr = cookies.get("spot-user") as string;
    if (cookieStr) {
      const form = await request.formData();
      const originalSpot = await spotStore.getSpotById(id);
      let newSpot: Spot;

      if (originalSpot) {
        newSpot = originalSpot;
        let imageURL = form.get('returnedURL') as string;
        if (imageURL && newSpot.img) newSpot.img.unshift(imageURL); else console.log("No image URL found");
        if (originalSpot && imageURL) spotService.editSpot(originalSpot, newSpot); else console.log("Spot not updated with the new image's URL");
      }
      redirect(301, "/report");
    }
  },

  deleteImage: async ({ request, cookies }) => {
    const cookieStr = cookies.get("spot-user") as string;
    if (cookieStr) {
      const form = await request.formData();
      const deleteImageURL = form.get('deleteImageId') as string;
      const deleteImageId = deleteImageURL.substring(62, 82);
      await cloudinary.uploader.destroy(deleteImageId as string).then(result => console.log("Result of deletion of image " + deleteImageId + " from Cloudinary: " + JSON.stringify(result)));

      let newSpot: Spot;
      if (spot) {
        newSpot = spot;
        if (newSpot.img) {
          index = newSpot.img.indexOf(deleteImageURL);
          newSpot.img.splice(index, 1);
          console.log("Deleted image " + deleteImageId + " from spot: " + newSpot.name);
        }
        else console.log("Image " + deleteImageId + " not deleted from spot: " + newSpot.name);

        spotService.editSpot(spot, newSpot);
      }
      redirect(301, "/report");
    }
  },
};