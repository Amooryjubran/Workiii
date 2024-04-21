import { useState, useEffect } from "react";
import axios from "axios";
let cache = {};

export const useFetch = (url, dependencies = []) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    if (!url) {
      return null;
    }
    const fetchUrl = async () => {
      if (cache[url]) {
        setData(cache[url]);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(url);
        cache[url] = response.data;
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchUrl();
  }, [url, ...dependencies]);

  return { data, error, loading };
};
