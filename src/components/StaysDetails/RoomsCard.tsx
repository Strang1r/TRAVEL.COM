import { useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store/store";
import store from "../../store/store";
import { convertPrice } from "../../utils/currency";

type RoomsCardProps = {
  image: string;
  roomname: string;
  bedtype: string;
  roomsize: number;
  windows: string;
  wifi: string | null;
  ac: string | null;
  bathroom: string | null;
  smoking: string | null;
  refundable: string | null;
  parking: string | null;
  breakfast: string | null;
  roomprice: number;
  night: number;
  tax: string | null;
};

const RoomsCard = ({ image, roomname, bedtype, roomsize, windows, wifi, ac, bathroom, smoking, refundable, parking, breakfast, roomprice, night, tax }: RoomsCardProps) => {
  const symbols: Record<string, string> = { USD: "$", CNY: "¥", EUR: "€" };
  const { current } = useAppSelector((state: RootState) => state.currency);
  const convertedPrice = convertPrice(store.getState(), roomprice);

  return (
    <div className="roomDetails">
      <div className="roomImg">
        <img src={image} alt="" />
      </div>
      <div className="roomPrice">
        <div className="roomPriceBoxLeft">
          <div className="roomPriceBoxLeftTop">
            <h3 className="roomName">{roomname}</h3>
            <div className="roomInfo">
              <p className="bed">{bedtype}</p>
              <p className="roomSize">{roomsize} m²</p>
              <p className="windows">{windows}</p>
            </div>
            <div className="roomFacilities">
              {wifi && <p className="roomWifi">{wifi}</p>}
              {ac && <p className="airConditioning">{ac}</p>}
              {bathroom && <p className="bathroom">{bathroom}</p>}
              {smoking && <p className="noSmoking">{smoking}</p>}
            </div>
          </div>
          <div className="roomPriceBoxLeftBottom">
            {refundable && <p>{refundable}</p>}
            {parking && <p>{parking}</p>}
            {breakfast && <p>{breakfast}</p>}
          </div>
        </div>
        <div className="roomPriceBoxRight">
          <div className="bookPrice">
            <p className="p3">{symbols[current]}{convertedPrice}</p>
            <p className="p4">{night} night</p>
            <p className="p5">{tax}</p>
          </div>
          <button className="bookNow">Book Now</button>
        </div>
      </div>
    </div>
  )
};

export default RoomsCard;