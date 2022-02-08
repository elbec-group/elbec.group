import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { Logo } from "./Logo.js";
import { Lines } from "./Lines.js";
import htmr from "htmr";

import styles from "./Hero.module.css";

const Hero = ({ title, textAlt, isFullHeight = false }) => {
  const heroClassName = cx(styles.Hero, {
    [styles.isFullHeight]: isFullHeight,
  });
  return (
    <header className={heroClassName}>
      <Logo className={styles.Logo} alt={textAlt} isAnimated />
      <h1 className={styles.Title}>{htmr(title)}</h1>
      <div className={styles.Lines}>
        <Lines />
      </div>
    </header>
  );
};

Hero.propTypes = {
  isFullHeight: PropTypes.bool,
  textAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
Hero.displayName = "Hero";

export { Hero };
