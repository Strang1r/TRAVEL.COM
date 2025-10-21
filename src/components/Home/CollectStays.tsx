import { useState } from "react"
import "./Collect.scss";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { setShowLoginState } from "../../store/loginPop";
import { triggerPlusOne } from "../../store/collectSlice";
import { addStay, removeStay } from "../../store/staysSlice";

type CollectProps = {
  id: number;
  title: string;
  subtitle: string;
  reviews: string;
  image: string
};

const CollectStays = ({ id, title, subtitle, reviews, image }: CollectProps) => {
  const [animate, setAnimate] = useState(false)

  // 导入redux
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  // 检查当前项目是否已收藏
  const isCollected = useSelector((state: RootState) => {
    if (!user) return false;
    const UserStays = state.stays[user.id] || [];
    return UserStays.some(dest => dest.id === id);
  });

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    // 如果没有登录，阻止收藏功能
    if (!user) {
      dispatch(setShowLoginState(true));
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    setAnimate(true);

    if (!isCollected) {
      dispatch(triggerPlusOne());
      dispatch(addStay({ userId: user.id, stay: { id, title, subtitle, reviews, image } }));
    } else {
      dispatch(removeStay({ userId: user.id, id }));
    }
    setTimeout(() => { setAnimate(false) }, 100);
  }

  return (
    <span
      className={`collectStay ${animate ? 'active' : ''}`}
      title={isCollected ? "Item saved" : "Save this item"}
      onClick={handleClick}
    >
      <img src={isCollected ? "/heart2.svg" : "/heart1.svg"} alt="" />
    </span>
  )
}

export default CollectStays;