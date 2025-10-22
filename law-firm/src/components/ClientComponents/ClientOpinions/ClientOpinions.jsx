import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useHomePage } from "../../../hooks/useHomePage";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function ClientOpinions({ clientReviews }) {
    const { t, i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";

    // Prefer AR when RTL, EN otherwise; fallback to generic field if provided
    const pickLang = (obj, arKey, enKey, fallbackKey) =>
        isRtl
            ? obj?.[arKey] || obj?.[fallbackKey] || obj?.[enKey] || ""
            : obj?.[enKey] || obj?.[fallbackKey] || obj?.[arKey] || "";

    // Map API reviews to the structure used by the UI
    const opinions = (clientReviews || []).map((r, idx) => {
        const name = (pickLang(r, "nameAr", "nameEn", "name") || "").trim();
        const role = (pickLang(r, "clientOfAr", "clientOfEn", "clientOf") || "").trim();
        // clean weird prefixes/newlines coming from API
        const textRaw = pickLang(r, "reviewAr", "reviewEn", "review") || "";
        const text = textRaw.replace(/^[?:\s]+/, "").trim();

        const avatar =
            r.avatarUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Client")}&background=003a42&color=fff&size=80&bold=true`;

        return {
            id: r.id ?? idx,
            name,
            role,
            avatar,
            rating: Number.isFinite(+r.rating) ? +r.rating : 5,
            text,
        };
    });
    // Header
    return (
        <section className="py-20 bg-linear-to-b from-bg to-white/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-lg font-medium mb-6">
                        <Quote size={18} />
                        {t("ClientOpinions.Our Clients' Opinions") || "Client Testimonials"}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                        {isRtl ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {isRtl
                            ? "انضم إلى المئات من العملاء الراضيبن الذين وثقوا بنا في قضاياهم القانونية"
                            : "Join hundreds of satisfied clients who have trusted us with their legal matters"
                        }
                    </p>
                </div>

                {/* Swiper Container */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Custom Navigation Arrows - Positioned on sides */}
                    <button
                        className="swiper-button-prev cursor-pointer absolute top-1/2 left-2 lg:left-0 lg:-ml-6 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-secondary/30 shadow-lg hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all duration-300 group"
                    >
                        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>

                    <button
                        className="swiper-button-next cursor-pointer absolute top-1/2 right-2 lg:right-0 lg:-mr-6 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-secondary/30 shadow-lg hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all duration-300 group"
                    >
                        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <Swiper
                        modules={[Pagination, Autoplay, Navigation]}
                        key={isRtl ? "rtl" : "ltr"}
                        spaceBetween={30}
                        slidesPerView={1}
                        centeredSlides={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        pagination={{
                            clickable: true,
                            bulletClass: 'swiper-pagination-bullet custom-bullet',
                            bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        loop={true}
                        dir={isRtl ? "rtl" : "ltr"}
                        observer={true}
                        observeParents={true}
                        className="pb-16 px-12"
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                centeredSlides: true,
                                spaceBetween: 20
                            },
                            768: {
                                slidesPerView: 2,
                                centeredSlides: false,
                                spaceBetween: 25
                            },
                            1024: {
                                slidesPerView: 3,
                                centeredSlides: true,
                                spaceBetween: 30
                            },
                        }}
                        onInit={(swiper) => {
                            swiper.slides.forEach((slideEl) => {
                                const inner = slideEl.querySelector('.testimonial-slide');
                                if (!inner) return;
                                if (slideEl.classList.contains('swiper-slide-active')) {
                                    inner.classList.add('active');
                                } else {
                                    inner.classList.remove('active');
                                }
                            });
                        }}
                        onSlideChange={(swiper) => {
                            swiper.slides.forEach((slideEl) => {
                                const inner = slideEl.querySelector('.testimonial-slide');
                                if (!inner) return;
                                if (slideEl.classList.contains('swiper-slide-active')) {
                                    inner.classList.add('active');
                                } else {
                                    inner.classList.remove('active');
                                }
                            });
                        }}
                    >
                        {opinions.map((op, index) => (
                            <SwiperSlide key={op.id}>
                                <div
                                    className="testimonial-slide group bg-white rounded-2xl shadow-lg border border-secondary/20 p-6 h-full flex flex-col transition-all duration-500 relative overflow-hidden"
                                    data-index={index}
                                >
                                    {/* Background accent for active slide */}
                                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-[.active]:opacity-100 transition-opacity duration-500"></div>

                                    {/* Quote icon */}
                                    <div className="absolute top-4 right-4 text-primary/10 text-5xl font-serif select-none group-[.active]:text-primary/20 group-[.active]:scale-110 transition-all duration-500">
                                        "
                                    </div>

                                    {/* Testimonial text */}
                                    <p className="text-text leading-relaxed mb-6 flex-1 relative z-10 text-sm group-[.active]:text-text">
                                        "{op.text}"
                                    </p>

                                    {/* Client info */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-secondary/20 relative z-10 group-[.active]:border-t-primary/30 transition-colors duration-300">
                                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent p-0.5 flex-shrink-0 transition-all duration-500 group-[.active]:scale-110 group-[.active]:shadow-lg">
                                            <img
                                                src={op.avatar}
                                                alt={op.name}
                                                className="w-full h-full rounded-full object-cover bg-white"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-text text-sm truncate group-[.active]:text-primary transition-colors duration-300">
                                                {op.name}
                                            </h4>
                                            <p className="text-secondary text-xs truncate group-[.active]:text-accent transition-colors duration-300">
                                                {op.role}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Active state indicator */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary group-[.active]:w-20 transition-all duration-500 rounded-t-full"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx>{`
                .testimonial-slide {
                    transform: scale(0.95);
                    opacity: 0.7;
                    transition: all 0.5s ease;
                }
                
                .testimonial-slide.active {
                    transform: scale(1);
                    opacity: 1;
                    box-shadow: 0 20px 40px rgba(0, 58, 66, 0.1);
                    border-color: var(--color-primary);
                }

                @media (max-width: 1023px) {
                    .testimonial-slide {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .custom-bullet {
                    background-color: rgba(122, 90, 33, 0.3);
                    width: 8px;
                    height: 8px;
                    margin: 0 4px;
                    transition: all 0.3s ease;
                }

                .custom-bullet-active {
                    background-color: var(--color-primary);
                    width: 24px;
                    border-radius: 9999px;
                }
            `}</style>
        </section>
    );
}

export default ClientOpinions;