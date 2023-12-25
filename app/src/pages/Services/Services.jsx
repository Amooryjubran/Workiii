import useServicesStore from "@/store/Services/useServicesStore";
import { useEffect, useState } from "react";
import X from "images/cross.svg";
import styles from "./style.module.css";
import useUserStore from "@/store/useUserStore";
import useServiceFilters from "@/hooks/useServiceFilters";
import Input from "@/components/Input";
import FilterSideBar from "@/components/ui/Services/FilterSideBar";
import ServicesList from "@/components/ui/Services/ServiceCard";
import Skeleton from "@/components/Skeleton";
import Image from "@/components/Image";
import Button from "@/components/Button";
import HeroBanner from "@/components/ui/Services/HeroBanner";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    services,
    isLoading,
    setFilter,
    filters,
    maxPrice,
    fetchServices,
    categories,
  } = useServicesStore();
  const { user } = useUserStore();

  // const { debouncedPriceMin, debouncedPriceMax } = useServiceFilters(
  //   setFilter,
  //   filters
  // );

  // Fetch services on component mount
  useEffect(() => {
    if (categories.length > 0) {
      const timer = setTimeout(() => {
        fetchServices(user?._id);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [categories, fetchServices, user?._id]);
  // Handlers for filter changes
  const handleCategoryChange = (category) => {
    setFilter(
      "category",
      filters.category.includes(category)
        ? filters.category.filter((c) => c !== category)
        : [...filters.category, category]
    );
  };

  const handlePriceChange = (minOrMax, value) => {
    setFilter(minOrMax, parseInt(value, 10));
  };

  const handleSearch = () => {
    // Reset other filters
    setFilter("category", []);
    setFilter("priceMin", 0);
    setFilter("priceMax", 1000);
    // Set the search query as a filter (if your backend supports it)
    setFilter("searchQuery", searchQuery);

    // Fetch services based on the search query
    fetchServices(user?._id);
  };

  const renderContent = () => {
    if (isLoading) {
      return Array(6)
        .fill(true)
        .map((_, i) => <Skeleton width="auto" height="440px" key={i} />);
    }

    if (services.length > 0) {
      return services.map((service) => (
        <ServicesList service={service} key={service._id} />
      ));
    }

    return <p>No services found</p>;
  };

  return (
    <div className={styles.servicesWrapper}>
      <HeroBanner
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <div className={styles.servivesContent}>
        <FilterSideBar handleCategoryChange={handleCategoryChange} />
        <div className={styles.servivesParent}>
          <div className={styles.servivesFilter}>
            {filters?.category?.map((filterTag) => (
              <Button
                key={filterTag}
                onClick={() => handleCategoryChange(filterTag)}
                className={styles.removeFilter}
              >
                <span> {filterTag}</span>
                <Image
                  src={X}
                  alt={filterTag}
                  className={styles.removeFilterImg}
                />
              </Button>
            ))}
          </div>
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
          <div className={styles.servicesList}>{renderContent()}</div>
        </div>
      </div>

      {/* Display Services */}
    </div>
  );
}
