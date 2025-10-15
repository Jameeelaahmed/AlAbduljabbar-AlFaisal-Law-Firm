import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Trash, ChevronDown, SquarePen } from "lucide-react";

import Modal from "../../Modals/Modal";
import DeleteModal from "../../Modals/DeleteModal/DeleteModal";
import FAQModal from "../../Modals/FAQModal/FAQModal";
import { useDeleteFaq } from "../../../../hooks/useFAQ";

function FAQItem({ data }) {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const deleteRef = useRef();
    const editRef = useRef();
    const [isDeleting, setIsDeleting] = useState(false);

    // new refs/state for smooth dropdown
    const panelRef = useRef(null);
    const [panelHeight, setPanelHeight] = useState(0);

    // Ensure hooks are called unconditionally (before any early return)
    const { mutateAsync: deleteFaq } = useDeleteFaq();

    useEffect(() => {
        if (!panelRef.current) return;
        // measure content height
        setPanelHeight(panelRef.current.scrollHeight);
    }, [data, isExpanded]);

    if (!data) return null;

    function openDelete() {
        deleteRef.current?.open();
    }
    function closeDelete() {
        deleteRef.current?.close();
    }

    function openEdit() {
        editRef.current?.open();
    }
    function closeEdit() {
        editRef.current?.close();
    }

    async function handleDelete() {
        setIsDeleting(true);
        try {
            await deleteFaq(data.id);
            closeDelete();
        } catch (err) {
            console.error("Failed to delete FAQ:", err);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="group">
            <div
                className={`flex justify-between items-center p-3 sm:p-4 md:p-6 cursor-pointer transition-all duration-300 ${isExpanded ? "bg-primary text-white" : "hover:text-accent"
                    }`}
                onClick={() => setIsExpanded(!isExpanded)}
            >

                <p className={`font-semibold text-sm sm:text-base md:text-lg lg:text-xl leading-tight transition-colors ${isExpanded ? "text-white" : "group-hover:text-accent"}`}>
                    {data.question}
                </p>

                <div className="flex justify-around gap-2 sm:gap-3 md:gap-4 lg:gap-6 items-center">
                    <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                        <button
                            onClick={(e) => { e.stopPropagation(); openEdit(); }}
                            className={`p-1 sm:p-1.5 md:p-2 cursor-pointer rounded-lg transition-all duration-200 ${isExpanded ? "hover:bg-white/20" : "hover:bg-secondary/10 group-hover:hover:bg-white/20 cursor-pointer"}`}
                        >
                            <SquarePen className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-colors ${isExpanded ? "text-white" : "text-primary group-hover:text-accent"}`} />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); openDelete(); }}
                            className={`p-1 sm:p-1.5 md:p-2 rounded-lg transition-all duration-200 ${isExpanded ? "hover:bg-white/20" : "hover:bg-red-50 group-hover:hover:bg-white/20 cursor-pointer"}`}
                        >
                            <Trash className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-colors text-denied" />
                        </button>

                        <ChevronDown
                            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-300 ${isExpanded ? "rotate-180 text-white" : "text-primary group-hover:text-accent"}`}
                        />
                    </div>
                </div>
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
                <div ref={panelRef} className="p-5 sm:text-sm md:text-sm">
                    {/* content stays the same — full answers */}
                    <div className="mb-3">
                        <div className="mt-1 text-gray-800 whitespace-pre-wrap">{data.answer}</div>
                    </div>
                </div>
            </div>

            <Modal ref={editRef} title={t("Edit FAQ")} onClose={(e) => { closeEdit(); e.stopPropagation(); }}>
                <FAQModal
                    onClose={() => closeEdit()}
                    faqId={data.id}
                    initialValues={{
                        id: data.id,
                        questionEn: data.questionEn,
                        questionAr: data.questionAr,
                        answerEn: data.answerEn,
                        answerAr: data.answerAr,
                    }}
                />
            </Modal>

            <Modal title={`${t("Delete.Delete")} ${data.questionEn ?? ""}`} onClose={(e) => { closeDelete(); e.stopPropagation(); }} ref={deleteRef} delete="delete">
                <DeleteModal
                    itemName={data.questionEn}
                    handleDeleteItem={handleDelete}
                    isDeleting={isDeleting}
                />
            </Modal>
        </div>
    );
}

export default FAQItem;