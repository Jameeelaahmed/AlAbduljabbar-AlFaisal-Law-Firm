// libs
import { useTranslation } from "react-i18next"
import { useRef } from "react";
// components
import Headline from "../../../components/AdminComponents/Headline/Headline"
import FAQModal from "../../../components/AdminComponents/Modals/FAQModal/FAQModal";
import Modal from "../../../components/AdminComponents/Modals/Modal";
// hooks 
import { useFaqs } from "../../../hooks/useFAQ";
import FAQItem from "../../../components/AdminComponents/Items/FAQItem/FAQItem";

function FAQ() {
    const { t } = useTranslation();
    const questionsRef = useRef();
    const { data } = useFaqs()
    function openQuestionsModal() {
        questionsRef.current.open();
    }
    function closeQuestionsModal() {
        questionsRef.current.close();
    }
    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 shadow-lg">
            <Headline headlineLabel={t("faq")} buttonLabel={t("add questions")} buttonIcon="+" handleOpenModal={() => openQuestionsModal()} />
            <Modal title={t("faq")} ref={questionsRef} onClose={() => closeQuestionsModal()}>
                <FAQModal onClose={() => closeQuestionsModal()} />
            </Modal>
            {data?.map((faqItem) => (
                <FAQItem data={faqItem} />
            ))}
        </div>
    )
}

export default FAQ
