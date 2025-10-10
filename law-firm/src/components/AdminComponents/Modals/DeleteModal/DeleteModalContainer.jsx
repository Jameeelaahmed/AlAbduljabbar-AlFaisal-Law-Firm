// libs
import { useTranslation } from "react-i18next"
// components
import DeleteModalPresentational from "./DeleteModalPresentational"

function DeleteModalContainer({ itemName, handleDeleteCategory, isDeleting, error }) {
    const { t } = useTranslation()
    return (
        <>
            <DeleteModalPresentational t={t} itemName={itemName} handleDeleteCategory={handleDeleteCategory} isDeleting={isDeleting} error={error} />
        </>
    )
}

export default DeleteModalContainer
