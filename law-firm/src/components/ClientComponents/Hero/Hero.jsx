import Hero1 from '../../../assets/LandingPics/Hero.jpg'
import Hero2 from '../../../assets/LandingPics/landing2.png'
import Modal from '../Modals/Modal'
import RequestService from '../Modals/RequestService/RequestService'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
function Hero() {
    const requestServiceRef = useRef();
    const { t } = useTranslation()
    function openRequestService() {
        requestServiceRef.current.open();
    }

    function closeRequestService() {
        requestServiceRef.current.close();
    }
    return (
        <div
            className='min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center'
            style={{ backgroundImage: `url(${Hero2})` }}
        >
            <div className="absolute inset-0 bg-[#0A1F2C]/50 z-10"></div>
            <div className='flex flex-col justify-center items-center z-20 text-center text-white space-y-4 px-4 max-w-4xl'>
                <p className='text-2xl md:text-4xl font-bold'>نتجاوز التحديات القانونية بالخبرة و النزاههة</p>
                <p className='text-lg md:text-xl leading-relaxed'>تلتزم شركة العبدالجبار و الفيصل للمحاماه بتقديم خدمات قانونية استثنائية ومما يضمن نجاح عملائنا من خلال المضورة الاستراتيجيه و الدعم الثابت.</p>
                <button onClick={() => openRequestService()} className='bg-secondary px-8 py-4 rounded-lg text-white font-semibold hover:bg-secondary/90 transition-all mt-6'>اطلب خدمه</button>
            </div>
            <Modal ref={requestServiceRef} onClose={() => closeRequestService()} title={t("RequestService")}>
                <RequestService onClose={() => closeRequestService()} />
            </Modal>
        </div>
    )
}

export default Hero
