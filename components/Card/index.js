import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

const Card = ({
  props: { abstract, image, pi, publication_date, reference, name },
  slug,
}) => {
  const imageFixedPath = image && image.replace("/public", "");

  return (
    <div className="Card">
      <div className="CardImage">
        {image ? (
          <Image
            src={`${imageFixedPath}`}
            alt={name}
            width={250}
            height={400}
          />
        ) : null}
      </div>
      <div className="CardContent">
        <h3>
          {slug ? (
            <Link href={slug} passHref>
              {name}
            </Link>
          ) : null}
        </h3>
        <p>{abstract}</p>
        <p>
          {reference} / {pi}
        </p>
        <p>{publication_date}</p>
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
  slug: PropTypes.string, //.isRequired,
};

export { Card };
