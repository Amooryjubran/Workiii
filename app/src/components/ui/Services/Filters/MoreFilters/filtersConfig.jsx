import { Map, Star, DollarSign, Search } from "react-feather";
import Locations from "./Locations";
import Pricing from "./Pricing";
import Ratings from "./Ratings";

// Define filter options
const filterOptions = [
  {
    label: "Location",
    title: "Add Location",
    icon: <Map size={14} color="black" />,
    content: <Locations />,
  },
  {
    label: "Pricing",
    title: "Set Pricing",
    icon: <DollarSign size={14} color="black" />,
    content: <Pricing />,
  },
  {
    label: "Rating",
    title: "Set Rating",
    icon: <Star size={14} color="black" />,
    content: <Ratings />,
  },
  {
    label: "Search",
    title: "Search Options",
    icon: <Search size={14} color="black" />,
    content: <div>Soon...</div>,
  },
];

// Define function to check if a filter is active
const isFilterActive = (filters, filterType) => {
  switch (filterType) {
    case "Location":
      return filters.locations.length > 0;
    case "Pricing":
      return filters.priceMin > 0 || filters.priceMax < 1000;
    case "Rating":
      return filters.rating !== undefined;
    case "Search":
      return filters?.searchQuery?.length > 0;
    default:
      return false;
  }
};

export { filterOptions, isFilterActive };
