// libs 
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
// components
import ServiceItemPresentational from "./ServiceItemPresentational"
// hooks
import { useDeleteCategory } from "../../../hooks/useCategories";

function ServiceItemContainer({ category }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const deleteRef = useRef();
    const { mutate: deleteCategory, isLoading: isDeleting, error } = useDeleteCategory();

    const { t } = useTranslation();
    function openDeleteModal() {
        deleteRef.current.open();
    }
    function closeDeleteModal() {
        deleteRef.current.close();
    }

    async function handleDeleteCategory() {
        try {
            await deleteCategory(category.id)
            closeDeleteModal();
        } catch (err) {
            console.error('Failed to delete category:', err);

        }
    }

    return (
        <>
            <ServiceItemPresentational
                category={category}
                t={t}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                deleteRef={deleteRef}
                onOpenDeleteCategory={openDeleteModal}
                onCloseDeleteCategory={closeDeleteModal}
                handleDeleteCategory={handleDeleteCategory}
                isDeleting={isDeleting}
                error={error}
            />
        </>
    )
}

export default ServiceItemContainer
