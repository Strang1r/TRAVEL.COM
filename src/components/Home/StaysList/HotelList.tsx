import HotelListCard from "./HotelListCard"
import "./HotelList.scss"
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "../../../store/hooks";
import type { RootState } from "../../../store/store";
import { hotels } from "../../../data/index";

const HotelList = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");

  const filteredHotels = city ? hotels.filter(hotel => hotel.city.toLowerCase() === city.toLowerCase()) : hotels;

  // 下拉菜单
  const [sortOption, setSortOption] = useState("Recommended");
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.sortSelect') && !target.closest('.dropdownMenu')) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 根据 sortOption 对 filteredHotels 进行排序
  if (sortOption === "Price: low to high") {
    filteredHotels.sort((a, b) => a.bookPrice - b.bookPrice);
  } else if (sortOption === "Price: high to low") {
    filteredHotels.sort((a, b) => b.bookPrice - a.bookPrice);
  } else if (sortOption === "Distance from downtown") {
    filteredHotels.sort((a, b) => {
      const distanceA = parseFloat(a.hotelDistance);
      const distanceB = parseFloat(b.hotelDistance);
      return distanceA - distanceB;
    });
  } else {
    filteredHotels.sort((a, b) => a.id - b.id);
  }

  // filter酒店星级
  const [selectedStar, setSelectedStar] = useState<boolean[]>([false, false, false, false, false]);
  const toggleStar = (index: number) => {
    const newStars = [...selectedStar]; // ✅ 拷贝状态数组
    newStars[index] = !newStars[index];  // 切换选中状态
    setSelectedStar(newStars);  // 更新状态
  }

  // 根据 selectedStar 过滤酒店
  const filteredByStarHotels = filteredHotels.filter(hotel => {
    const selected = selectedStar.some((val) => val); // 是否有选中项
    if (!selected) return true; // 没选时显示全部
    return selectedStar[hotel.star - 1]; // star=1 对应 index=0
  });


  let filteredList = filteredByStarHotels;


  // 滑块
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(1000);
  const [filterMin, setFilterMin] = useState(10);
  const [filterMax, setFilterMax] = useState(1000);
  const [minLimit, maxLimit] = [10, 1000];
  const [dragging, setDragging] = useState<"left" | "right" | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  const HandleMouseDown = (side: "left" | "right") => {
    setDragging(side);
  }

  const HandleMouseUp = () => {
    setDragging(null);
    setFilterMin(minValue);
    setFilterMax(maxValue);
  }

  const HandleMouseMove = (e: MouseEvent) => {
    if (!dragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    const value = Math.min(
      Math.max(minLimit, (percent / 100) * (maxLimit - minLimit)),
      maxLimit
    );

    if (dragging === "left") {
      setMinValue(Math.min(value, maxValue - 100)); // 保证左滑块不超过右滑块
    } else if (dragging === "right") {
      setMaxValue(Math.max(value, minValue + 100)); // 保证右滑块不超过左滑块
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", HandleMouseMove);
    window.addEventListener("mouseup", HandleMouseUp);
    return () => {
      window.removeEventListener("mousemove", HandleMouseMove);
      window.removeEventListener("mouseup", HandleMouseUp);
    };
  }, [dragging, minValue, maxValue]);

  const leftPercent = ((minValue - minLimit) / (maxLimit - minLimit)) * 100;
  const rightPercent = ((maxValue - minLimit) / (maxLimit - minLimit)) * 100;

  // 根据价格区间过滤酒店
  filteredList = filteredList.filter(hotel => hotel.bookPrice >= filterMin && hotel.bookPrice <= filterMax);


  // 复选框逻辑
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const toggleFilter = (key: string) => {
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  }

  // Popular filters筛选
  const featureMap: { [key: string]: string } = {
    refundable: "Fully refundable",
    parking: "Free parking",
    swimmingPool: "Swimming pool",
    breakfast: "Breakfast included",
    fitness: "fitness facilities"
  };
  const selectedFeatures = selectedFilters.filter(key => key in featureMap);

  if (selectedFeatures.length > 0) {
    filteredList = filteredList.filter(hotel =>
      selectedFeatures.every(filterKey => hotel.features.includes(featureMap[filterKey]))
    );
  }

  // Property type筛选
  const typeMap: { [key: string]: string } = {
    Hotels: "Hotels",
    Apartments: "Apartments",
    Hostels: "Hostels",
    Guesthouses: "Guesthouses",
    VacationHomes: "Vacation Homes"
  };
  const selectedTypes = selectedFilters.filter(key => key in typeMap);

  if (selectedTypes.length > 0) {
    filteredList = filteredList.filter(hotel =>
      selectedTypes.some(filterKey => hotel.type === typeMap[filterKey])
    );
  }

  // 定义筛选数组
  const popularFilters = [
    { key: "refundable", label: "Fully refundable", count: filteredList.filter(hotel => hotel.features.includes("Fully refundable")).length },
    { key: "parking", label: "Free parking", count: filteredList.filter(hotel => hotel.features.includes("Free parking")).length },
    { key: "swimmingPool", label: "Swimming pool", count: filteredList.filter(hotel => hotel.features.includes("Swimming pool")).length },
    { key: "breakfast", label: "Breakfast included", count: filteredList.filter(hotel => hotel.features.includes("Breakfast included")).length },
    { key: "fitness", label: "fitness facilities", count: filteredList.filter(hotel => hotel.features.includes("fitness facilities")).length }
  ];

  const propertyType = [
    { key: "Hotels", label: "Hotels", count: filteredHotels.filter(hotel => hotel.type === "Hotels").length },
    { key: "Apartments", label: "Apartments", count: filteredHotels.filter(hotel => hotel.type === "Apartments").length },
    { key: "Hostels", label: "Hostels", count: filteredHotels.filter(hotel => hotel.type === "Hostels").length },
    { key: "Guesthouses", label: "Guesthouses", count: filteredHotels.filter(hotel => hotel.type === "Guesthouses").length },
    { key: "VacationHomes", label: "Vacation Homes", count: filteredHotels.filter(hotel => hotel.type === "Vacation Homes").length }
  ];

  // 列表默认显示10个
  const [showAll, setShowAll] = useState(false);
  const displayedHotels = showAll ? filteredList : filteredList.slice(0, 10);

  // 返回顶部按钮
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 1000) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // 货币
  const { current, rates } = useAppSelector((state: RootState) => state.currency);

  const symbols: Record<string, string> = { USD: "$", CNY: "¥", EUR: "€" };
  const convertedPrice = (basePrice: number) => {
    if (!rates || !rates[current]) return basePrice;
    const rate = rates[current] / rates["USD"];
    return basePrice * rate;
  };

  return (
    <div className="main3">
      <div className="filterBody">
        <div className="map">
          <img src="/map.png" alt="" />
          <Link
            to={`/map?city=${encodeURIComponent(city || "")}`}
            state={{ headerMode: "wide" }}
          >
            <div className="viewMap">
              <i className="iconfont">&#xe62a;</i>
              View on map
            </div>
          </Link>
        </div>
        <div className="filter">
          <div className="starFilter">
            <div className="starFilterTop">
              <p className="hotelStarRating">Hotel star rating</p>
              {selectedStar.some(Boolean) && <p className="reset" onClick={() => setSelectedStar([false, false, false, false, false])}>Reset</p>}
            </div>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star, index) => (
                <span
                  key={star}
                  className={`iconfont ${selectedStar[index] ? "active" : ""}`}
                  onClick={() => {
                    toggleStar(index);
                  }
                  }
                >
                  {star} &#xe6ef;
                </span>
              ))}
            </div>
          </div>
          <div className="priceFilter">
            <div className="priceFilterTop">
              <p className="totalPrice">Total price</p>
              {filterMin !== 10 || filterMax !== 1000 ? <p className="priceReset" onClick={() => { setFilterMin(10); setFilterMax(1000); setMinValue(10); setMaxValue(1000); }}>Reset</p> : null}
            </div>

            <p className="price">{symbols[current]}{Math.round(convertedPrice(minValue))} - {symbols[current]}{Math.round(convertedPrice(maxValue))} {maxValue === 1000 ? "+" : ""}</p>
            <div className="sliderContainer" ref={sliderRef}>
              <span
                className="leftCircle"
                style={{ left: `${leftPercent}%` }}
                onMouseDown={() => HandleMouseDown("left")}
              >
              </span>
              <span
                className="rightCircle"
                style={{ left: `calc(${rightPercent}% - (21 / 1920 * 100vw))` }}
                onMouseDown={() => HandleMouseDown("right")}
              >
              </span>
              <div className="trackBottom"></div>
              <div
                className="trackTop"
                style={{
                  left: `${leftPercent}%`,
                  right: `${100 - rightPercent}%`
                }}
              ></div>
            </div>
          </div>
          <div className="popularFilter">
            <div className="popularFilterTop">
              <p className="popularTitle">Popular filters</p>
              {selectedFeatures.length > 0 && <p className="reset" onClick={() => setSelectedFilters([])}>Reset</p>}
            </div>
            {/* <div className="refundable">
              <span className="refundableSelect"></span>
              <p>Fully refundable (58)</p>
            </div>
            <div className="parking">
              <span className="parkingSelect"></span>
              <p>Free parking (58)</p>
            </div>
            <div className="swimmingPool">
              <span className="swimmingPoolSelect"></span>
              <p>Swimming pool (58)</p>
            </div>
            <div className="breakfast">
              <span className="breakfastSelect"></span>
              <p>Breakfast included (58)</p>
            </div>
            <div className="fitness">
              <span className="fitnessSelect"></span>
              <p>fitness facilities (58)</p>
            </div> */}
            {popularFilters.map((filter) => (
              <div
                className={filter.key}
                key={filter.key}
                onClick={() => {
                  toggleFilter(filter.key)
                }}
              >
                <span className={`${filter.key}Select ${selectedFilters.includes(filter.key) ? "active" : ""}`}></span>
                <div className="filterLabel">
                  <p>{filter.label}</p>
                  <p className="filterCount">{filter.count}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="propertyType">
            <div className="popularFilterTop">
              <p className="popularTitle">Property type</p>
              {selectedTypes.length > 0 && <p className="reset" onClick={() => setSelectedFilters(prev => prev.filter(key => !(key in typeMap)))}>Reset</p>}
            </div>
            {propertyType.map((filter) => (
              <div
                className={filter.key}
                key={filter.key}
                onClick={() => {
                  toggleFilter(filter.key)
                }}
              >
                <span className={`${filter.key}Select ${selectedFilters.includes(filter.key) ? "active" : ""}`}></span>
                <div className="filterLabel">
                  <p>{filter.label}</p>
                  <p className="filterCount">{filter.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hotelBody">
        <div className="listTitle">
          <h3>{filteredList.length} properties found</h3>
          <div className={`sortSelect ${openDropdown ? 'active' : ''}`} onClick={() => setOpenDropdown(!openDropdown)}>
            {sortOption}
          </div>
          <ul className={`dropdownMenu ${openDropdown ? 'show' : ''}`}>
            {
              ["Recommended", "Distance from downtown", "Price: low to high", "Price: high to low"].map(item => (
                <li
                  key={item}
                  className="dropdownItem"
                  onClick={() => {
                    setSortOption(item);
                    setOpenDropdown(false);
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>

        </div>
        <div className="listContent">
          <AnimatePresence>
            {displayedHotels.map((hotel) => (
              <motion.div
                key={hotel.id}
                layout       // 自动检测列表顺序变化并动画过渡
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <HotelListCard
                  city={hotel.city}
                  id={hotel.id}
                  key={hotel.id}
                  hotelImage={hotel.hotelImage}
                  hotelTitle={hotel.hotelTitle}
                  hotelLocation={hotel.hotelLocation}
                  hotelDistance={hotel.hotelDistance}
                  rating={hotel.rating}
                  reviews={hotel.reviews}
                  ratingValue={hotel.ratingValue}
                  bookPrice={hotel.bookPrice}
                  star={hotel.star}
                  features={hotel.features}
                  type={hotel.type}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {/* 无结果提示 */}
          {filteredList.length === 0 && (
            <div className="noResults">
              <div className="iconfont">&#xe60e;</div>
              <p >No properties match the selected filters.</p>
            </div>
          )}
          {/* 显示更多按钮 */}
          {filteredList.length > 10 && !showAll && (
            <div className="showMore" onClick={() => setShowAll(true)}>Show more hotels</div>
          )}
          {/* 返回顶部按钮 */}
          <div
            className={`backToTop ${visible ? 'show' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <i className="iconfont">&#xe633;</i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelList