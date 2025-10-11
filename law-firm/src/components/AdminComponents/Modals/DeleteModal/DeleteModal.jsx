import { useTranslation } from "react-i18next";
import { Trash2, AlertTriangle } from "lucide-react";

function DeleteModal({ itemName, handleDeleteItem, isDeleting, error }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col">
            {/* Content */}
            <div className="p-6 text-center space-y-5">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-red-100 shadow-sm">
                    <Trash2 className="w-8 h-8 text-red-600" />
                </div>

                {/* Message */}
                <h2 className="text-lg font-semibold text-gray-900">
                    {t("Delete.Are you sure you want to delete this item?")}
                </h2>

                {/* Item details */}
                {itemName && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 w-fit mx-auto">
                        <p className="text-sm text-gray-600">{t("Item to delete")}:</p>
                        <p className="font-semibold text-gray-900 mt-1">{itemName}</p>
                    </div>
                )}

                {/* Warning */}
                <div className="flex items-center justify-center text-red-600 text-sm font-medium gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <p>{t("This action cannot be undone.")}</p>
                </div>

                {/* Error message */}
                {error && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg py-2 px-4 inline-block">
                        {error}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <button
                    type="button"
                    onClick={(e) => {
                        handleDeleteItem();
                        e.stopPropagation();
                    }}
                    disabled={isDeleting}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center shadow-sm"
                >
                    {isDeleting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {t("Delete.Deleting...")}
                        </>
                    ) : (
                        <>
                            <Trash2 className="w-4 h-4" />
                            {t("Delete.Delete")}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default DeleteModal;
