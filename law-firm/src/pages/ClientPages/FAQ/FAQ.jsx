import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useGetFaqByFaqCategoryId, useFaqCategory } from '../../../hooks/useFAQ';

const FAQPage = () => {
    const [openItems, setOpenItems] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();

    const {
        data: categories = [],
        isLoading: categoriesLoading,
    } = useFaqCategory();

    const toggleItem = (index) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) newOpenItems.delete(index);
        else newOpenItems.add(index);
        setOpenItems(newOpenItems);
    };

    const CategorySection = ({ category, categoryIndex }) => {
        const categoryId = category.id ?? category._id ?? category.value ?? null;
        const title = category.name ?? category.category ?? category.title ?? '';

        const {
            data: faqsRaw,
            isLoading: faqsLoading,
            isError: faqsError
        } = useGetFaqByFaqCategoryId(categoryId);

        const faqs = Array.isArray(faqsRaw) ? faqsRaw : (faqsRaw?.data ?? []);

        const filteredQuestions = faqs.filter(item =>
            (item.question ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.answer ?? '').toLowerCase().includes(searchTerm.toLowerCase())
        );

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
                        <div className="px-6 py-6 text-gray-500">{t("Loading...")}</div>
                    ) : faqsError ? (
                        <div className="px-6 py-6 text-red-500">{t("Failed to load FAQs.")}</div>
                    ) : filteredQuestions.length === 0 ? (
                        <div className="px-6 py-6 text-gray-500">{t("No questions found.")}</div>
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
                                            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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

    const renderedSections = categories?.map((category, idx) => (
        <CategorySection key={category.id ?? idx} category={category} categoryIndex={idx} />
    ));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero header (same style as Contact Us hero) */}
            <section className="bg-primary text-white pt-28 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {t("Frequently Asked Questions")}
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        {t("Find quick answers to common questions about our platform, features, and services.")}
                    </p>
                </div>
            </section>

            {/* Main content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder={t("Search FAQs...")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-white text-[#1f1f1f] placeholder-gray-400 focus:ring-4 focus:ring-[#7a5a21]/20 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* FAQ Sections */}
                <div className="space-y-8">
                    {!categoriesLoading && renderedSections}
                </div>

                {/* Still have questions */}
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
                  from { opacity: 0; transform: translateY(-10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default FAQPage;