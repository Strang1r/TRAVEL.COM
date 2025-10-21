import { Link } from "react-router-dom";
import CollectStays from "./CollectStays";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../store/store";
import { useAppSelector } from "../../store/hooks";
import store from "../../store/store";
import { convertPrice } from "../../utils/currency";

type PlaceCard2Props = {
  id: number;
  city: string;
  image: string;
  sname: string;
  rating: number;
  distance: string;
  type: string;
  price: number;
  reviews: string;
}

const PlaceCard2 = ({ id, city, image, sname, rating, distance, type, price, reviews }: PlaceCard2Props) => {
  const { t } = useTranslation("common");

  const symbols: Record<string, string> = { USD: "$", CNY: "¥", EUR: "€" };
  const { current } = useAppSelector((state: RootState) => state.currency);
  const convertedPrice = convertPrice(store.getState(), price);


  return (
    <div className="item1">
      <div className="image1">
        <CollectStays
          id={id}
          title={sname}
          subtitle={city}
          reviews={reviews}
          image={image}
        />
        <Link to={`/staysList/${city}/${id}`} target="_blank" rel="noopener noreferrer">
          <img src={image} alt={sname} />
        </Link>
      </div>
      <Link to={`/staysList/${city}/${id}`} target="_blank" rel="noopener noreferrer">
        <div className="info1">
          <div className="name1">
            <h3>{sname}</h3>
            <h5>{rating}</h5>
          </div>
          <p className="distance1">{distance}</p>
          <p className="type1">{type}</p>
          <h2>{symbols[current]}{convertedPrice}</h2>
          <p className="price22">{t("stays.per traveler")}</p>
        </div>
      </Link>
    </div>
  )
}

export default PlaceCard2