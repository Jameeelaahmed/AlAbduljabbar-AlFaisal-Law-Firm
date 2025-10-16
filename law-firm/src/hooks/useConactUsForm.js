import * as ContactUsApi from '../api/contactUs'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const getErrorMessage = (error) => {
    return error?.response?.data?.message || error?.message || 'An unexpected error occurred'
}

// ✅ Create ConatctUs Form
export const useCreateConatctUsForm = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ContactUsApi.createContactUs,
        onSuccess: () => {
            queryClient.invalidateQueries(['faqs'])
            toast.success('Your form sent successfully')
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}