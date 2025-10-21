import './StayDetailsTop.scss';
import Image from './Image';
import WifiIcon from '@mui/icons-material/Wifi';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import LocalParkingOutlinedIcon from '@mui/icons-material/LocalParkingOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined';
import DryOutlinedIcon from '@mui/icons-material/DryOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import CameraOutdoorOutlinedIcon from '@mui/icons-material/CameraOutdoorOutlined';
import { useParams } from 'react-router-dom';
import { hotelDatas, images } from '../../data/index';

const StayDetailsTop = () => {

  const amenities = [
    { icon: <WifiIcon style={{ fontSize: "calc(20 / 1920 * 100vw)", color: "#342f2f", marginRight: "calc(12 / 1920 * 100vw)" }} />, label: "Wifi" },
    { icon: <MicrowaveIcon style={{ fontSize: "calc(20 / 1920 * 100vw)", color: "#342f2f", marginRight: "calc(12 / 1920 * 100vw)" }} />, label: "Kitchen" },
    { icon: <WorkHistoryOutlinedIcon style={{ fontSize: "calc(20 / 1920 * 100vw)", color: "#342f2f", marginRight: "calc(12 / 1920 * 100vw)" }} />, label: "Workspace" },
    { icon: <LocalParkingOutlinedIcon style={{ fontSize: "calc(20 / 1920 * 100vw)", color: "#342f2f", marginRight: "calc(12 / 1920 * 100vw)" }} />, label: "Free parking" },
    { icon: <PetsOutlinedIcon style={{ fontSize: "calc(20 / 1920 * 100vw)", color: "#342f2f", marginRight: "calc(12 / 1920 * 100vw)" }} />, label: "Pets allowed" },
    { icon: <TvOutlinedIcon style={{ fontSize: "calc(20 / 1920 * 100vw)", color: "#342f2f", marginRight: "calc(12 / 1920 * 100vw)" }} />, label: "TV" },
    { icon: <LocalLaundryServiceOutlinedIcon style={{ fontSize: "calc(20 / 1920 * 100vw)", color: "#342f2f", marginRight: "calc(12 / 1920 * 100vw)" }} />, label: "Washer" },
    { icon: <DryOutlinedIcon style={{ fontSize: "calc(20 / 1920 * 100vw)", color: "#342f2f", marginRight: "calc(12 / 1920 * 100vw)" }} />, label: "Free dryer" },
    { icon: <AcUnitOutlinedIcon style={{ fontSize: "calc(20 / 1920 * 100vw)", color: "#342f2f", marginRight: "calc(12 / 1920 * 100vw)" }} />, label: "Air conditioning" },
    { icon: <CameraOutdoorOutlinedIcon style={{ fontSize: "calc(20 / 1920 * 100vw)", color: "#342f2f", marginRight: "calc(12 / 1920 * 100vw)" }} />, label: "Security cameras" },
  ];

  const handleClick = () => {
    const vw = window.innerWidth;
    const offset = (1400 / 1920) * vw;
    window.scrollTo({
      top: offset,
      behavior: "smooth"
    });
  }

  const { city, id } = useParams<{ city: string; id: string }>();

  if (!city || !id) return <p>Invalid URL</p>;

  // 把 id 转为 number
  const hotelId = Number(id);

  // 用类型断言 city 是合法 key
  const hotel = hotelDatas[city as keyof typeof hotelDatas]?.[hotelId];

  if (!hotel) return <p>Hotel not found</p>;


  return (
    <div className="stayDetailsTop" >
      <div className='detailsTitle'>
        <div className='detailsTitleText'>
          <h2>{hotel.hotelName}</h2>
          <p>{hotel.location}</p>
          <a href="#">Show on map</a>
        </div>
        <div className='detailsTitleButton' onClick={handleClick}>
          <span>Select a room</span>
        </div>
      </div>
      <div className='detailsImg'>
        <div className='detailsImgs'>
          {images.map((image) => (
            <Image key={image.id} src={image.src} />
          ))}
        </div>
        <div className='detailsImgIcon'>
          <div className='detailsImgIconTop'>
            <h3>Amenities</h3>
            <div className='detailsIcon'>
              {/* <span><WifiIcon style={{ fontSize: 'calc(20 / 1920 * 100vw)', color: '#342f2f', marginRight: 'calc(14 / 1920 * 100vw)' }} />Icon1</span> */}
              {amenities.map((amenity, index) => (
                <span key={index}>{amenity.icon}{amenity.label}</span>
              ))}
              <div>Show all 64 amenities</div>
            </div>
          </div>
          <div className='detailsImgIconBottom'>
            <h3>Policies</h3>
            <div className='checkTime'>
              <div className='checkIn'>
                <p className='checkInTitle'>Check-in</p>
                <p>3 PM</p>
              </div>
              <div className='checkOut'>
                <p className='checkOutTitle'>Check-out</p>
                <p>1 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default StayDetailsTop

