import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function ClientOpinions() {
    const { t, i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";

    // Cleaned up testimonials with more variety
    const opinions = [
        {
            id: 1,
            name: isRtl ? "ليلى حسن" : "Laila Hassan",
            role: isRtl ? "عميل عقارات" : "Real Estate Client",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&q=80&fit=crop&crop=face",
            rating: 5,
            text: isRtl
                ? "تعامل فريق العبد الجبار والفَـيصل مع معاملتنا العقارية بأقصى درجات الاحترافية والكفاءة. موصى به بشدة!"
                : "Team handled our property matter with outstanding professionalism and efficiency. Highly recommended!",
        },
        {
            id: 2,
            name: isRtl ? "عمر الفارسي" : "Omar Al-Farsi",
            role: isRtl ? "عميل شركات" : "Corporate Client",
            avatar: "https://images.unsplash.com/photo-1545996124-1f4d1b2f8c2b?w=80&h=80&q=80&fit=crop&crop=face",
            rating: 5,
            text: isRtl
                ? "قَدمت شركة العبد الجبار والفَـيصل للمحاماة دعماً قانونياً استثنائياً لإعادة هيكلة شركتنا. كانت نتائجهم مفصّلة لا تقدر بثمن."
                : "Provided exceptional legal support in restructuring our company. Their attention to detail was invaluable.",
        },
        {
            id: 3,
            name: isRtl ? "سارة النجار" : "Sara Al-Najjar",
            role: isRtl ? "عميل نزاع تجاري" : "Commercial Dispute Client",
            avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&q=80&fit=crop&crop=face",
            rating: 4,
            text: isRtl
                ? "فريق رائع ومتابعة دقيقة في كل تفاصيل القضية. كانت التجربة مريحة للغاية."
                : "Excellent team with great attention to detail in every aspect of the case. A very smooth experience.",
        },
        {
            id: 4,
            name: isRtl ? "أحمد السديري" : "Ahmed Al-Sudairi",
            role: isRtl ? "عميل قضايا عائلية" : "Family Law Client",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&q=80&fit=crop&crop=face",
            rating: 5,
            text: isRtl
                ? "تعاملوا مع قضيتي العائلية بحساسية واحترافية شديدة. أشكرهم على الدعم المستمر."
                : "Handled my family case with great sensitivity and professionalism. Thank you for the continuous support.",
        },
        {
            id: 5,
            name: isRtl ? "فاطمة القحطاني" : "Fatima Al-Qahtani",
            role: isRtl ? "عميل عقود دولية" : "International Contracts Client",
            avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&q=80&fit=crop&crop=face",
            rating: 5,
            text: isRtl
                ? "ساعدوني في صياغة عقود دولية معقدة بخبرة وكفاءة. فريق على أعلى مستوى."
                : "Helped me draft complex international contracts with expertise and efficiency. A top-tier team.",
        },
        {
            id: 6,
            name: isRtl ? "خالد الرشيد" : "Khalid Al-Rashid",
            role: isRtl ? "عميل تأسيس شركات" : "Business Formation Client",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&q=80&fit=crop&crop=face",
            rating: 5,
            text: isRtl
                ? "ساعدوني في تأسيس شركتي الجديدة بكل احترافية. جميع الأوراق والتراخيص كانت مثالية."
                : "Helped me establish my new company with complete professionalism. All paperwork and licenses were perfect.",
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-[var(--color-bg)] to-white/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm font-medium mb-6">
                        <Quote size={18} />
                        {t("ClientOpinions.Our Clients' Opinions") || "Client Testimonials"}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
                        {isRtl ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {isRtl
                            ? "انضم إلى المئات من العملاء الراضين الذين وثقوا بنا في قضاياهم القانونية"
                            : "Join hundreds of satisfied clients who have trusted us with their legal matters"
                        }
                    </p>
                </div>

                {/* Swiper Container */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Custom Navigation Arrows - Positioned on sides */}
                    <button
                        className="swiper-button-prev cursor-pointer absolute top-1/2 left-2 lg:left-0 lg:-ml-6 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-[var(--color-secondary)]/30 shadow-lg hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] flex items-center justify-center transition-all duration-300 group"
                    >
                        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>

                    <button
                        className="swiper-button-next cursor-pointer absolute top-1/2 right-2 lg:right-0 lg:-mr-6 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-[var(--color-secondary)]/30 shadow-lg hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] flex items-center justify-center transition-all duration-300 group"
                    >
                        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <Swiper
                        modules={[Pagination, Autoplay, Navigation]}
                        key={isRtl ? "rtl" : "ltr"}             // re-create Swiper when direction changes
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
                            bulletClass: 'swiper-pagination-bullet !bg-[var(--color-secondary)]/30 !w-2 !h-2 !mx-1 !transition-all !duration-300',
                            bulletActiveClass: 'swiper-pagination-bullet-active !bg-[var(--color-primary)] !w-6 !rounded-full'
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        loop={true}
                        dir={isRtl ? "rtl" : "ltr"}
                        observer={true}                // watch for DOM changes
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
                            // set initial active inner slide reliably (handles loop clones)
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
                            // toggle 'active' on the inner .testimonial-slide based on Swiper's active class
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
                                    className="testimonial-slide group bg-white rounded-2xl shadow-lg border border-[var(--color-secondary)]/20 p-6 h-full flex flex-col transition-all duration-500 relative overflow-hidden"
                                    data-index={index}
                                >
                                    {/* Background accent for active slide */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-[.active]:opacity-100 transition-opacity duration-500"></div>

                                    {/* Quote icon */}
                                    <div className="absolute top-4 right-4 text-[var(--color-primary)]/10 text-5xl font-serif select-none group-[.active]:text-[var(--color-primary)]/20 group-[.active]:scale-110 transition-all duration-500">
                                        "
                                    </div>


                                    {/* Testimonial text */}
                                    <p className="text-[var(--color-text)] leading-relaxed mb-6 flex-1 relative z-10 text-sm group-[.active]:text-[var(--color-text)]">
                                        "{op.text}"
                                    </p>

                                    {/* Client info */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-secondary)]/20 relative z-10 group-[.active]:border-t-[var(--color-primary)]/30 transition-colors duration-300">
                                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-0.5 flex-shrink-0 transition-all duration-500 group-[.active]:scale-110 group-[.active]:shadow-lg`}>
                                            <img
                                                src={op.avatar}
                                                alt={op.name}
                                                className="w-full h-full rounded-full object-cover bg-white"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-[var(--color-text)] text-sm truncate group-[.active]:text-[var(--color-primary)] transition-colors duration-300">
                                                {op.name}
                                            </h4>
                                            <p className="text-[var(--color-secondary)] text-xs truncate group-[.active]:text-[var(--color-accent)] transition-colors duration-300">
                                                {op.role}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Active state indicator */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[var(--color-primary)] group-[.active]:w-20 transition-all duration-500 rounded-t-full"></div>
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

                .swiper-pagination-bullet {
                    transition: all 0.3s ease;
                }
            `}</style>
        </section>
    );
}

export default ClientOpinions;