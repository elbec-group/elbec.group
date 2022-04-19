type i18nLinkProps = {
  asPath: string,
  pathname: string,
  locale: string 
}

export const i18nLinks = ({asPath, pathname, locale}: i18nLinkProps) => {
  const pagePath = asPath.split('/')[2]
  const sectionPath = pathname.split('/')[1]
  const i18nAsPath = `/${sectionPath}/${locale}/${pagePath}`
  return i18nAsPath
}