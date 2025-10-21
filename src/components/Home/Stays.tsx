import "./Stays.scss"
import PlaceCard2 from "./PlaceCard2";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Stays = () => {
  const { t } = useTranslation("common");

  const stays = [
    {
      id: 1,
      city: "Paris, France",
      image: "/stay1.png",
      sname: t("stays.Hôtel de Crillon"),
      rating: 4.7,
      distance: t("stays.500m from the beach"),
      type: t("stays.Luxury Resort"),
      price: 450,
      reviews: "1,024"
    },
    {
      id: 2,
      city: "Paris, France",
      image: "/stay2.png",
      sname: t("stays.Rue de Rivoli, Paris"),
      rating: 4.4,
      distance: t("stays.2km from downtown"),
      type: t("stays.Boutique Hotel"),
      price: 420,
      reviews: "876"
    },
    {
      id: 3,
      city: "Paris, France",
      image: "/stay3.png",
      sname: t("stays.Hôtel Lutetia"),
      rating: 4.8,
      distance: t("stays.1.5km from central station"),
      type: t("stays.Business Hotel"),
      price: 72,
      reviews: "1,342"
    },
    {
      id: 4,
      city: "Paris, France",
      image: "/stay4.png",
      sname: t("stays.Mandarin Oriental, Paris"),
      rating: 3.6,
      distance: t("stays.500m from the beach"),
      type: t("stays.Luxury Resort"),
      price: 250,
      reviews: "654"
    },
    {
      id: 5,
      city: "New York, USA",
      image: "/stay5.png",
      sname: t("stays.The Plaza Hotel"),
      rating: 4.9,
      distance: t("stays.3km from the airport"),
      type: t("stays.Budget Inn"),
      price: 99,
      reviews: "2,345"
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
    <div className="next1" >
      <div className="title1">
        <div className="left1">
          {t("stays.Explore more stays")}
        </div>
        <Link to='/staysList' className="right1" target="_blank" rel="noopener noreferrer">
          {t("stays.More")}
        </Link>
      </div>
      {showLeft && (<button className="leftArrow" onClick={() => scroll("left")}></button>)}
      {showRight && (<button className="rightArrow" onClick={() => scroll("right")}></button>)}
      <div className="content1" ref={scrollRef}>
        {stays.map(stay => (<PlaceCard2
          key={stay.id}
          id={stay.id}
          city={stay.city}
          image={stay.image}
          sname={stay.sname}
          rating={stay.rating}
          distance={stay.distance}
          type={stay.type}
          price={stay.price}
          reviews={stay.reviews}
        />))}
      </div>
    </div>
  )
}

export default Stays