import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Trash, ChevronDown, SquarePen, Plus } from "lucide-react";

import Modal from "../Modals/Modal";
import DeleteModal from "../Modals/DeleteModal/DeleteModal";
import FAQModal from "../Modals/FAQModal/FAQModal";
import { useDeleteFaq, useDeleteFaqCategory, useGetFaqByFaqCategoryId } from "../../../hooks/useFAQ";
import FAQCategory from "../Modals/FAQCategory/FAQCategory";


function FAQItem({ faqCategoryData }) {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const { data: faqByFaqCategoryIdData } = useGetFaqByFaqCategoryId(faqCategoryData.id);
    const deleteRef = useRef();
    const editRef = useRef();
    const [isDeleting, setIsDeleting] = useState(false);
    const deleteFaqCategoryRef = useRef();
    const editFaqCategoryRef = useRef();
    const [isDeletingFaqCategory, setIsDeletingFaqCategory] = useState(false);
    const [faqId, setFaqId] = useState();
    // new refs/state for smooth dropdown
    const [panelHeight, setPanelHeight] = useState(0);
    const panelInnerRef = useRef(null);

    // Ensure hooks are called unconditionally (before any early return)
    const { mutateAsync: deleteFaq } = useDeleteFaq();
    const { mutateAsync: deleteFaqCategory } = useDeleteFaqCategory();

    // * questions
    const questionsRef = useRef();
    function openQuestionsModal() {
        questionsRef.current.open();
    }
    function closeQuestionsModal() {
        questionsRef.current.close();
    }

    //* faq category
    function openFaqCategoryDelete() {
        deleteFaqCategoryRef.current?.open();
    }
    function closeFaqCategoryDelete() {
        deleteFaqCategoryRef.current?.close();
    }

    function openFaqCategoryEdit() {
        editFaqCategoryRef.current?.open();
    }
    function closeFaqCategoryEdit() {
        editFaqCategoryRef.current?.close();
    }

    async function handleDeleteFaqCategory() {
        setIsDeletingFaqCategory(true);
        try {
            await deleteFaqCategory(faqCategoryData.id);
            closeFaqCategoryDelete();
        } catch (err) {
            console.error("Failed to delete FAQ:", err);
        } finally {
            setIsDeletingFaqCategory(false);
        }
    }

    useEffect(() => {
        if (!panelInnerRef.current) return;
        // measure full content height (all items) for smooth max-height animation
        setPanelHeight(panelInnerRef.current.scrollHeight);
    }, [faqByFaqCategoryIdData, isExpanded]);

    function openDelete(id) {
        deleteRef.current?.open();
        setFaqId(id)
    }
    function closeDelete() {
        deleteRef.current?.close();
    }

    function openEdit(id) {
        editRef.current?.open();
        setFaqId(id)
    }
    function closeEdit() {
        editRef.current?.close();
    }

    async function handleDelete() {
        setIsDeleting(true);
        try {
            await deleteFaq(faqId);
            closeDelete();
        } catch (err) {
            console.error("Failed to delete FAQ:", err);
        } finally {
            setIsDeleting(false);
        }
    }

    if (!faqCategoryData) return null;

    return (
        <div className="group">
            <div
                className={`flex justify-between items-center p-3 sm:p-4 md:p-6 cursor-pointer transition-all duration-300 ${isExpanded ? "bg-primary text-white" : "hover:text-accent"
                    }`}
                onClick={() => setIsExpanded(!isExpanded)}
            >

                <p className={`font-semibold text-sm sm:text-base md:text-lg lg:text-xl leading-tight transition-colors ${isExpanded ? "text-white" : "group-hover:text-accent"}`}>
                    {faqCategoryData.name}
                </p>

                <div className="flex justify-around gap-2 sm:gap-3 md:gap-4 lg:gap-6 items-center">
                    <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <button
                            onClick={(e) => { e.stopPropagation(); openQuestionsModal(); }}
                            className={`p-1 sm:p-1.5 md:p-2 cursor-pointer rounded-lg transition-all duration-200 ${isExpanded ? "hover:bg-white/20" : "hover:bg-secondary/10 group-hover:hover:bg-white/20 cursor-pointer"}`}
                        >
                            <Plus className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-colors ${isExpanded ? "text-white" : "text-primary group-hover:text-accent"}`} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); openFaqCategoryEdit(); }}
                            className={`p-1 sm:p-1.5 md:p-2 cursor-pointer rounded-lg transition-all duration-200 ${isExpanded ? "hover:bg-white/20" : "hover:bg-secondary/10 group-hover:hover:bg-white/20 cursor-pointer"}`}
                        >
                            <SquarePen className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-colors ${isExpanded ? "text-white" : "text-primary group-hover:text-accent"}`} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); openFaqCategoryDelete(); }}
                            className={`p-1 sm:p-1.5 md:p-2 rounded-lg transition-all duration-200 ${isExpanded ? "hover:bg-white/20" : "hover:bg-red-50 group-hover:hover:bg-white/20 cursor-pointer"}`}
                        >
                            <Trash className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-colors text-denied" />
                        </button>
                        <ChevronDown
                            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-300 ${isExpanded ? "rotate-180 text-white" : "text-primary group-hover:text-accent"}`}
                        />
                    </div>
                </div>

                <Modal title={t("faq")} ref={questionsRef} onClose={() => closeQuestionsModal()}>
                    <FAQModal faqCategoryId={faqCategoryData.id} onClose={() => closeQuestionsModal()} />
                </Modal>
                <Modal ref={deleteFaqCategoryRef} onClose={() => closeFaqCategoryDelete()} title={t("Delete Faq Category")}>
                    <DeleteModal onClose={() => closeFaqCategoryDelete()} handleDeleteItem={() => handleDeleteFaqCategory()} isDeleting={isDeletingFaqCategory} />
                </Modal>
                <Modal ref={editFaqCategoryRef} onClose={() => closeFaqCategoryEdit()} title={t("Update Faq Category")}>
                    <FAQCategory faqCategoryId={faqCategoryData.id} onClose={() => closeFaqCategoryEdit()} />
                </Modal>
            </div>

            {/* Smooth dropdown using measured max-height + opacity */}
            <div
                aria-hidden={!isExpanded}
                className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out bg-[#f1f2f7]"
                style={{
                    maxHeight: isExpanded ? `${panelHeight}px` : 0,
                    opacity: isExpanded ? 1 : 0,
                }}
            >
                {/* single ref that wraps all items so scrollHeight is the total height */}
                <div ref={panelInnerRef} className="divide-y divide-gray-200">
                    {faqByFaqCategoryIdData?.map((data) => (
                        <div
                            key={data.id}
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-5 hover:bg-white/5"
                        >
                            <div className="flex-1">
                                <p className="text-gray-800 font-medium whitespace-pre-wrap">{data.question}</p>
                                <p className="mt-2 text-gray-700 text-sm whitespace-pre-wrap">{data.answer}</p>
                            </div>

                            <div className="flex items-center gap-2 ml-0 sm:ml-4 mt-3 sm:mt-0">
                                <button
                                    onClick={(e) => { e.stopPropagation(); openEdit(data.id); }}
                                    aria-label="Edit FAQ"
                                    className="p-2 cursor-pointer rounded-lg transition-colors duration-150 hover:bg-white/20"
                                >
                                    <SquarePen className="w-4 h-4 text-primary" />
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); openDelete(data.id); }}
                                    aria-label="Delete FAQ"
                                    className="p-2 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-red-50"
                                >
                                    <Trash className="w-4 h-4 text-denied" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal ref={editRef} title={t("Edit FAQ")} onClose={(e) => { closeEdit(); e.stopPropagation(); }}>
                <FAQModal
                    onClose={() => closeEdit()}
                    faqId={faqId}
                    initialValues={{
                        id: faqId,
                        questionEn: "",
                        questionAr: "",
                        answerEn: "",
                        answerAr: "",
                    }}
                />
            </Modal>
            {/* ${data.questionEn ?? ""} */}
            <Modal title={`${t("Delete.Delete")} `} onClose={(e) => { closeDelete(); e.stopPropagation(); }} ref={deleteRef} delete="delete">
                <DeleteModal
                    itemName=""
                    handleDeleteItem={handleDelete}
                    isDeleting={isDeleting}
                />
            </Modal>
        </div>
    );
}

export default FAQItem;