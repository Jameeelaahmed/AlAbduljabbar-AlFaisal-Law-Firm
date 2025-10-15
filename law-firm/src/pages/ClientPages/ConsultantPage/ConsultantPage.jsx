
import { useState } from 'react';

const LawServicesPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userSelections, setUserSelections] = useState({
        legalArea: '',
        urgency: '',
        situation: '',
        budget: ''
    });
    const [matchedServices, setMatchedServices] = useState([]);

    const legalAreas = [
        {
            id: 'business',
            name: 'Business & Corporate',
            icon: '🏢',
            description: 'Business formation, contracts, compliance'
        },
        {
            id: 'family',
            name: 'Family & Personal',
            icon: '👨‍👩‍👧‍👦',
            description: 'Divorce, custody, estate planning'
        },
        {
            id: 'litigation',
            name: 'Litigation & Disputes',
            icon: '⚖️',
            description: 'Court cases, disputes, defense'
        },
        {
            id: 'property',
            name: 'Property & Real Estate',
            icon: '🏠',
            description: 'Transactions, disputes, zoning'
        },
        {
            id: 'immigration',
            name: 'Immigration',
            icon: '🌎',
            description: 'Visas, green cards, citizenship'
        },
        {
            id: 'employment',
            name: 'Employment',
            icon: '💼',
            description: 'Contracts, disputes, compliance'
        }
    ];

    const urgencyLevels = [
        {
            id: 'emergency',
            name: 'Immediate Help Needed',
            description: 'Legal emergency requiring immediate attention',
            timeframe: 'Within 24 hours'
        },
        {
            id: 'urgent',
            name: 'Urgent Matter',
            description: 'Time-sensitive legal issue',
            timeframe: 'Within 3 days'
        },
        {
            id: 'planned',
            name: 'Planning & Preparation',
            description: 'Proactive legal planning',
            timeframe: 'Within 2 weeks'
        },
        {
            id: 'consultation',
            name: 'General Consultation',
            description: 'Exploring legal options',
            timeframe: 'Flexible schedule'
        }
    ];

    const serviceDatabase = [
        {
            id: 1,
            name: 'Emergency Divorce Filing',
            category: 'family',
            urgency: ['emergency', 'urgent'],
            description: 'Immediate divorce filing for urgent situations',
            price: 'Starting at $2,500',
            timeframe: '24-48 hours',
            features: ['Emergency Filing', 'Temporary Orders', 'Immediate Hearing']
        },
        {
            id: 2,
            name: 'Business Formation Package',
            category: 'business',
            urgency: ['planned', 'consultation'],
            description: 'Complete business setup with legal compliance',
            price: 'Starting at $1,500',
            timeframe: '1-2 weeks',
            features: ['Entity Selection', 'Document Filing', 'Compliance Setup']
        },
        {
            id: 3,
            name: 'Criminal Defense Consultation',
            category: 'litigation',
            urgency: ['emergency', 'urgent'],
            description: 'Immediate legal defense consultation',
            price: 'Flat Fee $500',
            timeframe: 'Same day',
            features: ['Case Review', 'Strategy Session', 'Court Preparation']
        },
        {
            id: 4,
            name: 'Estate Planning Package',
            category: 'family',
            urgency: ['planned', 'consultation'],
            description: 'Comprehensive will and trust planning',
            price: 'Starting at $1,200',
            timeframe: '2-3 weeks',
            features: ['Will Drafting', 'Trust Setup', 'Healthcare Directives']
        },
        {
            id: 5,
            name: 'Real Estate Closing',
            category: 'property',
            urgency: ['urgent', 'planned'],
            description: 'Complete real estate transaction support',
            price: 'Starting at $1,000',
            timeframe: '30-45 days',
            features: ['Title Review', 'Closing Services', 'Document Preparation']
        },
        {
            id: 6,
            name: 'Immigration Visa Application',
            category: 'immigration',
            urgency: ['planned', 'consultation'],
            description: 'Professional visa application assistance',
            price: 'Starting at $2,000',
            timeframe: '3-6 months',
            features: ['Document Prep', 'Application Filing', 'Interview Coaching']
        }
    ];

    const handleSelection = (step, value) => {
        setUserSelections(prev => ({
            ...prev,
            [step]: value
        }));

        // Auto-advance to next step after selection
        setTimeout(() => {
            if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
            } else {
                // Find matching services when all steps are complete
                findMatchingServices({ ...userSelections, [step]: value });
            }
        }, 500);
    };

    const findMatchingServices = (selections) => {
        const matches = serviceDatabase.filter(service => {
            return service.category === selections.legalArea &&
                service.urgency.includes(selections.urgency);
        });
        setMatchedServices(matches);
        setCurrentStep(5); // Results step
    };

    const resetWizard = () => {
        setCurrentStep(1);
        setUserSelections({
            legalArea: '',
            urgency: '',
            situation: '',
            budget: ''
        });
        setMatchedServices([]);
    };

    const getStepProgress = () => {
        return (currentStep / 4) * 100;
    };

    return (
        <div className="min-h-screen bg-[#f4f5f3]">
            {/* Header */}
            <div className="bg-white border-b border-[#7a5a21]/20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#003a42] mb-4">
                            Find Your Legal Solution
                        </h1>
                        <p className="text-xl text-[#1f1f1f]">
                            Answer a few questions to discover the perfect legal service for your situation
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white border-b border-[#7a5a21]/10">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-[#003a42]">
                                Step {currentStep} of 4
                            </span>
                            <span className="text-sm text-[#7a5a21]">
                                {getStepProgress().toFixed(0)}% Complete
                            </span>
                        </div>
                        <div className="w-full bg-[#f4f5f3] rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-[#006b63] to-[#7a5a21] h-2 rounded-full transition-all duration-500"
                                style={{ width: `${getStepProgress()}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wizard Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-[#7a5a21]/10 p-8">

                    {/* Step 1: Legal Area */}
                    {currentStep === 1 && (
                        <div className="text-center">
                            <div className="text-4xl mb-6">⚖️</div>
                            <h2 className="text-2xl font-bold text-[#003a42] mb-4">
                                What legal area do you need help with?
                            </h2>
                            <p className="text-[#1f1f1f] mb-8 max-w-2xl mx-auto">
                                Select the category that best matches your legal needs
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {legalAreas.map(area => (
                                    <button
                                        key={area.id}
                                        onClick={() => handleSelection('legalArea', area.id)}
                                        className="p-6 cursor-pointer border-2 border-[#7a5a21]/20 rounded-xl text-left hover:border-[#006b63] hover:shadow-md transition-all duration-200 group"
                                    >
                                        <div className="text-2xl mb-3">{area.icon}</div>
                                        <h3 className="font-semibold text-[#003a42] mb-2 group-hover:text-[#006b63]">
                                            {area.name}
                                        </h3>
                                        <p className="text-sm text-[#1f1f1f] opacity-75">
                                            {area.description}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Urgency */}
                    {currentStep === 2 && (
                        <div className="text-center">
                            <div className="text-4xl mb-6">⏰</div>
                            <h2 className="text-2xl font-bold text-[#003a42] mb-4">
                                How urgent is your legal matter?
                            </h2>
                            <p className="text-[#1f1f1f] mb-8 max-w-2xl mx-auto">
                                This helps us prioritize and schedule appropriately
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                                {urgencyLevels.map(level => (
                                    <button
                                        key={level.id}
                                        onClick={() => handleSelection('urgency', level.id)}
                                        className="p-6 border-2 border-[#7a5a21]/20 rounded-xl text-left hover:border-[#006b63] hover:shadow-md transition-all duration-200 group"
                                    >
                                        <h3 className="font-semibold text-[#003a42] mb-2 group-hover:text-[#006b63]">
                                            {level.name}
                                        </h3>
                                        <p className="text-sm text-[#1f1f1f] mb-3">
                                            {level.description}
                                        </p>
                                        <div className="text-xs bg-[#f4f5f3] text-[#7a5a21] px-2 py-1 rounded-full inline-block">
                                            {level.timeframe}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Situation Details */}
                    {currentStep === 3 && (
                        <div className="text-center">
                            <div className="text-4xl mb-6">📝</div>
                            <h2 className="text-2xl font-bold text-[#003a42] mb-4">
                                Tell us about your situation
                            </h2>
                            <p className="text-[#1f1f1f] mb-8 max-w-2xl mx-auto">
                                Briefly describe what you need help with (optional)
                            </p>

                            <div className="max-w-2xl mx-auto">
                                <textarea
                                    placeholder="For example: 'I need to start a new LLC for my consulting business' or 'I'm going through a divorce and need child custody agreement'"
                                    rows={4}
                                    className="w-full p-4 border border-[#7a5a21]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006b63] focus:border-transparent resize-none"
                                    onChange={(e) => handleSelection('situation', e.target.value)}
                                />
                                <button
                                    onClick={() => handleSelection('situation', 'skip')}
                                    className="mt-4 text-[#7a5a21] hover:text-[#006b63] transition-colors duration-200"
                                >
                                    Skip this step →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Budget */}
                    {currentStep === 4 && (
                        <div className="text-center">
                            <div className="text-4xl mb-6">💰</div>
                            <h2 className="text-2xl font-bold text-[#003a42] mb-4">
                                What's your budget range?
                            </h2>
                            <p className="text-[#1f1f1f] mb-8 max-w-2xl mx-auto">
                                This helps us recommend the most suitable options
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                {[
                                    { id: 'under-2k', name: 'Under $2,000', desc: 'Basic legal services' },
                                    { id: '2k-5k', name: '$2,000 - $5,000', desc: 'Standard legal matters' },
                                    { id: '5k-10k', name: '$5,000 - $10,000', desc: 'Complex cases' },
                                    { id: '10k-plus', name: '$10,000+', desc: 'Major litigation/business' },
                                    { id: 'consult', name: 'Consultation First', desc: 'Discuss fees later' },
                                    { id: 'unknown', name: 'Not Sure', desc: 'Need guidance' }
                                ].map(budget => (
                                    <button
                                        key={budget.id}
                                        onClick={() => handleSelection('budget', budget.id)}
                                        className="p-4 border-2 border-[#7a5a21]/20 rounded-xl hover:border-[#006b63] hover:shadow-md transition-all duration-200 group text-center"
                                    >
                                        <h3 className="font-semibold text-[#003a42] mb-1 group-hover:text-[#006b63]">
                                            {budget.name}
                                        </h3>
                                        <p className="text-xs text-[#1f1f1f] opacity-75">
                                            {budget.desc}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 5: Results */}
                    {currentStep === 5 && (
                        <div>
                            <div className="text-center mb-8">
                                <div className="text-4xl mb-4">🎯</div>
                                <h2 className="text-2xl font-bold text-[#003a42] mb-2">
                                    Recommended Legal Services
                                </h2>
                                <p className="text-[#1f1f1f]">
                                    Based on your needs, we recommend these services
                                </p>
                            </div>

                            {matchedServices.length > 0 ? (
                                <div className="grid gap-6 max-w-2xl mx-auto">
                                    {matchedServices.map(service => (
                                        <div key={service.id} className="border border-[#7a5a21]/20 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-[#003a42] mb-2">
                                                        {service.name}
                                                    </h3>
                                                    <p className="text-[#1f1f1f] mb-3">
                                                        {service.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {service.features.map((feature, index) => (
                                                            <span key={index} className="text-xs bg-[#f4f5f3] text-[#1f1f1f] px-2 py-1 rounded border border-[#7a5a21]/10">
                                                                {feature}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <span className="text-[#006b63] font-semibold">{service.price}</span>
                                                        <span className="text-[#7a5a21]">•</span>
                                                        <span className="text-[#1f1f1f]">Timeline: {service.timeframe}</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="bg-[#003a42] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#002a32] transition-colors duration-200">
                                                        Select
                                                    </button>
                                                    <button className="border border-[#7a5a21] text-[#7a5a21] px-4 py-2 rounded-lg font-semibold hover:bg-[#7a5a21] hover:text-white transition-colors duration-200">
                                                        Learn More
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">🤔</div>
                                    <h3 className="text-xl font-semibold text-[#003a42] mb-2">
                                        No exact matches found
                                    </h3>
                                    <p className="text-[#1f1f1f] mb-6">
                                        Let us help you find the right solution with a personalized consultation.
                                    </p>
                                    <button className="bg-[#006b63] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005a53] transition-colors duration-200">
                                        Schedule Free Consultation
                                    </button>
                                </div>
                            )}

                            <div className="text-center mt-8">
                                <button
                                    onClick={resetWizard}
                                    className="text-[#7a5a21] hover:text-[#006b63] transition-colors duration-200"
                                >
                                    ← Start Over with New Search
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Navigation Controls */}
                    {currentStep > 1 && currentStep < 5 && (
                        <div className="flex justify-between mt-8 pt-6 border-t border-[#7a5a21]/10">
                            <button
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="text-[#7a5a21] hover:text-[#006b63] transition-colors duration-200 flex items-center"
                            >
                                ← Previous Step
                            </button>
                            <button
                                onClick={resetWizard}
                                className="text-[#7a5a21] hover:text-[#006b63] transition-colors duration-200"
                            >
                                Start Over
                            </button>
                        </div>
                    )}
                </div>

                {/* Alternative Access */}
                <div className="text-center mt-8">
                    <p className="text-[#1f1f1f] mb-4">
                        Prefer to browse all services directly?
                    </p>
                    <button className="border border-[#003a42] text-[#003a42] px-6 py-2 rounded-lg font-semibold hover:bg-[#003a42] hover:text-white transition-colors duration-200">
                        View Complete Service Directory
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LawServicesPage;