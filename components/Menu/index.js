import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Menu.module.css";
import { useI18N } from "context/i18n";
import { menuItems } from "../../config";

const Menu = () => {
  const { locale, locales, asPath, pathname, basePath } = useRouter();
  const { t } = useI18N();
  const restOfLocales = locales.filter((l) => l !== locale);

  return (
    <nav className={styles.MenuWrapper}>
      <Link href={`/${locale}`}>
        <a className={styles.MenuLogo}></a>
      </Link>
      <div className={styles.MenuLinks}>
        <ul className={styles.MenuList}>
          {Object.keys(menuItems).map((item) => {
            return (
              <li key={item}>
                <Link href={`/${locale}${menuItems[item]}`}>
                  <a>{t(item)}</a>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className={styles.MenuLanguajes}>
          {restOfLocales.map((l) => {
            return (
              <li key={l}>
                <Link href={`/${l}${asPath}`} locale={l}>
                  <a>{t(`LOCALE_${l.toUpperCase()}`)}</a>
                </Link>
              </li>
            );
          })}
        </ul>
        <span className={styles.MenuIcon}></span>
      </div>
    </nav>
  );
};

Menu.displayName = "Menu";

export { Menu };
