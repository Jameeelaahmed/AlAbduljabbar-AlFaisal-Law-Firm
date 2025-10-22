import * as ContactUsApi from '../api/contactUs'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const getErrorMessage = (error) => {
    return error?.response?.data?.message || error?.message || 'An unexpected error occurred'
}

// ✅ Create ConatctUs Form
export const useCreateConatctUsForm = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: ContactUsApi.createContactUs,
        onSuccess: () => {
            queryClient.invalidateQueries(['faqs'])
            toast.success(t('FormSentSuccess'))
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}