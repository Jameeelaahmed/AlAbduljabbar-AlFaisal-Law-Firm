import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    createFaq,
    updateFaq,
    deleteFaq,
    getAllFaqs,
    getFaqById,
    getFaqForUpdate,
    testFaqCulture
} from '../api/faq' // adjust the path to match your project
import { toast } from 'react-toastify'

// helper to get readable error message
const getErrorMessage = (error) => {
    return error?.response?.data?.message || error?.message || 'An unexpected error occurred'
}

// ✅ Fetch all FAQs
export const useFaqs = () => {
    return useQuery({
        queryKey: ['faqs'],
        queryFn: getAllFaqs,
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Fetch FAQ by ID
export const useFaqById = (id) => {
    return useQuery({
        queryKey: ['faq', id],
        queryFn: () => getFaqById(id),
        enabled: !!id, // only fetch if id exists
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Fetch FAQ for update
export const useFaqForUpdate = (id) => {
    return useQuery({
        queryKey: ['faqForUpdate', id],
        queryFn: () => getFaqForUpdate(id),
        enabled: !!id,
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Create FAQ
export const useCreateFaq = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createFaq,
        onSuccess: () => {
            queryClient.invalidateQueries(['faqs'])
            toast.success('FAQ saved successfully')
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Update FAQ
export const useUpdateFaq = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }) => updateFaq(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['faqs'])
            toast.success('FAQ updated successfully')
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Delete FAQ
export const useDeleteFaq = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteFaq,
        onSuccess: () => {
            queryClient.invalidateQueries(['faqs'])
            toast.success('FAQ deleted')
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Test FAQ culture
export const useTestFaqCulture = () => {
    return useQuery({
        queryKey: ['testFaqCulture'],
        queryFn: testFaqCulture,
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}
