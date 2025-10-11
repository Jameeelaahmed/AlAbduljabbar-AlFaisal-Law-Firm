import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function ClientOpinions() {
    const { t, i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";

    const opinions = [
        {
            id: 1,
            name: isRtl ? "ليلى حسن" : "Laila Hassan",
            role: isRtl ? "عميل عقارات" : "Real Estate Client",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&q=80",
            rating: 5,
            text: isRtl
                ? "تعامل فريق العبد الجبار والفَـيصل مع معاملتنا العقارية بأقصى درجات الاحترافية والكفاءة. موصى به بشدة!"
                : "Team handled our property matter with outstanding professionalism and efficiency. Highly recommended!",
        },
        {
            id: 2,
            name: isRtl ? "عمر الفارسي" : "Omar Al-Farsi",
            role: isRtl ? "عميل شركات" : "Corporate Client",
            avatar: "https://images.unsplash.com/photo-1545996124-1f4d1b2f8c2b?w=80&h=80&q=80",
            rating: 5,
            text: isRtl
                ? "قَدمت شركة العبد الجبار والفَـيصل للمحاماة دعماً قانونياً استثنائياً لإعادة هيكلة شركتنا. كانت نتائجهم مفصّلة لا تقدر بثمن."
                : "Provided exceptional legal support in restructuring our company. Their attention to detail was invaluable.",
        },
        {
            id: 3,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 3,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 4,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 5,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 6,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 7,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 8,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 9,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 10,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 11,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 12,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 13,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 14,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 15,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
    ];

    return (
        <section
            className={`py-20 bg-bg  rtl:text-right ltr:text-left`}
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-3xl mx-auto mb-12 text-center">
                    <h2 className="text-4xl font-semibold text-primary mb-4">
                        {t("ClientOpinions.Our Clients' Opinions")}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        Description
                    </p>
                    <div className="w-20 h-[3px] bg-secondary mx-auto mt-6 rounded-full"></div>
                </div>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop
                    dir={isRtl ? "rtl" : "ltr"}
                    className="max-w-5xl mx-auto"
                    breakpoints={{
                        768: { slidesPerView: 2 },
                    }}
                >
                    {opinions.map((op) => (
                        <SwiperSlide key={op.id}>
                            <div
                                className="bg-white rounded-2xl border border-secondary shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col justify-between h-full relative"
                                dir={isRtl ? "rtl" : "ltr"}
                            >
                                {/* Decorative Quote Icon */}
                                <div className="absolute top-5 right-6 text-accent text-6xl font-serif opacity-10 select-none">
                                    “
                                </div>

                                {/* Client Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-md border-2 border-[var(--color-accent)] bg-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                                            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" />
                                            <path d="M4 20c0-4 4-7 8-7s8 3 8 7v1H4v-1z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-text">{op.name}</h3>
                                        <p className="text-sm text-secondary">{op.role}</p>
                                    </div>
                                </div>

                                {/* Opinion Text */}
                                <p className="text-text leading-relaxed italic relative z-10 text-base">
                                    “{op.text}”
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default ClientOpinions;
