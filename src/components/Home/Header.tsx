import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import Explore from "./Explore";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { setShowLoginState } from "../../store/loginPop";
import { login, logout } from "../../store/authSlice";
import { resetPlusOne } from "../../store/collectSlice";
import { useTranslation } from "react-i18next";
import i18n from "../../apis/i18n";
import { fetchRates, setCurrency } from "../../store/currencySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface HeaderProps {
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;
  showTab?: boolean; // 可选属性，默认为 true
}


const Header = ({ activeIndex, setActiveIndex, showTab }: HeaderProps) => {
  const dispatch = useAppDispatch();

  const tabs = useMemo(() => ["Destination", "Stays", "Flights", "Activities"], []);
  const tabRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [position, setPosition] = useState<{ left: number }>({
    left: 0
  });
  const [animation, setAnimation] = useState(false);

  const handleClick = (index: number) => {
    const el = tabRef.current[index]
    setActiveIndex?.(index)
    setAnimation(true)
    if (el) {
      setPosition({
        left: el.offsetLeft + el.offsetWidth / 2,
      })
    }
  }

  useEffect(() => {
    const updatePosition = () => {
      const el = tabRef.current[activeIndex || 0];
      if (el) {
        setPosition({
          left: el.offsetLeft + el.offsetWidth / 2,
        })
      }
    };
    updatePosition();

    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [activeIndex, i18n.language]);



  // login弹窗
  const showLogin = useSelector((state: RootState) => state.loginPop.showLogin);

  const setShowLogin = () => {
    dispatch(setShowLoginState(true));
  };

  useEffect(() => {
    const body = document.body;

    if (showLogin) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollBarWidth}px`; // 给 body 增加占位
    } else {
      body.style.overflow = "auto";
      body.style.paddingRight = "0px";
    }
  }, [showLogin]);

  // 登录输入的 email 状态
  const [email, setEmail] = useState("");

  // 模拟登录函数
  const user = useSelector((state: RootState) => state.auth.user);
  const mockLogin = useCallback(() => {
    /* localStorage.setItem("google_token", "fake_token");
    localStorage.setItem("user", JSON.stringify({ name: "Alex", email: email || "Alex@gmail.com" })); */
    const fakeUser =
      [
        {
          id: "1",
          name: "Alex",
          email: "Alex@gmail.com"
        },
        {
          id: "2",
          name: "alex",
          email: "alex@gmail.com"
        }
      ]
    const user = fakeUser.find(u => u.email === (email || "Alex@gmail.com"));
    if (user) {
      dispatch(login(user));
      dispatch(setShowLoginState(false)); // 关闭登录弹窗
    } else {
      alert("No such user. Please use a different email.");
    }
  }, [dispatch, email]);

  // 登录成功后的逻辑
  /* const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); */

  // 退出登录函数
  const handleLogout = () => {
    /*     localStorage.removeItem("google_token");
        localStorage.removeItem("user"); */
    dispatch(logout());
    window.location.reload(); // 刷新页面以更新状态
  };

  // 登录表单的 email 状态 + 非有效邮箱提示
  const [emailError, setEmailError] = useState(false);

  const handleMockLogin = () => {
    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }
    mockLogin();
    saveHistory(email);
  };

  const isValidEmail = (email: string) => email === "Alex@gmail.com" || email === "alex@gmail.com";

  const handleClear = () => {
    setEmail("");
    setEmailError(false);
  }

  // 保存登录历史到 localStorage
  const saveHistory = (email: string) => {
    const history: string[] = JSON.parse(localStorage.getItem("loginHistory") || "[]");
    const newHistory = [email, ...history.filter(e => e !== email)].slice(0, 5); // 只保留最近5条
    localStorage.setItem("loginHistory", JSON.stringify(newHistory));
  };

  const [loginHistory, setLoginHistory] = useState<string[]>([]);

  useEffect(() => {
    // 获取登录历史
    const history: string[] = JSON.parse(localStorage.getItem("loginHistory") || "[]");
    setLoginHistory(history);
  }, []);

  // 控制登录历史显示
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowHistory(false);
        if (!email) {
          setEmailError(false);
        } else if (!isValidEmail(email)) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [email]);

  const handleFocus = () => {
    if (loginHistory.length > 0) setShowHistory(true);
  };

  //用户输入时，历史列表只显示匹配邮箱（动态过滤）
  const filteredHistory = loginHistory.filter(e =>
    e.includes(email)
  );

  // 用户头像点击显示隐藏弹窗
  const [showPop, setShowPop] = useState(false);
  const handleShowPop = () => {
    setShowPop(!showPop);
  };

  // 收藏弹窗
  const [showCollectPop, setShowCollectPop] = useState(false);
  const handleCollectPop = () => {
    setShowCollectPop(!showCollectPop);
  };

  // 收藏头部tab
  const collectTabs = ["Destination", "Stays", "Flights", "Activities"];
  const collectRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [collectPosition, setCollectPosition] = useState<{ left: number }>({ left: 0 });
  const [collectAnimation, setCollectAnimation] = useState(false);

  const handleCollectTabClick = (index: number) => {
    setActiveTab(index);
    setCollectAnimation(true);

    // 计算下划线位置
    const el = collectRef.current[index];
    if (el) {
      setCollectPosition({ left: el.offsetLeft });
    }
  };

  // +1 弹框
  const plusOne = useSelector((state: RootState) => state.collect.plusOne);
  useEffect(() => {
    if (plusOne) {
      const timer = setTimeout(() => {
        dispatch(resetPlusOne());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [plusOne]);

  // 收藏数据

  const FlightsCollections = [
    {
      id: 1,
      title: "Paris",
      subtitle: "France",
      reviews: "2,160",
      image: "/Eiffel1.png",
      routeName: "Paris, France"
    }
  ];

  const ActivitiesCollections = [
    {
      id: 1,
      title: "Paris",
      subtitle: "France",
      reviews: "2,160",
      image: "/Eiffel1.png",
      routeName: "Paris, France"
    },
    {
      id: 2,
      title: "New York",
      subtitle: "USA",
      reviews: "3,450",
      image: "/newyork1.png",
      routeName: "New York, USA"
    },
    {
      id: 3,
      title: "Tokyo",
      subtitle: "Japan",
      reviews: "1,980",
      image: "/tokyo1.png",
      routeName: "Tokyo, Japan"
    }
  ];

  // 监听 destination 状态变化，确保收藏状态同步更新
  const destination = useSelector((state: RootState) => state.destination);
  // 当前用户的收藏（没有就给空数组）
  const userDestination = user ? destination[user.id] || [] : [];

  const stay = useSelector((state: RootState) => state.stays);
  const userStays = user ? stay[user.id] || [] : [];

  // 收藏数据合集
  const collections = [
    { data: userDestination, label: "Destinations" },
    { data: userStays, label: "Stays" },
    { data: FlightsCollections, label: "Flights" },
    { data: ActivitiesCollections, label: "Activities" }
  ];

  // 当前激活的收藏类别
  const activeCollections = collections[activeTab];

  // 谷歌登录
  /* 
    const handleLogin = () => {
      window.location.href = getGoogleAuthURL();
    };
  
    useEffect(() => {
      const hash = window.location.hash;
      if (hash.includes("access_token")) {
        const params = new URLSearchParams(hash.replace("#", "?"));
        const accessToken = params.get("access_token");
        if (accessToken) {
          getGoogleUserInfo(accessToken)
            .then((userInfo) => {
              const user = {
                id: userInfo.sub,
                name: userInfo.name,
                email: userInfo.email
              };
              dispatch(login(user));
              dispatch(setShowLoginState(false)); // 关闭登录弹窗
            })
            .catch((error) => {
              console.error("Failed to fetch user info:", error);
            });
        }
      }
    }, [dispatch]); */

  // 消息弹窗
  const [showMessagePop, setShowMessagePop] = useState(false);
  // 消息弹窗内容
  const Message = [
    { title: "Limited-time offer", content: "Save up to 25% on Vermont hotels this week!" },
    { title: "Fall getaway deals are live", content: "Discover top weekend trips!" },
    { title: "Exclusive offer for members", content: "10% off your next booking." },
    { title: "New city added!", content: "Explore hotels in Miami now." },
    { title: "Hurry!", content: "Your favorite hotel has only 2 rooms left!" }
  ]

  // 设置弹窗
  const [showSettingPop, setShowSettingPop] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 消息弹窗
      const pop = document.querySelector(".messagePop");
      const icon = document.querySelector(".notify");
      if (pop && icon && !pop.contains(event.target as Node) && !icon.contains(event.target as Node)) {
        setShowMessagePop(false);
      }

      // 设置弹窗
      const pop2 = document.querySelector(".settingPop");
      const icon2 = document.querySelector(".setting");
      if (pop2 && icon2 && !pop2.contains(event.target as Node) && !icon2.contains(event.target as Node)) {
        setShowSettingPop(false);
      }

      // 收藏弹窗
      const pop3 = document.querySelector(".collectPop");
      const icon3 = document.querySelector(".collectArea");
      if (pop3 && icon3 && !pop3.contains(event.target as Node) && !icon3.contains(event.target as Node)) {
        setShowCollectPop(false);
      }

      // 用户头像弹窗
      const pop4 = document.querySelector(".userPop");
      const icon4 = document.querySelector(".afterLoginArea");
      if (pop4 && icon4 && !pop4.contains(event.target as Node) && !icon4.contains(event.target as Node)) {
        setShowPop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }

    return () => {
      body.classList.remove("dark-mode");
    };
  }, [isDarkMode]);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") setIsDarkMode(true);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  // 语言
  const [showLanguage, setShowLanguage] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);

  const { t } = useTranslation("common");
  const currentLanguage = i18n.language;

  const handleLanguageChange = (lng: "en" | "zh" | "es") => {
    setShowLanguage(false);
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  }

  // 货币
  const { current } = useAppSelector((state: RootState) => state.currency);

  const handleCurrencyChange = (currency: "USD" | "CNY" | "EUR") => {
    setShowCurrency(false);
    dispatch(setCurrency(currency));
    dispatch(fetchRates(currency));
    localStorage.setItem("currency", currency);
  }

  // 判断是否在 Map 页面
  const location = useLocation();
  const isMapPage = location.pathname === "/Map";

  return (
    <div>
      <div className="body" style={{ maxWidth: isMapPage ? "100%" : "calc(1366 / 1920 * 100vw)" }}>
        <div className="top">
          <Link to={"/"}  >
            <div className="homeLogo">
              <img src="/logo.svg" alt="" />
            </div>
          </Link>
          <div className="iconArea">
            <div className={`language ${showLanguage ? "pushState" : ""}`} onClick={() => setShowLanguage(!showLanguage)}>{t("nav.language")}</div>
            <div className={`currency ${showCurrency ? "pushState" : ""}`} onClick={() => setShowCurrency(!showCurrency)}>{t(`nav.${current}`)}</div>
            <div className={`notify ${showMessagePop ? "pushState" : ""}`} onClick={() => setShowMessagePop(!showMessagePop)}>
              <span className="notifySpot"></span>
            </div>
            <div className={`setting ${showSettingPop ? "pushState" : ""}`} onClick={() => setShowSettingPop(!showSettingPop)}></div>
            {user ? (
              <div className="afterLoginPop">
                <div className={`collectArea ${showCollectPop ? "pushState" : ""}`} onClick={handleCollectPop}>
                  <span className="collectIcon"></span>
                </div>
                <div className={`afterLoginArea ${showPop ? "pushState" : ""}`} onClick={handleShowPop}>
                  <span className="userIcon">
                    {user.email.charAt(0)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="loginArea" onClick={setShowLogin}>
                <span className="login" >{t("nav.Sign In")}</span>
              </div>
            )}
            {/* 用户头像弹窗 */}
            <div className={`userPop ${showPop ? "show" : ""}`} >
              <div className="userInfo">
                <div className="userAvatar">{user?.email.charAt(0)}</div>
                <div className="userDetails">
                  <div className="userName">Hi, {user?.name}</div>
                  <div className="userEmail">{user?.email}</div>
                </div>
              </div>
              <div className="userOptions">
                <div className="option1">My account</div>
                <div className="option2">Bookings & Tours</div>
                <div className="option3">Reviews</div>
                <div className="option4">Help</div>
              </div>
              <div className="logoutBtn" onClick={handleLogout}>Sign out</div>
            </div>
            {/* 收藏弹窗 */}
            <div className={`collectPop ${showCollectPop ? "show" : ""}`}>
              <div className="collectClose">
                <span className="iconfont" onClick={() => setShowCollectPop(false)}>&#xe621;</span>
              </div>
              <div className="collectTitle">
                { /* 头部tab */}
                {collectTabs.map((tab, index) => (
                  <h4
                    key={index}
                    className={`collectTitle1 ${index === activeTab ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCollectTabClick(index);
                    }}
                    ref={(el) => {
                      collectRef.current[index] = el;
                    }}
                  >
                    {tab}
                  </h4>
                ))}
                <div
                  className="collectLine"
                  style={{
                    position: "absolute",
                    bottom: -1,
                    left: `calc(${collectPosition.left}px`,
                    width: "calc(34 / 1920 * 100vw)",
                    height: "calc(4 / 1920 * 100vw)",
                    backgroundColor: "#25191a",
                    borderRadius: "calc(2 / 1920 * 100vw)",
                    marginTop: "calc(6 / 1920 * 100vw)",
                    transition: collectAnimation ? "all 0.3s ease" : "none",
                  }}
                ></div>
              </div>
              {/* 收藏内容 */}
              {activeCollections.data.length === 0 ? (
                <div className="noCollect">
                  <div className="noCollectInner">
                    <div className="illustration">
                      <img src="/noCollect.svg" alt="" />
                    </div>
                    <p className="noCollectText">Oops! No favorites yet.</p><br />
                    <p className="noCollectText2">Check out our popular recommendations and tap the heart icon when you find a property you like</p>
                  </div>
                </div>
              ) : (
                collections.map((collection, idx) => (
                  <div
                    key={idx}
                    className={`collectBox ${idx === activeTab ? "active" : ""}`}
                  >
                    {collection.data.map(item => (
                      <Explore
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        subtitle={item.subtitle}
                        reviews={item.reviews}
                        linkTo={
                          collection.label === "Destinations" ? `/Destination/${item.routeName}` :
                            collection.label === "Stays" ? `/staysList/${item.subtitle}/${item.id}` :
                              collection.label === "Flights" ? `/Destination/${item.routeName}` :
                                collection.label === "Activities" ? `/Destination/${item.routeName}` :
                                  "/"
                        }
                      />
                    ))}
                  </div>
                )))
              }
            </div>
            {/* +1 提示 */}
            <div className={`plusOne ${plusOne ? "show" : ""}`}>+1</div>
            {/* 消息弹窗 */}
            <div className={`messagePop ${showMessagePop ? "show" : ""}`}>
              <h3>{t("nav.Notifications")}</h3>
              <div className="messageList">
                {Message.map((msg, index) => (
                  <div className="messageContent" key={index}>
                    <h5>{msg.title}</h5>
                    <p>{msg.content}</p>
                  </div>
                ))}
              </div>
              {/* <div className="messageContent">
                <h5>Limited-time offer</h5>
                <p>Save up to 25% on Vermont hotels this week!</p>
              </div> */}
            </div>
            {/* 设置弹窗 */}
            <div className={`settingPop ${showSettingPop ? "show" : ""}`}>
              <h3>{t("nav.Settings")}</h3>
              <div className="darkModeSwitch">
                <h5>{t("nav.Dark Mode")}</h5>
                <div className={`darkModeSwitchOuter ${isDarkMode ? "active" : ""}`} onClick={() => { setIsDarkMode(!isDarkMode); }}>
                  <div className="darkModeSwitchInner">
                  </div>
                </div>
              </div>
            </div>
            {/* 语言弹窗 */}
            <div className={`languageBgc ${showLanguage ? "show" : ""}`} onClick={() => setShowLanguage(false)}>
              <div className={`languageModal ${showLanguage ? "languageModalShow" : ""}`} onClick={(e) => e.stopPropagation()}>
                <div className="languageClose">
                  <span className="iconfont" onClick={() => setShowLanguage(false)}>&#xe621;</span>
                </div>
                <div className="languageContent">
                  <div className={`English ${currentLanguage === "en" ? "selected" : ""}`} onClick={() => handleLanguageChange("en")}>
                    <h4>English</h4>
                    <p>United States</p>
                  </div>
                  <div className={`Chinese ${currentLanguage === "zh" ? "selected" : ""}`} onClick={() => handleLanguageChange("zh")}>
                    <h4>简体中文</h4>
                    <p>中国</p>
                  </div>
                  <div className={`Spanish ${currentLanguage === "es" ? "selected" : ""}`} onClick={() => handleLanguageChange("es")}>
                    <h4>Español</h4>
                    <p>España</p>
                  </div>
                </div>
              </div>
            </div>
            {/* 货币弹窗 */}
            <div className={`currencyBgc ${showCurrency ? "show" : ""}`} onClick={() => setShowCurrency(false)}>
              <div className={`currencyModal ${showCurrency ? "currencyModalShow" : ""}`} onClick={(e) => e.stopPropagation()}>
                <div className="currencyClose">
                  <span className="iconfont" onClick={() => setShowCurrency(false)}>&#xe621;</span>
                </div>
                <div className="currencyContent">
                  <div className={`USD ${current === "USD" ? "selected" : ""}`} onClick={() => handleCurrencyChange("USD")}>
                    <h4>United States dollar</h4>
                    <p>USD - $</p>
                  </div>
                  <div className={`CNY ${current === "CNY" ? "selected" : ""}`} onClick={() => handleCurrencyChange("CNY")}>
                    <h4>Chinese yuan</h4>
                    <p>CNY - ¥</p>
                  </div>
                  <div className={`EUR ${current === "EUR" ? "selected" : ""}`} onClick={() => handleCurrencyChange("EUR")}>
                    <h4>Euro</h4>
                    <p>EUR - €</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          showTab &&
          (<div className="bottom">
            {tabs.map((tab, index) => (
              <a
                key={index}
                href="/"
                className={`tab ${tab.replace(/\s+/g, "")} ${index === activeIndex ? "active" : ""}`}
                ref={(el) => {
                  tabRef.current[index] = el;
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(index);
                }}
              >
                {t(`nav.${tab}`)}
              </a>
            ))}
            <div
              className="line"
              style={{
                position: "absolute",
                bottom: 0,
                left: `calc(${position.left}px - calc(40 / 1920 * 100vw) / 2)`,
                height: "calc(4 / 1920 * 100vw)",
                width: "calc(40 / 1920 * 100vw)",
                backgroundColor: "#222",
                borderRadius: "calc(3 / 1920 * 100vw)",
                transition: animation ? "all 0.3s ease" : "none",
              }}
            ></div>
          </div >)
        }
      </div>
      {/* 登录弹窗 */}
      <div className={`loginBgc ${showLogin ? "show" : ""}`} onClick={() => dispatch(setShowLoginState(false))}>
        <div className={`loginModal ${showLogin ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
          <div className="loginClose">
            <span className="iconfont" onClick={() => dispatch(setShowLoginState(false))}>&#xe621;</span>
          </div>
          <div className="loginLogo">
            <img src="/logo.svg" alt="" />
          </div>
          <div className="loginTitle">{t("nav.Sign in or create an account")}</div>
          {/* input输入框 */}
          <div className="loginInput" ref={containerRef}>
            <input
              className={emailError ? "error" : ""}
              type="text"
              placeholder={t("nav.Email address")}
              value={email}
              ref={inputRef}
              onFocus={handleFocus}
              onChange={(e) => {
                setEmail(e.target.value);
                if (isValidEmail(e.target.value)) setEmailError(false);
              }}
            />
            {/* 无效邮箱提示 */}
            {emailError && <div className="errorMsg">{t("nav.Please enter a valid email address")}</div>}
            {/* 输入历史 */}
            {filteredHistory.length > 0 && (
              <ul className={`emailHistoryList ${showHistory ? "show" : ""}`}>
                {filteredHistory.map((e, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setEmail(e);
                      setShowHistory(false);
                    }}
                  >
                    {e}
                    <div
                      className="deleteBtn"
                      onClick={(event) => {
                        event.stopPropagation();
                        const newHistory = loginHistory.filter((item) => item !== e);
                        setLoginHistory(newHistory);
                        localStorage.setItem("loginHistory", JSON.stringify(newHistory));

                        // 如果删除后没有历史了，关闭列表
                        if (newHistory.length === 0) {
                          setShowHistory(false);
                        }
                        if (email === e) {
                          setEmail(""); // 如果删掉的是当前选中的，清空输入框
                        }
                      }}
                    >
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {/* 关闭按钮 */}
            {email && (
              <div
                className="clearBtn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClear}
              >
              </div>
            )}
          </div>
          <div
            className="loginBtn"
            onClick={handleMockLogin}
          >
            {t("nav.Continue")}
          </div>
          <div className="loginOther">
            <div className="loginOtherLine"></div>
            <p>{t("nav.or")}</p>
            <div className="loginOtherLine"></div>
          </div>
          <div className="loginOtherBtn">
            <div className="google" onClick={mockLogin}>
              <img src="/google.svg" alt="google" />
            </div>
            <div className="facebook">
              <img src="/facebook.svg" alt="facebook" />
            </div>
            <div className="apple">
              <img src="/apple.svg" alt="apple" />
            </div>
            <div className="instagram">
              <img src="/Instagram.svg" alt="instagram" />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Header