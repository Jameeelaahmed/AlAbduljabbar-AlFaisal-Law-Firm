import { useDeleteUser } from "../../../../hooks/useUsers";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function DeleteUser({ userId, username, onClose }) {
    const { t } = useTranslation();
    const { mutateAsync: deleteUser, isLoading } = useDeleteUser();

    const handleDelete = async () => {
        if (!userId) return;
        try {
            await deleteUser(userId);
            toast.success(t("Users.User deleted successfully"));
        } catch (err) {
            console.error("Delete user failed:", err);
            toast.error(err?.response?.data?.message || t("Users.Failed to delete user"));
        } finally {
            onClose?.();
        }
    };

    return (
        <div className="p-4">
            <p className="mb-4 text-gray-700">
                هل أنت متأكد أنك تريد حذف المستخدم <span className="text-red-500 font-semibold">{username}</span>؟ لا يمكن التراجع عن هذا الإجراء.
            </p>

            <div className="flex gap-2">
                <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
                >
                    {isLoading ? "جارٍ الحذف..." : "حذف المستخدم"}
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg font-semibold text-gray-700 border hover:bg-gray-100 transition-all duration-300"
                >
                    إلغاء
                </button>
            </div>
        </div>
    );
}
