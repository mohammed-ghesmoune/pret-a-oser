/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.


import { precacheAndRoute /*, createHandlerBoundToURL */ } from 'workbox-precaching';
import {
	pageCache,
	imageCache,
	staticResourceCache,
	googleFontsCache,
	offlineFallback,
} from 'workbox-recipes';
import { pages, prestations, categories, testimonials, users, logos } from './data'
import { PAGE, PRESTATION, CATEGORY, TESTIMONIAL, USER, LOGO } from './database'

// Any other custom service worker logic can go here.

self.addEventListener('install', (event) => {

	let data = [
		...pages.map(page => {
			return PAGE.serviceWorkerAdd(page)
		}),
		...prestations.map(prestation => {
			return PRESTATION.serviceWorkerAdd(prestation)
		}),
		...categories.map(category => {
			return CATEGORY.serviceWorkerAdd(category)
		}),
		...testimonials.map(testimonial => {
			return TESTIMONIAL.serviceWorkerAdd(testimonial)
		}),
		...users.map(user => {
			return USER.serviceWorkerAdd(user)
		}),
		...logos.map(logo => {
			return LOGO.serviceWorkerAdd(logo)
		}),
	]

	event.waitUntil(
		Promise.all(data)
			.then(() => self.skipWaiting())
	)

})

precacheAndRoute(self.__WB_MANIFEST);

pageCache({ cacheName: 'pao-pages' });

googleFontsCache({ cachePrefix: 'pao-google-fonts' });

const staticsCache = [
	'https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js',
	'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js'
]
staticResourceCache({ cacheName: 'pao-static-resources', warmCache: staticsCache });

const imagesCache = [
	...pages.map(page => page.image),
	...prestations.map(prestation => prestation.image),
	...logos.map(logo => logo.image),
	'/icons/icon-64x64.png',
	'/icons/icon-192x192.png',
	'/icons/icon-256x256.png',
	'/icons/icon-384x384.png',
	'/icons/icon-512x512.png',
]

imageCache({ cacheName: 'pao-images', warmCache: imagesCache });

offlineFallback({ imageFallback: 'offline.jpg' });



self.addEventListener('activate', function (event) {
	event.waitUntil(self.clients.claim())
});

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

