import useServicesStore from "@/store/Services/useServicesStore";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce"; // Make sure this hook is correctly implemented

export default function Services() {
  const { services, fetchServices, setFilter, filters } = useServicesStore();
  const [maxPrice, setMaxPrice] = useState(1000); // Default maximum price
  const [priceMin, setPriceMin] = useState(filters.priceMin || 0);
  const [priceMax, setPriceMax] = useState(filters.priceMax || 1000);

  const debouncedPriceMin = useDebounce(priceMin, 500); // Debouncing priceMin
  const debouncedPriceMax = useDebounce(priceMax, 500); // Debouncing priceMax

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Recalculate maxPrice only when services change
  useEffect(() => {
    const calculatedMaxPrice = services.reduce((max, service) => {
      const price = parseInt(service.serviceInfo.servicePrice, 10);
      return isNaN(price) ? max : Math.max(max, price);
    }, 0);
    if (calculatedMaxPrice > 0 && calculatedMaxPrice !== maxPrice) {
      setMaxPrice(calculatedMaxPrice);
    }
  }, [services, maxPrice]);

  // Update filters when debounced price values change
  useEffect(() => {
    setFilter("priceMin", debouncedPriceMin);
    setFilter("priceMax", debouncedPriceMax);
  }, [debouncedPriceMin, debouncedPriceMax, setFilter]);

  // Handlers for price range changes
  const handleMinPriceRangeChange = (value) => {
    setPriceMin(parseInt(value, 10));
  };

  const handleMaxPriceRangeChange = (value) => {
    setPriceMax(parseInt(value, 10));
  };

  // Handler for category change
  const handleCategoryChange = (category) => {
    setFilter("category", category);
  };

  return (
    <div>
      {/* Category Filter Buttons */}
      <button onClick={() => handleCategoryChange("Electrician")}>
        Electrician
      </button>
      <button onClick={() => handleCategoryChange("Cleaning Services")}>
        Cleaning Services
      </button>
      <button onClick={() => handleCategoryChange("Plumbing")}>Plumbing</button>

      {/* Reset Filter Button */}
      <button onClick={() => handleCategoryChange("")}>Reset Filters</button>

      {/* Price Range Slider */}
      <div>
        <label>Price Range:</label>
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={priceMin}
          onChange={(e) => handleMinPriceRangeChange(e.target.value)}
        />
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={priceMax}
          onChange={(e) => handleMaxPriceRangeChange(e.target.value)}
        />
        <span>
          {priceMin} - {priceMax}
        </span>
      </div>

      {/* Display Services */}
      {services.length > 0 ? (
        services.map((service) => (
          <div key={service._id}>{service.serviceInfo.serviceTitle}</div>
        ))
      ) : (
        <p>No services found</p>
      )}
    </div>
  );
}
