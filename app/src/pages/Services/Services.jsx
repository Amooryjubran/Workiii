import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useServicesStore from "@/store/Services/useServicesStore";
import useUserStore from "@/store/useUserStore";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Skeleton from "@/components/Skeleton";
import HeroBanner from "@/components/ui/Services/HeroBanner";
import ServiceCard from "@/components/ui/Home/PopularServices/ServiceCard";
import styles from "./style.module.css";
import X from "images/cross.svg";
import { ArrowLeft } from "react-feather";

export default function Services() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const [isClicked, setIsClicked] = useState(false);
  const {
    services,
    isLoading,
    filters,
    fetchServices,
    categories,
    searchQuery,
    setSearchQuery,
    setFilter,
    setSortOrder,
    handleSearch,
    handleCategoryChange,
    handleLocationChange,
  } = useServicesStore();

  useEffect(() => {
    if (isClicked) {
      fetchServices(user?._id);
      setIsClicked(false);
    }
  }, [filters, fetchServices, user?._id, isClicked]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServices(user?._id);
    }, 500);
    return () => clearTimeout(timer);
  }, [categories, fetchServices, user?._id]);

  const onSearch = async () => {
    handleSearch(user?._id, searchQuery);
  };

  const renderFilterButtons = () => {
    const categoryFilters = filters.category.map((cat) => ({
      type: "category",
      value: cat,
      handler: () => handleCategoryChange(cat),
    }));

    const locationFilters = filters.locations.map((loc) => ({
      type: "location",
      value: loc.location.city,
      handler: () => handleLocationChange(loc),
    }));

    const priceFilter =
      filters.priceMin > 0 || filters.priceMax < 1000
        ? [
            {
              type: "price",
              value: `Price: $${filters.priceMin} - $${filters.priceMax}`,
              handler: () => {
                setFilter("priceMin", 0);
                setFilter("priceMax", 1000);
              }, // Reset to default range
            },
          ]
        : [];

    // Check if sortOrder is set and create a filter button if it is
    const sortFilter = filters.sortOrder
      ? [
          {
            type: "sort",
            value: `Sort: ${
              filters.sortOrder === "highest" ? "Highest" : "Lowest"
            }`,
            handler: () => setSortOrder(""), // Clears the sort order
          },
        ]
      : [];

    const ratingFilter =
      filters.rating > 0
        ? [
            {
              type: "rating",
              value: `Rating: ${filters.rating} Stars`,
              handler: () => setFilter("rating", 0), // Reset the rating
            },
          ]
        : [];

    const combinedFilters = [
      ...categoryFilters,
      ...locationFilters,
      ...priceFilter,
      ...sortFilter,
      ...ratingFilter,
    ];
    return combinedFilters.map((filter, index) => (
      <Button
        key={index}
        onClick={filter.handler}
        className={styles.removeFilter}
      >
        <span>{filter.value}</span>
        <Image src={X} alt={filter.value} className={styles.removeFilterImg} />
      </Button>
    ));
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.servicesList}>
          {Array(6)
            .fill()
            .map((_, i) => (
              <Skeleton width="auto" height="440px" key={i} />
            ))}
        </div>
      );
    }
    return services.length > 0 ? (
      <div className={styles.servicesList}>
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    ) : (
      <div className={styles.notFoundPage}>
        <h1>{t("notFound.notFoundTitle")}</h1>
        <div className={styles.notFoundPageContainer}>
          <h1>{t("notFound.notFoundDataTitle")}</h1>
          <span>{t("notFound.motFoundData")}</span>
          <Button
            className={styles.notFoundLink}
            onClick={() => handleCategoryChange("reset")}
          >
            <ArrowLeft color="white" size={16} />
            <span>{t("notFound.reset")}</span>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.servicesWrapper}>
      <HeroBanner
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={onSearch}
      />
      <div className={styles.servivesContent}>
        <div className={styles.servivesParent}>
          <div className={styles.servivesFilter}>
            <h1>{t("home.browseCollection")}</h1>
            <div>{renderFilterButtons()}</div>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
