import styles from "./Lines.module.css";

const Lines = () => (
  <div className={styles.Lines} style={{ "--first-division": "33%" }} />
);

Lines.displayName = "ElbecLines";

export { Lines };
