import { useState, useEffect } from "react";
import useServicesStore from "@/store/Services/useServicesStore";
import styles from "../style.module.css";

export default function FilterPrice() {
  const { maxPrice, filters, setFilter } = useServicesStore();
  const [minSelectedPrice, setMinSelectedPrice] = useState(filters.priceMin);
  const [maxSelectedPrice, setMaxSelectedPrice] = useState(filters.priceMax);
  const debounceDelay = 500;

  const handleMinPriceChange = (e) => {
    setMinSelectedPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxSelectedPrice(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter("priceMin", parseInt(minSelectedPrice, 10));
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [minSelectedPrice, setFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter("priceMax", parseInt(maxSelectedPrice, 10));
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [maxSelectedPrice, setFilter]);

  // Update local state when filters are reset
  useEffect(() => {
    setMinSelectedPrice(filters.priceMin);
    setMaxSelectedPrice(filters.priceMax);
  }, [filters.priceMin, filters.priceMax]);

  const minPercent = (minSelectedPrice / maxPrice) * 100;
  const maxPercent = 100 - (maxSelectedPrice / maxPrice) * 100; // Calculate the right property as a percentage from the right

  return (
    <div className={styles.rangeSlider}>
      <span>Price Range:</span>
      <div
        className={styles.doubleSlider}
        style={{
          "--min-range": `${minPercent}%`,
          "--max-range": `${maxPercent}%`,
        }}
      >
        <input
          name="min"
          type="range"
          min="0"
          max={maxPrice}
          value={minSelectedPrice}
          onChange={handleMinPriceChange}
          className={styles.lowerSlider}
        />
        <input
          name="max"
          type="range"
          min="0"
          max={maxPrice}
          value={maxSelectedPrice}
          onChange={handleMaxPriceChange}
          className={styles.upperSlider}
        />
      </div>
      <div className={styles.rangeSliderMinMax}>
        <div>${minSelectedPrice}</div>
        <div>${maxSelectedPrice}</div>
      </div>
    </div>
  );
}
