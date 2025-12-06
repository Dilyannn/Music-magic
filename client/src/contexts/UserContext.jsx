import { createContext } from "react";
import useRequest from "../hooks/useRequest";
import usePersistedState from "../hooks/usePersistedState";

const UserContext = createContext({
  isAuthenticated: false,
  user: {
    email: "",
    password: "",
    _createdOn: 0,
    _id: "",
    accessToken: "",
  },
  registerHandler: async () => {},
  loginHandler: async () => {},
  logoutHandler: async () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = usePersistedState("user", null);
  const { request } = useRequest();

  const registerHandler = async (email, password) => {
    const newUser = { email, password };

    const result = await request("/users/register", "POST", newUser);

    setUser(result);
  };

  const loginHandler = async (email, password) => {
    const result = await request("/users/login", "POST", { email, password });

    setUser(result);
  };

  const logoutHandler = async () => {
    try {
      await request("/users/logout", "GET", null, {
        accessToken: user.accessToken,
      });
    } finally {
      setUser(null);
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
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;