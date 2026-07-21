import styles from "./ButtonLoader.module.css";

const ButtonLoader = ({ size = 18, color = "#fff" }) => {
  return (
    <span
      className={styles.loader}
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
    />
  );
};

export default ButtonLoader;