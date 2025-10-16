import { useTranslation } from "react-i18next";
import { SquarePen } from "lucide-react";
import { useRef, useState } from "react";
import AddTypeModal from "../Modals/AddTypeModal/AddTypeModal";
import Modal from '../Modals/Modal'
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
import { useUpdateConsultaionType, useGetConsultationTypeForUpdate, useDeleteConsultationTypes } from "../../../hooks/useConsultations";
import { Trash } from "lucide-react";
function ConsultationTypeItems({ type }) {
    const {
        data: typeName,
        isLoading: isFetching,
        isError: fetchError,
    } = useGetConsultationTypeForUpdate(type.id, { enabled: !!type.id });

    const {
        mutate: deleteConsultationTypeMutate,
        isLoading: isDeleting,
        error: deleteError,
    } = useDeleteConsultationTypes();

    const [isAvailable, setIsAvailable] = useState(type.isAvailable);
    const { t } = useTranslation();
    const updateType = useRef();
    const deleteRef = useRef()
    const updateConsultaionTypeHook = useUpdateConsultaionType();

    function openAddType() {
        updateType.current.open();
    }

    function closeAddType() {
        updateType.current.close();
    }

    function openDeleteModal() {
        deleteRef.current.open();
    }
    function closeDeleteModal() {
        deleteRef.current.close();
    }
    function handleToggle(e) {
        e.stopPropagation();
        const newAvailability = !isAvailable;
        setIsAvailable(newAvailability);

        const payload = {
            id: type.id,
            data: {
                id: type.id,
                NameAr: typeName?.nameAr,
                NameEn: typeName?.nameEn,
                isAvailable: newAvailability
            }
        };

        updateConsultaionTypeHook.mutate(payload, {
            onError: () => setIsAvailable(!newAvailability), // revert if fails
        });
    }

    function handleDeleteConsultationType() {
        deleteConsultationTypeMutate(type.id, {
            onSuccess: () => {
                closeDeleteModal();
            },
            onError: () => {
                // optional: keep modal open and/or show feedback
            },
        });
    }


    return (
        <div
            className={`flex justify-between items-center p-3 sm:p-4 md:p-6 cursor-pointer transition-all duration-300 bg-bg shadow`}
        >
            {/* Left: Name + Subtext */}
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 p-1.5 sm:p-2 rounded hover:bg-primary hover:text-white transition-all sm:flex-col md:flex-col lg:flex-row sm:items-start md:items-start lg:items-center" onClick={() => openAddType()}>
                    <p
                        className={`font-semibold text-sm sm:text-base md:text-lg lg:text-xl leading-tight transition-colors`}
                    >
                        {type.name}
                    </p>
                    <SquarePen size={16} />
                </div>
            </div>
            <Modal ref={updateType} title={t("Update Consultation Type")} onClose={() => closeAddType()}>
                <AddTypeModal onClose={() => closeAddType()} typeId={type.id} typeName={typeName} isFetching={isFetching} fetchError={fetchError} />
            </Modal>
            {/* Right: Toggles + Actions */}
            <div className="flex justify-around gap-2 sm:gap-3 md:gap-4 lg:gap-6 items-center">

                {/* Saudi Arabia Toggle */}
                <div className="flex items-center gap-2">
                    <label
                        role="switch"
                        onClick={handleToggle}
                        className={`relative inline-flex items-center w-10 h-5 sm:w-10 sm:h-6 md:w-12 md:h-7 rounded-full cursor-pointer transition-colors duration-200 ${isAvailable
                            ? "bg-primary"
                            : "bg-gray-600"} 
                            `}
                    >

                        <span
                            className={`absolute ltr:left-1 rtl:right-1 top-1 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 rounded-full bg-[#f1f2f7] border-2 border-white shadow-md transform transition-transform duration-200 ${isAvailable
                                ? "ltr:translate-x-3 sm:ltr:translate-x-4 md:ltr:translate-x-5 rtl:-translate-x-3 sm:rtl:-translate-x-4 md:rtl:-translate-x-5"
                                : "ltr:translate-x-0 rtl:translate-x-0"
                                }`}
                        />
                    </label>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                    <button
                        onClick={(e) => {
                            openDeleteModal();
                            e.stopPropagation();
                        }}
                        className={`p-1 sm:p-1.5 md:p-2 rounded-lg transition-all duration-200 hover:bg-red-50 group-hover:hover:bg-white/20 cursor-pointer"`}>
                        <Trash
                            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-colors text-denied`}
                        />
                    </button>

                    <Modal
                        title={`${t("Delete.Delete")} ${type.name}`}
                        onClose={(e) => {
                            closeDeleteModal();
                            e.stopPropagation();
                        }}
                        ref={deleteRef}
                        delete="delete"
                    >
                        <DeleteModal
                            itemName={type.name}
                            handleDeleteItem={handleDeleteConsultationType}
                            isDeleting={isDeleting}
                            error={deleteError}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default ConsultationTypeItems
