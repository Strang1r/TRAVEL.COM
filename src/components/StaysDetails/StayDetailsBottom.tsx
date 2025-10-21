import PlaceCard2 from "../Home/PlaceCard2";
import { useRef, useState, useEffect } from "react";
import "./StayDetailsBottom.scss"
import RoomsCard from "./RoomsCard";
import Reviews from "./Reviews";
import { StayDetailsRooms, StayDetailsReviews, StayDetailsStays } from "../../data/index";

const StayDetailsBottom = () => {

  const tabs = ["Overview", "Rooms", "Reviews", "Policies"];
  const tabRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0)
  const [position, setPosition] = useState<{ left: number }>({
    left: 0
  });
  const [animation, setAnimation] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleClick = (index: number) => {
    const el = tabRef.current[index]
    setActiveIndex(index)
    setAnimation(true)
    if (el) {
      setPosition({
        left: el.offsetLeft,
      })
    }

    const vw = window.innerWidth; // 视口宽度
    const offset = (132 / 1920) * vw;
    const contentEl = contentRef.current[index];
    if (contentEl) {
      window.scrollTo({
        top: contentEl.offsetTop - offset,
        behavior: "smooth"
      });
    }
  }

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

    if (tabRef.current[0]) {
      const el = tabRef.current[0]
      setPosition({
        left: el.offsetLeft,
      })
    }
    return () => current.removeEventListener("scroll", checkArrows);
  }, []);

  return (

    <div className="stayDetailsBottom">
      <div className="bottomTitle">
        {tabs.map((tab, index) => (
          <a
            key={index}
            href="#"
            ref={(el) => {
              tabRef.current[index] = el;
            }}
            className={`tab ${tab.replace(/\s+/g, "")} ${index === activeIndex ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleClick(index);
            }}
          >
            {tab}
          </a>
        ))}
        <div
          className="bottomLine"
          style={{
            position: "absolute",
            bottom: 0,
            height: "calc(4 / 1920 * 100vw)",
            width: "calc(42 / 1920 * 100vw)",
            backgroundColor: "#25191a",
            borderRadius: "calc(2 / 1920 * 100vw)",
            left: `${position.left}px`,
            transition: animation ? "left 0.3s ease" : "none",
          }}
        >
        </div>
      </div>
      <div className="overview" ref={(el) => {
        contentRef.current[0] = el;
      }}>
        <div className="property">
          <h4>About this property</h4>
          <p>Welcome to The Grand Horizon Hotel, a contemporary oasis in the heart of the city. Designed with both business and leisure travelers in mind, our hotel combines modern comfort with timeless elegance.</p>
          <br></br>
          <p>Our spacious guest rooms and suites feature sleek interiors, panoramic city views, and premium amenities including complimentary high-speed Wi-Fi and 24-hour room service. Whether you are here for work or relaxation, you’ll find everything you need for a comfortable stay.</p>
          <br></br>
          <p>Guests can indulge in international flavors at our signature restaurant, unwind with a cocktail at the rooftop bar, or recharge at the wellness center, complete with a fitness studio, indoor pool, and spa facilities.</p>
          <br></br>
          <p>For business travelers, The Grand Horizon Hotel offers fully equipped meeting rooms and a dedicated business center, providing the perfect environment for conferences, events, and private gatherings.</p>
        </div>
        <div className="propertyMap">
          <div className="map">
            <div className="mapArea">
            </div>
            <div className="viewMap"><a href="#" onClick={(e) => e.preventDefault()}>View in map</a></div>
          </div>
        </div>
      </div>
      <div className="rooms" ref={(el) => {
        contentRef.current[1] = el;
      }}>
        <h4>Rooms</h4>

        {StayDetailsRooms.map(room => (
          <RoomsCard
            key={room.id}
            image={room.image}
            bedtype={room.bedtype}
            roomsize={room.roomsize}
            roomname={room.roomname}
            windows={room.windows}
            wifi={room.wifi}
            ac={room.ac}
            bathroom={room.bathroom}
            smoking={room.smoking}
            refundable={room.refundable}
            parking={room.parking}
            breakfast={room.breakfast}
            roomprice={room.roomprice}
            night={room.night}
            tax={room.tax} />
        ))}

      </div>
      <div className="reviews" ref={(el) => {
        contentRef.current[2] = el;
      }}>
        <h4>Reviews</h4>
        <div className="reviewItem">
          <div className="reviewRating">
            <div className="ratingValue">
              <div className="hotelRating">
                <div className="ratingValue">9.1</div>
                <div className="ratingDetails">
                  <p className="p1">Very good</p>
                  <p className="p2">156 reviews</p>
                </div>

              </div>
            </div>
            <div className="ratingStars">
              <div className="ratingBar">
                <div className="ratingBarTop">
                  <span>Cleanliness</span>
                  <p>9.0</p>
                </div>
                <div className="ratingBarBottomOut">
                  <div className="ratingBarBottomIn"></div>
                </div>
              </div>
              <div className="ratingBar">
                <div className="ratingBarTop">
                  <span>Amenities</span>
                  <p>9.0</p>
                </div>
                <div className="ratingBarBottomOut">
                  <div className="ratingBarBottomIn"></div>
                </div>
              </div>
              <div className="ratingBar">
                <div className="ratingBarTop">
                  <span>Location</span>
                  <p>9.0</p>
                </div>
                <div className="ratingBarBottomOut">
                  <div className="ratingBarBottomIn"></div>
                </div>
              </div>
              <div className="ratingBar">
                <div className="ratingBarTop">
                  <span>Service</span>
                  <p>9.0</p>
                </div>
                <div className="ratingBarBottomOut">
                  <div className="ratingBarBottomIn"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="reviewContent">
            {StayDetailsReviews.map(review => (
              <Reviews
                key={review.id}
                image={review.image}
                rating={review.rating}
                username={review.username}
                reviewText={review.reviewText}
                reviewDate={review.reviewDate}
              />
            ))}
          </div>
          <div className="showAllReviews">Show all reviews</div>
        </div>
      </div>
      <div className="policies" ref={(el) => {
        contentRef.current[3] = el;
      }}>
        <h4>Policies</h4>
        <div className="policyList">
          <div className="policyTitle">
            <h3 className="Cancellation">Cancellation / prepayment</h3>
          </div>
          <div className="policyContent">
            <p>Cancellation and prepayment policies vary according to accommodation type.</p>
            <p>Check what conditions apply to each option when making your selection.</p>
          </div>
        </div>
        <div className="policyList">
          <div className="policyTitle">
            <h3 className="Children">Children & Beds</h3>
          </div>
          <div className="policyContent">
            <p>Children 18 and above will be charged as adults at this property.</p>

          </div>
        </div>
        <div className="policyList">
          <div className="policyTitle">
            <h3 className="Pets">Pets</h3>
          </div>
          <div className="policyContent">
            <p>Pets are allowed. Charges may apply.</p>
          </div>
        </div>
        <div className="policyList">
          <div className="policyTitle">
            <h3 className="Groups">Groups</h3>
          </div>
          <div className="policyContent">
            <p>When booking more than 9 rooms, different policies and additional fees may apply.</p>
          </div>
        </div>

      </div>
      <div className="recommendation">
        <h4>You may like</h4>
        {showLeft && (<button className="leftArrow" onClick={() => scroll("left")}></button>)}
        {showRight && (<button className="rightArrow" onClick={() => scroll("right")}></button>)}
        <div className="content1" ref={scrollRef}>
          {StayDetailsStays.map(stay => (<PlaceCard2
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
    </div>
  )
}

export default StayDetailsBottom