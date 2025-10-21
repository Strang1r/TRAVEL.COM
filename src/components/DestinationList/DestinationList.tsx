import './DestinationList.scss';
import DesCard from './DesCard';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PopularAttractions, recommendedAttractions, allAttractions } from '../../data/index';

const DestinationList1 = () => {

  const tabs = ["Asia", "Europe", "Africa", "North America", "South America", "Oceania", "Antarctica"];
  const tabRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0)
  const [animation, setAnimation] = useState(false);
  const [position, setPosition] = useState<{ left: number }>({
    left: 0
  });

  console.log(activeIndex);

  const handleClick = (index: number) => {
    const el = tabRef.current[index]
    setActiveIndex(index)
    setAnimation(true)
    if (el) {
      setPosition({
        left: el.offsetLeft,
      })
    }
  }



  //自适应高度
  const container = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (activeRef.current) {
      setHeight(activeRef.current.offsetHeight);
    }
  }, [activeIndex, allAttractions]);

  useEffect(() => {
    function handleResize() {
      if (activeRef.current) {
        setHeight(activeRef.current.offsetHeight);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className="destinationListBody">
      <div className='popularAttractions'>
        <div className='attractionTitle'>
          Popular Attractions
        </div>
        <div className='attractionList'>
          {PopularAttractions.map(attraction => (
            <Link to={`/Destination/${attraction.routeName}`} key={attraction.id} target="_blank" rel="noopener noreferrer">
              <DesCard
                key={attraction.id}
                id={attraction.id}
                image={attraction.image}
                name={attraction.name}
                subtitle={attraction.subtitle}
                routeName={attraction.routeName}
                rating={attraction.rating}
                reviews={attraction.reviews}
                icons={attraction.icons}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className='SearchMore'>
        <div className='searchMoreTitle'>
          Search More
        </div>
        <div className='searchMoreBar'>
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
        </div>
        <div
          className='searchMoreList'
          ref={container}
          style={{ height: `${height}px` }}
        >
          {allAttractions.map((list, index) => (
            <div
              key={index}
              ref={index === activeIndex ? activeRef : null}
              className={`searchMoreListInner ${activeIndex === index ? "active" : "inactive"}`}
            >
              {list.map(attraction => (
                <Link to={`/Destination/${attraction.routeName}`} key={attraction.id} target="_blank" rel="noopener noreferrer">
                  <DesCard
                    key={attraction.id}
                    id={attraction.id}
                    image={attraction.image}
                    name={attraction.name}
                    subtitle={attraction.subtitle}
                    routeName={attraction.routeName}
                    rating={attraction.rating}
                    reviews={attraction.reviews}
                    icons={attraction.icons}
                  />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className='recommendation'>
        <div className='recommendationTitle'>
          You might also like
        </div>
        <div className='recommendationList'>
          {recommendedAttractions.map(attraction => (
            <Link to={`/Destination/${attraction.routeName}`} key={attraction.id} target="_blank" rel="noopener noreferrer">
              <DesCard
                key={attraction.id}
                id={attraction.id}
                image={attraction.image}
                name={attraction.name}
                subtitle={attraction.subtitle}
                routeName={attraction.routeName}
                rating={attraction.rating}
                reviews={attraction.reviews}
                icons={attraction.icons}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationList1;