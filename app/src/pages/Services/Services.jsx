import useServicesStore from "@/store/Services/useServicesStore";
import { useEffect } from "react";
import useServiceFilters from "@/hooks/useServiceFilters";
import Input from "@/components/Input";
import FilterSideBar from "@/components/ui/Services/FilterSideBar";
import ServicesList from "@/components/ui/Services/ServiceCard";
import styles from "./style.module.css";

export default function Services() {
  const { services, setFilter, filters, maxPrice } = useServicesStore();

  const { debouncedPriceMin, debouncedPriceMax } = useServiceFilters(
    setFilter,
    filters
  );

  // Fetch services on component mount
  useEffect(() => {
    setFilter();
  }, [setFilter]);

  // Handlers for filter changes
  const handleCategoryChange = (category) => {
    setFilter("category", category || "");
    if (category === "") {
      setFilter("priceMin", 0);
      setFilter("priceMax", 1000);
    }
  };

  const handlePriceChange = (minOrMax, value) => {
    setFilter(minOrMax, parseInt(value, 10));
  };

  return (
    <div className={styles.servicesWrapper}>
      <div className={styles.servivesContent}>
        <FilterSideBar handleCategoryChange={handleCategoryChange} />
        {/* <div>
          <label>Price Range:</label>
          <Input
            type="range"
            min="0"
            max={maxPrice}
            value={filters.priceMin}
            onChange={(e) => handlePriceChange("priceMin", e.target.value)}
          />
          <Input
            type="range"
            min="0"
            max={maxPrice}
            value={filters.priceMax} // Use non-debounced value for slider input
            onChange={(e) => handlePriceChange("priceMax", e.target.value)}
          />
          <span>
            {debouncedPriceMin} - {debouncedPriceMax}
          </span>
        </div> */}
        <div className={styles.servicesList}>
          {services.length > 0 ? (
            services.map((service) => (
              <ServicesList service={service} key={service._id} />
            ))
          ) : (
            <p>No services found</p>
          )}
        </div>
      </div>

      {/* Display Services */}
    </div>
  );
}
