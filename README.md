<h1>SpotHop</h1>

![SH-2](https://github.com/Kwee-Veen/SpotHop-v2-svelte/assets/118535981/eb96b937-c128-44d6-9967-9526a911e227)
<hr>


SpotHop is a placemark-focused application, allowing creation and management of user-generated 'Spots'. <br>
Users can sign up and log in, create and manage their own spots, and view those of other users. <br>
Spots can include a name and description, a category, and lat/long coordinates. <br>
Multiple images can also be uploaded (and deleted) for spots. 
<hr>

![SH-1](https://github.com/Kwee-Veen/SpotHop-v2-svelte/assets/118535981/2aa057ef-b1aa-41b3-8ec7-0f30c7fc638b)
<hr>
5-day temperature forecasts and analytics are generated for all saved spots, including dynamic graph breakdowns of spots by user or category.<br>
Spots are automatically mapped, and maps can be filtered by category. Maps also feature weather overlays for temp, wind, pressure, snow etc. <br>
<hr>

![SH-3](https://github.com/Kwee-Veen/SpotHop-v2-svelte/assets/118535981/788fd013-f26d-4039-b2ee-e7c8dbcf03b5)
<hr>

SpotHop is hosted on Vercel: _https://spot-hop-v2-svelte.vercel.app_ <br>

Spothop is secured using cookies, I/O validation & sanitization, and password hashing & salting.<br>
SpotHop's database is MongoDB, cloud-hosted on Cloud Atlas, with image hosting provided by Cloudinary.

<hr>

The following environmental variables must be specified in order to reproduce this web app: <br>
    _COOKIE_NAME (String)_ <br>
    _COOKIE_PASSWORD (String)_ <br>
    _db (String - Cloud Atlas MongoDB server connection string)_ <br>
    _cloudinary_name (String - Cloudinary credentials)_ <br>
    _cloudinary_key (String - Cloudinary credentials)_ <br>
    _cloudinary_secret (String - Cloudinary credentials)_ <br>
     _cloudinary_preset (String - Cloudinary credentials)_ <br>
    
<hr>
