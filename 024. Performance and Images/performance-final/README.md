# performance-final

Sample project for the **Performance and Images** notes. One page that shows image optimization and slow template computations at work, with the numbers on screen.

| Note | Where to see it |
|------|-----------------|
| 001 NgOptimizedImage basics | [`src/app/app.html`](src/app/app.html) sections 1 to 3: `ngSrc`, `width` / `height`, `priority`, `fill` |
| 002 Responsive images and loaders | `app.html` section 2 (`sizes`, `ngSrcset`, `placeholder`) and the custom `IMAGE_LOADER` in [`src/app/app.config.ts`](src/app/app.config.ts) |
| 003 Build budgets | `budgets` in the production configuration in [`angular.json`](angular.json) |
| 004 Slow computations in templates | `app.html` section 5 and [`src/app/heavy.ts`](src/app/heavy.ts): method call vs pure pipe vs `computed()` |

## Run it

```bash
npm install
npm start
```

## Things to try

- **Section 4 of the page** reads the `<img>` elements after render and lists what `NgOptimizedImage` generated. The `priority` image is `loading="eager"` with `fetchpriority="high"`. The others are `loading="lazy"`.
- **The blur placeholder:** on localhost images arrive instantly, so you never see it. Run `npm run slow-images` in a second terminal (a tiny server that waits 3 seconds before sending a full image), then open `http://localhost:4200/?slow`. Scroll to the second image. A blurred 32 pixel version shows first, then the sharp image replaces it. Without `?slow` the page behaves as before. Change the wait with `DELAY=6000 npm run slow-images`.
- **Section 5:** type in the box, then press "Refresh counts". The method call in the template runs again on every check of the component. The pure pipe and the `computed()` signal ran once, because their input never changed.
- **Budgets:** `npm run build` passes. Open `angular.json` and lower the production `initial` budget to `100kB`. The build now fails with an error. Put it back afterwards.
- **Loader:** the custom loader only adds `?w=<width>` to the URL, because there is no image service here, so the files themselves are not resized. With a real service, the `srcset` entries would be real smaller images. In `?slow` mode the slow image server plays the image service for one case: a request for 64 pixels or less returns the matching `*-tiny.jpg` file, which is what the placeholder asks for.

## Two errors we hit while building it

- `sizes` must use responsive values like `50vw`. A fixed pixel width in `sizes` throws error NG02952.
- `placeholder` needs an image loader. Without one it throws error NG02963. This is why the unit tests provide the same loader as the app.

The photos are the same two images used in the Deferrable Views project.
