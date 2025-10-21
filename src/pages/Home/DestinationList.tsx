import About from "../../components/Home/About";
import DestinationList1 from "../../components/DestinationList/DestinationList";
import Search from "../../components/Home/Search";
import Header from "../../components/Home/Header";


const DestinationList = () => {
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
        <DestinationList1 />
      </div>
      <div className="stayDetailsfooter">
        <About />
      </div>
    </div>
  )
}

export default DestinationList