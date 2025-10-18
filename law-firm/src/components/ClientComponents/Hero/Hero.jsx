import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Scale } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useSliders } from '../../../hooks/useHomePage';

function Hero() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n?.language === 'ar';
    const [isLogo1DropDown, setIsLogo1DropDown] = useState(false);
    const [isLogo2DropDown, setIsLogo2DropDown] = useState(false);

    // add refs to detect outside clicks
    const logo1Ref = useRef(null);
    const logo2Ref = useRef(null);

    // Fetch sliders using React Query
    const { data: sliders = [], isLoading: loading } = useSliders();

    //logo1 drop down 
    const openLogo1DropDown = () => {
        setIsLogo1DropDown(prev => !prev);
    };

    const closeLogo1DropDown = () => {
        setIsLogo1DropDown(false);
    };

    //logo2 drop down 
    const openLogo2DropDown = () => {
        setIsLogo2DropDown(prev => !prev);
    };

    const closeLogo2DropDown = () => {
        setIsLogo2DropDown(false);
    };

    // close dropdowns on outside click or on scroll
    useEffect(() => {
        const handler = (e) => {
            const target = e.target;
            if (logo1Ref.current && !logo1Ref.current.contains(target)) {
                setIsLogo1DropDown(false);
            }
            if (logo2Ref.current && !logo2Ref.current.contains(target)) {
                setIsLogo2DropDown(false);
            }
        };

        const onScroll = () => {
            setIsLogo1DropDown(false);
            setIsLogo2DropDown(false);
        };

        // pointerdown covers mouse/touch/pen; also listen to touchstart for older devices
        document.addEventListener('pointerdown', handler);
        document.addEventListener('touchstart', handler);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            document.removeEventListener('pointerdown', handler);
            document.removeEventListener('touchstart', handler);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-primary overflow-hidden">
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)]/95 to-[var(--color-accent)]/30"></div>

            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }}></div>

            {/* Logo Section */}
            <div
                ref={logo1Ref}
                className="hidden lg:block absolute top-0 rtl:right-0 ltr:left-0 z-40"
                onClick={openLogo1DropDown}
            >
                <div className='relative cursor-pointer hover:scale-105 transition-transform duration-300'>
                    <div className={`flex flex-col justify-center items-center p-4 backdrop-blur-xl shadow-2xl rtl:rounded-tl-3xl rtl:rounded-bl-3xl ltr:rounded-tr-3xl ltr:rounded-br-3xl border-primary border-3`}>
                        <img className='w-[55px]' src='logo1.png' alt="logo1" />
                        <p className='font-bold text-lg text-white'>العبد الجبار </p>
                        <span className={`text-white`}>محامون و مستشاورن</span>
                        <span className='text-[#f7c630] text-sm font-bold'>اضغط لرؤية بيانات الشركه</span>
                    </div>
                    <div className={`absolute rtl:right-2 ltr:left-2 mt-5 w-66 backdrop-blur-xl shadow-2xl rounded-lg border border-primary p-2 z-60 text-white
                    transform transition-transform duration-300 ease-in-out origin-top
                    ${isLogo1DropDown ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
                    flex flex-col
                    `}>
                        <p className='font-bold text-center text-xl text-secondary mb-2'>المكتب الرئيسي</p>
                        <div className="flex items-start gap-2">
                            <MapPin size={16} className="text-secondary mt-1 flex-shrink-0" />
                            <p>السعوديه - الرياض - حي المروج - مركز الحياة سنتر - مبني B- الدور الاول - مكتب 5 </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-secondary flex-shrink-0" />
                            <span>+0996 505 120 293</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-secondary transition-all">
                            <Mail size={16} className="text-secondary flex-shrink-0" />
                            <a href='mailto:khedaib@malathegypt.com'>khedaib@malathegypt.com</a>
                        </div>
                    </div>
                </div>
                {isLogo1DropDown && (
                    <div
                        className="fixed inset-0 z-50"
                        onClick={closeLogo1DropDown}
                    ></div>
                )}
            </div>

            {/* The other Logo */}
            <div
                ref={logo2Ref}
                className="hidden lg:block absolute top-0 rtl:left-0 ltr:right-0 z-40"
                onClick={openLogo2DropDown}
            >
                <div className='relative cursor-pointer hover:scale-105 transition-transform duration-300'>
                    <div className={`flex flex-col justify-center items-center p-4 backdrop-blur-xl shadow-2xl rtl:rounded-tr-3xl rtl:rounded-br-3xl ltr:rounded-tl-3xl ltr:rounded-bl-3xl border-primary border-3`}>
                        <img className='w-[55px]' src="Logo2.png" alt="logo2" />
                        <p className='font-bold text-lg text-white'>العبد الجبار و الفيصل </p>
                        <span className={`text-white`}>محامون و مستشاورن</span>
                        <span className='text-[#f7c630] text-sm font-bold'>اضغط لرؤية بيانات الشركه</span>
                    </div>
                    <div className={`absolute top-full ltr:right-0 rtl:left-0 mt-2 w-64 max-w-[calc(100vw-2rem)] backdrop-blur-xl shadow-2xl rounded-lg border border-primary p-3 z-70 text-white
                   transform transition-transform duration-300 ease-in-out origin-top
                    ${isLogo2DropDown ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
                    flex flex-col
                    `}>
                        <div className="flex items-start gap-2">
                            <MapPin size={16} className="text-secondary mt-1 flex-shrink-0" />
                            <p>مصر - القاهره 20 شاراع الطيران - الدور الاول - شقه 2</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="text-secondary">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            <span>0222604857</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={16} className="text-secondary flex-shrink-0" />
                            <span>01044947784 - 01005842307</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-secondary transition-all">
                            <Mail size={16} className="text-secondary flex-shrink-0" />
                            <a href='mailto:aziz.nasr11@gmail.com'>aziz.nasr11@gmail.com</a>
                        </div>
                    </div>
                </div>
                {isLogo2DropDown && (
                    <div
                        className="fixed inset-0 z-50"
                        onClick={closeLogo2DropDown}
                    ></div>
                )}
            </div>

            {/* Full Width Swiper Slider Content */}
            <div className="w-full h-screen relative z-20 flex items-center">
                {loading ? (
                    <div className="flex justify-center items-center w-full min-h-[400px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary"></div>
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

                                    {/* Content Container */}
                                    <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                            {/* Text Content */}
                                            <div className={`space-y-8 ${isRtl ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                                                {/* Icon */}
                                                <div className="inline-flex items-center justify-center lg:justify-start">
                                                    <div className="p-4 bg-secondary/20 backdrop-blur-sm rounded-2xl">
                                                        <Scale size={56} className="text-white" />
                                                    </div>
                                                </div>

                                                {/* Title */}
                                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-2xl">
                                                    {isRtl ? slider.title : slider.title}
                                                </h1>

                                                {/* Decorative Line */}
                                                <div className={`flex ${isRtl ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                                                    <div className="w-24 h-1.5 bg-secondary rounded-full shadow-lg"></div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-xl md:text-2xl lg:text-3xl text-white/95 leading-relaxed font-light tracking-wide drop-shadow-lg">
                                                    {isRtl ? slider.description : slider.description}
                                                </p>

                                                {/* CTA Button */}
                                                <Link to='servicespage' className={`pt-4 flex lg:justify-start justify-center`}>
                                                    <button
                                                        className="group relative px-10 py-5 bg-secondary hover:bg-accent text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-secondary/50 hover:scale-105 overflow-hidden"
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
                                                        <div className="absolute inset-0 bg-secondary/20 rounded-3xl blur-3xl"></div>
                                                        <img
                                                            src={slider.imageUrl}
                                                            alt={isRtl ? slider.title : slider.title}
                                                            className="relative rounded-3xl shadow-2xl w-full h-auto object-cover border-4 border-white/10"
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
                    // Fallback content if no sliders
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
                            <div className={`space-y-8 text-center ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}>
                                <div className="inline-flex items-center justify-center">
                                    <div className="p-4 bg-secondary/20 backdrop-blur-sm rounded-2xl">
                                        <Scale size={56} className="text-white" />
                                    </div>
                                </div>

                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-2xl">
                                    {isRtl ? "العبدالجبار والفيصل" : "AlAbduljabbar & AlFaisal"}
                                </h1>

                                <div className={`flex ${isRtl ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                                    <div className="w-24 h-1.5 bg-secondary rounded-full shadow-lg"></div>
                                </div>

                                <p className="text-2xl md:text-3xl text-white/95 leading-relaxed font-light tracking-wide drop-shadow-lg">
                                    {isRtl
                                        ? "شركة محاماة سعودية مصرية - خبرة تمتد 6 اعوام في تقديم الحلول القانونية"
                                        : "Saudi-Egyptian Law Firm - 6 Years of Excellence in Legal Solutions"
                                    }
                                </p>

                                <Link to='servicespage' className={`pt-4 flex lg:justify-end justify-center`}>
                                    <button
                                        className="group relative px-10 py-5 bg-secondary hover:bg-accent text-white text-lg font-bold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-secondary/50 hover:scale-105 overflow-hidden"
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

            {/* Enhanced Custom Swiper Styles */}
            <style jsx>{`
                .swiper-pagination {
                    bottom: 40px !important;
                }
                .swiper-pagination-bullet {
                    width: 12px;
                    height: 12px;
                    background: white;
                    opacity: 0.5;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active {
                    background: var(--color-secondary);
                    opacity: 1;
                    width: 40px;
                    border-radius: 6px;
                }
                .swiper-button-next,
                .swiper-button-prev {
                    color: white;
                    background: var(--color-secondary);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                .swiper-button-next:after,
                .swiper-button-prev:after {
                    font-size: 20px;
                    font-weight: bold;
                }
                .swiper-button-next:hover,
                .swiper-button-prev:hover {
                    background: var(--color-accent);
                    transform: scale(1.1);
                }
                
                @media (max-width: 768px) {
                    .swiper-button-next,
                    .swiper-button-prev {
                        width: 40px;
                        height: 40px;
                    }
                    .swiper-button-next:after,
                    .swiper-button-prev:after {
                        font-size: 16px;
                    }
                }
            `}</style>
        </div>
    );
}

export default Hero;