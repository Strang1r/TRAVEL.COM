import { createPortal } from "react-dom";
import "./Search.scss";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";


const Search = ({ className }: { className?: string }) => {

  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  //自动补全
  const attractions = [
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

  const defaultCity = "Boston, USA";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (query.trim() === "") {
      window.open("/Destination", "_blank"); // 新标签页
      return;
    }

    const queryLower = query.trim().toLowerCase();

    // 规范化字符串：小写并移除非字母字符
    const normalize = (str: string) =>
      str.toLowerCase().replace(/[^a-z]/g, "");

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

    const normalizedQuery = normalize(queryLower);

    // 如果去掉非字母字符后为空，直接使用默认城市
    if (!normalizedQuery) {
      window.open(`/Destination/${defaultCity}`, "_blank");
      return;
    }

    const city = attractions.find(attr =>
      isUnorderedMatch(normalize(attr.name), normalizedQuery)
    );

    const cityName = city ? city.name : defaultCity;

    window.open(`/Destination/${cityName}`, "_blank"); // 新标签页
  }

  // 根据 query 生成建议列表
  const suggestions = query
    ? attractions.filter(attraction => {
      const normalize = (str: string) => str.toLowerCase().replace(/[^a-z]/g, "");
      const normalizedQuery = normalize(query);

      // 如果去掉非字母字符后为空，返回 false，不匹配任何城市
      if (!normalizedQuery) return false;

      // 统计字母出现次数
      const count = (str: string) => {
        const map: Record<string, number> = {};
        for (const ch of str) map[ch] = (map[ch] || 0) + 1;
        return map;
      };

      const nameCount = count(normalize(attraction.name));
      const queryCount = count(normalizedQuery);

      // 每个字母在城市名中出现次数必须 >= 查询中的次数
      return Object.keys(queryCount).every(
        ch => (nameCount[ch] || 0) >= queryCount[ch]
      );
    })
    : [];

  const handleClickSuggestion = (name: string) => {
    setQuery(name);
  }

  // 获取 input 位置
  useEffect(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + window.scrollY, left: rect.left, width: rect.width });
    }
  }, [focused, query]);
  const vw = (px: number) => (window.innerWidth * px) / 1920;

  // 热门城市
  const hotCities = [
    { id: 1, name: "New York, USA", country: "USA" },
    { id: 2, name: "London, UK", country: "UK" },
    { id: 3, name: "Tokyo, Japan", country: "Japan" },
  ];

  const [hotCity, setHotCity] = useState<any[]>([]);
  const handleFocus = () => {
    setFocused(true);
    if (!query) {
      setHotCity(hotCities);
    }
  }

  const { t } = useTranslation();

  return (
    <div className={`${className} homeSearch`}>
      <form onSubmit={handleSubmit}>
        <div className="searchBox">
          <div className="inputBg" style={{ backgroundColor: focused ? "#fff" : undefined }}>
            <input
              id="search"
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              type="search"
              maxLength={30}
              autoComplete="off"
              placeholder={t("nav.Where")}
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setFocused(false), 100)}
            />
            {query && (
              <div
                className="clearBtn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setQuery("")}
              >
              </div>
            )}
          </div>
          <div className="search-icon" onClick={handleSubmit}>
          </div>
          {(query === "" ? hotCity.length > 0 : suggestions.length > 0) &&
            createPortal(
              <ul
                className={`suggestions ${focused ? 'show' : ''}`}
                style={{
                  position: "absolute",
                  top: coords.top + 10,
                  left: coords.left - vw(46),
                  zIndex: 9,
                }}
              >
                {(suggestions.length > 0 ? suggestions : hotCity).map(suggestion => (
                  <li key={suggestion.id} onClick={() => handleClickSuggestion(suggestion.name)}>
                    <div className="text-wrapper">
                      <h4>{suggestion.name}</h4>
                      <p>{suggestion.country}</p>
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

export default Search