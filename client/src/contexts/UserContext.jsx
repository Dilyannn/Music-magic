import { createContext, useState, useEffect } from "react";
import useRequest from "../hooks/useRequest";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: "",
        password: "",
        _createdOn: 0,
        _id: "",
        accessToken: "",
    },
    registerHandler() { },
    loginHandler() { }, 
    logoutHandler() { },
});

export function UserProvider({
    children
}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(() => !!localStorage.getItem('accessToken'));
    const { request } = useRequest();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            request('http://localhost:3030/users/me', 'GET', null, { accessToken: token })
                .then(data => {
                    setUser({
                        ...data,
                        accessToken: token
                    });
                })
                .catch(() => {
                    localStorage.removeItem('accessToken');
                    setUser(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [request]);

    const registerHandler = async (email, password) => {
        const newUser = { email, password };

        const result = await request("http://localhost:3030/users/register", "POST", newUser);

        setUser(result);
        localStorage.setItem('accessToken', result.accessToken);
    }

    const loginHandler = async (email, password) => {
        const result = await request("http://localhost:3030/users/login", "POST", { email, password });

        setUser(result);
        localStorage.setItem('accessToken', result.accessToken);
    }

    const logoutHandler = () => {
        return request("http://localhost:3030/users/logout", "GET", null, { accessToken: user.accessToken })
            .finally(() => {
                setUser(null);
                localStorage.removeItem('accessToken');
            });
    }   

    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler
    }

    return(
        <UserContext.Provider value={userContextValues}>
            {loading ? <div className="flex justify-center items-center h-screen text-white">Loading...</div> : children}
        </UserContext.Provider>
    );
}

export default UserContext;