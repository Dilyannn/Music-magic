import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export function useUserContext() {
    const contextData = useContext(UserContext);

    return contextData;
}
