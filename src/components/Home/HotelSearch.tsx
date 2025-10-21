import { useEffect, useRef, useState } from 'react';
import './HotelSearch.scss'
import { createPortal } from 'react-dom';
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css"; // 基本样式
import "react-date-range/dist/theme/default.css"; // 默认主题
import { hotelDatas } from '../../data/index';

/* interface MyRange {
  startDate: Date;
  endDate: Date;
  key: string;
} */


const HotelSearch = ({ className }: { className?: string }) => {
  const vw = (px: number) => (window.innerWidth * px) / 1920;
  const [focused, setFocused] = useState(false);
  // 搜索后输入不丢失
  const [city, setCity] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const c = params.get("city");
      return c ? decodeURIComponent(c) : "";
    } catch {
      return "";
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [cityCoords, setCityCoords] = useState({ top: 0, left: 0, width: 0 });
  const [hotelEmpty, setHotelEmpty] = useState(false);

  const defaultCity = "Boston, USA";

  const handleSearch = () => {
    if (city.trim() === "") {
      setHotelEmpty(true);
      return;
    } else {
      setHotelEmpty(false);
    }

    const queryLower = city.trim().toLowerCase();

    // 规范化字符串：小写并移除非字母字符
    const normalize = (str: string) =>
      str.toLowerCase().replace(/[^a-z]/g, "");

    const normalizedQuery = normalize(queryLower);

    if (!normalizedQuery) {
      setHotelEmpty(true);
      return;
    }

    // 无序匹配（只要所有字母都出现，顺序不限）
    const isUnorderedMatch = (source: string, query: string) => {
      const sourceCount: Record<string, number> = {};
      const queryCount: Record<string, number> = {};

      for (let char of source) {
        sourceCount[char] = (sourceCount[char] || 0) + 1;
      }

      for (let char of query) {
        queryCount[char] = (queryCount[char] || 0) + 1;
      }

      // 确保每个 query 字符在 source 中至少出现相同次数
      for (let char in queryCount) {
        if (!sourceCount[char] || sourceCount[char] < queryCount[char]) {
          return false;
        }
      }

      return true;
    };

    const matchedCity = Object.keys(hotelDatas).find(c =>
      isUnorderedMatch(normalize(c), normalizedQuery)
    );

    const cityName = matchedCity ? matchedCity : defaultCity;

    window.open(`/staysList?city=${encodeURIComponent(cityName)}`, "_blank");

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);

    if (e.target.value.trim() !== "") {
      setHotelEmpty(false);
    }
  }

  // 获取 input 位置
  const hotelCities = [
    { id: 1, name: "Paris, France", country: "France" },
    { id: 2, name: "New York, USA", country: "USA" },
    { id: 3, name: "Tokyo, Japan", country: "Japan" },
    { id: 4, name: "London, UK", country: "UK" },
    { id: 5, name: "Sydney, Australia", country: "Australia" },
    { id: 6, name: "Rome, Italy", country: "Italy" },
    { id: 7, name: "Barcelona, Spain", country: "Spain" },
    { id: 8, name: "Amsterdam, Netherlands", country: "Netherlands" },
    { id: 9, name: "Boston, USA", country: "USA" }
  ];

  // 根据 city 生成建议列表
  const hotelCitySuggestions = city
    ? hotelCities.filter(hotelCity => {
      const normalize = (str: string) => str.toLowerCase().replace(/[^a-z]/g, "");
      const normalizedQuery = normalize(city);

      // 如果去掉非字母字符后为空，返回 false，不匹配任何城市
      if (!normalizedQuery) return false;

      // 统计字母出现次数
      const count = (str: string) => {
        const map: Record<string, number> = {};
        for (const ch of str) map[ch] = (map[ch] || 0) + 1;
        return map;
      };

      const nameCount = count(normalize(hotelCity.name));
      const queryCount = count(normalizedQuery);

      // 每个字母在城市名中出现次数必须 >= 查询中的次数
      return Object.keys(queryCount).every(
        ch => (nameCount[ch] || 0) >= queryCount[ch]
      );
    })
    : [];

  const handleClickSuggestion = (name: string) => {
    setCity(name);
  }

  useEffect(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setCityCoords({ top: rect.bottom + window.scrollY, left: rect.left, width: rect.width });
    }
  }, [focused, city]);

  // 推荐热门城市
  const [hotCity, setHotCity] = useState<any[]>([]);

  const hotCities = [
    { id: 1, name: "Boston, USA", country: "USA" },
    { id: 2, name: "London, UK", country: "UK" },
    { id: 3, name: "Tokyo, Japan", country: "Japan" },
  ];

  const handleFocus = () => {
    setFocused(true);
    if (!city) {
      setHotCity(hotCities);
    }

    if (hotelEmpty) {
      setHotelEmpty(false);
    }
  }

  // 添加room弹窗
  const [showQuantity, setShowQuantity] = useState(false);
  const personRef = useRef<HTMLDivElement>(null);
  const quantityRef = useRef<HTMLDivElement>(null);

  const [quantityCoords, setQuantityCoords] = useState({ top: 0, left: 0, width: 0 });

  const updateCoords = () => {
    if (personRef.current) {
      const rect = personRef.current.getBoundingClientRect();
      setQuantityCoords({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: rect.width });
    }
  };

  // + - 按钮
  const [roomCount, setRoomCount] = useState(1); // rooms
  const [adultCount, setAdultCount] = useState(2); // adults
  const [childrenCount, setChildrenCount] = useState(0); // children

  const peopleCount = adultCount + childrenCount;

  const handleClickAddRoom = () => {
    setRoomCount(prev => prev + 1);
    setAdultCount(prev => prev + 1);
  }

  const handleClickReduceRoom = () => {
    setRoomCount(prev => Math.max(prev - 1, 1));
  }

  const handleClickAddAdult = () => {
    setAdultCount(prev => prev + 1);
    if (peopleCount / roomCount >= 4) {
      setRoomCount(prev => prev + 1);
    }
  }
  const handleClickReduceAdult = () => {
    setAdultCount(prev => Math.max(prev - 1, 1));
    if (adultCount <= roomCount)
      setRoomCount(prev => Math.max(prev - 1, 1));
  }

  const handleClickAddChildren = () => {
    setChildrenCount(prev => prev + 1);
    if (peopleCount / roomCount >= 4) {
      setRoomCount(prev => prev + 1);
    }
  }
  const handleClickReduceChildren = () => {
    setChildrenCount(prev => Math.max(prev - 1, 0));
  }

  // 日期选择弹窗
  const [showCalendar, setShowCalendar] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [calendarCoords, setCalendarCoords] = useState({ top: 0, left: 0, width: 0 });

  const updateCalendarCoords = () => {
    if (searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      setCalendarCoords({ top: rect.bottom + window.scrollY, left: rect.left, width: rect.width });
    }
  };

  // 点击外面关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        quantityRef.current &&
        !quantityRef.current.contains(event.target as Node) &&
        personRef.current &&
        !personRef.current.contains(event.target as Node)
      ) {
        setShowQuantity(false);
      }

      if (
        calendarRef.current &&
        searchRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }

      if (
        !searchRef.current?.contains(event.target as Node) && // 外层搜索框本身
        !calendarRef.current?.contains(event.target as Node) && // 日期弹窗
        !quantityRef.current?.contains(event.target as Node) // 人数弹窗
      ) {
        setFocusedSection(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /*   const [dateRange, setDateRange] = useState<MyRange[]>([
      { startDate: new Date(), endDate: addDays(new Date(), 1), key: "selection" },
    ]); */

  // 日历
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tommorrow = addDays(today, 1);

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date()); // 当前显示的月份
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: today,
    endDate: tommorrow,
  });

  // 计算给定月份的天数数组（包括前后空白）
  const generateDays = (year: number, month: number) => {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay(); // 当月第一天是星期几
    const totalDays = new Date(year, month + 1, 0).getDate(); // 当月总天数

    // 前置空白
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 当月天数
    for (let d = 1; d <= totalDays; d++) {
      days.push(d);
    }

    // 后置空白，确保总数为42（6行）
    while (days.length < 42) {
      days.push(null);
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    // 不允许选择过去月份
    if (currentMonth.getFullYear() === new Date().getFullYear() &&
      currentMonth.getMonth() === new Date().getMonth()) {
      return;
    }
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  // 当前月份和下个月份的天数数组
  const daysInCurrentMonth = generateDays(currentMonth.getFullYear(), currentMonth.getMonth());
  const daysInNextMonth = generateDays(currentMonth.getFullYear(), currentMonth.getMonth() + 1);

  const formatMonth = (date: Date) => {
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  };

  // 窗口变化时更新位置
  useEffect(() => {
    const handleResize = () => {
      updateCoords();
      updateCalendarCoords();
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setCityCoords({ top: rect.bottom + window.scrollY, left: rect.left, width: rect.width });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < today;
  };

  const isDisabled = (date: Date | null) => {
    if (!date) return true; // 空白日期
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < today; // 过去日期
  };

  // 处理日期点击
  const handleDateClick = (date: Date | null) => {
    if (!date) return;
    if (isPast(date)) return; // 禁止选过去的日期
    if (isDisabled(date)) return; // 禁止选禁用的日期

    const { startDate, endDate } = dateRange;

    // 新增：点击同一天不做任何操作
    if (startDate && endDate && date.getTime() === startDate.getTime() && date.getTime() === endDate.getTime()) {
      return;
    }

    if (!startDate) {
      setDateRange({ startDate: date, endDate: null });
      return;
    }

    if (startDate && !endDate) {
      if (date.getTime() === startDate.getTime()) {
        setDateRange({ startDate: date, endDate: null }); // 禁止选择同一天作为结束日期
      } else if (date < startDate) {
        setDateRange({ startDate: date, endDate: null });
      } else if (date > startDate) {
        setDateRange({ startDate, endDate: date });
      }
      return;
    }

    if (startDate && endDate) {
      if (date.getTime() === startDate.getTime()) {
        setDateRange({ startDate: date, endDate: null }); // 禁止再次点击同一天
      } else if (date < startDate) {
        setDateRange({ startDate: date, endDate: null });
      } else if (date > endDate) {
        setDateRange({ startDate: date, endDate: null });
      } else {
        setDateRange({ startDate: date, endDate: null });
      }
    }
  }

  // 自动补全结束日期
  useEffect(() => {
    if (!showCalendar) {
      const { startDate, endDate } = dateRange;
      if (startDate && !endDate) {
        const autoEnd = addDays(startDate, 1);
        setDateRange(prev => ({ startDate: prev.startDate, endDate: autoEnd }));
      }
    }
    // 仅在 showCalendar 变化时触发
  }, [showCalendar]);

  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // 计算 className
  const getDateClass = (date: Date | null) => {
    if (!date || isDisabled(date)) return 'disabled';

    const { startDate, endDate } = dateRange;
    const isStart = startDate && date.getTime() === startDate.getTime();
    const isEnd = endDate && date.getTime() === endDate.getTime();
    const inRange = startDate && endDate && date > startDate && date < endDate;
    // hover 状态
    const inHoverRange =
      startDate &&
      !endDate &&
      hoverDate &&
      ((date > startDate && date <= hoverDate) || (date < startDate && date >= hoverDate));

    if (isStart) return 'selected start';
    if (isEnd) return 'selected end';
    if (inRange) return (date.getTime() === startDate?.getTime() ? 'inRange start' :
      date.getTime() === endDate?.getTime() ? 'inRange end' :
        'inRange');
    if (inHoverRange) return 'hoverRange';
    return '';
  };

  // 搜索框背景状态
  const [focusedSection, setFocusedSection] = useState<"location" | "calendar" | "quantity" | null>(null);

  // 是否为当前月
  const isCurrentMonth = currentMonth.getFullYear() === new Date().getFullYear() &&
    currentMonth.getMonth() === new Date().getMonth();

  return (
    <div className={`${className} hotelSearch`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="searchBox" style={{ backgroundColor: focusedSection ? "#f4f2f2" : "#ffffff", }}>
          {/* 目的地输入 */}
          <div
            className={`searchLocation ${focusedSection === "location" ? "focused" : ""}`}
            style={{ backgroundColor: focusedSection === "location" ? "#FFFFFF" : undefined, }}
            onClick={() =>
              setFocusedSection(focusedSection === "location" ? null : "location")
            }
          >
            <input
              id="search"
              type="search"
              ref={inputRef}
              maxLength={26}
              autoComplete="off"
              placeholder="Where are you going?"
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setFocused(false), 100)}
              value={city}
              onChange={handleInputChange}
            />
            {city && focused && (
              <div
                className="clearBtn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setCity("")}
              >
              </div>
            )}
          </div>
          {/* 输入提醒弹框 */}
          <div className={`inputAlert ${hotelEmpty === true ? "show" : ""}`}>
            <p>Please provide a location.</p>
          </div>
          {/* 日期选择 */}
          <div
            className={`searchDate ${focusedSection === "calendar" ? "focused" : ""}`}
            ref={searchRef}
            style={{ backgroundColor: focusedSection === "calendar" ? "#FFFFFF" : undefined, }}
            onClick={(e) => {
              e.stopPropagation();
              setShowCalendar(prev => !prev);
              updateCalendarCoords();
              setFocusedSection(focusedSection === "calendar" ? null : "calendar")
            }}
          >
            <span className={dateRange.startDate ? "dateText" : "datePlaceholder"}>
              {dateRange.startDate && dateRange.endDate
                ? `${format(dateRange.startDate, "MMM d")} - ${format(dateRange.endDate, "MMM d")}`
                : dateRange.startDate
                  ? `${format(dateRange.startDate, "MMM d")} - Select date`
                  : "Select dates"
              }
            </span>
            {/* 清除日期按钮 */}
            {/* {
              (dateRange.startDate || dateRange.endDate) && showCalendar && (
                <div
                  className="clearDatesBtn"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDateRange({ startDate: null, endDate: null });
                  }}
                >
                </div>
              )
            } */}
          </div>
          {/* 日历弹窗 */}
          {
            createPortal(
              <div
                className={`calendarPlaceholder ${showCalendar ? 'show' : ''}`}
                ref={calendarRef}
                style={{
                  position: "absolute",
                  top: calendarCoords.top + 8,
                  left: calendarCoords.left - vw(348),
                  zIndex: 19
                }}
              >
                {/* 日历弹框 */}
                <div className='calendarContainer' onClick={(e) => e.stopPropagation()}>
                  <div className='monthWrapper'>
                    <div className='monthLeft'>
                      <h2>{formatMonth(currentMonth)}</h2>
                    </div>
                    <div className={`preMonthBtn ${isCurrentMonth ? 'disabled' : ''}`} onClick={prevMonth}>
                    </div>
                    <div className='monthRight'>
                      <h2>{formatMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}</h2>
                    </div>
                    <div className='nextMonthBtn' onClick={nextMonth}>
                    </div>
                  </div>
                  <div className='weeksWrapper'>
                    <ul className='weeks1'>
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((letter, index) => (
                        <li key={`${letter}-${index}`}>{letter}</li>
                      ))}
                    </ul>
                    <ul className='weeks2'>
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((letter, index) => (
                        <li key={`${letter}-${index}`}>{letter}</li>
                      ))}
                    </ul>
                  </div>
                  <div className='daysWrapper'>
                    <div className='days1'>
                      {daysInCurrentMonth.map((day, index) => {
                        const date = day
                          ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                          : null;
                        return (
                          <div
                            key={index}
                            className={getDateClass(date) + (date === null ? ' disabled' : '')}
                            onClick={() => handleDateClick(date)}
                            onMouseEnter={() => setHoverDate(date)}
                            onMouseLeave={() => setHoverDate(null)}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                    <div className='days2'>
                      {daysInNextMonth.map((day, index) => {
                        const date = day
                          ? new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day)
                          : null;

                        return (
                          <div
                            key={index}
                            className={getDateClass(date) + (date === null ? ' disabled' : '')}
                            onClick={() => handleDateClick(date)}
                            onMouseEnter={() => setHoverDate(date)}
                            onMouseLeave={() => setHoverDate(null)}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>,
              document.body
            )
          }
          {/* 选择数量 */}
          <div
            className={`searchPerson ${focusedSection === "quantity" ? "focused" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setShowQuantity(prev => !prev);
              updateCoords();
              setFocusedSection(focusedSection === "quantity" ? null : "quantity");
            }}
            ref={personRef}
            style={{ backgroundColor: focusedSection === "quantity" ? "#FFFFFF" : undefined, }}

          >
            {roomCount}room, {peopleCount}guests
          </div>
          {/* rooms & guests 弹窗 */}
          {
            createPortal(
              <div
                className={`quantity ${showQuantity ? 'show' : ''}`}
                ref={quantityRef}
                style={{
                  position: "absolute",
                  top: quantityCoords.top + 8,
                  left: quantityCoords.left - vw(120),
                  zIndex: 999,
                }}
              >
                <div className='quantityRooms'>
                  <p>Rooms</p>
                  <div className='quantityRoomsBtn'>
                    <button onClick={handleClickReduceRoom} disabled={roomCount <= 1}>-</button>
                    <span>{roomCount}</span>
                    <button onClick={handleClickAddRoom}>+</button>
                  </div>
                </div>
                <div className='quantityAdults'>
                  <p>Adults</p>
                  <div className='quantityAdultsBtn'>
                    <button onClick={handleClickReduceAdult} disabled={adultCount <= 1}>-</button>
                    <span>{adultCount}</span>
                    <button onClick={handleClickAddAdult}>+</button>
                  </div>
                </div>
                <div className='quantityChildren'>
                  <p>Children</p>
                  <div className='quantityChildrenBtn'>
                    <button onClick={handleClickReduceChildren} disabled={childrenCount <= 0}>-</button>
                    <span>{childrenCount}</span>
                    <button onClick={handleClickAddChildren}>+</button>
                  </div>
                </div>
              </div>,
              document.body
            )
          }
          {/* 搜索按钮 */}
          <div className="search-icon" onClick={handleSearch}>
          </div>
          {/* 城市建议弹窗 */}
          {(city === '' ? hotCity.length > 0 : hotelCitySuggestions.length > 0) &&
            createPortal(
              <ul
                className={`hotelCitySuggestions ${focused ? 'show' : ''}`}
                style={{
                  position: "absolute",
                  top: cityCoords.top + 8,
                  left: cityCoords.left - vw(76),
                  zIndex: 9,
                }}
              >
                {(city === '' ? hotCity : hotelCitySuggestions).map(hotelCitySuggestion => (
                  <li key={hotelCitySuggestion.id} onClick={() => handleClickSuggestion(hotelCitySuggestion.name)}>
                    <div className="text-wrapper">
                      <h4>{hotelCitySuggestion.name}</h4>
                      <p>{hotelCitySuggestion.country}</p>
                    </div>
                  </li>
                ))}
              </ul>,
              document.body
            )
          }
        </div>
      </form>
    </div>
  )
}

export default HotelSearch;
