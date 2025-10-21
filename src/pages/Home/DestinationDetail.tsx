
import DesDetail from "../../components/DestinationList/DesDetail";
import Search from "../../components/Home/Search";
import Header from "../../components/Home/Header";
import About from "../../components/Home/About";


const DestinationDetail1 = () => {
  return (
    <div className="destinationList" style={{ height: "100%" }}>
      <div className="line1">
        <Header
          showTab={false}
        />
      </div>
      <div className="stayDetailsSearch">
        <Search />
      </div>
      <div className="main4">
        <DesDetail />
      </div>
      <div className="stayDetailsfooter">
        <About />
      </div>
    </div>
  )
}

export default DestinationDetail1;