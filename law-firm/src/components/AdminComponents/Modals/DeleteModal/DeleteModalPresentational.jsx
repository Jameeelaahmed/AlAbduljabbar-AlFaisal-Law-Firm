import { Trash2, AlertTriangle } from "lucide-react";

function DeleteModalPresentational({ t, itemName, handleDeleteCategory, isDeleting, error }) {
    return (
        <>
            {/* Content */}
            <div className="p-6 space-y-4">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trash2 className="w-8 h-8 text-red-600" />
                    </div>

                    <p className="text-gray-700 text-base leading-relaxed">
                        {t("Are you sure you want to delete this item?")}
                    </p>

                    {itemName && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">{t("Item to delete")}:</p>
                            <p className="font-semibold text-gray-900 mt-1">{itemName}</p>
                        </div>
                    )}

                    <p className="text-sm text-red-600 mt-3 font-medium">
                        {t("This action cannot be undone.")}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
                {error && <p>{error}</p>}
                <button
                    type="button"
                    onClick={(e) => { handleDeleteCategory(); e.stopPropagation() }}
                    disabled={isDeleting}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
                >
                    {isDeleting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {t("Deleting...")}
                        </>
                    ) : (
                        <>
                            <Trash2 className="w-4 h-4" />
                            {t("Delete")}
                        </>
                    )}
                </button>
            </div>
        </>
    )
}

export default DeleteModalPresentational
