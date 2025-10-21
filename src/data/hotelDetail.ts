interface Hotel {
  hotelName: string;
  location: string;
}

interface HotelCityData {
  [id: number]: Hotel;
}

// hotelSearch & StayDetails  use this data
export const hotelDatas: { [city: string]: HotelCityData } = {
  "Paris, France": {
    1: {
      hotelName: "Hôtel de Crillon",
      location: "Place de la Concorde, Paris"
    },
    2: {
      hotelName: "Le Meurice",
      location: "Rue de Rivoli, Paris"
    },
    3: {
      hotelName: "Hôtel Lutetia",
      location: "Saint-Germain-des-Prés, Paris"
    },
    4: {
      hotelName: "Mandarin Oriental, Paris",
      location: "Rue Saint-Honoré, Paris 1er"
    }
  },
  "New York, USA": {
    5: {
      hotelName: "The Plaza Hotel",
      location: "Fifth Avenue at Central Park South, New York"
    },
    6: {
      hotelName: "The St. Regis New York",
      location: "East 55th Street at Fifth Avenue, New York"
    },
    7: {
      hotelName: "The Langham, New York, Fifth Avenue",
      location: "Fifth Avenue, New York"
    },
    8: {
      hotelName: "The Mark",
      location: "Madison Avenue at 77th Street, New York"
    }
  },
  "Tokyo, Japan": {
    9: {
      hotelName: "Imperial Hotel, Tokyo",
      location: "Chiyoda, Tokyo"
    },
    10: {
      hotelName: "Park Hyatt Tokyo",
      location: "Shinjuku, Tokyo"
    },
    11: {
      hotelName: "The Ritz-Carlton, Tokyo",
      location: "Roppongi, Tokyo"
    },
    12: {
      hotelName: "Mandarin Oriental, Tokyo",
      location: "Nihonbashi, Tokyo"
    }
  },
  "Boston, USA": {
    13: {
      hotelName: "The Godfrey Hotel Boston",
      location: "505 Washington St, Boston, MA 02111"
    },
    14: {
      hotelName: "Hyatt Centric Faneuil Hall Boston",
      location: "54-68 Devonshire St, Boston, MA 02109"
    },
    15: {
      hotelName: "Eurostars The Boxer",
      location: "107 Merrimac St, Boston, MA 02114"
    },
    16: {
      hotelName: "Boston Marriott Long Wharf",
      location: "296 State St, Boston, MA 02109"
    },
    17: {
      hotelName: "The Westin Copley Place, Boston",
      location: "10 Huntington Ave, Boston, MA 02116"
    },
    18: {
      hotelName: "Omni Boston Hotel at the Seaport",
      location: "1 Boston Wharf Rd, Boston, MA 02210"
    },
    19: {
      hotelName: "Fairmont Copley Plaza, Boston",
      location: "138 St James Ave, Boston, MA 02116"
    },
    20: {
      hotelName: "InterContinental Boston",
      location: "510 Atlantic Ave, Boston, MA 02210"
    },
    21: {
      hotelName: "The Langham, Boston",
      location: "250 Franklin St, Boston, MA 02110"
    },
    22: {
      hotelName: "Seaport Hotel Boston",
      location: "1 Seaport Ln, Boston, MA 02210"
    },
    23: {
      hotelName: "Kimpton Nine Zero Hotel",
      location: "90 Tremont St, Boston, MA 02108"
    },
    24: {
      hotelName: "Harvard Square Hotel",
      location: "110 Mt Auburn St, Cambridge, MA 02138"
    }
  }
};

export const images = [
  {
    id: 1,
    src: "/stay5.png",
  },
  {
    id: 2,
    src: "/stay2.png",
  },
  {
    id: 3,
    src: "/stay3.png",
  },
  {
    id: 4,
    src: "/stay4.png",
  },
  {
    id: 5,
    src: "/stay2.png",
  },
  {
    id: 6,
    src: "/stay3.png",
  },
];


export const StayDetailsStays = [
  {
    id: 1,
    city: "Paris, France",
    image: "/stay1.png",
    sname: "Hôtel de Crillon",
    rating: 4.7,
    distance: "500m from the beach",
    type: "Luxury Resort",
    price: 450,
    reviews: "1,024"
  },
  {
    id: 2,
    city: "Paris, France",
    image: "/stay2.png",
    sname: "Rue de Rivoli, Paris",
    rating: 4.4,
    distance: "2km from downtown",
    type: "Boutique Hotel",
    price: 420,
    reviews: "876"
  },
  {
    id: 3,
    city: "Paris, France",
    image: "/stay3.png",
    sname: "Hôtel Lutetia",
    rating: 4.8,
    distance: "1.5km from central station",
    type: "Business Hotel",
    price: 72,
    reviews: "1,342"
  },
  {
    id: 4,
    city: "Paris, France",
    image: "/stay4.png",
    sname: "Mandarin Oriental, Paris",
    rating: 3.6,
    distance: "500m from the beach",
    type: "Luxury Resort",
    price: 250,
    reviews: "654"
  },
  {
    id: 5,
    city: "New York, USA",
    image: "/stay5.png",
    sname: "The Plaza Hotel",
    rating: 4.9,
    distance: "3km from the airport",
    type: "Budget Inn",
    price: 99,
    reviews: "2,345"
  },
];

export const StayDetailsRooms = [
  {
    id: 1,
    image: "/stay1.png",
    roomname: "Room with Two Queen Beds - Non-Smoking",
    bedtype: "1 Queen bed",
    roomsize: 20,
    windows: "Has windows",
    wifi: "Free Wifi",
    ac: "Air conditioning",
    bathroom: "Private bathroom",
    smoking: "Non-smoking",
    refundable: "Fully refundable",
    parking: "Free parking",
    breakfast: "Breakfast included",
    roomprice: 99,
    night: 1,
    tax: "includes taxes and fees"
  },
  {
    id: 2,
    image: "/stay2.png",
    roomname: "Room with King Bed - Ocean View",
    bedtype: "1 King bed",
    roomsize: 25,
    windows: "Has windows",
    wifi: null,
    ac: "Air conditioning",
    bathroom: "Private bathroom",
    smoking: "Non-smoking",
    refundable: null,
    parking: "Free parking",
    breakfast: null,
    roomprice: 129,
    night: 1,
    tax: "includes taxes and fees"
  },
  {
    id: 3,
    image: "/stay3.png",
    roomname: "Standard Room with Two Double Beds",
    bedtype: "2 Double beds",
    roomsize: 22,
    windows: "No windows",
    wifi: "Free Wifi",
    ac: "Air conditioning",
    bathroom: null,
    smoking: null,
    refundable: "Fully refundable",
    parking: null,
    breakfast: null,
    roomprice: 89,
    night: 1,
    tax: null
  },
  {
    id: 4,
    image: "/stay4.png",
    roomname: "Deluxe Suite with King Bed",
    bedtype: "1 King bed",
    roomsize: 30,
    windows: "Has windows",
    wifi: "Free Wifi",
    ac: "Air conditioning",
    bathroom: "Private bathroom",
    smoking: "Non-smoking",
    refundable: "Fully refundable",
    parking: "Free parking",
    breakfast: "Breakfast included",
    roomprice: 199,
    night: 1,
    tax: "includes taxes and fees"
  },
]

export const StayDetailsReviews = [
  {
    id: 1,
    image: "/jou1.png",
    rating: "★★★★★",
    username: "Ray Antoine",
    reviewText: "I stayed at Ocean Breeze Resort for three nights, and it was a wonderful experience overall. The rooms were spacious, clean, and had a fresh, modern design. I especially loved the balcony view of the ocean—it was the perfect spot to relax in the evening!",
    reviewDate: "1 weeks ago"
  },
  {
    id: 2,
    image: "/jou2.png",
    rating: "★★★★☆",
    username: "Alex Johnson",
    reviewText: "I stayed at Ocean Breeze Resort for three nights, and it was a wonderful experience overall. The rooms were spacious, clean, and had a fresh, modern design. I especially loved the balcony view of the ocean—it was the perfect spot to relax in the evening! view of the ocean—it was the perfect spot to relax in the evening!",
    reviewDate: "2 weeks ago"
  },
  {
    id: 3,
    image: "/jou3.png",
    rating: "★★★☆☆",
    username: "Emily Davis",
    reviewText: "I stayed at Ocean Breeze Resort for three nights.",
    reviewDate: "3 weeks ago"
  },
  {
    id: 4,
    image: "/jou4.png",
    rating: "★★★★★",
    username: "Michael Smith",
    reviewText: "I stayed at Ocean Breeze Resort for three nights, and it was a wonderful experience overall. The rooms were spacious, clean, and had a fresh, modern design. I especially loved the balcony view of the ocean—it was the perfect spot to relax in the evening!",
    reviewDate: "4 weeks ago"
  },
]