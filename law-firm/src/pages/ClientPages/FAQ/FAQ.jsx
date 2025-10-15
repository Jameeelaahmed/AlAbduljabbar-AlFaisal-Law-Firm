import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQPage = () => {
    const [openItems, setOpenItems] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');

    const faqData = [
        {
            category: "Account & Registration",
            questions: [
                {
                    question: "How do I create an account?",
                    answer: "To create an account, click on the 'Sign Up' button in the top right corner, fill in your details including email and password, and verify your email address through the link we send you."
                },
                {
                    question: "Can I change my email address?",
                    answer: "Yes, you can change your email address from the account settings page. You'll need to verify the new email address before it becomes active."
                },
                {
                    question: "What should I do if I forget my password?",
                    answer: "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password securely."
                }
            ]
        },
        {
            category: "Billing & Payments",
            questions: [
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for certain subscription plans."
                },
                {
                    question: "How can I update my billing information?",
                    answer: "You can update your billing information in the 'Billing' section of your account settings. All changes are encrypted and secure."
                },
                {
                    question: "Do you offer refunds?",
                    answer: "We offer a 30-day money-back guarantee for all annual plans. Monthly plans can be canceled at any time without additional charges."
                }
            ]
        },
        {
            category: "Features & Usage",
            questions: [
                {
                    question: "How do I get started with the platform?",
                    answer: "After registration, you can take our interactive tour, check out our tutorial videos, or start with our pre-built templates to get familiar with the features."
                },
                {
                    question: "Is there a mobile app available?",
                    answer: "Yes, we have mobile apps for both iOS and Android devices. You can download them from the respective app stores."
                },
                {
                    question: "Can I collaborate with team members?",
                    answer: "Absolutely! You can invite team members, set permission levels, and collaborate in real-time on projects and documents."
                }
            ]
        },
        {
            category: "Technical Support",
            questions: [
                {
                    question: "What browsers are supported?",
                    answer: "We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, we recommend keeping your browser updated."
                },
                {
                    question: "How do I report a bug or issue?",
                    answer: "You can report issues through our support portal in the help section, or email us directly at support@example.com with details about the problem."
                },
                {
                    question: "Is my data secure?",
                    answer: "Yes, we use industry-standard encryption and security measures to protect your data. All data is stored on secure servers with regular backups."
                }
            ]
        }
    ];

    const toggleItem = (index) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            newOpenItems.add(index);
        }
        setOpenItems(newOpenItems);
    };

    const filteredFAQs = faqData.map(category => ({
        ...category,
        questions: category.questions.filter(item =>
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    return (
        <div className="min-h-screen bg-[#f4f5f3] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#1f1f1f] mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find quick answers to common questions about our platform, features, and services.
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
                    {filteredFAQs.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="bg-white rounded-2xl shadow-sm border border-[#7a5a21]/20 overflow-hidden">
                            {/* Category Header */}
                            <div className="bg-gradient-to-r from-[#003a42] to-[#006b63] p-6">
                                <h2 className="text-xl font-semibold text-white">
                                    {category.category}
                                </h2>
                            </div>

                            {/* Questions */}
                            <div className="divide-y divide-[#7a5a21]/10">
                                {category.questions.map((item, itemIndex) => {
                                    const globalIndex = `${categoryIndex}-${itemIndex}`;
                                    const isOpen = openItems.has(globalIndex);

                                    return (
                                        <div key={globalIndex} className="transition-all duration-200">
                                            <button
                                                onClick={() => toggleItem(globalIndex)}
                                                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-[#f4f5f3] transition-colors duration-200 group"
                                            >
                                                <span className="font-medium text-[#1f1f1f] text-lg pr-4 group-hover:text-[#003a42]">
                                                    {item.question}
                                                </span>
                                                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[#006b63] rounded-full text-white">
                                                    {isOpen ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </div>
                                            </button>

                                            {isOpen && (
                                                <div className="px-6 pb-5 animate-fade-in">
                                                    <div className="pl-4 border-l-2 border-[#7a5a21]">
                                                        <p className="text-gray-600 leading-relaxed">
                                                            {item.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Still have questions section */}
                <div className="mt-16 text-center bg-white rounded-2xl p-8 border border-[#7a5a21]/20">
                    <h3 className="text-2xl font-bold text-[#1f1f1f] mb-4">
                        Still have questions?
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Can't find the answer you're looking for? Please reach out to our friendly support team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-[#003a42] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#002a32] transition-colors duration-200 shadow-sm">
                            Contact Support
                        </button>
                        <button className="border border-[#7a5a21] text-[#7a5a21] px-8 py-3 rounded-xl font-semibold hover:bg-[#7a5a21] hover:text-white transition-all duration-200">
                            Send Email
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