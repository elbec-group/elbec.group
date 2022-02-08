import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.LoadingWrapper}>
      <h2 className={styles.Loading}>Loading</h2>
    </div>
  );
};

Loading.displayName = "AdminLoading";

export { Loading };
