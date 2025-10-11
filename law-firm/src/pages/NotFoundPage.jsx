import React, { useEffect, useRef, useState } from "react";

export default function NotFoundPage() {
    const [displayedText, setDisplayedText] = useState("");
    const [isBlinking, setIsBlinking] = useState(true);
    const fullText = "404, page not found.";
    const typingInterval = useRef(null);
    const blinkingInterval = useRef(null);
    const indexRef = useRef(0);

    const startTyping = () => {
        clearInterval(typingInterval.current);
        setDisplayedText("");
        indexRef.current = 0;

        typingInterval.current = setInterval(() => {
            if (indexRef.current < fullText.length) {
                setDisplayedText((prev) => prev + fullText[indexRef.current]);
                indexRef.current++;
            } else {
                clearInterval(typingInterval.current);
            }
        }, 100); // typing speed (ms per char)
    };

    const handleReplay = () => {
        startTyping();
    };

    useEffect(() => {
        startTyping();

        blinkingInterval.current = setInterval(() => {
            setIsBlinking((prev) => !prev);
        }, 400); // blink every 0.4s

        return () => {
            clearInterval(typingInterval.current);
            clearInterval(blinkingInterval.current);
        };
    }, []);

    return (
        <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center font-['Roboto_Mono']" dir="ltr">
            {/* Text */}
            <div className="relative text-center">
                <p className="text-white text-2xl tracking-wide inline">{displayedText}</p>
                {/* Blinking cursor */}
                <span
                    className={`inline-block bg-yellow-400 w-[14px] h-[30px] align-middle ml-1 transition-opacity duration-200 ${isBlinking ? "opacity-100" : "opacity-0"
                        }`}
                ></span>
            </div>

            {/* Replay icon */}
            <svg
                onClick={handleReplay}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 279.9 297.3"
                className="fill-gray-500 hover:fill-gray-300 w-6 absolute right-4 bottom-4 cursor-pointer transition-all"
            >
                <g>
                    <path d="M269.4,162.6c-2.7,66.5-55.6,120.1-121.8,123.9c-77,4.4-141.3-60-136.8-136.9C14.7,81.7,71,27.8,140,27.8
            c1.8,0,3.5,0,5.3,0.1c0.3,0,0.5,0.2,0.5,0.5v15c0,1.5,1.6,2.4,2.9,1.7l35.9-20.7c1.3-0.7,1.3-2.6,0-3.3L148.6,0.3
            c-1.3-0.7-2.9,0.2-2.9,1.7v15c0,0.3-0.2,0.5-0.5,0.5c-1.7-0.1-3.5-0.1-5.2-0.1C63.3,17.3,1,78.9,0,155.4
            C-1,233.8,63.4,298.3,141.9,297.3c74.6-1,135.1-60.2,138-134.3c0.1-3-2.3-5.4-5.3-5.4l0,0C271.8,157.6,269.5,159.8,269.4,162.6z" />
                </g>
            </svg>
        </div>
    );
}
