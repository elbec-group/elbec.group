import Link from "next/link";
import Image from "next/image";

import { Lines } from "../Lines";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <Lines />
      <div className={styles.Logo}>
        <Image src="/elbec-dark.svg" alt="Elbec logo" width="75" height="30" />
      </div>
      <ul className={styles.Links}>
        <li className={styles.Link}>
          <Link href="/projects">Projects</Link>
        </li>
        <li className={styles.Link}>
          <Link href="/publications">Publications</Link>
        </li>
        <li className={styles.Link}>
          <Link href="/resources">Resources</Link>
        </li>
        <li className={styles.Link}>
          <Link href="/news-events">News & Events</Link>
        </li>
        <li className={styles.Link}>
          <Link href="/newsletter">Newsletter</Link>
        </li>
        <li className={styles.Link}>
          <Link href="/contact">Contactar</Link>
        </li>
        <li className={styles.Link}>
          <Link href="/about">About</Link>
        </li>
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
          <Link href="#">Català</Link> | <Link href="#">Castellano</Link>
        </nav>
      </div>
    </footer>
  );
};

export { Footer };
