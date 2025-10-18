import React, { useEffect, useState } from 'react';

const LoadingPage = () => {
    const [progress, setProgress] = useState(0);
    const [currentText, setCurrentText] = useState('Preparing your case...');
    const [fade, setFade] = useState(true);

    const loadingTexts = [
        'Preparing your case...',
        'Reviewing documents...',
        'Consulting with partners...',
        'Finalizing details...'
    ];

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 40);

        const textInterval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentText(prev => {
                    const currentIndex = loadingTexts.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % loadingTexts.length;
                    return loadingTexts[nextIndex];
                });
                setFade(true);
            }, 250);
        }, 2000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(textInterval);
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f5f3] to-[#e8e9e7] p-8">
            <div className="max-w-2xl w-full text-center">
                {/* Enhanced Scales of Justice Animation */}
                <div className="relative mb-16 flex justify-center">
                    <div className="relative w-40 h-40">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-[#006b63] rounded-full opacity-10 blur-xl animate-pulse"></div>

                        {/* Beam with gradient */}
                        <div className="absolute top-6 left-1/2 w-1.5 h-28 bg-gradient-to-b from-[#7a5a21] to-[#9a7a41] transform -translate-x-1/2 rounded-full shadow-lg"></div>

                        {/* Scales beam */}
                        <div className="absolute top-6 left-1/2 w-28 h-1.5 bg-gradient-to-r from-[#7a5a21] to-[#9a7a41] transform -translate-x-1/2 rounded-full shadow-md"></div>

                        {/* Left Scale with shine effect */}
                        <div
                            className="absolute top-10 left-1/2 -ml-20 w-10 h-10 bg-gradient-to-br from-[#003a42] to-[#005a62] rounded-full transition-all duration-500 ease-in-out shadow-lg border border-[#006b63]"
                            style={{
                                transform: `translateY(${Math.sin(progress * 0.1) * 12}px)`,
                                boxShadow: `0 4px 15px rgba(0, 58, 66, 0.3)`
                            }}
                        >
                            <div className="absolute inset-1 bg-gradient-to-br from-transparent to-white opacity-20 rounded-full"></div>
                        </div>

                        {/* Right Scale with shine effect */}
                        <div
                            className="absolute top-10 left-1/2 -mr-20 w-10 h-10 bg-gradient-to-br from-[#003a42] to-[#005a62] rounded-full transition-all duration-500 ease-in-out shadow-lg border border-[#006b63]"
                            style={{
                                transform: `translateY(${Math.sin(progress * 0.1 + Math.PI) * 12}px)`,
                                boxShadow: `0 4px 15px rgba(0, 58, 66, 0.3)`
                            }}
                        >
                            <div className="absolute inset-1 bg-gradient-to-br from-transparent to-white opacity-20 rounded-full"></div>
                        </div>

                        {/* Enhanced Base */}
                        <div className="absolute bottom-2 left-1/2 w-16 h-6 bg-gradient-to-r from-[#006b63] to-[#008b83] transform -translate-x-1/2 rounded-t-xl shadow-lg border border-[#008b83]">
                            <div className="absolute -top-1 left-1/2 w-8 h-2 bg-[#7a5a21] rounded-full transform -translate-x-1/2"></div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Firm Name */}
                <div className="mb-12">
                    <h1 className="text-5xl font-serif font-bold text-[#003a42] mb-3 tracking-tight">
                        Justice & Partners
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#7a5a21] to-[#006b63] mx-auto rounded-full mb-4"></div>
                    <p className="text-sm text-[#1f1f1f] opacity-70 font-light tracking-wide">
                        ESTABLISHED 1985
                    </p>
                </div>

                {/* Enhanced Loading Text with smooth transition */}
                <div className="mb-12 h-8">
                    <p className={`text-xl text-[#1f1f1f] font-light transition-all duration-300 ${fade ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'
                        }`}>
                        {currentText}
                    </p>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="w-full max-w-md mx-auto mb-12">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-[#003a42]">Case Preparation</span>
                        <span className="text-sm font-bold text-[#006b63]">{progress}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
                        <div
                            className="h-full bg-gradient-to-r from-[#006b63] to-[#008b83] transition-all duration-300 ease-out rounded-full relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-30"></div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Legal Motto */}
                <div className="border-t border-[#7a5a21] border-opacity-30 pt-8 mt-12">
                    <p className="text-lg text-[#003a42] italic font-serif leading-relaxed">
                        "In justice we trust, in excellence we deliver"
                    </p>
                </div>

                {/* Enhanced Decorative Elements */}
                <div className="flex justify-center space-x-3 mt-8">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="w-3 h-3 bg-gradient-to-br from-[#7a5a21] to-[#9a7a41] rounded-full opacity-70 animate-pulse shadow-sm"
                            style={{
                                animationDelay: `${item * 0.4}s`,
                                animationDuration: '1.5s'
                            }}
                        ></div>
                    ))}
                </div>

                {/* Additional decorative element */}
                <div className="mt-8 flex justify-center space-x-6 opacity-50">
                    <div className="w-1 h-1 bg-[#003a42] rounded-full"></div>
                    <div className="w-1 h-1 bg-[#7a5a21] rounded-full"></div>
                    <div className="w-1 h-1 bg-[#006b63] rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;


// *****************

// import React, { useEffect, useState } from 'react';

// const LoadingPage = () => {
//     const [dots, setDots] = useState('');

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setDots(prev => prev.length >= 3 ? '' : prev + '.');
//         }, 500);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-[#f4f5f3] p-8">
//             <div className="text-center max-w-md w-full">
//                 {/* Logo/Icon */}
//                 <div className="mb-8 flex justify-center">
//                     <div className="w-16 h-16 bg-[#003a42] rounded-lg flex items-center justify-center">
//                         <svg
//                             className="w-8 h-8 text-[#f4f5f3]"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                             />
//                         </svg>
//                     </div>
//                 </div>

//                 {/* Firm Name */}
//                 <h1 className="text-2xl font-bold text-[#003a42] mb-4 font-serif">
//                     Justice Legal Group
//                 </h1>

//                 {/* Loading Text */}
//                 <div className="text-[#1f1f1f] mb-8">
//                     <p className="text-lg">Loading{dots}</p>
//                 </div>

//                 {/* Simple Progress Bar */}
//                 <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
//                     <div
//                         className="h-1.5 bg-[#006b63] rounded-full transition-all duration-300 ease-out animate-pulse"
//                         style={{ width: '70%' }}
//                     ></div>
//                 </div>

//                 {/* Subtle Message */}
//                 <p className="text-sm text-[#7a5a21] mt-8">
//                     Your trusted legal partners
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default LoadingPage;