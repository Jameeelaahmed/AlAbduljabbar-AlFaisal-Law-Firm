import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Lock } from "lucide-react";

export default function UnAuthorized() {
    const [displayedNumber, setDisplayedNumber] = useState("");
    const [displayedText, setDisplayedText] = useState("");
    const [isBlinking, setIsBlinking] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [glitchEffect, setGlitchEffect] = useState(false);
    const [funnyMessage, setFunnyMessage] = useState("");

    const numberText = " 401";
    const messageText = " Unauthorized";
    const funnyMessages = [
        "This area requires a secret handshake! 🤝",
        "You shall not pass! 🧙‍♂️",
        "Access denied! Did you bring cookies? 🍪",
        "This is like a VIP club, but you're not on the list! 🎪",
        "The guards said 'nope'! 🚫",
        "You need a higher level clearance, agent! 🕵️",
        "The gatekeeper is not impressed! 🐉",
        "You're knocking on the wrong castle door! 🏰",
        "The digital bouncer said no! 💂",
        "This content is in a parallel universe! 🌌"
    ];

    // Add the missing ref declarations
    const typingInterval = useRef(null);
    const blinkingInterval = useRef(null);
    const indexRef = useRef(0);
    const phaseRef = useRef(0);

    const getRandomFunnyMessage = () => {
        return funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    };

    const startTyping = () => {
        clearInterval(typingInterval.current);
        setDisplayedNumber("");
        setDisplayedText("");
        setFunnyMessage(getRandomFunnyMessage());
        indexRef.current = 0;
        phaseRef.current = 0;

        typingInterval.current = setInterval(() => {
            if (phaseRef.current === 0) {
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
                // Typing the message "Unauthorized"
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
                        <Lock className="w-12 h-12 text-primary" />
                    </div>
                </div>

                <div className={`relative mb-8 ${glitchEffect ? 'glitch' : ''}`}>
                    <div className="text-8xl md:text-9xl font-bold text-primary">
                        {displayedNumber}
                        <span
                            className={`inline-block bg-secondary w-1 h-16 align-middle ml-2 transition-all duration-200 ${isBlinking ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    </div>

                    {/* Unauthorized Text */}
                    <div className="text-2xl md:text-3xl font-semibold text-primary mt-4 min-h-8">
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

                {/* Funny Message */}
                <p className="text-xl md:text-2xl font-medium text-gray-700 mb-6 max-w-md mx-auto">
                    {funnyMessage}
                </p>
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back to Safety
                    </button>

                    <Link
                        to="/"
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <Home className="w-5 h-5" />
                        Go Home
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
                        className={`relative w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform ${isHovering ? "scale-110 rotate-180" : "scale-100"
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
                    Replay Animation
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-xs text-gray-400 space-y-1">
                    <div>Error Code: 401 • Unauthorized Access</div>
                    <div>Protected Area • Access Restricted</div>
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