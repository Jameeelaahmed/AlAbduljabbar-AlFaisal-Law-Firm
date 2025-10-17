import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGetFaqByFaqCategoryId, useFaqCategory } from '../../../hooks/useFAQ';
const FAQPage = () => {
    const [openItems, setOpenItems] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();

    // replace hardcoded faqData with categories fetched from hook
    const {
        data: categories = [],
        isLoading: categoriesLoading,
        isError: categoriesError
    } = useFaqCategory();

    const toggleItem = (index) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            newOpenItems.add(index);
        }
        setOpenItems(newOpenItems);
    };

    // helper component so we can call useGetFaqByFaqCategoryId per category (valid hook usage)
    const CategorySection = ({ category, categoryIndex }) => {
        const categoryId = category.id ?? category._id ?? category.value ?? null;
        const title = category.name ?? category.category ?? category.title ?? '';

        const {
            data: faqsRaw,
            isLoading: faqsLoading,
            isError: faqsError
        } = useGetFaqByFaqCategoryId(categoryId);

        // normalize faq list shape (support array or { data: [...] })
        const faqs = Array.isArray(faqsRaw) ? faqsRaw : (faqsRaw?.data ?? []);

        const filteredQuestions = faqs.filter(item =>
            (item.question ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.answer ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        );

        // NOTE: do NOT return null here — always render the category header and show loading/empty states
        return (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-sm border border-text/20 overflow-hidden">
                {/* Category Header */}
                <div className="bg-gradient-to-r from-primary to-accent p-6">
                    <h2 className="text-xl font-semibold text-white">
                        {title}
                    </h2>
                </div>

                {/* Questions */}
                <div className="divide-y divide-[#7a5a21]/10">
                    {faqsLoading ? (
                        <div className="px-6 py-6 text-gray-500">Loading...</div>
                    ) : faqsError ? (
                        <div className="px-6 py-6 text-red-500">Failed to load FAQs.</div>
                    ) : filteredQuestions.length === 0 ? (
                        <div className="px-6 py-6 text-gray-500">No questions found.</div>
                    ) : (
                        filteredQuestions.map((item, itemIndex) => {
                            const globalIndex = `${categoryIndex}-${itemIndex}`;
                            const isOpen = openItems.has(globalIndex);

                            return (
                                <div key={globalIndex} className="transition-all duration-200">
                                    <button
                                        onClick={() => toggleItem(globalIndex)}
                                        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-[#f4f5f3] transition-colors duration-200 group"
                                    >
                                        <span className="font-medium text-[#1f1f1f] text-lg pr-4 group-hover:text-accent">
                                            {item.question}
                                        </span>
                                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-accent rounded-full text-white">
                                            {isOpen ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="px-6 pb-5 animate-fade-in">
                                            <div className="pl-4 border-l-2 border-secondary">
                                                <p className="text-gray-600 leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        );
    };

    // map categories -> render CategorySection; keep filtering behavior so empty categories are removed
    const renderedSections = categories?.map((category, idx) => (
        <CategorySection key={category.id ?? idx} category={category} categoryIndex={idx} />
    ));

    return (
        <div className="min-h-screen bg-bg py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#1f1f1f] mb-4">
                        {t("Frequently Asked Questions")}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t("Find quick answers to common questions about our platform, features, and services.")}
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-12">
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search FAQs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006b63] focus:border-transparent bg-white text-[#1f1f1f] placeholder-gray-400 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* FAQ Sections */}
                <div className="space-y-8">
                    {/* while categories are loading, keep visual structure (you can replace with loader if desired) */}
                    {!categoriesLoading && renderedSections}
                </div>

                {/* Still have questions section */}
                <div className="mt-16 text-center bg-white rounded-2xl p-8 border border-text/20">
                    <h3 className="text-2xl font-bold text-text mb-4">
                        {t("Still have questions?")}
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        {t("Can't find the answer you're looking for? Please reach out to our friendly support team.")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-accent transition-colors duration-200 shadow-sm">
                            {t("Contact Support")}
                        </button>
                        <button className="border border-secondary text-secondary px-8 py-3 rounded-xl font-semibold hover:bg-secondary hover:text-white transition-all duration-200">
                            {t("Send Email")}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default FAQPage;