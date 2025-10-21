import { Link } from "react-router-dom";

type Props = {
  image: string;
  title: string;
  subtitle: string;
  reviews: string;
  linkTo: string;
};

const Explore = ({ image, title, subtitle, reviews, linkTo }: Props) => {
  return (
    <div className="collectContent">
      <div className="collectItem">
        <Link to={linkTo} target="_blank" rel="noopener noreferrer">
          <div className="collectImage">
            <img src={image} alt={title} />
          </div>
        </Link>

        <div className="collectInfo">
          <h5 className="collectMainTitle">{title}</h5>
          <p className="collectSubtitle">{subtitle}</p>
          <p className="collectDescription">{reviews} reviews</p>
        </div>
      </div>
      <Link to={linkTo} target="_blank" rel="noopener noreferrer">
        <div className="collectBtn">
          <span>Explore</span>
        </div>
      </Link>
    </div>
  );
};

export default Explore;