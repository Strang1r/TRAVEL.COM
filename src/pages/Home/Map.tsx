import Header from "../../components/Home/Header";
import "../../components/Map/Map.scss";
import MapBody from "../../components/Map/MapBody";

const Map = () => {
  return (
    <div className="MapPage">
      <div className="mapLine"></div>
      <div className="mapContainer">
        <Header
          showTab={false}
        />
        <MapBody />
      </div>

    </div>
  );
}

export default Map;