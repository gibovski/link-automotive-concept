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

- The triangle logo, classic Mini photograph, and Link Performance Engineering artwork come from the [legacy Link Automotive website](https://www.linkautomotive.com.au/).
- The hero image is an AI-generated illustration of a Mini in a fictional garage.
- Barlow Condensed is bundled under the [SIL Open Font License](site/assets/OFL-Barlow-Condensed.txt).
