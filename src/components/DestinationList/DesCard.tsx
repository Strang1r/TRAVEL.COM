import Collect from "../Home/Collect";

type DesCardProps = {
  id: number;
  image: string;
  name: string;
  subtitle?: string;
  routeName?: string;
  rating: number;
  reviews: number | string;
  icons: string[];
}

const DesCard = ({ id, image, name, subtitle, routeName, rating, reviews, icons }: DesCardProps) => {
  return (
    <div className='attractionItem shadow'>
      <div className='attractionImage'>
        <Collect
          id={id}
          title={name}
          subtitle={subtitle || ""}
          reviews={reviews.toString()}
          image={image}
          routeName={routeName || ""}
        />
        <div className='imageOverlay'></div>
        <h5>{reviews} reviews</h5>
        <img src={image} alt={name} />
      </div>
      <div className='attractionName'>
        <h3>{name}</h3>
        <h5>{rating}</h5>
      </div>
      <div className='icon-row'>
        {icons.map((iconName, index) => (
          <i key={index} className={`iconfont ${iconName}`}></i>
        ))}
      </div>
    </div>
  );
}

export default DesCard;