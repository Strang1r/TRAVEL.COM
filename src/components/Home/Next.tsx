import "./Next.scss";
import PlaceCard1 from "./PlaceCard1";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Next = () => {
  const { t } = useTranslation("common");

  const NextList = [
    {
      id: 1,
      routeName: "Paris, France",
      image: "/Eiffel4.png",
      title: t("next.Paris"),
      jname: "Paris",
      cityQuery: "Paris,FR",
      rating: "4.9",
      distance: t("next.France"),
      weather: "Sunny with a cool breeze, 28°C (82°F)",
      reviews: "3,215"
    },
    {
      id: 2,
      routeName: "New York, USA",
      image: "/newyork1.png",
      title: t("next.New York"),
      jname: "New York",
      cityQuery: "New York,US",
      rating: "4.7",
      distance: t("next.United States"),
      weather: "Mild and misty, 15°C (59°F)",
      reviews: "1,890"
    },
    {
      id: 3,
      routeName: "Tokyo, Japan",
      image: "/tokyo1.png",
      title: t("next.Tokyo"),
      jname: "Tokyo",
      cityQuery: "Tokyo,JP",
      rating: "4.6",
      distance: t("next.Japan"),
      weather: "Hot and dry, 35°C (95°F)",
      reviews: "2,207"
    },
    {
      id: 4,
      routeName: "London, UK",
      image: "/london2.png",
      title: t("next.London"),
      jname: "London",
      cityQuery: "London,UK",
      rating: "4.8",
      distance: t("next.United Kingdom"),
      weather: "Freezing with snowfall, -10°C (14°F)",
      reviews: "996"
    },
    {
      id: 5,
      routeName: "Sydney, Australia",
      image: "/sydney1.png",
      title: t("next.Sydney"),
      jname: "Sydney",
      cityQuery: "Sydney,AU",
      rating: "4.8",
      distance: t("next.Australia"),
      weather: "Freezing with snowfall, -10°C (14°F)",
      reviews: "1,215"
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkArrows = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0); // 滚动超过左边显示左箭头
      setShowRight(scrollLeft + clientWidth < scrollWidth); // 没到最右显示右箭头
    }
  };

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const { clientWidth, scrollLeft } = scrollRef.current
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    const current = scrollRef.current;
    if (!current) return;
    current.addEventListener("scroll", checkArrows);
    checkArrows();
    return () => current.removeEventListener("scroll", checkArrows);
  }, []);

  return (
    <div className="next" >
      <div className="title">
        <div className="left">
          {t("next.Where to next?")}
        </div>
        <Link className="right" to="/Destination" target="_blank" rel="noopener noreferrer">
          {t("next.More")}
        </Link>
      </div>
      {showLeft && (<button className="leftArrow" onClick={() => scroll("left")}></button>)}
      {showRight && (<button className="rightArrow" onClick={() => scroll("right")}></button>)}
      <div className="content" ref={scrollRef}>
        {
          NextList.map((place) => (
            <PlaceCard1
              key={place.id}
              id={place.id}
              routeName={place.routeName}
              image={place.image}
              title={place.title}
              jname={place.distance}
              rating={place.rating}
              distance={place.distance}
              weather={place.weather}
              reviews={place.reviews}
              cityQuery={place.cityQuery}
            />))
        }
      </div>
    </div>
  )
}

export default Next