// src/hooks/useAuthUser.js
import { useQueryClient } from "@tanstack/react-query";

export const useAuthUser = () => {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["authUser"]);

    const isAuthenticated = !!user?.token;
    const role = user?.lastRole;
    const name = user?.name;

    const login = (userData) => {
        queryClient.setQueryData(["authUser"], userData);
    };

    const logout = () => {
        queryClient.removeQueries(["authUser"]);
    };

    return { user, isAuthenticated, role, name, login, logout };
};
