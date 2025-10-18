import { Link } from "react-router-dom";
import { useAllCategories } from "../../../hooks/useCategories";
import { useTranslation } from "react-i18next";
import { useGetServicesByCategoryId } from "../../../hooks/useServices";

function OurServices() {
    const { data: categories = [], isLoading } = useAllCategories();
    const { i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";
    if (isLoading) {
        return (
            <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="h-8 w-48 bg-gray-200 rounded-full animate-pulse mx-auto mb-4" />
                        <div className="h-4 w-64 bg-gray-100 rounded-full animate-pulse mx-auto" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="animate-pulse p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
                            >
                                <div className="h-6 w-2/3 bg-gray-200 rounded-lg mb-6" />
                                <div className="h-20 bg-gray-100 rounded-xl mb-6" />
                                <div className="flex justify-between items-center">
                                    <div className="h-5 w-20 bg-gray-200 rounded-full" />
                                    <div className="h-8 w-16 bg-gray-100 rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const visible = Array.isArray(categories) ? categories.slice(0, 3) : [];

    // New: card that fetches services per-category and shows the count
    const CategoryCard = ({ cat, index }) => {
        const categoryId = cat.id ?? cat._id ?? cat.value ?? cat.categoryId ?? null;

        const {
            data: servicesRaw,
            isLoading: servicesLoading,
            isError: servicesError,
        } = useGetServicesByCategoryId(categoryId);

        const services =
            Array.isArray(servicesRaw) ? servicesRaw : (servicesRaw?.data ?? servicesRaw?.services ?? []);
        const count = Array.isArray(services) ? services.length : 0;

        return (
            <article
                key={cat.id ?? cat.name}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
                style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-accent/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />

                <div className="relative p-8 h-full flex flex-col">
                    {/* Icon/Emoji Placeholder */}
                    <div className="w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {cat.name?.charAt(0)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 mb-4 leading-tight transition-colors duration-300">
                            {cat.name}
                        </h3>

                        {cat.description && (
                            <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                                {cat.description}
                            </p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="text-sm font-semibold text-[var(--color-secondary)]">
                                {servicesLoading
                                    ? (isRtl ? "..." : "...")
                                    : servicesError
                                        ? (isRtl ? "خطأ" : "Error")
                                        : `${count} ${isRtl ? "خدمات" : "services"}`}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        );
    };

    if (!visible.length) {
        return (
            <section className="py-16 bg-gradient-to-br from-gray-50 to-white text-center">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No services available</h3>
                    <p className="text-gray-500">Check back later for our service offerings</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                {/* Header - Premium Version */}
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    {/* Badge with Icon */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-secondary/20 rounded-2xl shadow-sm mb-8">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <span className="text-primary font-semibold text-sm">
                            {isRtl ? "خدمات قانونية متخصصة" : "Specialized Legal Services"}
                        </span>
                    </div>

                    {/* Main Heading */}
                    <div className="space-y-4 mb-6">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] leading-tight">
                            {isRtl ? (
                                <>
                                    <span className="block">التميز القانوني</span>
                                    <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                                        في كل مجال
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="block">Legal Excellence</span>
                                    <span className="block bg-gradient-to-r from-[var(--color-primary)] via-accent to-secondary bg-clip-text text-transparent">
                                        in Every Field
                                    </span>
                                </>
                            )}
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                        {isRtl
                            ? "نقدم مجموعة متكاملة من الخدمات القانونية المتخصصة التي تلبي أعلى معايير الجودة والاحترافية"
                            : "We provide a comprehensive range of specialized legal services that meet the highest standards of quality and professionalism"
                        }
                    </p>

                    {/* Decorative Divider */}
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-1 bg-gradient-to-r from-transparent to-primary rounded-full"></div>
                        <div className="w-3 h-3 bg-secondary rounded-full rotate-45"></div>
                        <div className="w-12 h-1 bg-gradient-to-l from-transparent to--accent rounded-full"></div>
                    </div>
                </div>
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {visible.map((cat, index) => (
                        <CategoryCard key={cat.id ?? cat.name ?? index} cat={cat} index={index} />
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <Link
                        to="/servicespage"
                        className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        <span>View All Services</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}

export default OurServices;