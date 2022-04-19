import PropTypes from "prop-types";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "./Card.module.css";
import { localeDateOptions, LOCALES } from "config";
import { useRouter } from "next/router";

const Card = ({
  props: { abstract, image, pi, date, reference, name },
  slug,
}) => {
  const imageFixedPath = image && image.replace("/public", "");
  const itemDate = date && new Date(date);
  const { locale } = useRouter();

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
          <Link href={slug}>{name}</Link>
        </h3>
        {pi ? (
          <p className={styles.Reference}>
            {reference}, PI: <span className={styles.Pi}>{pi}</span>
          </p>
        ) : null}
        <ReactMarkdown className={styles.Abstract}>
          {truncateText(abstract)}
        </ReactMarkdown>
        {itemDate ? (
          <span className={styles.Date}>
            {itemDate.toLocaleDateString(LOCALES[locale], localeDateOptions)}
          </span>
        ) : null}
      </div>
    </div>
  );
};

Card.displayName = "Card";
Card.propTypes = {
  props: PropTypes.shape({
    abstract: PropTypes.string.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    pi: PropTypes.array.isRequired,
    date: PropTypes.string,
    reference: PropTypes.string.isRequired,
  }),
  slug: PropTypes.string.isRequired,
};

export { Card };
