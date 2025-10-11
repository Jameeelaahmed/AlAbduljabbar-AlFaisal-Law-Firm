import React from "react";
import { useTranslation } from "react-i18next";

function OurVision() {
    const { t, i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";

    return (
        <section className={`py-12 ${isRtl ? "text-right" : "text-left"} bg-gray-50`}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    {/* Image card */}
                    <div className="order-1 md:order-1">
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={t("OurVision.Image") || "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1400&auto=format&fit=crop"}
                                alt={t("OurVision.ImageAlt") || "city skyline"}
                                className="w-full h-64 md:h-80 object-cover"
                            />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="order-2 md:order-2 max-w-xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-semibold text-emerald-900 mb-4">
                            {t("OurVision.Our Vision and Mission")}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {t("OurVision.Description") ||
                                "تمثل مهمتنا في تقديم خدمات قانونية استثنائية بذراية واحترافية، مما يضمن نجاح عملائنا. رؤيتنا هي أن نكون شركة المحاماة الرائدة في المنطقة، والمعروفة بخبرتنا والتزامنا بالتميز ورضا العملاء."}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OurVision;
