import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as userApi from "../api/user";
import { toast } from "react-toastify";

// 🔹 Get Paginated Users
export const useUsers = ({ searchTerm = "", pageIndex = 1, pageSize = 5 } = {}) =>
    useQuery({
        queryKey: ["users", { searchTerm, pageIndex, pageSize }],
        queryFn: userApi.fetchUsers,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 2,
    });

// 🔹 Get User by ID
export const useUserById = (id) =>
    useQuery({
        queryKey: ["userById", id],
        queryFn: () => userApi.getUserById(id),
        enabled: !!id,
    });

// 🔹 Get User for Update
export const useGetUserForUpdate = (id) =>
    useQuery({
        queryKey: ["userForUpdate", id],
        queryFn: () => userApi.getUserForUpdate(id),
        enabled: !!id,
    });

// 🔹 Create User
export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userApi.createUser,
        onMutate: async (newUser) => {
            await queryClient.cancelQueries(["users"]);
            const previousUsers = queryClient.getQueryData(["users"]);

            queryClient.setQueryData(["users"], (old = { data: [] }) => ({
                ...old,
                data: [...(old.data || []), { ...newUser, id: Date.now(), isTemp: true }],
            }));

            return { previousUsers };
        },
        onError: (err, newUser, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(["users"], context.previousUsers);
            }
            toast.error(
                err.response?.data?.message ||
                `Something went wrong — couldn't create ${newUser.fullName || "user"}!`
            );
        },
        onSuccess: () => {
            toast.success("✅ User created successfully!");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["users"]);
        },
    });
};

// 🔹 Update User
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => userApi.updateUser({ id, data }),
        onError: (err) => {
            toast.error(
                err.response?.data?.message ||
                `Something went wrong — couldn't update this user!`
            );
        },
        onSuccess: () => {
            toast.success("📝 User updated successfully!");
            queryClient.invalidateQueries(["users"]);
        },
    });
};

// 🔹 Delete User
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => userApi.deleteUser(id),

        onMutate: async (id) => {
            await queryClient.cancelQueries(["users"]);
            const previousUsers = queryClient.getQueryData(["users"]);

            queryClient.setQueryData(["users"], (old) => ({
                ...old,
                data: old?.data?.filter((user) => user.id !== id),
            }));

            return { previousUsers };
        },

        onError: (err, _, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(["users"], context.previousUsers);
            }
            toast.error(
                err.response?.data?.message ||
                `Something went wrong — couldn't delete this user!`
            );
        },

        onSuccess: () => {
            toast.success("🗑️ User deleted successfully!");
        },

        onSettled: () => {
            queryClient.invalidateQueries(["users"]);
        },
    });
};
