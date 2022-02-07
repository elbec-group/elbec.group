import Link from "next/link";
import Image from "next/image";

import { Lines } from "./Lines.js";
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
          <Link href="#">Publications</Link>
        </li>
        <li className={styles.Link}>
          <Link href="#">Resources</Link>
        </li>
        <li className={styles.Link}>
          <Link href="#">News & Events</Link>
        </li>
        <li className={styles.Link}>
          <Link href="#">Newsletter</Link>
        </li>
        <li className={styles.Link}>
          <Link href="#">Contactar</Link>
        </li>
        <li className={styles.Link}>
          <Link href="#">About</Link>
        </li>
      </ul>
      <div className={styles.Logo}>
        <Image src="/UAB-logo.png" alt="UAB logo" width="182" height="55" />
      </div>
      <div className={styles.LegalLanguages}>
        <nav className={styles.Legal}>
          <Link href="#">Terms & Conditions</Link> |{" "}
          <Link href="#">Privacy Policy</Link>
        </nav>
        <nav className={styles.Languages}>
          <Link href="#">Català</Link> | <Link href="#">Castellano</Link>
        </nav>
      </div>
    </footer>
  );
};

export { Footer };
