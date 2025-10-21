import { AnimatePresence, motion } from "framer-motion";
import "../../components/Map/Map.scss";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import HotelListCard from "../Home/StaysList/HotelListCard";
import { Link, useLocation } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import CollectStays from "../Home/CollectStays";
import { hotels } from "../../data/index";


const MapBody = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");
  const hotelId = queryParams.get("hotelId");

  const filteredHotels = useMemo(() => {
    return city
      ? hotels.filter(hotel => hotel.city.toLowerCase() === city.toLowerCase())
      : hotels;
  }, [city]);

  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

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

  // 分页
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  /*  // 计算当前页的酒店列表
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentHotels = filteredHotels.slice(startIndex, endIndex);
   const totalPages = Math.ceil(filteredHotels.length / itemsPerPage); */

  useEffect(() => {
    setCurrentPage(1); // 当 city 变化时，重置当前页为第一页
  }, [city]);

  // 当 isFullScreen 变化时，触发地图大小更新
  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }, [isFullScreen]);

  // 图标选中状态
  const [activeHotelId, setActiveHotelId] = useState<number | null>(null);
  // 鼠标悬停左侧列表
  const [hoveredHotelId, setHoveredHotelId] = useState<number | null>(null);


  // 组件用于监听地图点击事件
  function MapClickHandler({ setActiveHotelId }: { setActiveHotelId: (id: number | null) => void }) {
    useMapEvent("click", () => {
      setActiveHotelId(null); // 点击空白处取消选中
    });
    return null;
  }

  const markerRefs = useRef<{ [key: number]: L.Marker | null }>({});

  // 地图定位
  const defaultCenter: [number, number] = [42.3601, -71.0589];
  // 根据传入 city 找到第一个匹配酒店的经纬度
  const centerCoords = useMemo<[number, number]>(() => {
    if (!city) return defaultCenter;
    const q = city.toLowerCase();
    const foundHotels = filteredHotels.find(h => h.city.toLowerCase() === q);
    if (foundHotels) {
      return [foundHotels.latitude, foundHotels.longitude];
    }
    return defaultCenter;
  }, [city, filteredHotels]);

  // Helper：当 centerCoords 发生变化时，主动让 Leaflet 地图移动到新位置
  function ChangeMapCenter({ center }: { center: [number, number] }) {
    const map = useMap();
    const prevCenter = useRef<[number, number]>(center);

    useEffect(() => {
      // 如果坐标真的变了，才更新地图中心
      if (prevCenter.current[0] !== center[0] ||
        prevCenter.current[1] !== center[1]
      ) {
        map.setView(center, map.getZoom());
        prevCenter.current = center;
      }
    }, [center, map]);
    return null;
  }

  // 地图尺寸变化后的列表更新
  const [visibleHotels, setVisibleHotels] = useState(() => filteredHotels);
  // 每次 city 变化，先把 visibleHotels 重置为 filteredHotels
  useEffect(() => {
    setVisibleHotels(filteredHotels);
  }, [filteredHotels]);

  // 组件：监听地图 bounds 变化，并返回当前 bounds 内的酒店
  function MapBoundsListener({
    filtered, onChange,
  }: {
    filtered: typeof filteredHotels;
    onChange: (v: typeof filteredHotels | ((prev: typeof filteredHotels) => typeof filteredHotels)) => void;
  }) {
    const map = useMap();

    const update = useCallback(() => {
      if (!map) return;
      const bounds = map.getBounds();
      const visible = filtered.filter((h) =>
        bounds.contains(L.latLng(h.latitude, h.longitude))
      );
      onChange((prev) => {
        const same =
          prev.length === visible.length &&
          prev.every((v, i) => v.id === visible[i].id);
        return same ? prev : visible;
      });
    }, [map, filtered]);
    // 初次加载和每次移动/缩放后更新
    useEffect(() => {
      update();
    }, []);
    useMapEvent("moveend", update);
    useMapEvent("zoomend", update);
    return null;
  }

  //分页
  // 计算当前页的酒店列表（基于 visibleHotels）
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentHotels = visibleHotels.slice(startIndex, endIndex);
  const totalPages = Math.ceil(visibleHotels.length / itemsPerPage);

  // 判断是否从列表的Show on map链接进入的
  useEffect(() => {
    if (!hotelId) return;
    const id = Number(hotelId);
    if (isNaN(id)) return;
    setActiveHotelId(id);

    // 稍等一帧确保 Marker/Popup 已渲染
    const timeoutId = setTimeout(() => {
      markerRefs.current[id]?.openPopup?.();
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      markerRefs.current[id] = null;
    };

  }, [hotelId]);


  return (
    <div className="MapBody">
      <div className={`mapList ${isFullScreen ? "fullScreen" : ""}`}>
        <div className="mapListTitle">
          <h3>{visibleHotels.length} properties found</h3>
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
        <div className="mapListContent">
          <AnimatePresence>
            {currentHotels.map((hotel) => (
              <Link to={`/staysList/${encodeURIComponent(city || "")}/${hotel.id}`} key={hotel.id} target="_blank" rel="noopener noreferrer">
                <motion.div
                  key={hotel.id}
                  layout       // 自动检测列表顺序变化并动画过渡
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredHotelId(hotel.id)}
                  onMouseLeave={() => setHoveredHotelId(null)}
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
              </Link>
            ))}
          </AnimatePresence>
          {/* 分页器 */}
          {
            totalPages > 1 && (
              <div className="mapListFooter">
                <div
                  className={`prev ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  <i className="iconfont">&#xe629;</i>
                </div>
                {
                  Array.from({ length: totalPages }, (_, index) => (
                    <div
                      key={index + 1}
                      className={`pageNumbers ${currentPage === index + 1 ? "active" : ""}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </div>
                  ))
                }
                <div
                  className={`next ${currentPage === totalPages ? "disabled" : ""}`}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  <i className="iconfont">&#xe629;</i>
                </div>
              </div>
            )
          }
          {/* 默认底部高度 */}
          {
            totalPages === 1 && (
              <div style={{ paddingTop: "calc(40 / 1920 * 100vw)" }}></div>
            )
          }
        </div>
      </div>
      <div className={`mapView ${isFullScreen ? "fullScreen" : ""}`}>
        <div className="fullScreenMap" onClick={() => setIsFullScreen(!isFullScreen)}>
          {isFullScreen ? <i className="iconfont full">&#xe64f;</i> : <i className="iconfont notFull">&#xe613;</i>}
        </div>
        <div className="backList">
          <Link to={`/staysList?city=${encodeURIComponent(city || "")}`}>
            <h3>
              Back to list
            </h3>
          </Link>
        </div>
        <div className="mapOuter">
          <MapContainer
            className="map"
            zoom={13}
            center={centerCoords}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <MapBoundsListener
              filtered={filteredHotels}
              onChange={setVisibleHotels}
            />
            <ChangeMapCenter center={centerCoords} />
            <TileLayer
              attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=6GUVR9ut9YAXcVlNb01AUTF2miGnJJ1SzuNA8euMfdXTYRRKig9xjeVnUq0EiRVP"
              minZoom={0}
              maxZoom={22}
            />
            <MapClickHandler setActiveHotelId={setActiveHotelId} />
            {filteredHotels.map((hotel) => (
              <Marker
                key={hotel.id}
                ref={(el) => {
                  markerRefs.current[hotel.id] = el;
                }}
                position={[hotel.latitude, hotel.longitude] as [number, number]} // 👈 同样需要 tuple
                eventHandlers={{
                  click: () => {
                    setActiveHotelId(hotel.id);
                    setTimeout(() => {
                      markerRefs.current[hotel.id]?.openPopup();
                    }, 0);
                  }
                }}
                zIndexOffset={activeHotelId === hotel.id || hoveredHotelId === hotel.id ? 1000 : 0}
                icon={L.divIcon({
                  className: "mapLabel",
                  html: `<span class="mapLabelPrice ${activeHotelId === hotel.id || hoveredHotelId === hotel.id ? "active" : ""}">$${hotel.bookPrice}</span>`,
                  iconAnchor: [16, 32], // 图标“尖端”指向的位置（x, y）
                  popupAnchor: [10, -40],  // 弹窗相对图标的位置
                })}
              >
                <Popup
                  className="mapPop"
                  eventHandlers={{
                    remove: () => setActiveHotelId(null)
                  }}
                  closeButton={false}
                >
                  <Link to={`/staysList/${encodeURIComponent(hotel.city)}/${hotel.id}`} target="_blank" rel="noopener noreferrer">
                    <div className="popupImage">
                      <CollectStays
                        id={hotel.id}
                        title={hotel.hotelTitle}
                        subtitle={hotel.city}
                        reviews={hotel.reviews.toString()}
                        image={hotel.hotelImage}
                      />
                      <img src={hotel.hotelImage} alt={hotel.hotelTitle} />
                      <div className="popupImageOverlay"></div>
                      <h5>{hotel.reviews} reviews</h5>
                    </div>
                    <div className="popupTitle">
                      <div className="titleLeft">
                        <h4>{hotel.hotelTitle}</h4>
                        {Array(hotel.star)
                          .fill(0)
                          .map((_, index) => (
                            <span key={index} className="iconfont">
                              &#xe6ef;
                            </span>
                          ))}
                      </div>
                      <div className="rating">{hotel.ratingValue}</div>
                    </div>
                    <span>${hotel.bookPrice}</span>
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
export default MapBody;