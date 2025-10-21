type MustSeeProps = {
  image1: string;
  image2: string;
  image3: string;
  name: string;
  rating: number;
  address: string;
  time: string;
  price: string;
}

const MustSee = ({
  image1,
  image2,
  image3,
  name,
  rating,
  address,
  time,
  price
}: MustSeeProps) => {
  return (
    <div className="mustSeeItem shadow">
      <div className="mustSeeImage">
        <div className="mustSeeImageLeft">
          <div className="mustSeeImageLeftTop">
            <img src={image2} alt="" />
          </div>
          <div className="mustSeeImageLeftBottom">
            <img src={image3} alt="" />
          </div>
        </div>
        <div className="mustSeeImageRight">
          <img src={image1} alt="" />
        </div>
      </div>
      <div className="mustSeeName">
        <h3>{name}</h3>
        <p>{rating}</p>
      </div>
      <div className="mustSeeInfo">
        <p className="mustSeeAddress">{address}</p>
        <p className="mustSeeTime">{time}</p>
        <p className="mustSeePrice">{price}</p>
      </div>
    </div>
  );
}


export default MustSee
