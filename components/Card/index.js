import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

import styles from "./Card.module.css";

const Card = ({
  props: { abstract, image, pi, publication_date, reference, name },
  slug,
}) => {
  const imageFixedPath = image && image.replace("/public", "");

  const truncateText = (text, length = 280) =>
    text.length > length ? `${text.substring(0, length)}...` : text;

  return (
    <div className={styles.Card}>
      <div
        className={styles.CardImage}
        style={{ backgroundImage: `url(${imageFixedPath})` }}
      />
      <div className={styles.CardContent}>
        <h3>
          <Link href={slug} passHref>
            {name}
          </Link>
        </h3>
        <p className={styles.Reference}>
          {reference}, PI: <span className={styles.Pi}>{pi}</span>
        </p>
        <p className={styles.Abstract}>{truncateText(abstract)}</p>
        <span className={styles.Date}>{publication_date}</span>
      </div>
    </div>
  );
};

Card.displayName = "Card";
Card.propTypes = {
  props: PropTypes.shape({
    abstract: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    pi: PropTypes.string.isRequired,
    publication_date: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  slug: PropTypes.string.isRequired,
};

export { Card };
