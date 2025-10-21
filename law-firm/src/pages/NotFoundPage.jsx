import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
    const { t } = useTranslation();
    const [displayedNumber, setDisplayedNumber] = useState("");
    const [displayedText, setDisplayedText] = useState("");
    const [isBlinking, setIsBlinking] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [glitchEffect, setGlitchEffect] = useState(false);
    const numberText = "  404";
    const messageText = " Page Not Found";
    const typingInterval = useRef(null);
    const blinkingInterval = useRef(null);
    const indexRef = useRef(0);
    const phaseRef = useRef(0);

    const startTyping = () => {
        clearInterval(typingInterval.current);
        setDisplayedNumber("");
        setDisplayedText("");
        indexRef.current = 0;
        phaseRef.current = 0;

        typingInterval.current = setInterval(() => {
            if (phaseRef.current === 0) {
                // Typing the number "404"
                if (indexRef.current < numberText.length) {
                    setDisplayedNumber((prev) => prev + numberText.charAt(indexRef.current));
                    indexRef.current++;
                } else {
                    // Switch to typing the message
                    phaseRef.current = 1;
                    indexRef.current = 0;
                    setTimeout(() => {
                        // Continue with message after a brief pause
                    }, 500);
                }
            } else {
                // Typing the message "Page Not Found"
                if (indexRef.current < messageText.length) {
                    setDisplayedText((prev) => prev + messageText.charAt(indexRef.current));
                    indexRef.current++;
                } else {
                    clearInterval(typingInterval.current);
                    // Trigger glitch effect when typing completes
                    setTimeout(() => triggerGlitchEffect(), 500);
                }
            }
        }, 150);
    };

    const triggerGlitchEffect = () => {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
    };

    const handleReplay = () => {
        startTyping();
    };

    useEffect(() => {
        startTyping();

        blinkingInterval.current = setInterval(() => {
            setIsBlinking((prev) => !prev);
        }, 400);

        return () => {
            clearInterval(typingInterval.current);
            clearInterval(blinkingInterval.current);
        };
    }, []);

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${20 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-2xl mx-auto text-center">
                {/* Icon */}
                <div className="mb-8">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <AlertTriangle className="w-12 h-12 text-primary" />
                    </div>
                </div>

                {/* 404 Number with Animation */}
                <div className={`relative mb-8 ${glitchEffect ? 'glitch' : ''}`}>
                    <div className="text-8xl md:text-9xl font-bold text-primary">
                        {displayedNumber}
                        <span
                            className={`inline-block bg-secondary w-1 h-16 align-middle ml-2 transition-all duration-200 ${isBlinking ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    </div>

                    {/* Page Not Found Text */}
                    <div className="text-2xl md:text-3xl font-semibold text-gray-600 mt-4 min-h-8">
                        {displayedText}
                    </div>

                    {/* Glitch Effect Layers */}
                    {glitchEffect && (
                        <>
                            <div className="absolute inset-0 text-accent opacity-70 transform translate-x-1 glitch-layer">
                                {displayedNumber}
                            </div>
                            <div className="absolute inset-0 text-secondary opacity-70 transform -translate-x-1 glitch-layer">
                                {displayedNumber}
                            </div>
                        </>
                    )}
                </div>

                {/* Subtitle */}
                <p className="text-lg text-gray-600 mb-12 max-w-md mx-auto">
                    {t('NotFound.subtitle')}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col cursor-pointer sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        {t('NotFound.goBack')}
                    </button>

                    <Link
                        to="/"
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <Home className="w-5 h-5" />
                        {t('NotFound.goHome')}
                    </Link>
                </div>
            </div>

            {/* Replay Button */}
            <div
                className="absolute right-6 bottom-6 group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="relative">
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 bg-secondary/20 rounded-full blur-md transition-all duration-300 ${isHovering ? "opacity-50 scale-125" : "opacity-0 scale-100"
                        }`} />

                    {/* Replay Icon */}
                    <button
                        onClick={handleReplay}
                        className={`relative w-12 h-12 cursor-pointer bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform ${isHovering ? "scale-110 rotate-180" : "scale-100"
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6 text-primary"
                        >
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                            <path d="M3 21v-5h5" />
                        </svg>
                    </button>
                </div>

                {/* Tooltip */}
                <div className={`absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-primary text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${isHovering ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                    }`}>
                    {t('NotFound.replayAnimation')}
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-xs text-gray-400 space-y-1">
                    <div>{t('NotFound.errorCode')}: 404</div>
                    <div>{t('NotFound.lostInSpace')}</div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(10deg);
                    }
                }
                .animate-float {
                    animation: float 10s ease-in-out infinite;
                }
                .glitch {
                    animation: glitch-anim 0.3s infinite;
                }
                .glitch-layer {
                    animation: glitch-anim 0.3s infinite;
                }
                @keyframes glitch-anim {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); }
                }
            `}</style>
        </div>
    );
}