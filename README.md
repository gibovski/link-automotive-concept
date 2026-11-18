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

- [Original archive photograph](https://www.linkautomotive.com.au/files/56.jpg), a green classic Mini with a white roof, is bundled byte-for-byte as `classic-mini.jpg` and used in the hero and archive.
- [Original Link Performance Engineering artwork](https://www.linkautomotive.com.au/image6.jpg) is bundled byte-for-byte as `link-engineering.jpg`. The responsive mark, watermark and 180 × 180 icon use a cleaned crop from this larger artwork, cross-checked against [the original triangle logo](https://www.linkautomotive.com.au/TriangleLogo.png). The crop preserves the original lettering, tilted car drawing and drafting lines.
- The [Link Automotive Facebook page](https://www.facebook.com/p/Link-Automotive-61583568842775/) exposed an illustrated profile image during sourcing. Customer car photographs could not be verified from its public Photos route. Archive imagery can be replaced at the business’s request.
- Barlow Condensed is bundled under the [SIL Open Font License](site/assets/OFL-Barlow-Condensed.txt).
