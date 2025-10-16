// libs
import { useTranslation } from "react-i18next"
import { useRef } from "react";
// components
import Headline from "../../../components/AdminComponents/Headline/Headline"
import FAQModal from "../../../components/AdminComponents/Modals/FAQModal/FAQModal";
import Modal from "../../../components/AdminComponents/Modals/Modal";
import FAQCategory from "../../../components/AdminComponents/Modals/FAQCategory/FAQCategory";
import FAQItem from "../../../components/AdminComponents/FAQItem/FAQItem";
// hooks 
import { useFaqCategory } from "../../../hooks/useFAQ";

function FAQ() {
    const { t } = useTranslation();
    const fAQCategoryRef = useRef();
    const { data: FaqCategoryData } = useFaqCategory()
    function openFAQCategoryModal() {
        fAQCategoryRef.current.open();
    }
    function closeFAQCategoryModal() {
        fAQCategoryRef.current.close();
    }
    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 shadow-lg">
            <Headline headlineLabel={t("faq")} buttonLabel={t("addFaqCategory")} buttonIcon="+" handleOpenModal={() => openFAQCategoryModal()} />
            <Modal title={t("Create FAQ Category")} ref={fAQCategoryRef} onClose={() => closeFAQCategoryModal()}>
                <FAQCategory onClose={() => closeFAQCategoryModal()} />
            </Modal>
            {FaqCategoryData?.map((faqCategoryItem) => (
                <FAQItem key={faqCategoryItem.id} faqCategoryData={faqCategoryItem} />
            ))}
        </div>
    )
}

export default FAQ
