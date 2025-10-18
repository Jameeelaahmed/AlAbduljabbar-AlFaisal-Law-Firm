import { useTranslation } from "react-i18next";
import { Users, Award, TrendingUp, Scale, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { useHomePage } from "../../../hooks/useHomePage";

function OurCompany() {
    const { data } = useHomePage();

    // Safe access with defaults
    const entity = data?.entitySettings ?? {};
    const milestones = entity?.journeyMilestones ?? [];
    const coreValues = entity?.coreValues ?? [];
    const summary = entity?.companySummary ?? {};

    // Map string icon names to actual components
    const ICON_MAP = {
        users: Users,
        award: Award,
        trendingup: TrendingUp,
        trending_up: TrendingUp,
        scale: Scale,
        hearthandshake: HeartHandshake,
        heart_handshake: HeartHandshake,
        handshake: HeartHandshake,
    };

    const { i18n } = useTranslation();
    const isRtl = String(i18n?.language || document?.documentElement?.dir || "ar")
        .toLowerCase()
        .startsWith("ar");

    return (
        <section className={`py-16 bg-bg rtl:text-right ltr:text-left`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium mb-6">
                        <TrendingUp size={18} />
                        {isRtl ? "رحلتنا" : "Our Journey"}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
                        {isRtl ? "شركة المحاماة: قصة تمتد 6 اعوام" : "The Law Firm: A 6-Years Journey"}
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        {isRtl
                            ? "من مكتب صغير إلى شركة محاماة رائدة، نحن نسير برؤية واضحة ورسالة ثابتة لخدمة العدالة"
                            : "From a small office to a leading law firm, we walk with clear vision and steadfast mission to serve justice"}
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
                    <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-secondary/10">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                            {summary?.yearsOfExperience ?? 0}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                            {isRtl ? "سنوات من الخبرة" : "Years Experience"}
                        </div>
                    </div>
                    <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-secondary/10">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                            {summary?.satisfiedClients ?? 0}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                            {isRtl ? "عميل راضٍ" : "Satisfied Clients"}
                        </div>
                    </div>
                    <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-secondary/10">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                            {summary?.finishedCases ?? 0}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                            {isRtl ? "قضية منجزة" : "Cases Handled"}
                        </div>
                    </div>
                    <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-secondary/10">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                            {(summary?.successRate ?? 0)}%
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                            {isRtl ? "معدل النجاح" : "Success Rate"}
                        </div>
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="max-w-5xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold text-text text-center mb-12">
                        {isRtl ? "محطات رئيسية في رحلتنا" : "Key Milestones in Our Journey"}
                    </h2>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute rtl:left-1/2 ltr:right-1/2 transform rtl:-translate-x-1/2 ltr:translate-x-1/2 w-1 h-full bg-secondary/20 hidden md:block"></div>

                        {milestones?.map((milestone, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Content */}
                                <div
                                    className={`md:w-1/2 ${index % 2 === 0
                                        ? "rtl:md:pr-12 ltr:md:pl-12"
                                        : "rtl:md:pl-12 ltr:md:pr-12"
                                        } mb-6 md:mb-0`}
                                >
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-secondary/10 hover:shadow-md transition-shadow duration-300">
                                        <div className="text-2xl font-bold text-primary mb-2">{milestone?.year}</div>
                                        <h3 className="text-xl font-semibold text-text mb-3">
                                            {isRtl ? milestone?.titleAr : milestone?.titleEn}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {isRtl ? milestone?.descriptionAr : milestone?.descriptionEn}
                                        </p>
                                    </div>
                                </div>

                                {/* Center dot */}
                                <div className="hidden md:flex w-4 h-4 bg-primary rounded-full z-10 flex-shrink-0"></div>

                                {/* Empty space for alternating sides */}
                                <div className="md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-text text-center mb-12">
                        {isRtl ? "قيمنا الأساسية" : "Our Core Values"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreValues?.map((value, index) => {
                            let IconComp = value?.icon;
                            if (typeof IconComp === "string") {
                                IconComp = ICON_MAP[IconComp.toLowerCase()];
                            }
                            // Fallback icon if not resolvable
                            IconComp = IconComp || Scale;

                            return (
                                <div
                                    key={index}
                                    className="text-center bg-white rounded-2xl p-6 shadow-sm border border-secondary/10 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="w-14 h-14 bg-[var(--color-secondary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <IconComp size={24} className="text-secondary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-text mb-3">
                                        {isRtl ? value?.titleAr : value?.titleEn}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {isRtl ? value?.descriptionAr : value?.descriptionEn}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <div className="bg-white rounded-2xl border border-secondary/20 p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                            {isRtl ? "انضم إلى رحلتنا" : "Join Our Journey"}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {isRtl
                                ? "اكتشف كيف يمكننا مساعدتك في رحلتك القانونية"
                                : "Discover how we can assist you in your legal journey"}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="servicespage"
                                className="px-6 cursor-pointer py-3 bg-primary hover:bg-accent text-white font-medium rounded-lg transition-colors duration-300"
                            >
                                {isRtl ? "اطلب خدمة" : "Request a Service"}
                            </Link>
                            <Link
                                to="consultations"
                                className="px-6 cursor-pointer py-3 border border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white font-medium rounded-lg transition-all duration-300"
                            >
                                {isRtl ? "اطلب استشارة" : "Request Consultation"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OurCompany;