import React from "react";
import { useTranslation } from "react-i18next";
import { Target, Award, ArrowRight, Scale, Users } from "lucide-react";

function OurVision() {
    const { i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";

    return (
        <section className="py-20 bg-gradient-to-b from-white to-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                        <Target size={18} />
                        {isRtl ? "رؤيتنا ورسالتنا" : "Our Vision & Mission"}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                        {isRtl ? "أسس نجاحنا" : "Foundations of Our Success"}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {isRtl
                            ? "نحن نؤمن بأن العدالة والتميز هما الركيزتان الأساسيتان لتحقيق النجاح في المجال القانوني"
                            : "We believe that justice and excellence are the fundamental pillars for success in the legal field"
                        }
                    </p>
                </div>

                {/* Mission & Vision Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                    {/* Mission */}
                    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-xl border border-secondary/10 p-8 transition-all duration-500 hover:-translate-y-2">
                        {/* Background Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700 hidden lg:block"></div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Target size={28} className="text-white" />
                                </div>
                                <div className="text-6xl text-primary/10 font-serif select-none">01</div>
                            </div>

                            <h3 className="text-2xl font-bold text-text mb-4 flex items-center gap-3">
                                {isRtl ? "رسالتنا" : "Our Mission"}
                                <div className="w-12 h-1 bg-primary rounded-full"></div>
                            </h3>

                            <p className="text-gray-600 leading-relaxed text-lg">
                                {isRtl
                                    ? "تقديم خدمات قانونية استثنائية تحمي حقوق عملائنا وتحقق العدالة من خلال التميز والابتكار والالتزام بأعلى معايير المهنة"
                                    : "To deliver exceptional legal services that protect our clients' rights and achieve justice through excellence, innovation, and commitment to the highest professional standards"
                                }
                            </p>
                        </div>
                    </div>

                    {/* Vision */}
                    <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-xl border border-secondary/10 p-8 transition-all duration-500 hover:-translate-y-2">
                        {/* Background Accent */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-700 hidden lg:block"></div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Award size={28} className="text-white" />
                                </div>
                                <div className="text-6xl text-accent/10 font-serif select-none">02</div>
                            </div>

                            <h3 className="text-2xl font-bold text-text mb-4 flex items-center gap-3">
                                {isRtl ? "رؤيتنا" : "Our Vision"}
                                <div className="w-12 h-1 bg-accent rounded-full"></div>
                            </h3>

                            <p className="text-gray-600 leading-relaxed text-lg">
                                {isRtl
                                    ? "أن نكون شركة المحاماة الرائدة في المنطقة، المعترف بها عالمياً لتميزنا في تقديم الحلول القانونية المبتكرة والدفاع عن العدالة"
                                    : "To be the leading law firm in the region, globally recognized for our excellence in delivering innovative legal solutions and defending justice"
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OurVision;