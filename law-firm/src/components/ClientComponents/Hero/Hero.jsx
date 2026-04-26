import { useTranslation } from 'react-i18next';
import { Scale } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Link } from 'react-router-dom';
import { useSliders } from '../../../hooks/useHomePage';

function Hero() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n?.language === 'ar';
    const { data: sliders = [], isLoading: loading } = useSliders();

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-primary overflow-hidden">
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)]/95 to-[var(--color-accent)]/30"></div>

            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }}></div>

            {/* Full Width Swiper Slider Content - Fully Responsive */}
            <div className="w-full h-screen relative z-20 flex items-center pt-16 lg:pt-0">
                {loading ? (
                    <div className="flex justify-center items-center w-full min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-t-4 border-b-4 border-secondary"></div>
                    </div>
                ) : sliders.length > 0 ? (
                    <Swiper
                        key={isRtl ? 'rtl-swiper' : 'ltr-swiper'}
                        modules={[Autoplay, Pagination, Navigation, EffectFade]}
                        spaceBetween={0}
                        centeredSlides={true}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={true}
                        loop={true}
                        dir={isRtl ? 'rtl' : 'ltr'}
                        className="w-full h-full"
                    >
                        {sliders.map((slider, index) => (
                            <SwiperSlide key={slider.order || index}>
                                <div className="w-full h-full flex items-center justify-center relative">
                                    {/* Background Image with Overlay */}
                                    {slider.imageUrl && (
                                        <div className="absolute inset-0">
                                            <img
                                                src={slider.imageUrl}
                                                alt={isRtl ? slider.title : slider.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/95 via-[var(--color-primary)]/85 to-[var(--color-primary)]/70"></div>
                                        </div>
                                    )}

                                    {/* Content Container - Fully Responsive */}
                                    <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 max-w-7xl">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
                                            {/* Text Content - Responsive Typography & Spacing */}
                                            <div className={`space-y-4 sm:space-y-6 md:space-y-8 ${isRtl ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                                                {/* Icon - Responsive Sizing */}
                                                <div className="inline-flex items-center justify-center lg:justify-start">
                                                    <div className="p-2 sm:p-3 md:p-4 bg-secondary/20 backdrop-blur-sm rounded-xl md:rounded-2xl">
                                                        <Scale size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" />
                                                    </div>
                                                </div>

                                                {/* Title - Responsive Font Sizes */}
                                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white drop-shadow-2xl px-2 sm:px-0">
                                                    {isRtl ? slider.title : slider.title}
                                                </h1>

                                                {/* Decorative Line */}
                                                <div className={`flex ${isRtl ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                                                    <div className="w-16 sm:w-20 md:w-24 h-1 md:h-1.5 bg-secondary rounded-full shadow-lg"></div>
                                                </div>

                                                {/* Description - Responsive Font Sizes */}
                                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/95 leading-relaxed font-light tracking-wide drop-shadow-lg px-2 sm:px-0">
                                                    {isRtl ? slider.description : slider.description}
                                                </p>

                                                {/* CTA Button - Responsive Sizing */}
                                                <Link to='servicespage' className={`pt-2 sm:pt-4 flex lg:justify-start justify-center`}>
                                                    <button
                                                        className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-secondary hover:bg-accent text-white text-sm sm:text-base md:text-lg font-bold rounded-lg md:rounded-xl transition-all duration-300 shadow-2xl hover:shadow-secondary/50 hover:scale-105 overflow-hidden"
                                                    >
                                                        <span className="relative z-10">{t("RequestService")}</span>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    </button>
                                                </Link>
                                            </div>

                                            {/* Image Side (Desktop Only) */}
                                            {slider.imageUrl && (
                                                <div className="hidden lg:block">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-secondary/20 rounded-2xl lg:rounded-3xl blur-3xl"></div>
                                                        <img
                                                            src={slider.imageUrl}
                                                            alt={isRtl ? slider.title : slider.title}
                                                            className="relative rounded-2xl lg:rounded-3xl shadow-2xl w-full h-auto object-cover border-4 border-white/10"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    // Fallback content if no sliders - Fully Responsive
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 max-w-7xl">
                            <div className={`space-y-4 sm:space-y-6 md:space-y-8 text-center ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}>
                                <div className="inline-flex items-center justify-center">
                                    <div className="p-2 sm:p-3 md:p-4 bg-secondary/20 backdrop-blur-sm rounded-xl md:rounded-2xl">
                                        <Scale size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-white" />
                                    </div>
                                </div>

                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight text-white drop-shadow-2xl px-2 sm:px-0">
                                    {isRtl ? "العبدالجبار" : "AlAbduljabbar & AlFaisal"}
                                </h1>

                                <div className={`flex ${isRtl ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                                    <div className="w-16 sm:w-20 md:w-24 h-1 md:h-1.5 bg-secondary rounded-full shadow-lg"></div>
                                </div>

                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/95 leading-relaxed font-light tracking-wide drop-shadow-lg px-2 sm:px-0">
                                    {isRtl
                                        ? "شركة محاماة سعودية - خبرة تمتد 6 اعوام في تقديم الحلول القانونية"
                                        : "Saudi Law Firm - 6 Years of Excellence in Legal Solutions"
                                    }
                                </p>

                                <Link to='servicespage' className={`pt-2 sm:pt-4 flex lg:justify-end justify-center`}>
                                    <button
                                        className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-secondary hover:bg-accent text-white text-sm sm:text-base md:text-lg font-bold rounded-lg md:rounded-xl transition-all duration-300 shadow-2xl hover:shadow-secondary/50 hover:scale-105 overflow-hidden"
                                    >
                                        <span className="relative z-10">{t("RequestService")}</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Enhanced Custom Swiper Styles - Responsive */}
            <style jsx>{`
                .swiper-pagination {
                    bottom: 20px !important;
                }
                @media (min-width: 640px) {
                    .swiper-pagination {
                        bottom: 30px !important;
                    }
                }
                @media (min-width: 768px) {
                    .swiper-pagination {
                        bottom: 40px !important;
                    }
                }
                .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: white;
                    opacity: 0.5;
                    transition: all 0.3s ease;
                }
                @media (min-width: 640px) {
                    .swiper-pagination-bullet {
                        width: 10px;
                        height: 10px;
                    }
                }
                @media (min-width: 768px) {
                    .swiper-pagination-bullet {
                        width: 12px;
                        height: 12px;
                    }
                }
                .swiper-pagination-bullet-active {
                    background: var(--color-secondary);
                    opacity: 1;
                    width: 30px;
                    border-radius: 6px;
                }
                @media (min-width: 768px) {
                    .swiper-pagination-bullet-active {
                        width: 40px;
                    }
                }
                .swiper-button-next,
                .swiper-button-prev {
                    color: white;
                    background: var(--color-secondary);
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    padding:10px
                }
                @media (min-width: 640px) {
                    .swiper-button-next,
                    .swiper-button-prev {
                        width: 40px;
                        height: 40px;
                    }
                }
                @media (min-width: 768px) {
                    .swiper-button-next,
                    .swiper-button-prev {
                        width: 45px;
                        height: 45px;
                    }
                }
                @media (min-width: 1024px) {
                    .swiper-button-next,
                    .swiper-button-prev {
                        width: 50px;
                        height: 50px;
                    }
                }
                .swiper-button-next:after,
                .swiper-button-prev:after {
                    font-size: 14px;
                    font-weight: bold;
                }
                @media (min-width: 640px) {
                    .swiper-button-next:after,
                    .swiper-button-prev:after {
                        font-size: 16px;
                    }
                }
                @media (min-width: 768px) {
                    .swiper-button-next:after,
                    .swiper-button-prev:after {
                        font-size: 18px;
                    }
                }
                @media (min-width: 1024px) {
                    .swiper-button-next:after,
                    .swiper-button-prev:after {
                        font-size: 20px;
                    }
                }
                .swiper-button-next:hover,
                .swiper-button-prev:hover {
                    background: var(--color-accent);
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
}

export default Hero;