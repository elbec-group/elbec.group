import { Locale } from 'types/app';
import { get } from 'utils'

const {default: cmsConfig} = require('cms/config.js') as any;

export const DEFAULT_PAGE_SLUG = 'home';

export const DEFAULT_LOCALE: Locale =
  get(cmsConfig, 'i18n.default_locale') || 'en';

export const LOCALES: Locale[] = get(cmsConfig, 'i18n.locales') || ['en'];
