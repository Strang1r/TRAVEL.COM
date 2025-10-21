import { useTranslation } from "react-i18next";

type activitiesCard = {
  image: string;
  reviews: string;
  rating: number;
  aname: string;
  location: string;
  category: string;
  season: string;
  time: string;
  ticket: string;
  price: number;
}


const ActivitiesCard = ({ image, reviews, rating, aname, location, category, season, time, ticket, price }: activitiesCard) => {
  const { t } = useTranslation("common");

  return (
    <div className="item">
      <a href="#" onClick={e => e.preventDefault()}>
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="info">
          <div className="name">
            <p className="reviews">{reviews} {t("activities.reviews")}</p>
            <h5>{rating}</h5>
          </div>
          <h3>{aname}</h3>
          <p className="location">{location}</p>
          <p className='category'>{category}</p>
          <div className="info-bottom">
            <p className='season'>{season}</p>
            <p className='time'>{time}</p>
            <p className='ticket'>{ticket}</p>
          </div>
          <h2>${price}</h2>
          <p className="price22">{t("activities.per traveler")}</p>
        </div>
      </a>
    </div>
  );
}

export default ActivitiesCard;