// libs
import { useRef } from "react"
import { useTranslation } from 'react-i18next'
// hooks 
import { useAllCategories } from "../../../hooks/useCategories";
import Headline from "../../../components/AdminComponents/Headline/Headline";
import Modal from "../../../components/AdminComponents/Modals/Modal";
import AddCategory from "../../../components/AdminComponents/Modals/AddCategory/AddCategory";
import CategoryItem from "../../../components/AdminComponents/CategoryItem/CategoryItem";
// components

function Services() {
    const categoryModalRef = useRef();
    const { t } = useTranslation();
    function handleOpenCategoryModal() {
        categoryModalRef.current.open();
    }

    function handleCloseCategoryModal() {
        categoryModalRef.current.close();
    }

    const { data: categoriesResponse, isLoading, isError, error } = useAllCategories();
    const categories = categoriesResponse || [];

    return (
        <div className='p-6 bg-gray-50 shadow-lg'>
            <Headline headlineLabel={t("Services.Service Management")} buttonLabel={t("Services.Add New Category")} buttonIcon="+" handleOpenCategoryModal={handleOpenCategoryModal} />
            <Modal ref={categoryModalRef} title={t("Services.Add New Category")} onClose={handleCloseCategoryModal}>
                <AddCategory onClose={handleCloseCategoryModal} />
            </Modal>
            <ul className='bg-bg shadow rounded'>
                {
                    categories.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    ))
                }
            </ul>
        </div>
    )
}

export default Services
