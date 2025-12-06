import { createContext, useState, useEffect } from "react";
import useRequest from "../hooks/useRequest";

import Spinner from "../components/common/Spinner";

const UserContext = createContext({
  isAuthenticated: false,
  user: {
    email: "",
    password: "",
    _createdOn: 0,
    _id: "",
    accessToken: "",
  },
  registerHandler: () => Promise.resolve(),
  loginHandler: () => Promise.resolve(),
  logoutHandler: () => Promise.resolve(),
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(
    () => !!localStorage.getItem("accessToken")
  );
  const { request } = useRequest();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      request("/users/me", "GET", null, { accessToken: token })
        .then((data) => {
          setUser({
            ...data,
            accessToken: token,
          });
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [request]);

  const registerHandler = async (email, password) => {
    const newUser = { email, password };

    const result = await request("/users/register", "POST", newUser);

    setUser(result);
    localStorage.setItem("accessToken", result.accessToken);
  };

  const loginHandler = async (email, password) => {
    const result = await request("/users/login", "POST", { email, password });

    setUser(result);
    localStorage.setItem("accessToken", result.accessToken);
  };

  const logoutHandler = async () => {
    try {
      await request("/users/logout", "GET", null, {
        accessToken: user.accessToken,
      });
    } finally {
      setUser(null);
      localStorage.removeItem("accessToken");
    }
  };

  const userContextValues = {
    user,
    isAuthenticated: !!user?.accessToken,
    registerHandler,
    loginHandler,
    logoutHandler,
  };

  return (
    <UserContext.Provider value={userContextValues}>
      {loading ? <Spinner /> : children}
    </UserContext.Provider>
  );
}

export default UserContext;