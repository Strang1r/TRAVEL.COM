import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import StaysList from "../pages/Home/StaysList";
import StaysDetails from "../pages/Home/StaysDetails";
import DestinationList from "../pages/Home/DestinationList";
import DestinationDetail1 from "../pages/Home/DestinationDetail";
import Map from "../pages/Home/Map";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/staysList',
    element: <StaysList />
  },
  {
    path: '/staysList/:city/:id',
    element: <StaysDetails />
  },
  {
    path: '/Destination',
    element: <DestinationList />
  },
  {
    path: '/Destination/:attractionName',
    element: <DestinationDetail1 />
  },
  {
    path: '/Map',
    element: <Map />
  }
])