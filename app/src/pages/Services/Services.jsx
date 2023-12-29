import useServicesStore from "@/store/Services/useServicesStore";
import { useEffect, useState } from "react";
import X from "images/cross.svg";
import styles from "./style.module.css";
import useUserStore from "@/store/useUserStore";
import FilterSideBar from "@/components/ui/Services/FilterSideBar";
import ServicesList from "@/components/ui/Services/ServiceCard";
import Skeleton from "@/components/Skeleton";
import Image from "@/components/Image";
import Button from "@/components/Button";
import HeroBanner from "@/components/ui/Services/HeroBanner";

export default function Services() {
  const [isClicked, setIsClicked] = useState(false);
  const {
    services,
    isLoading,
    filters,
    fetchServices,
    categories,
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleCategoryChange,
  } = useServicesStore();
  const { user } = useUserStore();

  useEffect(() => {
    // Call fetchServices whenever filters change
    if (isClicked) {
      // Ensure this runs only after a search is initiated
      fetchServices(user?._id);
      setIsClicked(false); // Reset the click state
    }
  }, [filters, fetchServices, user?._id, isClicked]);

  // Fetch services on component mount
  useEffect(() => {
    // if (categories.length > 0) {
    const timer = setTimeout(() => {
      fetchServices(user?._id);
    }, 500);
    console.log("omar");
    return () => clearTimeout(timer);
    // }
  }, [categories, fetchServices, user?._id]);
  // Handlers for filter changes

  const onSearch = async () => {
    handleSearch(user?._id, searchQuery);
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
  console.log(categories);

  return (
    <div className={styles.servicesWrapper}>
      <HeroBanner
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={onSearch}
      />
      <div className={styles.servivesContent}>
        <FilterSideBar />
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

          <div className={styles.servicesList}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
