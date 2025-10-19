import React from 'react';

export const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
            <div className="relative w-16 h-16">
                {/* Outer circle with primary color */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                
                {/* Spinning arc with accent color */}
                <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin">
                    {/* Inner dot */}
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                {/* Center dot with accent color */}
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {/* Animation keyframes */}
            <style jsx global>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .animate-spin {
                    animation: spin 1.2s linear infinite;
                }
                
                /* Using your theme colors */
                .text-primary {
                    color: #003a42;
                }
                
                .border-primary {
                    border-color: #003a42;
                }
                
                .bg-primary {
                    background-color: #003a42;
                }
                
                .bg-accent {
                    background-color: #006b63;
                }
            `}</style>
        </div>
    );
};

export default Loading;