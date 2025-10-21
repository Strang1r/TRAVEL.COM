type Props = {
  image: string;
  rating: string;
  username: string;
  reviewText: string;
  reviewDate: string;
};

const Reviews = ({ image, rating, username, reviewText, reviewDate }: Props) => {
  return (
    <div className="review1">
      <div className="userInfo">
        <div className="headImg">
          <img src={image} alt="" />
        </div>
        <div className="username">
          <p>{username}</p>
          <span>{rating}</span>
        </div>
      </div>
      <p className="reviewText">{reviewText}</p>
      <p className="reviewDate">{reviewDate}</p>
    </div>
  )
};

export default Reviews;