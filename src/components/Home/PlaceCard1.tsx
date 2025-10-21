import { Link } from 'react-router-dom';
import Collect from './Collect';
import { getWeather } from '../../apis/Weather';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from "../../apis/i18n";

type PlaceCard1Props = {
  id: number;
  routeName: string;
  image: string;
  title: string;
  jname: string;
  rating: string;
  distance: string;
  weather: string;
  reviews: string;
  cityQuery: string;
}

const PlaceCard1 = ({ id, routeName, image, title, jname, rating, distance, reviews, cityQuery }: PlaceCard1Props) => {
  const [weatherData, setWeatherData] = useState<string>("Loading...");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather(cityQuery);
        const desc = data.weather[0].description;
        const tempC = data.main.temp.toFixed(1);
        setWeatherData(`${desc}, ${tempC}°C`);
      } catch (error) {
        setWeatherData("Failed to fetch weather");
      }
    };
    fetchWeather();
  }, [cityQuery, i18n.language]);

  const { t } = useTranslation("common");

  return (
    <div className="item">
      <div className="image">
        <Collect
          id={id}
          title={title}
          image={image}
          subtitle={jname}
          reviews={reviews}
          routeName={routeName}
        />
        <Link to={`/Destination/${routeName}`} target="_blank" rel="noopener noreferrer">
          <img src={image} alt={title} />
        </Link>
      </div>
      <Link to={`/Destination/${routeName}`} target="_blank" rel="noopener noreferrer">
        <div className="info">
          <div className="name">
            <h3>{title}</h3>
            <h5>{rating}</h5>
          </div>
          <p className="distance">{distance}</p>
          <p>{weatherData}</p>
          <p className="reviews">{reviews} {t("next.reviews")}</p>
        </div>
      </Link>
    </div>
  )
}
export default PlaceCard1