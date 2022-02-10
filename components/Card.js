import PropTypes from "prop-types";
import Image from "next/image";

const Card = ({
  props: { abstract, image, pi, publication_date, reference, title },
}) => {
  return (
    <div className="Card">
      <div className="CardImage">
        <Image src={`/${image}`} alt={title} width={250} height={400} />
      </div>
      <div className="CardContent">
        <h3>{title}</h3>
        <p>{abstract}</p>
        <p>
          {reference} {pi}
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
    title: PropTypes.string.isRequired,
  }),
};

export { Card };
