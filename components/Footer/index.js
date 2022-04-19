import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useI18N } from "context/i18n";
import { menuItems } from "../../config";

import { Lines } from "../Lines";
import styles from "./Footer.module.css";

const Footer = () => {
  const { locale, locales, asPath } = useRouter();
  const { t } = useI18N();
  const restOfLocales = locales.filter((l) => l !== locale);
  return (
    <footer className={styles.Footer}>
      <Lines />
      <div className={styles.Logo}>
        <Image src="/elbec-dark.svg" alt="Elbec logo" width="75" height="30" />
      </div>
      <ul className={styles.Links}>
        {Object.keys(menuItems).map((item) => {
          return (
            <li className={styles.Link} key={item}>
              <Link href={`/${locale}${menuItems[item]}`}>
                <a>{t(item)}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={styles.Logo}>
        <Image src="/UAB-logo.png" alt="UAB logo" width="182" height="55" />
      </div>
      <div className={styles.LegalLanguages}>
        <nav className={styles.Legal}>
          <Link href="/terms-conditions">Terms & Conditions</Link> |{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>
        </nav>
        <nav className={styles.Languages}>
          {/* <Link href="#">Català</Link> | <Link href="#">Castellano</Link> */}
          {restOfLocales.map((l) => {
            return (
              <Link href={`/${l}${asPath}`} locale={l} key={l}>
                <a className={styles.LanguagesLink}>
                  {t(`LOCALE_${l.toUpperCase()}`)}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
};

export { Footer };
