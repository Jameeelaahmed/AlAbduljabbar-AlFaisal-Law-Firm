import { useTranslation } from "react-i18next";
import { Target, Award } from "lucide-react";
import { useHomePage } from "../../../hooks/useHomePage";

function OurVision({ baseOfSuccess }) {
    const { i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = String(i18n?.language || document.documentElement.dir || "ar").toLowerCase().startsWith("ar");

    // Map string icon names to components
    const ICON_MAP = {
        target: Target,
        award: Award,
        // aliases
        mission: Target,
        vision: Award,
    };

    return (
        <section className="py-20 bg-gradient-to-b from-white to-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-lg font-medium mb-6">
                        <Target size={18} />
                        {isRtl ? baseOfSuccess.headlineAr : baseOfSuccess.headlineEn}
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
                    {baseOfSuccess.bases.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const order = String(index + 1).padStart(2, "0");
                        let IconComp = item?.icon;
                        if (typeof IconComp === "string") {
                            IconComp = ICON_MAP[IconComp.toLowerCase()];
                        }
                        IconComp = IconComp || (isEven ? Target : Award);

                        return (
                            <div
                                key={`success-card-${index}`}
                                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-xl border border-secondary/10 p-8 transition-all duration-500 hover:-translate-y-2"
                            >
                                {/* Background Accent */}
                                <div
                                    className={`absolute top-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 group-hover:scale-150 transition-transform duration-700 hidden lg:block
                                        ${isEven ? "rtl:right-0 ltr:left-0 rtl:translate-x-16 ltr:-translate-x-16" : "rtl:left-0 ltr:right-0 rtl:-translate-x-16 ltr:translate-x-16"}`}
                                ></div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div
                                            className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300
                                                ${isEven ? "rtl:bg-gradient-to-br ltr:bg-gradient-to-bl from-primary to-accent" : "bg-gradient-to-br from-secondary to-accent"}`}
                                        >
                                            <IconComp size={28} className="text-white" />
                                        </div>
                                        <div className={`text-6xl ${isEven ? "text-primary/10" : "text-accent/10"} font-serif select-none`}>
                                            {order}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-text mb-4 flex items-center gap-3">
                                        {isRtl ? item?.titleAr : item?.titleEn}
                                        <div className={`w-12 h-1 ${isEven ? "bg-primary" : "bg-accent"} rounded-full`}></div>
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {isRtl ? item?.descriptionAr : item?.descriptionEn}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default OurVision;