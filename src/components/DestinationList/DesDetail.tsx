import "./DesDetail.scss"
import { useEffect, useRef, useState } from "react";
import MustSee from "./MustSee";
import TicketItem from "./TicketItem";
import PlaceCard2 from "../Home/PlaceCard2";
import Reviews from "../StaysDetails/Reviews";
import DesDetailImg from "./DesDetailImg";
import { useParams } from "react-router-dom";
import { DesDetailMustSee, DesDetailTicket, DesDetailStays, DesDetailReviews, DesDetailImages, DesDetailCity } from "../../data/index";

const DesDetail = () => {

  // tab切换
  const tabs = ["Must-See Attractions", "Tours & Tickets", "Hotels & Stays", "Practical Info", "Reviews"];
  const tabRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0)
  const [animation, setAnimation] = useState(false);
  const [position, setPosition] = useState<{ left: number }>({
    left: 0
  });

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
    const offset = (126 / 1920) * vw;
    const contentEl = contentRef.current[index];
    if (contentEl) {
      window.scrollTo({
        top: contentEl.offsetTop - offset,
        behavior: "smooth"
      });
    }
  }

  // 图片横向滚动
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

  // 电梯导航
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const current = scrollRef.current;
    if (!current) return;
    current.addEventListener("scroll", checkArrows);
    checkArrows();

    return () => current.removeEventListener("scroll", checkArrows);
  }, []);

  // 匹配对应数据
  const { attractionName } = useParams<{ attractionName: string }>();

  // 不区分大小写匹配
  const cityKey =
    Object.keys(DesDetailCity).find(
      (key) => key.toLowerCase() === attractionName?.toLowerCase()
    ) || "";

  const cityDatas = DesDetailCity[cityKey as keyof typeof DesDetailCity];

  if (!cityDatas) {
    return <div>City not found</div>;
  }

  return (
    <div className="desDetail">
      <div className="desDetailTitle">
        <h2>{cityDatas.city}</h2>
        <p>{cityDatas.country}</p>
      </div>
      <div className="desDetails">
        <div className="desDetailLeft">
          {DesDetailImages.map(image => (
            <DesDetailImg
              key={image.id}
              imgSrc={cityDatas.images[image.id - 1].src}
            />
          ))}
        </div>
        <div className="desDetailRight">
          <div className="bestTime">
            <h3 className="bestTimeTitle">Best Time to Visit</h3>
            <p>{cityDatas.info[0].bestTime}</p>
          </div>
          <div className="currency">
            <h3 className="currencyTitle">Currency</h3>
            <p>{cityDatas.info[0].currency}</p>
          </div>
          <div className="language">
            <h3 className="languageTitle">Language</h3>
            <p>{cityDatas.info[0].language}</p>
          </div>
          <div className="timeZone">
            <h3 className="timeZoneTitle">Time Zone</h3>
            <p>{cityDatas.info[0].timeZone}</p>
          </div>
        </div>
      </div>
      <div className="desDetailBar">
        <div className="bottomTitle">
          {tabs.map((tab, index) => (
            <a
              key={index}
              href="#"
              ref={(el) => {
                tabRef.current[index] = el;
              }}
              className={`tab ${tab.replace(/\s+/g, "-").replace(/&/g, "and")} ${index === activeIndex ? "active" : ""}`}
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
      </div>
      <div className="mustSee" ref={el => { contentRef.current[0] = el }}>
        <h3>Must-See Attractions</h3>
        <div className="mustSeeList">
          {DesDetailMustSee.map(item => (
            <MustSee
              key={item.id}
              image1={item.image1}
              image2={item.image2}
              image3={item.image3}
              name={item.name}
              rating={item.rating}
              address={item.address}
              time={item.time}
              price={item.price}
            />
          ))}

        </div>
      </div>
      <div className="Tickets" ref={el => { contentRef.current[1] = el }}>
        <h3>Tours & Tickets</h3>
        <div className="TicketsList">
          {DesDetailTicket.map(item => (
            <TicketItem
              key={item.id}
              name={item.name}
              cancellation={item.cancellation}
              bookTime={item.bookTime}
              departsCity={item.departsCity}
              rating={item.rating}
              reviews={item.reviews}
              price={item.price}
            />
          ))}

        </div>
      </div>
      <div className="desHotel" ref={el => { contentRef.current[2] = el }}>
        <h3 className="desHotelTitle">Hotels & Stays</h3>
        {showLeft && (<button className="leftArrow" onClick={() => scroll("left")}></button>)}
        {showRight && (<button className="rightArrow" onClick={() => scroll("right")}></button>)}
        <div className="content1" ref={scrollRef}>
          {DesDetailStays.map(stay => (<PlaceCard2
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
      <div className="practicalInfo" ref={el => { contentRef.current[3] = el }}>
        <h3 className="practicalInfoTitle">Practical Info</h3>
        <div className="practicalInfoContent">
          <div className="policyList">
            <div className="policyTitle">
              <h3 className="Cancellation">Visa & Entry Requirements</h3>
            </div>
            <div className="policyContent">
              <p>Most travelers require a valid passport and, depending on nationality, a visa or travel authorization (such as an eVisa or visa waiver). Always check the latest entry regulations before your trip.</p>
            </div>
          </div>
          <div className="policyList">
            <div className="policyTitle">
              <h3 className="Children">Weather & Climate</h3>
            </div>
            <div className="policyContent">
              <p>The destination experiences four distinct seasons:</p>
              <p>Spring (Mar–May): Mild temperatures, occasional rain.<br />

                Summer (Jun–Aug): Warm to hot, with longer daylight hours.<br />

                Autumn (Sep–Nov): Cool and crisp, ideal for outdoor activities.<br />

                Winter (Dec–Feb): Cold, often snowy in some regions.</p>

            </div>
          </div>
          <div className="policyList">
            <div className="policyTitle">
              <h3 className="Pets">Tipping Culture</h3>
            </div>
            <div className="policyContent">
              <p>Tipping is customary. In restaurants, a tip of 10–15% is generally expected if service is not included. For taxis, rounding up the fare is common.</p>
            </div>
          </div>
          <div className="policyList">
            <div className="policyTitle">
              <h3 className="Groups">Electricity & Plugs</h3>
            </div>
            <div className="policyContent">
              <p>The standard voltage is 220–240V (50/60Hz). Power sockets are usually Type C / Type F. Travelers may need a universal adapter.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="desReviews" ref={el => { contentRef.current[4] = el }}>
        <h3>Reviews</h3>
        <div className="reviewCount">
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
              {DesDetailReviews.map(review => (
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
      </div>
    </div>
  )
}

export default DesDetail;