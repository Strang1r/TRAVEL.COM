import "../../components/StaysDetails/StaysDetails.scss";
import StayDetailsTop from "../../components/StaysDetails/StayDetailsTop";
import StayDetailsBottom from "../../components/StaysDetails/StayDetailsBottom";
import Header from "../../components/Home/Header";
import HotelSearch from "../../components/Home/HotelSearch";
import About from "../../components/Home/About";

const StaysDetails = () => {
  return (
    <div className="stayDetails">
      <div className="line3">
        <Header
          showTab={false}
        />
      </div>
      <div className="stayDetailsSearch">
        <HotelSearch />
      </div>
      <div className="main4">
        <StayDetailsTop />
        <StayDetailsBottom />
      </div>
      <div className="stayDetailsfooter">
        <About />
      </div>
    </div>
  );
};

export default StaysDetails;