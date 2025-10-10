// libs
import { useTranslation } from "react-i18next"
// libs
import { useState } from "react";
// hooks
import { useCreateCategory } from '../../../../hooks/useCategories';
// components
import AddCategoryPresentational from "./AddCategoryPresentational"

function AddCategoryContainer({ onClose }) {
    const { t } = useTranslation();
    const [selectedBranches, setSelectedBranches] = useState({
        egypt: false,
        saudi: false
    });

    const getBranchId = (egypt, saudi) => {
        if (egypt && saudi) return 0; // Both branches
        if (egypt && !saudi) return 1; // Egypt only
        if (!egypt && saudi) return 2; // Saudi only
        return 0; // Default to both if none selected
    };

    const handleToggleChange = (branch, setFieldValue) => {
        const newSelection = {
            ...selectedBranches,
            [branch]: !selectedBranches[branch]
        };
        setSelectedBranches(newSelection);

        const branchId = getBranchId(newSelection.egypt, newSelection.saudi);
        setFieldValue('branchId', branchId);
    };

    const createCategoryMutation = useCreateCategory();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values);
        try {
            await createCategoryMutation.mutateAsync(values);

            resetForm();
            onClose?.(); // Close modal after successful creation
        } catch (error) {
            // Error is already handled in the hook with toast
            console.error('Failed to create category:', error);
        } finally {
            setSubmitting(false);
            setSelectedBranches({
                egypt: false,
                saudi: false
            })
        }
    };

    return (
        <>
            <AddCategoryPresentational t={t} handleToggleChange={handleToggleChange} selectedBranches={selectedBranches} handleSubmit={handleSubmit} createCategoryMutation={createCategoryMutation} />
        </>
    )
}

export default AddCategoryContainer
