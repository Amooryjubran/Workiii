import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useDebounce from "./useDebounce";

const useServiceFilters = (setFilter, filters) => {
  const debouncedPriceMin = useDebounce(filters.priceMin, 1000);
  const debouncedPriceMax = useDebounce(filters.priceMax, 1000);

  const navigate = useNavigate();
  const location = useLocation();

  // Define default filter values
  const defaultFilters = {
    priceMin: 0,
    priceMax: 1000,
    category: "",
  };

  // Parse URL Parameters and Initialize Filters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const priceMinFromUrl = queryParams.get("priceMin");
    const priceMaxFromUrl = queryParams.get("priceMax");
    const categoryFromUrl = queryParams.get("category");

    if (priceMinFromUrl !== null) {
      setFilter("priceMin", parseInt(priceMinFromUrl, 10));
    }
    if (priceMaxFromUrl !== null) {
      setFilter("priceMax", parseInt(priceMaxFromUrl, 10));
    }
    if (categoryFromUrl !== null) {
      setFilter("category", categoryFromUrl);
    }
  }, [location.search, setFilter]);

  // Update filters in the Zustand store when debounced values change
  useEffect(() => {
    setFilter("priceMin", debouncedPriceMin);
    setFilter("priceMax", debouncedPriceMax);
  }, [debouncedPriceMin, debouncedPriceMax, setFilter]);

  // Update URL with filter changes
  useEffect(() => {
    const params = new URLSearchParams();

    // Add parameters only if they differ from default values
    if (debouncedPriceMin !== defaultFilters.priceMin) {
      params.set("priceMin", debouncedPriceMin);
    }
    if (debouncedPriceMax !== defaultFilters.priceMax) {
      params.set("priceMax", debouncedPriceMax);
    }
    if (filters.category && filters.category !== defaultFilters.category) {
      params.set("category", filters.category);
    }

    // Determine if we need to update the URL
    const newSearchString = params.toString();
    if (location.search !== `?${newSearchString}` && newSearchString !== "") {
      navigate(
        { pathname: location.pathname, search: newSearchString },
        { replace: true }
      );
    } else if (location.search !== "" && newSearchString === "") {
      // Navigate back to the base URL if all filters are default
      navigate(location.pathname, { replace: true });
    }
  }, [
    debouncedPriceMin,
    debouncedPriceMax,
    filters.category,
    navigate,
    location.pathname,
    location.search,
  ]);

  return { debouncedPriceMin, debouncedPriceMax };
};

export default useServiceFilters;
