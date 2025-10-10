
// components
import HeadlineContainer from '../../../components/AdminComponents/Headline/HeadlineContainer'
import ServiceItemContainer from '../../../components/AdminComponents/ServiceItem/ServiceItemContainer'
import Modal from '../../../components/AdminComponents/Modals/Modal'
import AddCategoryContainer from '../../../components/AdminComponents/Modals/AddCategory/AddCategoryContainer'

function ServicesPresentational({ t, categoryModalRef, handleOpenCategoryModal, onClose, categories }) {
    return (
        <div className='p-6 bg-gray-50 shadow-lg'>
            <HeadlineContainer headlineLabel={t("Service Management")} buttonLabel={t("Add New Category")} buttonIcon="+" handleOpenCategoryModal={handleOpenCategoryModal} />
            <Modal ref={categoryModalRef} title={"Add New Category"} onClose={onClose}>
                <AddCategoryContainer onClose={onClose} />
            </Modal>
            <ul className='bg-bg shadow rounded'>
                {
                    categories.map((category) => (
                        <ServiceItemContainer category={category} />
                    ))
                }
            </ul>
        </div>
    )
}

export default ServicesPresentational
