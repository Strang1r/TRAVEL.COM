import Header from "../../components/Home/Header";
import Search from "../../components/Home/Search";
import Next from "../../components/Home/Next";
import Stays from "../../components/Home/Stays";
import Activities from "../../components/Home/Activities";
import Journals from "../../components/Home/Journals";
import About from "../../components/Home/About";
import HotelSearch from "../../components/Home/HotelSearch";
import { useState } from "react";
import "../../components/Home/Home.scss"


const Home = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="line1">
        <Header
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          showTab={true}
        />
      </div>
      <div className="App">
        <div className="searchWrapper" style={{ zIndex: 2 }}>
          <Search className={activeIndex !== 1 ? "active" : "inactive"} />
          <HotelSearch className={activeIndex === 1 ? "active" : "inactive"} />
        </div>
        <Next />
        <Stays />
        <Activities />
        <Journals />
      </div>
      <div className="footer">
        <About />
      </div>
    </div>

  )
}

export default Home

