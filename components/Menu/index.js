import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Menu.module.css";
import { useI18N } from "context/i18n";
import { menuItems } from "../../config";

const Menu = () => {
  const { locale, locales, asPath } = useRouter();
  const { t } = useI18N();
  const restOfLocales = locales.filter((l) => l !== locale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const MenuLinks = () => (
    <div className={styles.MenuLinks}>
      <ul className={styles.MenuList}>
        {Object.keys(menuItems).map((item) => (
          <li key={item}>
            <Link href={`/${locale}${menuItems[item]}`}>
              <a onClick={() => setIsMenuOpen(false)}>{t(item)}</a>
            </Link>
          </li>
        ))}
      </ul>
      <ul className={styles.MenuLanguajes}>
        {restOfLocales.map((l) => (
          <li key={l}>
            <Link href={`/${l}${asPath}`} locale={l}>
              <a onClick={() => setIsMenuOpen(false)}>{t(`LOCALE_${l.toUpperCase()}`)}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <nav className={styles.MenuWrapper}>
      <Link href={`/${locale}`}>
        <a className={styles.MenuLogo}></a>
      </Link>

      {/* Desktop Menu */}
      <div className={styles.DesktopMenu}>
        <MenuLinks />
      </div>

      {/* Mobile Menu Icon */}
      <button className={styles.MenuIcon} onClick={toggleMenu} aria-label="Toggle menu">
        <span className={styles.MenuIconBar}></span>
        <span className={styles.MenuIconBar}></span>
        <span className={styles.MenuIconBar}></span>
      </button>

      {/* Mobile Menu Aside */}
      {isMenuOpen && (
        <div className={styles.MenuOverlay} onClick={toggleMenu}>
          <aside className={styles.MenuAside} onClick={(e) => e.stopPropagation()}>
            <MenuLinks />
          </aside>
        </div>
      )}
    </nav>
  );
};

Menu.displayName = "Menu";

export { Menu };
