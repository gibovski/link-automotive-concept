# Link Automotive | private website concept

A dependency-free, mobile-first static site. Open `site/index.html` directly, or from the project root run:

```sh
python3 -m http.server 8382 --bind 127.0.0.1 --directory site
```

Visit http://127.0.0.1:8382/. The page, font and images work offline. Phone and directions links open the device’s dialler and Google Maps. The enquiry path uses the workshop’s published phone number.

## Build and private hosting

The `site/` directory is the build output. No package install or compilation is required. To share a private preview, serve that directory as the document root on a static host with access control. The robots directives signal that the preview should stay out of search results. Access control provides privacy. If a public launch is approved after verification, update those directives and set the canonical and social URLs to the final domain. The prototype includes a descriptive page title and meta description, local wording and semantic headings.

## Facts and assets to check with Link

- **Address:** the prototype and map link use **1 Walter Street, Moorabbin VIC 3189, Australia** as requested. The [Victorian Mini Club](https://www.mini.org.au/supporters) lists **1a Walter Street**. Confirm the street number and visitor entrance before publication. The legacy site still lists Mitcham.
- **Phone and services:** **03 9873 3874** is listed by both the [original site](https://www.linkautomotive.com.au/) and the club. Confirm service scope and the preferred enquiry channel before launch. Verify hours and any additional contact details separately.
- **Hero:** a labelled AI-generated concept image of a Mini in a fictional garage. Replace it with an owner-approved, high-resolution workshop or vehicle photo.
- **Gallery and brand:** the [triangle logo](https://www.linkautomotive.com.au/TriangleLogo.png), [Mini photo](https://www.linkautomotive.com.au/files/56.jpg) and [engineering artwork](https://www.linkautomotive.com.au/image6.jpg) were recovered from the legacy site. Confirm reuse permission and request higher-resolution originals. Confirm ownership or rights before using any [Facebook images](https://www.facebook.com/p/Link-Automotive-61583568842775/). Access and reuse rights could not be verified, so the concept uses no Facebook assets.
- **Font:** Barlow Condensed is bundled with its SIL Open Font License.

Browser evidence is under `docs/ui-review/concept/`. The screenshot review is a self-review and independent review remains pending.
