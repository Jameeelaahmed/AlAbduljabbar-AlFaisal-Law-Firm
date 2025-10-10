// libs
import { useRef } from "react"
import { useTranslation } from 'react-i18next'
// hooks 
import { useAllCategories } from "../../../hooks/useCategories";
// components
import ServicesPresentational from "./ServicesPresentational"

function ServicesContainer() {
    const categoryModalRef = useRef();
    const { t } = useTranslation();
    function handleOpenCategoryModal() {
        categoryModalRef.current.open();
    }

    function handleCloseCategoryModal() {
        categoryModalRef.current.close();
    }

    const { data: categoriesResponse, isLoading, isError, error } = useAllCategories();
    const categories = categoriesResponse?.data?.data || [];

    return (
        <>
            <ServicesPresentational
                t={t}
                categoryModalRef={categoryModalRef}
                onClose={handleCloseCategoryModal}
                handleOpenCategoryModal={handleOpenCategoryModal}
                categories={categories}
                isLoading={isLoading} />
        </>
    )
}

export default ServicesContainer
