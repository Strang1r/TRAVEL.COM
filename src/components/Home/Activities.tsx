import { useTranslation } from 'react-i18next';
import './Activities.scss';
import ActivitiesCard from './ActivitiesCard';
import { useRef, useState, useEffect } from "react";


const Activities = () => {

  const { t } = useTranslation("common");

  const activities = [
    {
      id: 1,
      image: "public/act1.png",
      reviews: "3,011",
      rating: 4.18,
      aname: t("activities.Skydiving Over Grand Canyon"),
      location: t("activities.Grand Canyon, Arizona, USA"),
      category: t("activities.Adventure"),
      season: t("activities.Spring & Fall"),
      time: t("activities.3 Hours(Including Training & Flight)"),
      ticket: t("activities.included Ticket"),
      price: 49
    },
    {
      id: 2,
      image: "public/act2.png",
      reviews: "548",
      rating: 4.77,
      aname: t("activities.Kyoto Cultural Walking Tour"),
      location: t("activities.Kyoto, Japan"),
      category: t("activities.Culture"),
      season: t("activities.Spring & Autumn"),
      time: t("activities.Half-Day (4 Hours)"),
      ticket: t("activities.included Ticket & Guide"),
      price: 79.9
    },
    {
      id: 3,
      image: "public/act3.png",
      reviews: "7,506",
      rating: 4.79,
      aname: t("activities.Snorkeling in the Great Barrier Reef"),
      location: t("activities.Queensland, Australia"),
      category: t("activities.Leisure"),
      season: t("activities.Summer"),
      time: t("activities.Full-Day (7 Hours)"),
      ticket: t("activities.included Ticket & Guide & Meal"),
      price: 148
    },
    {
      id: 4,
      image: "public/act4.png",
      reviews: "4,960",
      rating: 4.33,
      aname: t("activities.Hot Air Balloon Ride in Cappadocia"),
      location: t("activities.Cappadocia, Turkey"),
      category: t("activities.Adventure"),
      season: t("activities.Spring & Fall"),
      time: t("activities.2 Hours (Including Flight & Toast)"),
      ticket: t("activities.included Ticket & Meal"),
      price: 77
    },
    {
      id: 5,
      image: "public/act1.png",
      reviews: "3,011",
      rating: 4.1,
      aname: t("activities.Skydiving Over Grand Canyon"),
      location: t("activities.Grand Canyon, Arizona, USA"),
      category: t("activities.Adventure"),
      season: t("activities.Spring & Fall"),
      time: t("activities.3 Hours(Including Training & Flight)"),
      ticket: t("activities.included Ticket"),
      price: 49
    },
    // Add more activities as needed
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
    <div className='activities'>

      <div><img src="public/activities.png" alt="" className="aimg" /></div>
      <div className="title2">
        <div className="left">
          {t("activities.Explore more activities!")}
        </div>
        <div className="right">
          {t("activities.More")}
        </div>
      </div>
      {showLeft && (<button className="leftArrow" onClick={() => scroll("left")}></button>)}
      {showRight && (<button className="rightArrow" onClick={() => scroll("right")}></button>)}
      <div className="content2" ref={scrollRef}>
        {activities.map(activity => (<ActivitiesCard
          key={activity.id}
          image={activity.image}
          reviews={activity.reviews}
          rating={activity.rating}
          aname={activity.aname}
          location={activity.location}
          category={activity.category}
          season={activity.season}
          time={activity.time}
          ticket={activity.ticket}
          price={activity.price}
        />))}
        {/* <div className="item">
          <a href="#" onClick={e => e.preventDefault()}>
            <div className="image">
              <img src="public/pic1.png" alt="" />
            </div>
            <div className="info">
              <div className="name">
                <p className="reviews">3,215 reviews</p>
                <h5>4.9</h5>
              </div>
              <h3>Skydiving Over Grand Canyon</h3>
              <p className="location">Grand Canyon, Arizona, USA</p>
              <p className='category'>Adventure</p>
              <div className="info-bottom">
                <p className='season'>Summer</p>
                <p className='time'>2 hours ago</p>
                <p className='ticket'>120 miles away</p>
              </div>
              <h2>$250</h2>
              <p className="price22">per traveler</p>
            </div>
          </a>
        </div> */}
      </div>
    </div>
  )
}

export default Activities;