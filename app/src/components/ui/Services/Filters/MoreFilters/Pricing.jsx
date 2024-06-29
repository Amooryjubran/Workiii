import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Range } from "react-range";
import Button from "@/components/Button";
import styles from "./style.module.css";
import Input from "@/components/Input";
import { useTranslation } from "react-i18next";
import useServicesStore from "@/store/Services/useServicesStore";
import useDebounce from "@/hooks/useDebounce";

export default function Pricing() {
  const { t } = useTranslation();
  const { setSortOrder, setFilter, filters } = useServicesStore();
  const [prices, setPrices] = useState([filters.priceMin, filters.priceMax]);
  const [userInteracted, setUserInteracted] = useState(false);
  const debouncedPrices = useDebounce(prices, 1000);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Prevent updates on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (userInteracted) {
      // Only update the store when debounced prices change and the user has interacted
      setFilter("priceMin", debouncedPrices[0]);
      setFilter("priceMax", debouncedPrices[1]);
      setUserInteracted(false); // Reset interaction flag after update
    }
  }, [debouncedPrices]); // Dependencies should include debouncedPrices only

  useEffect(() => {
    // Synchronize the prices with the global state when it changes
    setPrices([filters.priceMin, filters.priceMax]);
  }, [filters.priceMin, filters.priceMax]);

  const onPricesChange = (values) => {
    setPrices(values);
    setUserInteracted(true); // Mark that the user has interacted with the component
  };

  const handleSort = (order) => {
    if (order !== filters.sortOrder) {
      setSortOrder(order);
    }
  };

  const getButtonClass = (sortType) => {
    return sortType === filters.sortOrder
      ? `${styles.pricingBtn} ${styles.active}`
      : styles.pricingBtn;
  };

  return (
    <div className={styles.pricingContainer}>
      <h1>{t("services.filterBy")}</h1>
      <div className={styles.pricingWrapper}>
        <Button
          className={getButtonClass("highest")}
          onClick={() => handleSort("highest")}
        >
          {t("services.HighestPrice")}
        </Button>
        <Button
          className={getButtonClass("lowest")}
          onClick={() => handleSort("lowest")}
        >
          {t("services.LowestPrice")}
        </Button>
        <Button className={styles.pricingBtn}>
          {t("services.HasDiscount")}
        </Button>
      </div>
      <h1>{t("services.PriceRange")}</h1>
      <div className={styles.sliderContainer}>
        <Range
          step={1}
          min={0}
          max={1000}
          values={prices}
          onChange={onPricesChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className={styles.track}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                background: getTrackBackground({
                  values: prices,
                  colors: ["#ccc", "#000", "#ccc"],
                  min: 0,
                  max: 1000,
                }),
                display: "flex",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className={styles.thumb}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                backgroundColor: "#000",
              }}
            />
          )}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.currencyInput}>
          <span>{t("services.MinPrice")}:</span>
          <div>
            <span className={styles.currencySymbol}>$</span>
            <Input
              type="number"
              value={prices[0]}
              onChange={(e) => onPricesChange([+e.target.value, prices[1]])}
              className={styles.sliderInput}
            />
          </div>
        </label>
        <label className={styles.currencyInput}>
          <span>{t("services.MaxPrice")}:</span>
          <div>
            <span className={styles.currencySymbol}>$</span>
            <Input
              type="number"
              value={prices[1]}
              onChange={(e) => onPricesChange([prices[0], +e.target.value])}
              className={styles.sliderInput}
            />
          </div>
        </label>
      </div>
    </div>
  );
}

function getTrackBackground({ values, colors, min, max }) {
  const range = max - min;
  return `linear-gradient(to right, ${colors[0]} 0% ${
    (values[0] / range) * 100
  }%, ${colors[1]} ${(values[0] / range) * 100}% ${
    (values[1] / range) * 100
  }%, ${colors[2]} ${(values[1] / range) * 100}% 100%)`;
}

Pricing.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  values: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  style: PropTypes.object,
};
