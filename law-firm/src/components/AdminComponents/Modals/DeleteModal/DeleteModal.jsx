import { useTranslation } from "react-i18next";
import { Trash2, AlertTriangle, X } from "lucide-react";

function DeleteModal({ itemName, handleDeleteItem, isDeleting, error }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col max-w-md mx-auto">
            <div className="text-center mb-4">
                <p className="text-gray-700 leading-relaxed mt-2">
                    {t("Delete.Are you sure you want to delete this item?")}
                </p>
            </div>

            {itemName && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 transition-all duration-200 hover:shadow-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        {t("Item to delete")}
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <p className="font-semibold text-gray-900 text-lg">{itemName}</p>
                    </div>
                </div>
            )}

            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl mt-4">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-red-800 font-medium text-sm">
                        {t("Irreversible Action")}
                    </p>
                    <p className="text-red-600 text-sm mt-1">
                        {t("This action cannot be undone.")}
                    </p>
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg animate-pulse mt-4">
                    <p className="text-sm text-red-600 text-center font-medium">
                        {error}
                    </p>
                </div>
            )}

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6">
                <button
                    type="button"
                    onClick={(e) => {
                        handleDeleteItem();
                        e.stopPropagation();
                    }}
                    disabled={isDeleting}
                    aria-disabled={isDeleting}
                    className="cursor-pointer px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                >
                    {isDeleting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{t("Delete.Deleting...")}</span>
                        </>
                    ) : (
                        <>
                            <Trash2 className="w-4 h-4" />
                            <span>{t("Delete.Delete")}</span>
                        </>
                    )}
                </button>
            </div>
        </div>

    );
}

export default DeleteModal;