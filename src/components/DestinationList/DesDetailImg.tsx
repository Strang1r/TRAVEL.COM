type DesDetailImgProps = {
  imgSrc: string
}

const DesDetailImg = ({ imgSrc }: DesDetailImgProps) => {
  return (
    <div>
      <img src={imgSrc} alt="" />
    </div>
  )
}

export default DesDetailImg