// import Hero1 from '../../../assets/LandingPics/Hero.jpg'
// import Hero2 from '../../../assets/LandingPics/landing2.png'
// import Modal from '../Modals/Modal'
// import RequestService from '../Modals/RequestService/RequestService'
// import { useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// function Hero() {
//     const requestServiceRef = useRef();
//     const { t } = useTranslation()
//     function openRequestService() {
//         requestServiceRef.current.open();
//     }

//     function closeRequestService() {
//         requestServiceRef.current.close();
//     }
//     return (
//         <div
//             className='min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center'
//             style={{ backgroundImage: `url(${Hero2})` }}
//         >
//             <div className="absolute inset-0 bg-[#0A1F2C]/50 z-10"></div>
//             <div className='flex flex-col justify-center items-center z-20 text-center text-white space-y-4 px-4 max-w-4xl'>
//                 <p className='text-2xl md:text-4xl font-bold'>نتجاوز التحديات القانونية بالخبرة و النزاههة</p>
//                 <p className='text-lg md:text-xl leading-relaxed'>تلتزم شركة العبدالجبار و الفيصل للمحاماه بتقديم خدمات قانونية استثنائية ومما يضمن نجاح عملائنا من خلال المضورة الاستراتيجيه و الدعم الثابت.</p>
//                 <button onClick={() => openRequestService()} className='bg-secondary px-8 py-4 rounded-lg text-white font-semibold hover:bg-secondary/90 transition-all mt-6'>اطلب خدمه</button>
//             </div>
//             <Modal ref={requestServiceRef} onClose={() => closeRequestService()} title={t("RequestService")}>
//                 <RequestService onClose={() => closeRequestService()} />
//             </Modal>
//         </div>
//     )
// }

// export default Hero


import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Scale } from 'lucide-react';
import Modal from '../Modals/Modal';
import RequestService from '../Modals/RequestService/RequestService';
import logo1 from '../../../assets/Logos/logo1.png'
import logo2 from '../../../assets/Logos/Logo2.png'
import { MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom';
function Hero() {
    const requestServiceRef = useRef();
    const { t, i18n } = useTranslation();
    const isRtl = i18n?.language === 'ar';
    const [isLogo1DropDown, setIsLogo1DropDown] = useState(false)
    const [isLogo2DropDown, setIsLogo2DropDown] = useState(false)

    //logo1 drop down 
    const openLogo1DropDown = () => {
        setIsLogo1DropDown(!isLogo1DropDown)
    }

    const closeLogo1DropDown = () => {
        setIsLogo1DropDown(false)
    }

    //logo2 drop down 
    const openLogo2DropDown = () => {
        setIsLogo2DropDown(!isLogo2DropDown)
    }

    const closeLogo2DropDown = () => {
        setIsLogo2DropDown(false)
    }
    function openRequestService() {
        requestServiceRef.current.open();
    }

    function closeRequestService() {
        requestServiceRef.current.close();
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-primary">
            {/* Logo Section */}
            <div className="absolute top-0 rtl:right-0 ltr:left-0 z-40">
                <div className='hidden lg:block relative cursor-pointer hover:scale-105 transition-transform duration-300'>
                    <div className={`flex flex-col justify-center items-center p-4  backdrop-blur-xl shadow-2xl rtl:rounded-tl-3xl rtl:rounded-bl-3xl ltr:rounded-tr-3xl ltr:rounded-br-3xl  border-primary border-3`}
                        onClick={openLogo1DropDown}>
                        <img className='w-[55px]' src={logo1} alt="logo1" />
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
                            <Link to='mailto:khedaib@malathegypt.com'>khedaib@malathegypt.com</Link>
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
            <div className="absolute top-0 rtl:left-0 ltr:right-0 z-40">
                <div className='hidden lg:block relative cursor-pointer hover:scale-105 transition-transform duration-300'>
                    <div className={`flex flex-col justify-center items-center p-4  backdrop-blur-xl shadow-2xl rtl:rounded-tr-3xl rtl:rounded-br-3xl ltr:rounded-tl-3xl ltr:rounded-bl-3xl  border-primary border-3`}
                        onClick={openLogo2DropDown}>
                        <img className='w-[55px]' src={logo2} alt="logo2" />
                        <p className='font-bold text-lg text-white'>العبد الجبار و الفيصل </p>
                        <span className={`text-white`}>محامون و مستشاورن</span>
                        <span className='text-[#f7c630] text-sm font-bold'>اضغط لرؤية بيانات الشركه</span>
                    </div>
                    <div className={`absolute ltr:right-2 rtl:left-2 mt-5 w-66backdrop-blur-xl shadow-2xl rounded-lg border border-primary p-2 z-60 text-white
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
                            <Link to='mailto:aziz.nasr11@gmail.com'>aziz.nasr11@gmail.com</Link>
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

            {/* Simple Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent/20"></div>

            {/* Content */}
            <div className="container mx-auto px-4 text-center text-white space-y-8 relative z-20">
                {/* Scale Icon */}
                <div className="flex justify-center mb-6">
                    <Scale size={48} className="text-bg opacity-80" />
                </div>

                {/* Main Content */}
                <div className="space-y-6 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        {isRtl ? "العبدالجبار والفيصل" : "AlAbduljabbar & AlFaisal"}
                    </h1>

                    <div className="w-20 h-1 bg-secondary mx-auto"></div>

                    <p className="text-xl text-white/90 leading-relaxed">
                        {isRtl
                            ? "شركة محاماة سعودية مصرية - خبرة تمتد ١٥ عاماً في تقديم الحلول القانونية"
                            : "Saudi-Egyptian Law Firm - 15 Years of Excellence in Legal Solutions"
                        }
                    </p>
                </div>

                {/* Single CTA */}
                <div className="pt-6">
                    <button
                        onClick={openRequestService}
                        className="px-8 py-3 bg-secondary hover:bg-accent text-white font-semibold rounded-lg transition-colors duration-300"
                    >
                        {t("RequestService")}
                    </button>
                </div>
            </div>

            <Modal ref={requestServiceRef} onClose={closeRequestService} title={t("RequestService")}>
                <RequestService onClose={closeRequestService} />
            </Modal>
        </div>
    );
}

export default Hero;