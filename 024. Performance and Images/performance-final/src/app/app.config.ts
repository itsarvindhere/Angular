import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

/**
 * Open the app with ?slow to load the images from the slow image server (npm run slow-images).
 * Full images then take a few seconds, so you can see the blur placeholder appear first.
 */
const useSlowServer =
  typeof location !== 'undefined' && new URLSearchParams(location.search).has('slow');
const slowServer = 'http://localhost:4420/';

/**
 * A custom image loader. A real one would point at an image service (Cloudinary, Imgix, ...).
 * It must use config.width, otherwise ngSrcset cannot work. This demo only adds ?w=... to the URL.
 * Without ?slow the files are not resized (there is no image service), with ?slow the slow
 * image server returns a tiny file for very small widths, which is what the placeholder asks for.
 */
const demoLoader = (config: ImageLoaderConfig) => {
  const url = (useSlowServer ? slowServer : '') + config.src;
  return config.width ? `${url}?w=${config.width}` : url;
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: IMAGE_LOADER, useValue: demoLoader },
  ],
};
