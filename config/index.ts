const {default: cmsConfig} = require('cms/config.js') as any;

export const DEFAULT_PAGE_SLUG = 'home';

export const DEFAULT_LANGUAGE = 'en';

export const LOCALES = {
  'en': 'en-US',
  'es': 'es-ES',
  'ca': 'ca-ES'
};

export const localeDateOptions = { year: "numeric", month: "long", day: "numeric" };

export const DATE_OPTIONS: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

export const menuItems = {
  "PROJECTS": "/projects",
  "PUBLICATIONS": "/publications",
  "RESOURCES": "/resources",
  "NEWS_EVENTS": "/news-events",
  "NEWSLETTER": "/newsletter",
  "CONTACT": "/contact",
  "ABOUT": "/about",
}
