import { useContext, useState, useEffect, useCallback } from "react";
import UserContext from "../contexts/UserContext";

const baseUrl = "http://localhost:3030";

export default function useRequest(url, initialState) {
  const { user, isAuthenticated } = useContext(UserContext);
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(!!url);

  const request = useCallback(async (url, method, data, config = {}) => {
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
        "X-Authorization": config.accessToken || user.accessToken,
      };
    }

    const response = await fetch(`${url.startsWith('http') ? url : baseUrl + url}`, options);

    if (!response.ok) {
      throw response.statusText;
    }

    if (response.status === 204) {
      return {};
    }

    const result = await response.json();

    return result;
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await request(url);
        setData(result);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, request]);

  return {
    request,
    data,
    setData,
    loading,
  };
}
