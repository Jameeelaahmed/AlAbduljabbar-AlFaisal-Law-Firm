// libs
import { useTranslation } from 'react-i18next'
import { useRef } from 'react';
// components
import Headline from '../../../components/AdminComponents/Headline/Headline'
import Modal from '../../../components/AdminComponents/Modals/Modal';
import AddTypeModal from '../../../components/AdminComponents/Modals/AddTypeModal/AddTypeModal';
import { useGetAllConsultationTypes } from '../../../hooks/useConsultations';
import ConsultationTypeItems from '../../../components/AdminComponents/ConsultationTypeItems/ConsultationTypeItems';
import { Loading } from '../../../components/Common/Loading';

function ConsultationTypes() {
    const { t } = useTranslation();
    const addTypeRef = useRef();
    const { data: consultationTypes,isLoading } = useGetAllConsultationTypes();

    function openAddType() {
        addTypeRef.current.open();
    }

    function closeAddType() {
        addTypeRef.current.close();
    }
    if (isLoading) {
        return (
            <Loading />
        );
    }
    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50 shadow-lg">
            <Headline headlineLabel={t("consultationTypes")} buttonLabel={t("addType")} buttonIcon="+" handleOpenModal={() => openAddType()} />
            <Modal ref={addTypeRef} title={t("Add Consultation Type")} onClose={() => closeAddType()}>
                <AddTypeModal />
            </Modal>
            {consultationTypes?.map((type) => (
                <ConsultationTypeItems key={type.id} type={type} />
            ))}
        </div>
    )
}

export default ConsultationTypes
