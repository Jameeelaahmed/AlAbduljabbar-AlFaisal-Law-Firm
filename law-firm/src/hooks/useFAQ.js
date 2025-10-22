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
    const { i18n } = useTranslation()
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
    const { i18n } = useTranslation()
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'

    return useQuery({
        queryKey: ['faq', id, currentLang],
        queryFn: () => getFaqById(id),
        enabled: !!id,
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Fetch FAQ by Faq Category ID
export const useGetFaqByFaqCategoryId = (id) => {
    const { i18n } = useTranslation()
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'

    return useQuery({
        queryKey: ['faq', id, currentLang],
        queryFn: () => getFaqByFaqCategoryId(id),
        enabled: !!id,
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Create FAQ
export const useCreateFaq = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: createFaq,
        onSuccess: () => {
            queryClient.invalidateQueries(['faqs'])
            toast.success(t('FAQ.CreateSuccess'))
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Fetch FAQ for update
export const useFaqForUpdate = (id) => {
    const { i18n } = useTranslation()
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
    const { t } = useTranslation()

    return useMutation({
        mutationFn: ({ id, data }) => updateFaq(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['faqs'])
            toast.success(t('FAQ.UpdateSuccess'))
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Delete FAQ
export const useDeleteFaq = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: deleteFaq,
        onSuccess: () => {
            queryClient.invalidateQueries(['faqs'])
            toast.success(t('FAQ.DeleteSuccess'))
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
    const { t } = useTranslation()

    return useMutation({
        mutationFn: createFaqCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(['faqCategory'])
            toast.success(t('FAQ.Category.CreateSuccess'))
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Fetch all FAQ Categories
export const useFaqCategory = () => {
    const { i18n } = useTranslation()
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

// ✅ Delete FAQ Category
export const useDeleteFaqCategory = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: deleteFaqCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(['faqCategory'])
            toast.success(t('FAQ.Category.DeleteSuccess'))
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}

// ✅ Fetch FAQ Category for update
export const useFaqForUpdateFaqCategory = (id) => {
    const { i18n } = useTranslation()
    const currentLang = i18n.language || localStorage.getItem('selectedLanguage') || 'ar'

    return useQuery({
        queryKey: ["faqCategoryForUpdate", id, currentLang],
        queryFn: () => getFaqCategoryForUpdate(id),
        enabled: !!id,
    });
}

// ✅ Update FAQ Category
export const useUpdateFaqCategory = () => {
    const queryClient = useQueryClient()
    const { t } = useTranslation()

    return useMutation({
        mutationFn: ({ id, data }) => updateFaqCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['faqCategory'])
            toast.success(t('FAQ.Category.UpdateSuccess'))
        },
        onError: (err) => {
            toast.error(getErrorMessage(err))
        },
    })
}