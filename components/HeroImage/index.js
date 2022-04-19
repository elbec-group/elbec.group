import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./HeroImage.module.css";

const HeroImage = ({ alt, image }) => {
  return (
    <header className={styles.Header}>
      <div className={styles.HeroImage}>
        <Image
          src={image.replace("/public", "")}
          alt={alt}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </header>
  );
};

HeroImage.displayName = "HeroImage";
HeroImage.propTypes = {
  alt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export { HeroImage };
