import { useTranslation } from "react-i18next";
import Collect from "./Collect";

type journals = {
  image: string,
  title: string,
  user: string,
  like: string,
  time: string
}

const JournalsCard = ({ image, title, user, like, time }: journals) => {
  const { t } = useTranslation("common");

  return (
    <a href="#" className="item2-content" onClick={(e) => e.preventDefault()}>
      <div className="photo">
        <img src={image} alt="" className="img" />
        <Collect />
      </div>
      <div className="info">
        <div className="textInfo">
          <h3 className="title">{title}</h3>
          <p className="user">{user}</p>
          <p className="like">{like} {t("journals.Likes")}</p>
        </div>
        <div className="timeContainer">
          <p className="time">{time}</p>
        </div>
      </div>
    </a>
  )
}

export default JournalsCard