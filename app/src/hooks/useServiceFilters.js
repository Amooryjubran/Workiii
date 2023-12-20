import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useDebounce from "./useDebounce";

const useServiceFilters = (setFilter, filters) => {
  const debouncedPriceMin = useDebounce(filters.priceMin, 1000);
  const debouncedPriceMax = useDebounce(filters.priceMax, 1000);

  const navigate = useNavigate();
  const location = useLocation();

  // Update filters in the Zustand store when debounced values change
  useEffect(() => {
    setFilter("priceMin", debouncedPriceMin);
    setFilter("priceMax", debouncedPriceMax);
  }, [debouncedPriceMin, debouncedPriceMax, setFilter]);

  // Update URL with filter changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("priceMin", debouncedPriceMin);
    params.set("priceMax", debouncedPriceMax);
    if (filters.category) {
      params.set("category", filters.category);
    }

    navigate(
      { pathname: location.pathname, search: params.toString() },
      { replace: true }
    );
  }, [
    debouncedPriceMin,
    debouncedPriceMax,
    filters.category,
    navigate,
    location.pathname,
  ]);

  return { debouncedPriceMin, debouncedPriceMax };
};

export default useServiceFilters;
