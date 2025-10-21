import store, { type RootState } from "../../store/store"
import { convertPrice } from "../../utils/currency"
import { useAppSelector } from "../../store/hooks"

type TicketItemProps = {
  name: string
  cancellation: string
  bookTime: string
  departsCity: string | null
  rating: number
  reviews: number | string
  price: number
}

const TicketItem = ({ name, cancellation, bookTime, departsCity, rating, reviews, price }: TicketItemProps) => {
  const symbols: Record<string, string> = { USD: "$", CNY: "¥", EUR: "€" };
  const { current } = useAppSelector((state: RootState) => state.currency);
  const priceConverted = convertPrice(store.getState(), price);

  return (
    <div className="TicketItem shadow">
      <div className="TicketItemLeft">
        <div className="TicketItemLeftTop">
          <h3>{name}</h3>
          <p className="freeCancel">{cancellation}</p>
          <p className="bookTime">{bookTime}</p>
        </div>
        <div className="TicketItemLeftBottom">
          <p>{departsCity}</p>
        </div>
      </div>
      <div className="TicketItemRight">
        <div className="TicketItemRightTop">
          <div className="TicketRating">
            <p>{rating}</p>
          </div>
          <p className="TicketReviews">{reviews} reviews</p>
        </div>
        <div className="TicketItemRightBottom">
          <p>From</p>
          <p>{symbols[current]}{priceConverted}</p>
        </div>
      </div>
    </div>
  )
}

export default TicketItem