import { useEffect, useState, useCallback } from "react";
import { useUserContext } from "./useUserContext";

const baseUrl = "http://localhost:3030";

export default function useRequest(url, initialState) {
  const { user, isAuthenticated } = useUserContext();
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(!!url);

  const request = useCallback(
    async (url, method, data, config = {}) => {
      let options = {};

      if (method) {
        options.method = method;
      }

      if (data) {
        options.headers = {
          "content-type": "application/json",
        };

        options.body = JSON.stringify(data);
      }

      if (config.accessToken || isAuthenticated) {
        options.headers = {
          ...options.headers,
          "X-Authorization": config.accessToken || user?.accessToken,
        };
      }

      if (config.signal) {
        options.signal = config.signal;
      }

      const response = await fetch(`${baseUrl}${url}`, options);

      if (!response.ok) {
        throw response.statusText;
      }

      if (response.status === 204) {
        return {};
      }

      const result = await response.json();

      return result;
    },
    [user, isAuthenticated]
  );

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    request(url, "GET", null, { signal: controller.signal })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        }
        console.log(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [url, request]);

  return {
    request,
    data,
    setData,
    loading,
  };
}
