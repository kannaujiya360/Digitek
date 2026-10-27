# DigiTek storefront

React + Vite + Tailwind CSS v4. Frontend only.

## Run

```bash
npm install
npm run dev
```

Open the Local URL printed by Vite. Production build: `npm run build`. Preview it with `npm run preview`.

## Replace product images and details

Place your photographs inside `public/images/`, for example `public/images/hp-desktop.jpg`.
In `src/main.jsx`, edit the `products` array and set `image: '/images/hp-desktop.jpg'`.
Update each product's name, category, specifications, price, original price and badge in the same array. The catalogue uses supplied local photographs and researched matching product photographs in `public/images/`. Product names follow visible branding; confirm exact models and specifications before publishing. The catalogue prices and ratings are demonstration values.

The large homepage picture is in the `hero-visual` section of `src/main.jsx`. Replace its image `src` with your own local image. The brand mark is a lightweight CSS recreation inspired by your reference; the original reference image is not required at runtime.

## Features

Responsive catalogue; live search; category filters; price sorting; product details modal; wishlist; quantity controls and shopping bag. Bag and wishlist persist in this browser using localStorage. Telephone, email and directions links use the supplied business-card information.

There is no backend, payment processing or order submission. The bag offers a phone enquiry and makes this clear. Confirm all business details, product photos, pricing and warranty terms before publishing.

## Original shop stock list (26 October 2026)

All 79 supplied entries are recorded in `src/data/shop-products.csv` and included in `src/data/products.json`:

- Screenshot 1: 14 Dell variants + 3 Acer laptops = 17.
- Screenshot 2: 20 HP + 17 ASUS laptops + 1 ASUS all-in-one = 38.
- Screenshot 3: 13 monitors, networking, audio, printing and accessory items.
- Screenshot 4: 11 entries, including the separate HP USB mouse, HP wireless mouse and HP USB keyboard indicated by “Same hp”. Repeated quoted messages are references, not additional products.

Existing 22 products are retained with `listed: false`, marked Enquire, and their indicative prices remain separate from the supplied stock prices. The 79 new products have `listed: true` and a unique `source` reference. No discounts or customer ratings are invented for the shop list.

### Adding exact product photos

Edit the matching entry's `image` in `src/data/products.json`, or put the photograph at its existing `/images/products/...jpg` path inside `public/`. Each entry has its own predictable filename so variant photographs can be managed independently. Until the photo exists, a category icon and “Product photo coming soon” appear in cards, product details and the bag. Existing pictures are not assigned to new models unless their exact identity is established.

### Transcription notes to confirm

The first sheet's opening brand heading is cropped. Its 14 model rows are grouped as Dell based on the visible 3530/Vostro model naming. Model strings and listed variant prices are preserved, including 5540/15250 and the ₹69,900 3530 Silver variant. Slash-separated model alternatives are kept together as listed.

Some supplier labels appear inconsistent. They are retained in product details for showroom confirmation rather than silently replaced: HP “Intel RYZEN 3/5”, HP 15-FC533AY DDR5, HP 15-fa2903TX i7-1362H, ASUS X1504VAP-IN005WS paired with Ryzen, and the ASUS “Ryzen 5 40/150” and “Ryzen 7 170/7445HS” labels. Missing warranty, operating system, display and colour values are explicitly “Not specified”. HP FD186TU, Epson 3250, HP 925/985/126a/126nw and “To link router” follow the supplied text; TP-Link is the interpreted brand for the last item.

Promotional statements in the supplied sheets (finance, complimentary accessories) have not been treated as instructions or automatically added as store-wide promises. Prices and current stock should be confirmed by the showroom.

## Homepage banner slider

The old text-and-laptop hero is replaced by the supplied full-width DigiTek India artwork. Banner configuration lives in `src/data/banners.json`; images live in `public/images/banners/`. Add the second image as another object with a unique `id`, `image`, descriptive `alt`, `width` and `height`. With two or more banners, the slideshow changes automatically every five seconds using a continuous left-to-right transition. Indicators show the current slide; clicking the artwork or indicators does not advance it. A Play/Pause control is provided. Autoplay pauses in hidden browser tabs and starts paused when the visitor requests reduced motion. With one image, no slideshow controls appear. Images retain their full proportions on mobile without cropping.


## Researched product photos

42 of the 79 shop-list entries now have researched local photographs (36 unique images; RAM/OS variants and two matching chassis/colour references share assets). The other 37 entries retain placeholders because their model/colour is ambiguous, no exact image was verified, or the matching source was unavailable. The original 22 photographed catalogue entries remain intact.

- `src/data/image-sources.json`: source page, original image URL, assigned product IDs, matching notes, pixel dimensions and SHA-256 checksum. Photos were visually reviewed before assignment.
- `src/data/photos-needed.csv`: remaining product IDs, names, colours and expected local photo paths.
- `scripts/fetch-product-images.py`: downloads only the explicitly researched sources. Unavailable sources are skipped unless deliberately reset to pending.
- `scripts/apply-product-images.py`: applies verified images without changing product names, prices or specifications and refreshes the missing-photo list.

ASUS X1504VA-BQ321WS and X1605VA-MB1627WS use a confirmed photograph of the same base model in silver from another internal configuration. The Dell 5440 Ice Blue and Inspiron 3530 Carbon Black sources also have different internal configurations. Product details show a brief reference-image note where relevant. Model ambiguities in the original supplier list have not been silently rewritten. Epson “3250” uses the manufacturer-listed L3250 photograph; HP “126a/126nw” use M126a/M126nw model photographs.

## User-supplied photos and brand strip (27 October 2026)

Nine supplied photographs are saved in `public/images/products/supplied/` and mapped to 13 product variants through `src/data/user-image-overrides.json`. These overrides take priority over researched images when the image-application script runs. Photo text is not used to overwrite prices or specifications. Notes identify the supplied Dell 5440, Silver Core 3 15250 and Silver 3535/15255 references where pictured specifications or finish differ.

The pending brand row update is implemented in `src/BrandStrip.jsx`: eight local SVG logos, brand colour accents, a continuous right-to-left loop and a pause control. Reduced-motion preferences show a stationary, horizontally scrollable strip. Logo source links are recorded in `src/data/brands.json` (Simple Icons and the Canon/Brother Wikimedia Commons file pages).

## Green special-price styling

Product cards and detail panels show a green “Special price” label without changing selling prices. To show an actual percentage discount, add a verified numeric `mrp` greater than `price` to the relevant record in `src/data/products.json`. Only then will the UI show a struck-through MRP and calculated saving. No higher prices or percentages are invented. Products without a price show “Request a quote”.
