import React from "react";
import { useTranslation } from "react-i18next";
import { Users, Linkedin, Mail, Award, Briefcase } from "lucide-react";

function OurTeam() {
    const { i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";

    const teamMembers = [
        {
            id: 1,
            name: isRtl ? "عبدالله العبدالجبار" : "Abdullah AlAbduljabbar",
            title: isRtl ? "الشريك المؤسس" : "Founding Partner",
            specialty: isRtl ? "القانون التجاري والتحكيم الدولي" : "Commercial Law & International Arbitration",
            experience: "15+",
            description: isRtl
                ? "خبير في القانون التجاري والتحكيم الدولي مع أكثر من 15 عاماً من الخبرة في قضايا الشركات متعددة الجنسيات."
                : "Expert in commercial law and international arbitration with over 15 years of experience in multinational corporate cases.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            linkedin: "#",
            email: "abdullah@firm.com"
        },
        {
            id: 2,
            name: isRtl ? "محمد الفيصل" : "Mohammed AlFaisal",
            title: isRtl ? "الشريك المؤسس" : "Founding Partner",
            specialty: isRtl ? "قانون الشركات والاستثمار" : "Corporate & Investment Law",
            experience: "12+",
            description: isRtl
                ? "متخصص في قانون الشركات والاستثمار مع سجل حافل في عمليات الدمج والاستحواذ."
                : "Specialized in corporate and investment law with a track record in mergers and acquisitions.",
            image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            linkedin: "#",
            email: "mohammed@firm.com"
        },
        {
            id: 3,
            name: isRtl ? "سارة العتيبي" : "Sara AlOtaibi",
            title: isRtl ? "المحامية الأولى" : "Senior Lawyer",
            specialty: isRtl ? "القانون المدني والعائلي" : "Civil & Family Law",
            experience: "8+",
            description: isRtl
                ? "تركيز على القانون المدني وقضايا الأسرة مع نهج عملي لحل النزاعات."
                : "Focus on civil law and family cases with a practical approach to dispute resolution.",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            linkedin: "#",
            email: "sara@firm.com"
        },
        {
            id: 4,
            name: isRtl ? "خالد الحربي" : "Khalid AlHarbi",
            title: isRtl ? "محامي عقود" : "Contract Lawyer",
            specialty: isRtl ? "صياغة العقود والتفاوض" : "Contract Drafting & Negotiation",
            experience: "10+",
            description: isRtl
                ? "يمتلك خبرة واسعة في صياغة العقود والتفاوض بشأنها لحماية مصالح العملاء."
                : "Extensive experience in drafting and negotiating contracts to protect client interests.",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            linkedin: "#",
            email: "khalid@firm.com"
        },
        {
            id: 5,
            name: isRtl ? "نورة القحطاني" : "Nora AlQahtani",
            title: isRtl ? "محامية عقارية" : "Real Estate Lawyer",
            specialty: isRtl ? "القانون العقاري والتملك" : "Real Estate & Property Law",
            experience: "7+",
            description: isRtl
                ? "متخصصة في القانون العقاري والمعاملات العقارية المعقدة في السوق السعودي والمصري."
                : "Specialized in real estate law and complex property transactions in Saudi and Egyptian markets.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            linkedin: "#",
            email: "nora@firm.com"
        },
        {
            id: 6,
            name: isRtl ? "أحمد السديري" : "Ahmed AlSudairi",
            title: isRtl ? "محامي ضرائب" : "Tax Lawyer",
            specialty: isRtl ? "القانون الضريبي والجبائي" : "Tax & Fiscal Law",
            experience: "9+",
            description: isRtl
                ? "يقدم استشارات ضريبية متقدمة للشركات والأفراد في المملكة العربية السعودية ومصر."
                : "Provides advanced tax consulting for companies and individuals in Saudi Arabia and Egypt.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            linkedin: "#",
            email: "ahmed@firm.com"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-[var(--color-bg)] to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm font-medium mb-6">
                        <Users size={18} />
                        {isRtl ? "فريقنا المحترف" : "Our Professional Team"}
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4 leading-tight">
                        {isRtl ? (
                            <>
                                <span className="block">تعرف على</span>
                                <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                                    فريقنا القانوني
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="block">Meet Our</span>
                                <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                                    Legal Team
                                </span>
                            </>
                        )}
                    </h2>

                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        {isRtl
                            ? "فريق من المحامين المتخصصين ذوي الخبرة الواسعة في مختلف المجالات القانونية بين السعودية ومصر"
                            : "A team of specialized lawyers with extensive experience in various legal fields across Saudi Arabia and Egypt"
                        }
                    </p>

                    <div className="w-20 h-1 bg-[var(--color-secondary)] mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.id}
                            className="group bg-white rounded-3xl shadow-lg hover:shadow-xl border border-[var(--color-secondary)]/10 p-6 transition-all duration-500 hover:-translate-y-2"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Image & Basic Info */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block mb-4">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-1 mx-auto">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full rounded-full object-cover bg-white"
                                        />
                                    </div>
                                    {/* Experience Badge */}
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[var(--color-secondary)] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                        {member.experience} {isRtl ? "سنوات" : "Years"}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-[var(--color-primary)] font-semibold mb-1">
                                    {member.title}
                                </p>
                                <p className="text-[var(--color-secondary)] text-sm mb-4">
                                    {member.specialty}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed text-sm mb-6 text-center">
                                {member.description}
                            </p>

                            {/* Social Links */}
                            <div className="flex justify-center gap-3 pt-4 border-t border-[var(--color-secondary)]/20">
                                <a
                                    href={member.linkedin}
                                    className="w-10 h-10 bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)] text-[var(--color-primary)] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group/linkedin"
                                >
                                    <Linkedin size={18} className="group-hover/linkedin:scale-110 transition-transform" />
                                </a>
                                <a
                                    href={`mailto:${member.email}`}
                                    className="w-10 h-10 bg-[var(--color-accent)]/10 hover:bg-[var(--color-accent)] text-[var(--color-accent)] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group/email"
                                >
                                    <Mail size={18} className="group-hover/email:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16">
                    {[
                        { icon: Users, number: "25+", label: isRtl ? "محامٍ متخصص" : "Expert Lawyers" },
                        { icon: Award, number: "15+", label: isRtl ? "سنوات خبرة" : "Years Experience" },
                        { icon: Briefcase, number: "1000+", label: isRtl ? "قضية منجزة" : "Cases Handled" },
                        { icon: Users, number: "2", label: isRtl ? "دول" : "Countries" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-secondary)]/10">
                            <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <stat.icon size={24} className="text-[var(--color-primary)]" />
                            </div>
                            <div className="text-2xl font-bold text-[var(--color-text)] mb-1">
                                {stat.number}
                            </div>
                            <div className="text-sm text-gray-600">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurTeam;