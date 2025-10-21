import { useState } from "react"
import "./Collect.scss";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { setShowLoginState } from "../../store/loginPop";
import { triggerPlusOne } from "../../store/collectSlice";
import { addDestination, removeDestination } from "../../store/destinationSlice";

type CollectProps = {
  id: number;
  title: string;
  subtitle: string;
  reviews: string;
  image: string;
  routeName: string;
};

const Collect = ({ id, title, image, subtitle, reviews, routeName }: CollectProps) => {
  const [animate, setAnimate] = useState(false)

  // 导入redux
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  // 检查当前项目是否已收藏
  const isCollected = useSelector((state: RootState) => {
    if (!user) return false;
    const userDestinations = state.destination[user.id] || [];
    return userDestinations.some(dest => dest.id === id);
  });

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    e.preventDefault();

    // 如果没有登录，阻止收藏功能
    if (!user) {
      dispatch(setShowLoginState(true));
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    setAnimate(true);

    if (!isCollected) {
      dispatch(triggerPlusOne());
      dispatch(addDestination({ userId: user.id, destination: { id, title, subtitle, reviews, image, routeName } }));
    } else {
      dispatch(removeDestination({ userId: user.id, id }));
    }
    setTimeout(() => { setAnimate(false) }, 100);
  }

  return (
    <span
      className={`collect ${animate ? 'active' : ''}`}
      title={isCollected ? "Item saved" : "Save this item"}
      onClick={handleClick}
    >
      <img src={isCollected ? "/heart2.svg" : "/heart1.svg"} alt="" />
    </span>
  )
}

export default Collect