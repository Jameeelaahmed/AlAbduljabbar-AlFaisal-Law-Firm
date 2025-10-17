// components 
import GenericTable from "../../../components/AdminComponents/Table/GenericTable";
import Headline from "../../../components/AdminComponents/Headline/Headline";
import Modal from "../../../components/AdminComponents/Modals/Modal";
// hooks
import { useState, useMemo, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../../../hooks/useContacts";
import { Info } from "lucide-react";

export default function ContactsPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedMessage, setSelectedMessage] = useState(null);
    const modalRef = useRef(null);

    const handleExpandMessage = useCallback((message) => {
        setSelectedMessage(message);
        modalRef.current?.open();
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedMessage(null);
        modalRef.current?.close();
    }, []);

    const tableColumns = useMemo(
        () => [
            {
                key: "email",
                header: t("Contacts.email"),
            },
            {
                key: "phoneNumber",
                header: t("Contacts.phoneNumber"),
            },
            {
                key: "message",
                header: t("Contacts.message"),
                render: (message) => (
                    <span className="truncate max-w-xs inline-block">
                        {message.length > 20 ? `${message.substring(0, 50)}...` : message}
                    </span>
                ),
            },
        ],
        [t]
    );
    const tableActions = useMemo(
        () => [
            {
                label: t("Contacts.expandMessage"),
                icon: <Info className="w-4 h-4" />,
                onClick: (row) => handleExpandMessage(row.message),
                className: "text-blue-500 hover:bg-blue-50",
            },
        ],
        [t, handleExpandMessage]);

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 shadow-lg">
            <Headline headlineLabel={t("Contacts.Management")} />

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <GenericTable
                    useDataHook={useContacts}
                    columns={tableColumns}
                    actions={tableActions}
                    url="/admin/contacts"
                    pageSize={5}
                    initialPage={1}
                />
            </div>

            <Modal
                ref={modalRef}
                title={t("Contacts.messageDetails")}
                onClose={handleCloseModal}
            >
                {selectedMessage && (
                    <div className="p-6 w-full max-w-2xl">
                        <div className="bg-gray-50 p-4 rounded-lg max-h-[60vh] overflow-y-auto">
                            <p className="whitespace-pre-wrap break-words">{selectedMessage}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
