// libs
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
// hooks
import { useDeleteCategory, useUpdateCategory } from "../../../hooks/useCategories";
import { useGetServicesByCategoryId, useDeleteService } from "../../../hooks/useServices";
// icons
import { Trash, ChevronDown, Plus, SquarePen } from "lucide-react";
// components
import Modal from "../Modals/Modal";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
import UpdateName from "../Modals/UpdateName/UpdateName";
import AddService from "../Modals/AddService/AddService";
import UpdateService from "../Modals/UpdateService/UpdateService";

function CategoryItem({ category }) {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const deleteRef = useRef();
    const changeNameRef = useRef();
    const addServiceRef = useRef();
    const updateServiceRef = useRef();
    const deleteServiceRef = useRef();
    const { mutate: deleteCategory, isLoading: isDeleting, error } = useDeleteCategory();
    const { mutate: deleteService, isLoading: isDeletingService, error: errorService } = useDeleteService();

    const { mutate: updateCategory, isLoading: isUpdating } = useUpdateCategory();
    const { data: servicesData } = useGetServicesByCategoryId(category.id);
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    const isSaudiToggled = category.branchId === 2;


    // --- Add Service Handlers ---

    function handleOpenAddService() {
        addServiceRef.current.open();
    }

    function handleCloseAddService() {
        addServiceRef.current.close();
    }

    // --- Update Handlers --- 
    function handleOpenUpdateCategoryName() {
        changeNameRef.current.open();
    }
    function handleCloseUpdateCategoryName() {
        changeNameRef.current.close();
    }

    // --- Delete Handlers ---
    function openDeleteModal() {
        deleteRef.current.open();
    }
    function closeDeleteModal() {
        deleteRef.current.close();
    }

    // --- Update Service Handlers ---

    function openUpdateService(serviceId) {
        updateServiceRef.current.open()
        setSelectedServiceId(serviceId)
    }

    function closeUpdateService() {
        updateServiceRef.current.close();
    }

    // --Delete Service Modal

    function openDeleteService(serviceId) {
        deleteServiceRef.current.open();
        setSelectedServiceId(serviceId)
    }

    function closeDeleteService() {
        deleteServiceRef.current.close();
    }

    async function handleDeleteCategory() {
        try {
            await deleteCategory(category.id);
            closeDeleteModal();
        } catch (err) {
            console.error("Failed to delete category:", err);
        }
    }
    async function handleDeleteService() {
        try {
            await deleteService(selectedServiceId);
            setSelectedServiceId(null);
            closeDeleteService();
        } catch (err) {
            console.error("Failed to delete service:", err);
        }
    }

    const buildUpdatePayload = (branchId) => {
        const NameAr = category.name ?? "";
        const NameEn = category.name ?? "";
        return { branchId, NameAr, NameEn };
    };


    function handleToggleBranch(branch) {
        if (branch !== 2) {
            return;
        }

        if (category.branchId === 2) {
            toast.error(t("Category must belong to at least one branch"));
            return;
        }

        updateCategory({
            id: category.id,
            data: buildUpdatePayload(2),
        });
    }

    return (
        <div className="group">
            {/* Category Header */}
            <div
                className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 p-3 sm:p-4 md:p-6 cursor-pointer transition-all duration-300 ${isExpanded ? "bg-primary text-white" : "hover:text-accent"
                    }`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Left: Name + Subtext */}
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex gap-2 p-1.5 sm:p-2 rounded hover:bg-primary hover:text-white transition-all sm:flex-col md:flex-col lg:flex-row sm:items-start md:items-start lg:items-center" onClick={(e) => { handleOpenUpdateCategoryName(); e.stopPropagation() }}>
                        <p
                            className={`font-semibold text-sm sm:text-base md:text-lg lg:text-xl leading-tight transition-colors truncate ${isExpanded ? "text-white" : "group-hover:text-accent"
                                }`}
                        >
                            {category.name}
                        </p>
                        <SquarePen size={16} />
                    </div>
                    <Modal ref={changeNameRef} title={t("Services.Change Category Name")} onClose={(e) => { handleCloseUpdateCategoryName(); e.stopPropagation() }}>
                        <UpdateName categoryId={category.id} onClose={(e) => { handleCloseUpdateCategoryName(); e.stopPropagation() }} />
                    </Modal>
                    <span
                        className={`text-xs sm:text-sm md:text-sm transition-colors ${isExpanded ? "text-white/80" : "text-secondary group-hover:text-accent"
                            }`}
                    >
                        {servicesData && servicesData.length} {t("Services.Sub-services")}
                    </span>
                </div>

                {/* Right: Toggles + Actions */}
                <div className="flex flex-wrap justify-around gap-2 sm:gap-3 md:gap-4 lg:gap-6 items-center mt-2 sm:mt-0">
                    {/* Egypt toggle is temporarily hidden from the admin UI.
                    <div className="flex items-center gap-2 min-w-[90px] px-1 sm:px-0 min-h-[40px]">
                        <span
                            className={`text-xs sm:text-sm md:text-base font-medium transition-colors ${isExpanded ? "text-white" : "group-hover:text-accent"}`}
                        >
                            {t("Egypt")}
                        </span>
                        <label
                            role="switch"
                            aria-checked={isEgyptToggled}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isUpdating) handleToggleBranch(1);
                            }}
                            className={`relative inline-flex items-center w-11 h-6 sm:w-12 sm:h-7 rounded-full cursor-pointer transition-colors duration-200 ${isEgyptToggled
                                ? isExpanded
                                    ? "bg-secondary"
                                    : "bg-primary"
                                : isExpanded
                                    ? "bg-white/50"
                                    : "bg-gray-600"
                                } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <span
                                className={`absolute ltr:left-1 rtl:right-1 top-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-white border-2 border-white shadow-md transform transition-transform duration-200 ${isEgyptToggled
                                    ? "ltr:translate-x-5 rtl:-translate-x-5"
                                    : "ltr:translate-x-0 rtl:translate-x-0"
                                    }`}
                            />
                        </label>
                    </div>
                    */}

                    {/* Saudi Arabia Toggle */}
                    <div className="flex items-center gap-2 min-w-[120px] px-1 sm:px-0 min-h-[40px]">
                        <span
                            className={`text-xs sm:text-sm md:text-base font-medium transition-colors ${isExpanded ? "text-white" : "group-hover:text-accent"}`}
                        >
                            {t("Saudi Arabia")}
                        </span>
                        <label
                            role="switch"
                            aria-checked={isSaudiToggled}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (!isUpdating) handleToggleBranch(2);
                            }}
                            className={`relative inline-flex items-center w-11 h-6 sm:w-12 sm:h-7 rounded-full cursor-pointer transition-colors duration-200 ${isSaudiToggled
                                ? isExpanded
                                    ? "bg-secondary"
                                    : "bg-primary"
                                : isExpanded
                                    ? "bg-white/50"
                                    : "bg-gray-600"
                                } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <span
                                className={`absolute ltr:left-1 rtl:right-1 top-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-white border-2 border-white shadow-md transform transition-transform duration-200 ${isSaudiToggled
                                    ? "ltr:translate-x-5 rtl:-translate-x-5"
                                    : "ltr:translate-x-0 rtl:translate-x-0"
                                    }`}
                            />
                        </label>
                    </div>

                    {/* Action Icons */}
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3 mt-2 sm:mt-0">
                        <button
                            className={`p-1 sm:p-1.5 md:p-2 cursor-pointer rounded-lg transition-all duration-200 ${isExpanded ? "hover:bg-white/20" : "hover:bg-secondary/10 group-hover:hover:bg-white/20"
                                }`}
                        >
                            <Plus
                                onClick={(e) => { handleOpenAddService(); e.stopPropagation() }}
                                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-colors ${isExpanded ? "text-white" : "text-primary group-hover:text-accent"
                                    }`}
                            />
                        </button>
                        <Modal ref={addServiceRef} title={t("Services.Add New Service")}

                            onClose={(e) => { handleCloseAddService(); e.stopPropagation() }}
                        >
                            <AddService onClose={() => handleCloseAddService()} />
                        </Modal>
                        {/* Delete Button */}
                        <button
                            onClick={(e) => {
                                openDeleteModal();
                                e.stopPropagation();
                            }}
                            className={`p-1 sm:p-1.5 cursor-pointer md:p-2 rounded-lg transition-all duration-200 ${isExpanded ? "hover:bg-white/20" : "hover:bg-red-50 group-hover:hover:bg-white/20 "
                                }`}
                        >
                            <Trash
                                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-colors text-denied`}
                            />
                        </button>

                        {/* Delete Modal */}
                        <Modal
                            title={`${t("Delete.Delete")} ${category.name}`}
                            onClose={(e) => {
                                closeDeleteModal();
                                e.stopPropagation();
                            }}
                            ref={deleteRef}
                            delete="delete"
                        >
                            <DeleteModal
                                itemName={category.name}
                                handleDeleteItem={handleDeleteCategory}
                                isDeleting={isDeleting}
                                error={error}
                            />
                        </Modal>

                        {/* Expand Icon */}
                        <ChevronDown
                            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-5 cursor-pointer md:h-5 lg:w-6 lg:h-6 transition-all duration-300 ${isExpanded ? "rotate-180 text-white" : "text-primary group-hover:text-accent"
                                }`}
                        />
                    </div>
                </div>
            </div>

            {/* Expanded Section */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <ul className="overflow-hidden">
                    {Array.isArray(servicesData) && servicesData.map((data) => (
                        <li
                            key={data.id ?? data.name}
                            className="bg-gray-50 group-hover:bg-primary/5 border-t border-gray-200"
                        >                            {/* Example subcategory item */}
                            <div className="flex justify-between items-start p-3 sm:p-4 md:p-6 lg:p-8 ml-3 sm:ml-4 md:ml-8 border-l-2 border-primary/20">
                                <div className="flex-1 min-w-0 pr-3">
                                    <p className="text-sm sm:text-base md:text-lg lg:text-lg font-medium text-gray-700 group-hover:text-primary truncate-2-lines">
                                        {data.name}
                                    </p>
                                    <div className="mt-1 text-xs sm:text-sm md:text-sm text-gray-600 break-words whitespace-normal max-h-20 overflow-auto">
                                        {data.description}
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-2">
                                    <button onClick={(e) => { openUpdateService(data.id); e.stopPropagation() }} className="p-1 sm:p-1.5 md:p-2 hover:bg-secondary/10 rounded-lg transition-all duration-200 cursor-pointer">
                                        <SquarePen className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-primary hover:text-secondary" />
                                    </button>
                                    <button onClick={(e) => { openDeleteService(data.id); e.stopPropagation() }} className="p-1 sm:p-1.5 md:p-2 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer">
                                        <Trash className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-denied hover:text-red-600" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <Modal title={t("Services.Update Service")} ref={updateServiceRef} onClose={(e) => { closeUpdateService(); e.stopPropagation() }} >
                    <UpdateService setSelectedServiceId={setSelectedServiceId} selectedServiceId={selectedServiceId} onClose={(e) => { closeUpdateService(); e.stopPropagation() }} />
                </Modal>
                <Modal title={t("Delete Service")} delete="delete" ref={deleteServiceRef} onClose={(e) => { closeDeleteService(); e.stopPropagation() }}>
                    <DeleteModal handleDeleteItem={handleDeleteService} isDeletingService={isDeletingService} errorService={errorService} onClose={(e) => { closeDeleteService(); e.stopPropagation() }} />
                </Modal>
            </div>
        </div>
    );
}

export default CategoryItem;
