import HotelList from "../../components/Home/StaysList/HotelList";
import "../../components/Home/StaysList/stayList.scss";
import HotelSearch from "../../components/Home/HotelSearch";
import Header from "../../components/Home/Header";
import About from "../../components/Home/About";

const StaysList = () => {

  return (
    <div className="stayList">
      <div className="line1">
        <Header
          showTab={false}
        />
      </div>
      <div className="stayListSearch">
        <HotelSearch />
      </div>
      <HotelList />
      <div className="stayListfooter">
        <About />
      </div>
    </div>
  )
}

export default StaysList