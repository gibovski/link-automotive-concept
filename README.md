# Link Automotive | Unofficial website concept

An unsolicited, independent website prototype with no affiliation with or endorsement by Link Automotive.

Live demo: https://gibovski.github.io/link-automotive-concept/

The static site uses the workshop address **1 Walter Street, Moorabbin VIC 3189, Australia**. The demo links to the workshop's published phone number and to Google Maps directions.

## Preview locally

```sh
python3 -m http.server 8382 --bind 127.0.0.1 --directory site
```

Open http://127.0.0.1:8382/. The site uses bundled images and fonts and requires no build. GitHub Pages deploys the `site/` directory from `main` through GitHub Actions.

## Asset credits

- [Original Link Performance Engineering artwork](https://www.linkautomotive.com.au/image6.jpg) is bundled byte-for-byte as `link-engineering.jpg`. The responsive mark, watermark and 180 × 180 icon use a cleaned crop from this larger artwork, cross-checked against [the original triangle logo](https://www.linkautomotive.com.au/TriangleLogo.png). The crop preserves the original lettering, tilted car drawing and drafting lines.
- The [Link Automotive Facebook page](https://www.facebook.com/p/Link-Automotive-61583568842775/) publicly displayed the four-person red Mini caricature as its profile image. The copy used here is bundled as `link-workshop-team.jpg`. The requested engine, workshop sign, red engine bay and twin SU photos are pending transfer.
- Barlow Condensed is bundled under the [SIL Open Font License](site/assets/OFL-Barlow-Condensed.txt).

## Install the four workshop photographs

The user-uploaded photos were unavailable in this workspace. Each path below contains a 1 × 1 WebP marker. Replace it with the corresponding real photo, keeping the filename and WebP format. The page reveals the photo automatically and keeps the topic panel or triangle if the file cannot load.

| User photograph | Exact path from repository root | Recommended export |
| --- | --- | --- |
| Freshly restored sage-green Austin engine on a stand in the busy workshop | `site/assets/austin-engine-on-stand.webp` | 1280 × 720 px |
| Green LINK AUTOMOTIVE shop sign | `site/assets/link-automotive-shop-sign.webp` | 1500 × 500 px canvas, preserve the full sign |
| Red Mini engine bay | `site/assets/red-mini-engine-bay.webp` | 1280 × 720 px |
| Twin SU carburettor assembly | `site/assets/twin-su-carburettors.webp` | 1280 × 720 px |

Use the largest original available and avoid upscaling. Centre the main subject in project photos so it survives the 16:9 crop. Preview locally, then commit and push the four replacements to `main` to redeploy.

The hero uses a separate editorial image of a museum exhibit. [BMC cutaway engine at Birmingham Museums Collection Centre](https://commons.wikimedia.org/wiki/File:BMC_cutaway_engine_at_Birmingham_Museum_Collection_May_2015_(3).jpg) by Victuallers, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The bundled copy is resized to 1500 × 1110 and the layout crops it slightly.
