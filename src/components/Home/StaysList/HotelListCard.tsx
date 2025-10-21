import { Link } from "react-router-dom";
import CollectStays from "../CollectStays";
import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store/store";
import store from "../../../store/store";
import { convertPrice } from "../../../utils/currency";

type HotelListCardProps = {
  city: string;
  id: number;
  hotelImage: string;
  hotelTitle: string;
  hotelLocation: string;
  hotelDistance: string;
  rating: string;
  reviews: number;
  ratingValue: number;
  bookPrice: number;
  star: number;
  features: string[];
  type?: string;
};


const HotelListCard = ({ hotelImage, hotelTitle, hotelLocation, hotelDistance, rating, reviews, ratingValue, bookPrice, city, id, star, features, type }: HotelListCardProps) => {
  const symbols: Record<string, string> = { USD: "$", CNY: "¥", EUR: "€" };
  const { current } = useAppSelector((state: RootState) => state.currency);
  const convertedPrice = convertPrice(store.getState(), bookPrice);

  return (
    <div className="listItem">
      <div className="hotelImage">
        <CollectStays
          id={id}
          title={hotelTitle}
          subtitle={city}
          reviews={reviews.toString()}
          image={hotelImage}
        />
        <Link to={`/staysList/${encodeURIComponent(city)}/${id}`} target="_blank" rel="noopener noreferrer">
          <img className="hotelImg" src={hotelImage} alt="" />
        </Link>
      </div>
      <div className="hotelInfo">
        <div className="hotelLeft">
          <div className="hotelDetails">
            <Link to={`/staysList/${encodeURIComponent(city)}/${id}`} target="_blank" rel="noopener noreferrer">
              <div className="hotelTitleContainer">
                <h3 className="hotelTitle">{hotelTitle}
                </h3>
                <div className="hotelStars">
                  {/* 根据 star 数量渲染星级 */}
                  {Array(star)
                    .fill(0)
                    .map((_, index) => (
                      <span key={index} className="iconfont">
                        &#xe6ef; {/* 这里用你的星星图标 */}
                      </span>
                    ))}
                </div>
              </div>
            </Link>
            <div className="hotelLocationContainer">
              <p className="hotelLocation">{hotelLocation}</p>
              <Link to={`/map?city=${encodeURIComponent(city || "")}&hotelId=${id}`} target="_blank" rel="noopener noreferrer">
                <p className="showMap">Show on map</p>
              </Link>
            </div>
            <p className="hotelDistance">{hotelDistance}</p>
          </div>
          <div className="additionInfo">
            {features.map((feature, index) => (
              <p key={index} className={feature.toLowerCase().replace(/\s+/g, '')}>{feature}</p>
            ))}
          </div>
        </div>
        <div className="hotelRight">
          <div className="hotelRating">
            <div className="ratingDetails">
              <p className="p1">{rating}</p>
              <p className="p2">{reviews} reviews</p>
            </div>
            <div className="ratingValue">{ratingValue.toFixed(1)}</div>
          </div>
          <div className="book">
            <div className="bookPrice">
              <p className="p3">{symbols[current]}{convertedPrice}</p>
              <p className="p4">1 night, 1 adult</p>
              <p className="p5">includes taxes and fees</p>
            </div>
            <Link to={`/staysList/${encodeURIComponent(city)}/${id}`} target="_blank" rel="noopener noreferrer">
              <button className="bookNow">Book Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelListCard;