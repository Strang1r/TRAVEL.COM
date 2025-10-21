import "./Journals.scss";
import Collect from './Collect';
import JournalsCard from "./JournalsCard"
import { useTranslation } from "react-i18next";

const Journals = () => {
  const { t } = useTranslation("common");

  const journals = [
    {
      id: 11,
      image: "public/jou2.png",
      title: t("journals.A Food Lover’s Guide to Tokyo"),
      user: "GourmetGlobetrotter",
      like: "519",
      time: t("journals.March 2023")
    },
    {
      id: 22,
      image: "public/jou3.png",
      title: t("journals.Road Tripping Through the American Southwest"),
      user: "Jake_Adventures",
      like: "1.5k",
      time: t("journals.September 2022")
    },
    {
      id: 33,
      image: "public/jou4.png",
      title: t("journals.A Romantic Getaway in Santorini"),
      user: "Lovebirds_Travel",
      like: "989",
      time: t("journals.June 2023")
    },
    {
      id: 44,
      image: "public/jou5.png",
      title: t("journals.Backpacking Through Patagonia"),
      user: "WildSoul_Trekker",
      like: "13k",
      time: t("journals.December 2022")
    },
  ]

  return (
    <div className="journals">
      <div className="title">
        <div className="left">
          {t("journals.Popular Travel Journals")}
        </div>
        <div className="right">
          {t("journals.More")}
        </div>
      </div>
      <div className="content">
        <a href="#" className="item1" onClick={e => e.preventDefault()}>
          <Collect />
          <img src="public/jou1.png" alt="" />
          <div className="item1-content">
            <h1 className="h1">{t("journals.Chasing the Northern Lights in Iceland")}</h1>
            <span className="user_name">Lovebirds_Travel</span>
            <span className="likes">4.5k {t("journals.Likes")}</span>
            <p className="description">{t("journals.Experiencing the Northern Lights")}</p>
            <p className="date">{t("journals.June 2023")}</p>
          </div>
        </a>
        <div className="item2">
          {/* <a href="#" className="item2-content" onClick={(e) => e.preventDefault()}>
            <div className="photo">
              <img src="public/jou2.png" alt="" />
              <Collect />
            </div>
            <div className="info">
              <h3 className="title">A Food Lover’s Guide to Tokyo</h3>
              <p className="user">GourmetGlobetrotter</p>
              <p className="like">541 Likes</p>
              <p className="time">March 2023</p>
            </div>
          </a> */}
          {journals.map(jou => (<JournalsCard
            key={jou.id}
            image={jou.image}
            title={jou.title}
            user={jou.user}
            like={jou.like}
            time={jou.time}
          />))}
        </div>
      </div>
    </div>
  );
}

export default Journals;
