
type ImageProps = {
  src: string;
};

const Image = ({ src }: ImageProps) => {
  return (
    <div className="image-container">
      <img src={src} alt="" />
    </div>
  );
};

export default Image;