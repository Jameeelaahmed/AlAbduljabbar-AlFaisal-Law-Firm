import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    createFaq,
    updateFaq,
    deleteFaq,
    getAllFaqs,
    getFaqById,
    getFaqForUpdate,
    testFaqCulture,
    createFaqCategory,
    getAllFaqCategory,
    deleteFaqCategory,
    updateFaqCategory,
    getFaqCategoryForUpdate,
    getFaqByFaqCategoryId
} from '../api/faq' // adjust the path to match your project
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
// helper to get readable error message
const getErrorMessage = (error) => {
    return error?.response?.data?.message || error?.message || 'An unexpected error occurred'
}

// ✅ Fetch all FAQs
export const useFaqs = () => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'

    return useQuery({
        queryKey: ['faqs', currentLang],
        queryFn: getAllFaqs,
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
        retry: 3,
    })
}

// ✅ Fetch FAQ by ID
export const useFaqById = (id) => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'

    return useQuery({
        queryKey: ['faq', id, currentLang],
        queryFn: () => getFaqById(id),
        enabled: !!id, // only fetch if id exists
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Fetch FAQ by Faq Category ID
export const useGetFaqByFaqCategoryId = (id) => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'

    return useQuery({
        queryKey: ['faq', id, currentLang],
        queryFn: () => getFaqByFaqCategoryId(id),
        enabled: !!id, // only fetch if id exists
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

// ✅ Fetch FAQ for update
export const useFaqForUpdate = (id) => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'

    return useQuery({
        queryKey: ['faqForUpdate', id, currentLang],
        queryFn: () => getFaqForUpdate(id),
        enabled: !!id,
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



// *** FAQ Categories

export const useCreateFaqCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createFaqCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(['faqCategory'])
            toast.success('FAQ Category saved successfully')
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Fetch all FAQs
export const useFaqCategory = () => {
    const { i18n } = useTranslation() // read language at render time
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'

    return useQuery({
        queryKey: ['faqCategory', currentLang],
        queryFn: getAllFaqCategory,
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
        retry: 3,
    })
}


// ✅ Delete FAQ
export const useDeleteFaqCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteFaqCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(['faqCategory'])
            toast.success('FAQ Category deleted successfuly')
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}


// ✅ Fetch FAQ for update
export const useFaqForUpdateFaqCategory = (id) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'

    return useQuery({
        queryKey: ['faqCategoryForUpdate', id, currentLang],
        queryFn: () => getFaqCategoryForUpdate(id),
        enabled: !!id,
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Update FAQ
export const useUpdateFaqCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }) => updateFaqCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['faqs'])
            toast.success('FAQ Category updated successfully')
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}