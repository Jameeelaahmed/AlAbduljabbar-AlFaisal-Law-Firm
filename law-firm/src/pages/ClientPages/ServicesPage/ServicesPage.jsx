// import { useState } from 'react';

// const LawServicesPage = () => {
//     const [expandedService, setExpandedService] = useState(null);

//     // Sample data structure
//     const services = [
//         {
//             id: 1,
//             name: "Corporate Law",
//             subServices: [
//                 {
//                     id: 101,
//                     name: "Business Formation",
//                     description: "Legal structure selection, incorporation, and registration services for new businesses.",
//                 },
//                 {
//                     id: 102,
//                     name: "Mergers & Acquisitions",
//                     description: "Guidance through complex M&A transactions, due diligence, and contract negotiation.",
//                 },
//                 {
//                     id: 103,
//                     name: "Contract Review",
//                     description: "Comprehensive analysis and drafting of business contracts and agreements.",
//                 },
//             ],
//         },
//         {
//             id: 2,
//             name: "Family Law",
//             subServices: [
//                 {
//                     id: 201,
//                     name: "Divorce Proceedings",
//                     description: "Legal representation for uncontested and contested divorce cases.",
//                 },
//                 {
//                     id: 202,
//                     name: "Child Custody",
//                     description: "Protecting parental rights and creating custody agreements in children's best interests.",
//                 },
//                 {
//                     id: 203,
//                     name: "Adoption Services",
//                     description: "Legal guidance through domestic and international adoption processes.",
//                 },
//             ],
//         },
//         {
//             id: 3,
//             name: "Criminal Defense",
//             subServices: [
//                 {
//                     id: 301,
//                     name: "DUI Defense",
//                     description: "Aggressive defense strategies for driving under influence charges.",
//                 },
//                 {
//                     id: 302,
//                     name: "Drug Charges",
//                     description: "Legal representation for possession, distribution, and related drug offenses.",
//                 },
//                 {
//                     id: 303,
//                     name: "White Collar Crimes",
//                     description: "Defense against fraud, embezzlement, and financial crime allegations.",
//                 },
//             ],
//         },
//         {
//             id: 4,
//             name: "Real Estate Law",
//             subServices: [
//                 {
//                     id: 401,
//                     name: "Property Transactions",
//                     description: "Legal support for residential and commercial property purchases and sales.",
//                 },
//                 {
//                     id: 402,
//                     name: "Landlord-Tenant Disputes",
//                     description: "Resolution of rental agreement conflicts and eviction proceedings.",
//                 },
//                 {
//                     id: 403,
//                     name: "Zoning & Land Use",
//                     description: "Navigating municipal regulations and development approvals.",
//                 },
//             ],
//         },
//     ];

//     const toggleService = (serviceId) => {
//         setExpandedService(expandedService === serviceId ? null : serviceId);
//     };

//     return (
//         <div className="min-h-screen bg-[#f4f5f3] py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//                 {/* Page Header */}
//                 <div className="text-center mb-12">
//                     <h1 className="text-4xl font-serif font-bold text-[#1f1f1f] mb-4">
//                         Legal Services
//                     </h1>
//                     <p className="text-lg text-[#1f1f1f] max-w-2xl mx-auto">
//                         Comprehensive legal solutions tailored to meet your specific needs.
//                         Our experienced attorneys provide expert guidance across various practice areas.
//                     </p>
//                 </div>

//                 {/* Services Accordion */}
//                 <div className="space-y-4">
//                     {services.map((service) => (
//                         <div
//                             key={service.id}
//                             className="bg-white rounded-lg shadow-sm border border-[#7a5a21]/20 overflow-hidden transition-all duration-300 hover:shadow-md"
//                         >
//                             {/* Main Service Header */}
//                             <button
//                                 onClick={() => toggleService(service.id)}
//                                 className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-[#006b63] focus:ring-opacity-50"
//                             >
//                                 <div className="flex items-center justify-between">
//                                     <h2 className="text-xl font-semibold text-[#003a42]">
//                                         {service.name}
//                                     </h2>
//                                     <svg
//                                         className={`w-5 h-5 text-[#7a5a21] transition-transform duration-300 ${expandedService === service.id ? 'rotate-180' : ''
//                                             }`}
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                     </svg>
//                                 </div>
//                             </button>

//                             {/* Sub-services Content */}
//                             {expandedService === service.id && (
//                                 <div className="px-6 pb-6">
//                                     <div className="border-t border-[#7a5a21]/20 pt-6">
//                                         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                                             {service.subServices.map((subService) => (
//                                                 <div
//                                                     key={subService.id}
//                                                     className="bg-[#f4f5f3] rounded-lg p-4 border border-[#7a5a21]/10 hover:border-[#006b63] transition-colors duration-200"
//                                                 >
//                                                     <h3 className="font-semibold text-[#003a42] mb-2">
//                                                         {subService.name}
//                                                     </h3>
//                                                     <p className="text-sm text-[#1f1f1f] mb-4 leading-relaxed">
//                                                         {subService.description}
//                                                     </p>
//                                                     <button className="w-full bg-[#003a42] text-white py-2 px-4 rounded text-sm font-medium hover:bg-[#002a32] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#006b63] focus:ring-opacity-50">
//                                                         Request Service
//                                                     </button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Call to Action Section */}
//                 <div className="mt-16 text-center">
//                     <div className="bg-[#003a42] rounded-lg p-8 text-white">
//                         <h2 className="text-2xl font-serif font-bold mb-4">
//                             Need Specialized Legal Assistance?
//                         </h2>
//                         <p className="mb-6 opacity-90">
//                             Contact us for a confidential consultation about your specific legal needs.
//                         </p>
//                         <button className="bg-[#7a5a21] text-white py-3 px-8 rounded font-semibold hover:bg-[#6a4a19] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#006b63] focus:ring-opacity-50">
//                             Schedule Consultation
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LawServicesPage;

// ************


// import { useState } from 'react';

// const LawServicesPage = () => {
//     const [selectedService, setSelectedService] = useState(null);

//     const services = [
//         {
//             id: 1,
//             name: "Corporate Law",
//             icon: "⚖️",
//             description: "Comprehensive legal solutions for businesses of all sizes",
//             subServices: [
//                 {
//                     id: 101,
//                     name: "Business Formation",
//                     description: "Legal structure selection, incorporation, and registration services for new businesses.",
//                     price: "Starting at $1,500"
//                 },
//                 {
//                     id: 102,
//                     name: "Mergers & Acquisitions",
//                     description: "Guidance through complex M&A transactions, due diligence, and contract negotiation.",
//                     price: "Custom Quote"
//                 },
//                 {
//                     id: 103,
//                     name: "Contract Review",
//                     description: "Comprehensive analysis and drafting of business contracts and agreements.",
//                     price: "Starting at $300"
//                 },
//                 {
//                     id: 104,
//                     name: "Compliance & Governance",
//                     description: "Ensuring your business meets all legal and regulatory requirements.",
//                     price: "Starting at $2,000"
//                 }
//             ]
//         },
//         {
//             id: 2,
//             name: "Family Law",
//             icon: "👨‍👩‍👧‍👦",
//             description: "Sensitive and compassionate legal support for family matters",
//             subServices: [
//                 {
//                     id: 201,
//                     name: "Divorce Proceedings",
//                     description: "Legal representation for uncontested and contested divorce cases.",
//                     price: "Starting at $2,500"
//                 },
//                 {
//                     id: 202,
//                     name: "Child Custody",
//                     description: "Protecting parental rights and creating custody agreements.",
//                     price: "Starting at $1,800"
//                 },
//                 {
//                     id: 203,
//                     name: "Adoption Services",
//                     description: "Legal guidance through domestic and international adoption processes.",
//                     price: "Starting at $3,000"
//                 }
//             ]
//         },
//         {
//             id: 3,
//             name: "Criminal Defense",
//             icon: "🛡️",
//             description: "Aggressive defense strategies for criminal charges",
//             subServices: [
//                 {
//                     id: 301,
//                     name: "DUI Defense",
//                     description: "Aggressive defense strategies for driving under influence charges.",
//                     price: "Starting at $2,000"
//                 },
//                 {
//                     id: 302,
//                     name: "Drug Charges",
//                     description: "Legal representation for possession and distribution offenses.",
//                     price: "Starting at $3,500"
//                 },
//                 {
//                     id: 303,
//                     name: "White Collar Crimes",
//                     description: "Defense against fraud, embezzlement, and financial crimes.",
//                     price: "Custom Quote"
//                 }
//             ]
//         },
//         {
//             id: 4,
//             name: "Real Estate Law",
//             icon: "🏠",
//             description: "Expert guidance for property transactions and disputes",
//             subServices: [
//                 {
//                     id: 401,
//                     name: "Property Transactions",
//                     description: "Legal support for residential and commercial property purchases.",
//                     price: "Starting at $1,200"
//                 },
//                 {
//                     id: 402,
//                     name: "Landlord-Tenant Disputes",
//                     description: "Resolution of rental agreement conflicts and eviction proceedings.",
//                     price: "Starting at $800"
//                 },
//                 {
//                     id: 403,
//                     name: "Zoning & Land Use",
//                     description: "Navigating municipal regulations and development approvals.",
//                     price: "Starting at $1,500"
//                 }
//             ]
//         },
//         {
//             id: 5,
//             name: "Immigration Law",
//             icon: "🌎",
//             description: "Navigating complex immigration processes and visas",
//             subServices: [
//                 {
//                     id: 501,
//                     name: "Visa Applications",
//                     description: "Assistance with work, student, and family-based visa applications.",
//                     price: "Starting at $1,000"
//                 },
//                 {
//                     id: 502,
//                     name: "Green Card Processing",
//                     description: "Comprehensive support for permanent residency applications.",
//                     price: "Starting at $2,500"
//                 },
//                 {
//                     id: 503,
//                     name: "Citizenship & Naturalization",
//                     description: "Guidance through the path to U.S. citizenship.",
//                     price: "Starting at $1,800"
//                 }
//             ]
//         },
//         {
//             id: 6,
//             name: "Estate Planning",
//             icon: "📝",
//             description: "Protecting your legacy and family's future",
//             subServices: [
//                 {
//                     id: 601,
//                     name: "Will Drafting",
//                     description: "Comprehensive will creation and estate distribution planning.",
//                     price: "Starting at $800"
//                 },
//                 {
//                     id: 602,
//                     name: "Trust Formation",
//                     description: "Setting up living trusts and special needs trusts.",
//                     price: "Starting at $1,500"
//                 },
//                 {
//                     id: 603,
//                     name: "Probate Administration",
//                     description: "Guidance through the probate process and estate settlement.",
//                     price: "Starting at $2,000"
//                 }
//             ]
//         }
//     ];

//     return (
//         <div className="min-h-screen bg-[#f4f5f3] py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 {/* Page Header */}
//                 <div className="text-center mb-16">
//                     <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#003a42] mb-6">
//                         Our Legal Services
//                     </h1>
//                     <p className="text-xl text-[#1f1f1f] max-w-3xl mx-auto leading-relaxed">
//                         Expert legal counsel across multiple practice areas. Each service is tailored to meet
//                         your specific needs with personalized attention from experienced attorneys.
//                     </p>
//                 </div>

//                 {/* Services Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//                     {services.map((service) => (
//                         <div
//                             key={service.id}
//                             className="bg-white rounded-xl shadow-sm border border-[#7a5a21]/10 hover:shadow-lg transition-all duration-300 hover:border-[#006b63]/30 group cursor-pointer"
//                             onClick={() => setSelectedService(service)}
//                         >
//                             <div className="p-6">
//                                 <div className="flex items-start justify-between mb-4">
//                                     <div className="text-3xl">{service.icon}</div>
//                                     <svg
//                                         className="w-5 h-5 text-[#7a5a21] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                     </svg>
//                                 </div>

//                                 <h3 className="text-xl font-semibold text-[#003a42] mb-3 group-hover:text-[#006b63] transition-colors duration-300">
//                                     {service.name}
//                                 </h3>

//                                 <p className="text-[#1f1f1f] mb-4 leading-relaxed">
//                                     {service.description}
//                                 </p>

//                                 <div className="flex items-center text-sm text-[#7a5a21] font-medium">
//                                     <span>{service.subServices.length} services</span>
//                                     <span className="mx-2">•</span>
//                                     <span>View details</span>
//                                 </div>
//                             </div>

//                             {/* Accent Border Bottom */}
//                             <div className="h-1 bg-gradient-to-r from-[#003a42] via-[#006b63] to-[#7a5a21] rounded-b-xl"></div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* CTA Section */}
//                 <div className="bg-gradient-to-r from-[#003a42] to-[#006b63] rounded-2xl p-8 md:p-12 text-center text-white">
//                     <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
//                         Ready to Get Started?
//                     </h2>
//                     <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
//                         Schedule a confidential consultation with one of our experienced attorneys to discuss your legal needs.
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                         <button className="bg-[#7a5a21] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#6a4a19] transition-colors duration-200">
//                             Schedule Consultation
//                         </button>
//                         <button className="bg-white text-[#003a42] py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
//                             Call Now: (555) 123-4567
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Service Detail Modal */}
//             {selectedService && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//                         <div className="sticky top-0 bg-white border-b border-[#7a5a21]/20 p-6 rounded-t-2xl">
//                             <div className="flex items-center justify-between">
//                                 <div className="flex items-center space-x-4">
//                                     <span className="text-3xl">{selectedService.icon}</span>
//                                     <div>
//                                         <h2 className="text-2xl font-bold text-[#003a42]">
//                                             {selectedService.name}
//                                         </h2>
//                                         <p className="text-[#1f1f1f] mt-1">
//                                             {selectedService.description}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <button
//                                     onClick={() => setSelectedService(null)}
//                                     className="text-[#7a5a21] hover:text-[#003a42] transition-colors duration-200"
//                                 >
//                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="p-6">
//                             <div className="grid gap-6">
//                                 {selectedService.subServices.map((subService) => (
//                                     <div
//                                         key={subService.id}
//                                         className="border border-[#7a5a21]/20 rounded-xl p-6 hover:border-[#006b63] transition-colors duration-200"
//                                     >
//                                         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                                             <div className="flex-1">
//                                                 <h3 className="text-lg font-semibold text-[#003a42] mb-2">
//                                                     {subService.name}
//                                                 </h3>
//                                                 <p className="text-[#1f1f1f] mb-3 leading-relaxed">
//                                                     {subService.description}
//                                                 </p>
//                                                 <div className="text-sm font-medium text-[#7a5a21]">
//                                                     {subService.price}
//                                                 </div>
//                                             </div>
//                                             <button className="bg-[#003a42] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#002a32] transition-colors duration-200 whitespace-nowrap">
//                                                 Request Service
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="mt-8 p-6 bg-[#f4f5f3] rounded-xl border border-[#7a5a21]/10">
//                                 <h3 className="text-lg font-semibold text-[#003a42] mb-3">
//                                     Need Immediate Assistance?
//                                 </h3>
//                                 <p className="text-[#1f1f1f] mb-4">
//                                     Our legal team is ready to help you with your {selectedService.name.toLowerCase()} needs.
//                                 </p>
//                                 <button className="bg-[#006b63] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#005a53] transition-colors duration-200">
//                                     Schedule Free Consultation
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LawServicesPage;

// ****************


// import { useState } from 'react';

// const LawServicesPage = () => {
//     const [activeTab, setActiveTab] = useState(1);

//     const services = [
//         {
//             id: 1,
//             name: "Corporate Law",
//             icon: "🏢",
//             description: "Comprehensive legal solutions for businesses and corporations",
//             featured: true,
//             subServices: [
//                 {
//                     id: 101,
//                     name: "Business Formation",
//                     description: "Legal structure selection, incorporation, and registration services for new businesses.",
//                     features: ["LLC Formation", "Corporation Setup", "Partnership Agreements"],
//                     duration: "1-2 weeks"
//                 },
//                 {
//                     id: 102,
//                     name: "Mergers & Acquisitions",
//                     description: "Guidance through complex M&A transactions, due diligence, and contract negotiation.",
//                     features: ["Due Diligence", "Contract Negotiation", "Regulatory Compliance"],
//                     duration: "2-6 months"
//                 },
//                 {
//                     id: 103,
//                     name: "Contract Review",
//                     description: "Comprehensive analysis and drafting of business contracts and agreements.",
//                     features: ["Contract Drafting", "Legal Review", "Risk Assessment"],
//                     duration: "3-5 days"
//                 },
//                 {
//                     id: 104,
//                     name: "Intellectual Property",
//                     description: "Protection of trademarks, patents, and business intellectual property.",
//                     features: ["Trademark Registration", "IP Licensing", "Infringement Protection"],
//                     duration: "2-4 weeks"
//                 }
//             ]
//         },
//         {
//             id: 2,
//             name: "Family Law",
//             icon: "👨‍👩‍👧‍👦",
//             description: "Compassionate legal support for family matters and domestic relations",
//             featured: false,
//             subServices: [
//                 {
//                     id: 201,
//                     name: "Divorce Proceedings",
//                     description: "Legal representation for uncontested and contested divorce cases.",
//                     features: ["Asset Division", "Spousal Support", "Legal Separation"],
//                     duration: "3-12 months"
//                 },
//                 {
//                     id: 202,
//                     name: "Child Custody & Support",
//                     description: "Protecting parental rights and creating custody agreements in children's best interests.",
//                     features: ["Custody Agreements", "Visitation Rights", "Support Calculations"],
//                     duration: "1-3 months"
//                 },
//                 {
//                     id: 203,
//                     name: "Adoption Services",
//                     description: "Legal guidance through domestic and international adoption processes.",
//                     features: ["Home Studies", "Legal Documentation", "Court Proceedings"],
//                     duration: "6-18 months"
//                 }
//             ]
//         },
//         {
//             id: 3,
//             name: "Criminal Defense",
//             icon: "🛡️",
//             description: "Aggressive defense strategies for criminal charges and legal protection",
//             featured: true,
//             subServices: [
//                 {
//                     id: 301,
//                     name: "DUI Defense",
//                     description: "Aggressive defense strategies for driving under influence charges.",
//                     features: ["License Preservation", "Court Representation", "Plea Negotiations"],
//                     duration: "3-6 months"
//                 },
//                 {
//                     id: 302,
//                     name: "Drug Charges",
//                     description: "Legal representation for possession, distribution, and related drug offenses.",
//                     features: ["Evidence Challenge", "Sentencing Mitigation", "Appeal Services"],
//                     duration: "6-12 months"
//                 },
//                 {
//                     id: 303,
//                     name: "White Collar Crimes",
//                     description: "Defense against fraud, embezzlement, and financial crime allegations.",
//                     features: ["Federal Defense", "Investigation Response", "Trial Preparation"],
//                     duration: "12-24 months"
//                 }
//             ]
//         },
//         {
//             id: 4,
//             name: "Real Estate Law",
//             icon: "🏠",
//             description: "Expert guidance for property transactions, disputes, and development",
//             featured: false,
//             subServices: [
//                 {
//                     id: 401,
//                     name: "Property Transactions",
//                     description: "Legal support for residential and commercial property purchases and sales.",
//                     features: ["Title Review", "Closing Services", "Deed Preparation"],
//                     duration: "30-45 days"
//                 },
//                 {
//                     id: 402,
//                     name: "Landlord-Tenant Disputes",
//                     description: "Resolution of rental agreement conflicts and eviction proceedings.",
//                     features: ["Lease Review", "Eviction Defense", "Security Deposit Issues"],
//                     duration: "1-3 months"
//                 },
//                 {
//                     id: 403,
//                     name: "Zoning & Land Use",
//                     description: "Navigating municipal regulations and development approvals.",
//                     features: ["Permit Acquisition", "Variance Requests", "Municipal Compliance"],
//                     duration: "2-6 months"
//                 }
//             ]
//         },
//         {
//             id: 5,
//             name: "Immigration Law",
//             icon: "🌎",
//             description: "Navigating complex immigration processes, visas, and citizenship",
//             featured: false,
//             subServices: [
//                 {
//                     id: 501,
//                     name: "Visa Applications",
//                     description: "Assistance with work, student, and family-based visa applications.",
//                     features: ["Document Preparation", "Interview Coaching", "Appeal Support"],
//                     duration: "3-9 months"
//                 },
//                 {
//                     id: 502,
//                     name: "Green Card Processing",
//                     description: "Comprehensive support for permanent residency applications.",
//                     features: ["Employment-Based", "Family Sponsorship", "Adjustment of Status"],
//                     duration: "12-24 months"
//                 },
//                 {
//                     id: 503,
//                     name: "Citizenship & Naturalization",
//                     description: "Guidance through the path to U.S. citizenship.",
//                     features: ["Application Support", "Civics Test Prep", "Oath Ceremony"],
//                     duration: "6-12 months"
//                 }
//             ]
//         },
//         {
//             id: 6,
//             name: "Estate Planning",
//             icon: "📝",
//             description: "Protecting your legacy and ensuring your family's financial future",
//             featured: true,
//             subServices: [
//                 {
//                     id: 601,
//                     name: "Will Drafting",
//                     description: "Comprehensive will creation and estate distribution planning.",
//                     features: ["Asset Distribution", "Executor Appointment", "Guardian Designation"],
//                     duration: "2-4 weeks"
//                 },
//                 {
//                     id: 602,
//                     name: "Trust Formation",
//                     description: "Setting up living trusts and special needs trusts.",
//                     features: ["Revocable Trusts", "Irrevocable Trusts", "Trust Administration"],
//                     duration: "3-6 weeks"
//                 },
//                 {
//                     id: 603,
//                     name: "Probate Administration",
//                     description: "Guidance through the probate process and estate settlement.",
//                     features: ["Estate Valuation", "Debt Settlement", "Asset Transfer"],
//                     duration: "6-12 months"
//                 }
//             ]
//         }
//     ];

//     const activeService = services.find(service => service.id === activeTab);

//     return (
//         <div className="min-h-screen bg-[#f4f5f3]">
//             {/* Header */}
//             <div className="bg-white border-b border-[#7a5a21]/20">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="py-12 text-center">
//                         <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#003a42] mb-4">
//                             Legal Services
//                         </h1>
//                         <p className="text-xl text-[#1f1f1f] max-w-3xl mx-auto">
//                             Expert legal counsel across multiple practice areas. Select a service category to explore our specialized offerings.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 <div className="flex flex-col lg:flex-row gap-8">
//                     {/* Sidebar Navigation */}
//                     <div className="lg:w-1/4">
//                         <div className="bg-white rounded-xl shadow-sm border border-[#7a5a21]/10 sticky top-8">
//                             <div className="p-6 border-b border-[#7a5a21]/10">
//                                 <h2 className="text-lg font-semibold text-[#003a42]">Practice Areas</h2>
//                             </div>
//                             <nav className="p-4">
//                                 <ul className="space-y-2">
//                                     {services.map((service) => (
//                                         <li key={service.id}>
//                                             <button
//                                                 onClick={() => setActiveTab(service.id)}
//                                                 className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${activeTab === service.id
//                                                     ? 'bg-[#003a42] text-white shadow-md'
//                                                     : 'text-[#1f1f1f] hover:bg-[#f4f5f3] hover:text-[#003a42]'
//                                                     }`}
//                                             >
//                                                 <span className="text-lg">{service.icon}</span>
//                                                 <span className="font-medium">{service.name}</span>
//                                                 {service.featured && (
//                                                     <span className={`text-xs px-2 py-1 rounded-full ${activeTab === service.id
//                                                         ? 'bg-[#7a5a21] text-white'
//                                                         : 'bg-[#006b63] text-white'
//                                                         }`}>
//                                                         Featured
//                                                     </span>
//                                                 )}
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </nav>
//                         </div>

//                         {/* Quick Contact Card */}
//                         <div className="mt-6 bg-gradient-to-br from-[#003a42] to-[#006b63] rounded-xl p-6 text-white">
//                             <h3 className="font-semibold text-lg mb-3">Need Immediate Help?</h3>
//                             <p className="text-sm opacity-90 mb-4">Schedule a free 30-minute consultation with our legal team.</p>
//                             <button className="w-full bg-[#7a5a21] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#6a4a19] transition-colors duration-200">
//                                 Book Consultation
//                             </button>
//                             <div className="mt-4 pt-4 border-t border-white/20">
//                                 <p className="text-sm font-medium">Call Us Directly</p>
//                                 <p className="text-lg font-semibold">(555) 123-4567</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Main Content */}
//                     <div className="lg:w-3/4">
//                         {/* Service Header */}
//                         <div className="bg-white rounded-xl shadow-sm border border-[#7a5a21]/10 p-6 mb-8">
//                             <div className="flex items-center space-x-4 mb-4">
//                                 <span className="text-3xl">{activeService.icon}</span>
//                                 <div>
//                                     <h2 className="text-2xl font-bold text-[#003a42]">{activeService.name}</h2>
//                                     <p className="text-[#1f1f1f] mt-1">{activeService.description}</p>
//                                 </div>
//                             </div>
//                             <div className="flex flex-wrap gap-2">
//                                 {activeService.subServices.map((subService, index) => (
//                                     <a
//                                         key={subService.id}
//                                         href={`#service-${subService.id}`}
//                                         className="text-sm bg-[#f4f5f3] text-[#003a42] px-3 py-1 rounded-full border border-[#7a5a21]/20 hover:border-[#006b63] transition-colors duration-200"
//                                     >
//                                         {subService.name}
//                                     </a>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Sub Services Grid */}
//                         <div className="grid gap-6">
//                             {activeService.subServices.map((subService) => (
//                                 <div
//                                     key={subService.id}
//                                     id={`service-${subService.id}`}
//                                     className="bg-white rounded-xl shadow-sm border border-[#7a5a21]/10 overflow-hidden hover:shadow-md transition-shadow duration-300"
//                                 >
//                                     <div className="p-6">
//                                         <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
//                                             <div className="flex-1">
//                                                 <div className="flex items-start justify-between mb-3">
//                                                     <h3 className="text-xl font-semibold text-[#003a42]">
//                                                         {subService.name}
//                                                     </h3>
//                                                     <span className="text-sm bg-[#006b63] text-white px-3 py-1 rounded-full">
//                                                         {subService.duration}
//                                                     </span>
//                                                 </div>

//                                                 <p className="text-[#1f1f1f] mb-4 leading-relaxed">
//                                                     {subService.description}
//                                                 </p>

//                                                 <div className="mb-4">
//                                                     <h4 className="text-sm font-semibold text-[#003a42] mb-2">What's Included:</h4>
//                                                     <div className="flex flex-wrap gap-2">
//                                                         {subService.features.map((feature, index) => (
//                                                             <span
//                                                                 key={index}
//                                                                 className="text-sm bg-[#f4f5f3] text-[#1f1f1f] px-3 py-1 rounded border border-[#7a5a21]/10"
//                                                             >
//                                                                 {feature}
//                                                             </span>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="lg:w-48 flex-shrink-0">
//                                                 <button className="w-full bg-[#003a42] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#002a32] transition-colors duration-200 mb-3">
//                                                     Request Service
//                                                 </button>
//                                                 <button className="w-full border border-[#7a5a21] text-[#7a5a21] py-3 px-6 rounded-lg font-semibold hover:bg-[#7a5a21] hover:text-white transition-colors duration-200">
//                                                     Learn More
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Bottom CTA */}
//                         <div className="mt-12 bg-gradient-to-r from-[#003a42] to-[#006b63] rounded-2xl p-8 text-center text-white">
//                             <h2 className="text-2xl font-serif font-bold mb-4">
//                                 Ready to Discuss Your {activeService.name} Needs?
//                             </h2>
//                             <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
//                                 Our specialized {activeService.name.toLowerCase()} attorneys are ready to provide expert guidance for your specific situation.
//                             </p>
//                             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                                 <button className="bg-[#7a5a21] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#6a4a19] transition-colors duration-200">
//                                     Schedule Free Consultation
//                                 </button>
//                                 <button className="bg-white text-[#003a42] py-3 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
//                                     Download Service Guide
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LawServicesPage;


// ********************


// import { useState, useMemo } from 'react';

// const LawServicesPage = () => {
//     const [activeFilter, setActiveFilter] = useState('all');
//     const [searchTerm, setSearchTerm] = useState('');

//     const services = [
//         {
//             id: 1,
//             name: "Corporate Law",
//             category: "business",
//             icon: "🏢",
//             description: "Comprehensive legal solutions for businesses and corporations",
//             shortDesc: "Business formation, compliance, and corporate governance",
//             featured: true,
//             popular: true,
//             subServices: [
//                 "Business Formation", "Mergers & Acquisitions", "Contract Review",
//                 "Corporate Compliance", "Board Governance", "Securities Law"
//             ]
//         },
//         {
//             id: 2,
//             name: "Family Law",
//             category: "personal",
//             icon: "👨‍👩‍👧‍👦",
//             description: "Compassionate legal support for family matters and domestic relations",
//             shortDesc: "Divorce, child custody, and family dispute resolution",
//             featured: true,
//             popular: true,
//             subServices: [
//                 "Divorce Proceedings", "Child Custody", "Adoption Services",
//                 "Prenuptial Agreements", "Spousal Support", "Parenting Plans"
//             ]
//         },
//         {
//             id: 3,
//             name: "Criminal Defense",
//             category: "litigation",
//             icon: "🛡️",
//             description: "Aggressive defense strategies for criminal charges and legal protection",
//             shortDesc: "DUI, drug charges, and criminal case defense",
//             featured: true,
//             popular: false,
//             subServices: [
//                 "DUI Defense", "Drug Charges", "White Collar Crimes",
//                 "Assault Cases", "Theft Defense", "Appeal Services"
//             ]
//         },
//         {
//             id: 4,
//             name: "Real Estate Law",
//             category: "property",
//             icon: "🏠",
//             description: "Expert guidance for property transactions, disputes, and development",
//             shortDesc: "Property transactions, landlord-tenant disputes, zoning",
//             featured: false,
//             popular: true,
//             subServices: [
//                 "Property Transactions", "Landlord-Tenant", "Zoning & Land Use",
//                 "Title Issues", "Real Estate Litigation", "Development Agreements"
//             ]
//         },
//         {
//             id: 5,
//             name: "Immigration Law",
//             category: "international",
//             icon: "🌎",
//             description: "Navigating complex immigration processes, visas, and citizenship",
//             shortDesc: "Visas, green cards, citizenship, and deportation defense",
//             featured: false,
//             popular: false,
//             subServices: [
//                 "Visa Applications", "Green Card Processing", "Citizenship",
//                 "Deportation Defense", "Work Permits", "Asylum Applications"
//             ]
//         },
//         {
//             id: 6,
//             name: "Estate Planning",
//             category: "personal",
//             icon: "📝",
//             description: "Protecting your legacy and ensuring your family's financial future",
//             shortDesc: "Wills, trusts, probate, and estate administration",
//             featured: true,
//             popular: true,
//             subServices: [
//                 "Will Drafting", "Trust Formation", "Probate Administration",
//                 "Estate Tax Planning", "Power of Attorney", "Healthcare Directives"
//             ]
//         },
//         {
//             id: 7,
//             name: "Personal Injury",
//             category: "litigation",
//             icon: "🚑",
//             description: "Compensation recovery for injuries caused by negligence",
//             shortDesc: "Accident claims, medical malpractice, injury compensation",
//             featured: false,
//             popular: true,
//             subServices: [
//                 "Car Accidents", "Medical Malpractice", "Workplace Injuries",
//                 "Slip & Fall", "Product Liability", "Wrongful Death"
//             ]
//         },
//         {
//             id: 8,
//             name: "Intellectual Property",
//             category: "business",
//             icon: "💡",
//             description: "Protection of trademarks, patents, copyrights, and trade secrets",
//             shortDesc: "Trademarks, patents, copyrights, and IP litigation",
//             featured: false,
//             popular: false,
//             subServices: [
//                 "Trademark Registration", "Patent Filing", "Copyright Protection",
//                 "IP Licensing", "Infringement Defense", "Trade Secrets"
//             ]
//         },
//         {
//             id: 9,
//             name: "Employment Law",
//             category: "business",
//             icon: "👥",
//             description: "Workplace legal matters for employers and employees",
//             shortDesc: "Employment contracts, disputes, and workplace compliance",
//             featured: false,
//             popular: false,
//             subServices: [
//                 "Employment Contracts", "Discrimination Claims", "Wrongful Termination",
//                 "Wage Disputes", "HR Compliance", "Workplace Policies"
//             ]
//         },
//         {
//             id: 10,
//             name: "Tax Law",
//             category: "business",
//             icon: "💰",
//             description: "Tax planning, controversy, and compliance services",
//             shortDesc: "Tax planning, IRS disputes, and compliance guidance",
//             featured: false,
//             popular: false,
//             subServices: [
//                 "Tax Planning", "IRS Disputes", "Business Taxation",
//                 "International Tax", "Estate Tax", "Tax Litigation"
//             ]
//         },
//         {
//             id: 11,
//             name: "Bankruptcy Law",
//             category: "financial",
//             icon: "📊",
//             description: "Debt relief and financial restructuring solutions",
//             shortDesc: "Chapter 7, Chapter 11, and debt relief options",
//             featured: false,
//             popular: false,
//             subServices: [
//                 "Chapter 7 Bankruptcy", "Chapter 11", "Debt Negotiation",
//                 "Creditor Harassment", "Foreclosure Defense", "Credit Repair"
//             ]
//         },
//         {
//             id: 12,
//             name: "Environmental Law",
//             category: "specialized",
//             icon: "🌳",
//             description: "Compliance and litigation for environmental regulations",
//             shortDesc: "Environmental compliance, permits, and litigation",
//             featured: false,
//             popular: false,
//             subServices: [
//                 "Regulatory Compliance", "Permitting", "Environmental Litigation",
//                 "Sustainability", "Resource Management", "Conservation"
//             ]
//         }
//     ];

//     const categories = [
//         { id: 'all', name: 'All Services', count: services.length },
//         { id: 'business', name: 'Business', count: services.filter(s => s.category === 'business').length },
//         { id: 'personal', name: 'Personal', count: services.filter(s => s.category === 'personal').length },
//         { id: 'litigation', name: 'Litigation', count: services.filter(s => s.category === 'litigation').length },
//         { id: 'property', name: 'Property', count: services.filter(s => s.category === 'property').length },
//         { id: 'international', name: 'International', count: services.filter(s => s.category === 'international').length },
//         { id: 'financial', name: 'Financial', count: services.filter(s => s.category === 'financial').length },
//         { id: 'specialized', name: 'Specialized', count: services.filter(s => s.category === 'specialized').length }
//     ];

//     const filteredServices = useMemo(() => {
//         return services.filter(service => {
//             const matchesFilter = activeFilter === 'all' || service.category === activeFilter;
//             const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 service.subServices.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()));
//             return matchesFilter && matchesSearch;
//         });
//     }, [activeFilter, searchTerm]);

//     return (
//         <div className="min-h-screen bg-[#f4f5f3]">
//             {/* Hero Section */}
//             <div className="bg-gradient-to-br from-[#003a42] via-[#006b63] to-[#003a42] text-white py-20 px-4 sm:px-6 lg:px-8">
//                 <div className="max-w-7xl mx-auto text-center">
//                     <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
//                         Legal Services
//                     </h1>
//                     <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8 leading-relaxed">
//                         Comprehensive legal solutions across all practice areas.
//                         Find the expert legal counsel you need for your specific situation.
//                     </p>

//                     {/* Search Bar */}
//                     <div className="max-w-2xl mx-auto">
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 placeholder="Search for legal services..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="w-full px-6 py-4 rounded-2xl text-[#1f1f1f] focus:outline-none focus:ring-4 focus:ring-[#7a5a21] focus:ring-opacity-50 shadow-lg"
//                             />
//                             <svg className="w-6 h-6 text-[#7a5a21] absolute right-6 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Filter Section */}
//             <div className="bg-white border-b border-[#7a5a21]/20 sticky top-0 z-40">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex flex-wrap items-center justify-between py-4 gap-4">
//                         <div className="flex items-center space-x-2">
//                             <span className="text-[#003a42] font-semibold">Filter by:</span>
//                             <div className="flex flex-wrap gap-2">
//                                 {categories.map(category => (
//                                     <button
//                                         key={category.id}
//                                         onClick={() => setActiveFilter(category.id)}
//                                         className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === category.id
//                                             ? 'bg-[#003a42] text-white shadow-md'
//                                             : 'bg-[#f4f5f3] text-[#1f1f1f] hover:bg-[#e8e9e7]'
//                                             }`}
//                                     >
//                                         {category.name}
//                                         <span className="ml-2 text-xs opacity-75">({category.count})</span>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="text-sm text-[#7a5a21]">
//                             Showing {filteredServices.length} of {services.length} services
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Services Grid */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 {filteredServices.length === 0 ? (
//                     <div className="text-center py-16">
//                         <div className="text-6xl mb-4">🔍</div>
//                         <h3 className="text-xl font-semibold text-[#003a42] mb-2">No services found</h3>
//                         <p className="text-[#1f1f1f]">Try adjusting your search or filter criteria</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                         {filteredServices.map(service => (
//                             <div
//                                 key={service.id}
//                                 className={`bg-white rounded-2xl shadow-sm border border-[#7a5a21]/10 overflow-hidden hover:shadow-xl transition-all duration-300 group ${service.featured ? 'ring-2 ring-[#006b63]' : ''
//                                     } ${service.popular ? 'ring-2 ring-[#7a5a21]' : ''}`}
//                             >
//                                 {/* Card Header */}
//                                 <div className="p-6 pb-4">
//                                     <div className="flex items-start justify-between mb-4">
//                                         <div className="text-3xl">{service.icon}</div>
//                                         <div className="flex space-x-1">
//                                             {service.featured && (
//                                                 <span className="text-xs bg-[#006b63] text-white px-2 py-1 rounded-full">
//                                                     Featured
//                                                 </span>
//                                             )}
//                                             {service.popular && (
//                                                 <span className="text-xs bg-[#7a5a21] text-white px-2 py-1 rounded-full">
//                                                     Popular
//                                                 </span>
//                                             )}
//                                         </div>
//                                     </div>

//                                     <h3 className="text-xl font-bold text-[#003a42] mb-2 group-hover:text-[#006b63] transition-colors duration-200">
//                                         {service.name}
//                                     </h3>

//                                     <p className="text-[#1f1f1f] text-sm leading-relaxed mb-4">
//                                         {service.shortDesc}
//                                     </p>
//                                 </div>

//                                 {/* Sub-services List */}
//                                 <div className="px-6 pb-4">
//                                     <div className="space-y-2">
//                                         {service.subServices.slice(0, 4).map((subService, index) => (
//                                             <div key={index} className="flex items-center text-sm text-[#1f1f1f]">
//                                                 <svg className="w-4 h-4 text-[#006b63] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                                 </svg>
//                                                 <span className="truncate">{subService}</span>
//                                             </div>
//                                         ))}
//                                         {service.subServices.length > 4 && (
//                                             <div className="text-sm text-[#7a5a21] font-medium">
//                                                 +{service.subServices.length - 4} more services
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Card Footer */}
//                                 <div className="px-6 py-4 bg-[#f4f5f3] border-t border-[#7a5a21]/10">
//                                     <div className="flex space-x-2">
//                                         <button className="flex-1 bg-[#003a42] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[#002a32] transition-colors duration-200">
//                                             Learn More
//                                         </button>
//                                         <button className="flex-1 border border-[#7a5a21] text-[#7a5a21] py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[#7a5a21] hover:text-white transition-colors duration-200">
//                                             Contact
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* CTA Section */}
//                 <div className="mt-16 text-center">
//                     <div className="bg-gradient-to-r from-[#003a42] to-[#006b63] rounded-2xl p-12 text-white">
//                         <h2 className="text-3xl font-serif font-bold mb-4">
//                             Can't Find What You're Looking For?
//                         </h2>
//                         <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
//                             Our legal team specializes in complex and unique cases. Schedule a consultation to discuss your specific legal needs.
//                         </p>
//                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                             <button className="bg-[#7a5a21] text-white py-4 px-8 rounded-lg font-semibold hover:bg-[#6a4a19] transition-colors duration-200 text-lg">
//                                 Schedule Free Consultation
//                             </button>
//                             <button className="bg-white text-[#003a42] py-4 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-lg">
//                                 Call: (555) 123-4567
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Practice Area Summary */}
//                 <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//                     {categories.filter(cat => cat.id !== 'all').map(category => (
//                         <div key={category.id} className="bg-white rounded-xl p-6 border border-[#7a5a21]/10">
//                             <div className="text-2xl font-bold text-[#003a42] mb-2">{category.count}</div>
//                             <div className="text-[#1f1f1f] font-medium">{category.name} Services</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LawServicesPage;


// ***************


// import { useState } from 'react';

// const LawServicesPage = () => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [userSelections, setUserSelections] = useState({
//         legalArea: '',
//         urgency: '',
//         situation: '',
//         budget: ''
//     });
//     const [matchedServices, setMatchedServices] = useState([]);

//     const legalAreas = [
//         {
//             id: 'business',
//             name: 'Business & Corporate',
//             icon: '🏢',
//             description: 'Business formation, contracts, compliance'
//         },
//         {
//             id: 'family',
//             name: 'Family & Personal',
//             icon: '👨‍👩‍👧‍👦',
//             description: 'Divorce, custody, estate planning'
//         },
//         {
//             id: 'litigation',
//             name: 'Litigation & Disputes',
//             icon: '⚖️',
//             description: 'Court cases, disputes, defense'
//         },
//         {
//             id: 'property',
//             name: 'Property & Real Estate',
//             icon: '🏠',
//             description: 'Transactions, disputes, zoning'
//         },
//         {
//             id: 'immigration',
//             name: 'Immigration',
//             icon: '🌎',
//             description: 'Visas, green cards, citizenship'
//         },
//         {
//             id: 'employment',
//             name: 'Employment',
//             icon: '💼',
//             description: 'Contracts, disputes, compliance'
//         }
//     ];

//     const urgencyLevels = [
//         {
//             id: 'emergency',
//             name: 'Immediate Help Needed',
//             description: 'Legal emergency requiring immediate attention',
//             timeframe: 'Within 24 hours'
//         },
//         {
//             id: 'urgent',
//             name: 'Urgent Matter',
//             description: 'Time-sensitive legal issue',
//             timeframe: 'Within 3 days'
//         },
//         {
//             id: 'planned',
//             name: 'Planning & Preparation',
//             description: 'Proactive legal planning',
//             timeframe: 'Within 2 weeks'
//         },
//         {
//             id: 'consultation',
//             name: 'General Consultation',
//             description: 'Exploring legal options',
//             timeframe: 'Flexible schedule'
//         }
//     ];

//     const serviceDatabase = [
//         {
//             id: 1,
//             name: 'Emergency Divorce Filing',
//             category: 'family',
//             urgency: ['emergency', 'urgent'],
//             description: 'Immediate divorce filing for urgent situations',
//             price: 'Starting at $2,500',
//             timeframe: '24-48 hours',
//             features: ['Emergency Filing', 'Temporary Orders', 'Immediate Hearing']
//         },
//         {
//             id: 2,
//             name: 'Business Formation Package',
//             category: 'business',
//             urgency: ['planned', 'consultation'],
//             description: 'Complete business setup with legal compliance',
//             price: 'Starting at $1,500',
//             timeframe: '1-2 weeks',
//             features: ['Entity Selection', 'Document Filing', 'Compliance Setup']
//         },
//         {
//             id: 3,
//             name: 'Criminal Defense Consultation',
//             category: 'litigation',
//             urgency: ['emergency', 'urgent'],
//             description: 'Immediate legal defense consultation',
//             price: 'Flat Fee $500',
//             timeframe: 'Same day',
//             features: ['Case Review', 'Strategy Session', 'Court Preparation']
//         },
//         {
//             id: 4,
//             name: 'Estate Planning Package',
//             category: 'family',
//             urgency: ['planned', 'consultation'],
//             description: 'Comprehensive will and trust planning',
//             price: 'Starting at $1,200',
//             timeframe: '2-3 weeks',
//             features: ['Will Drafting', 'Trust Setup', 'Healthcare Directives']
//         },
//         {
//             id: 5,
//             name: 'Real Estate Closing',
//             category: 'property',
//             urgency: ['urgent', 'planned'],
//             description: 'Complete real estate transaction support',
//             price: 'Starting at $1,000',
//             timeframe: '30-45 days',
//             features: ['Title Review', 'Closing Services', 'Document Preparation']
//         },
//         {
//             id: 6,
//             name: 'Immigration Visa Application',
//             category: 'immigration',
//             urgency: ['planned', 'consultation'],
//             description: 'Professional visa application assistance',
//             price: 'Starting at $2,000',
//             timeframe: '3-6 months',
//             features: ['Document Prep', 'Application Filing', 'Interview Coaching']
//         }
//     ];

//     const handleSelection = (step, value) => {
//         setUserSelections(prev => ({
//             ...prev,
//             [step]: value
//         }));

//         // Auto-advance to next step after selection
//         setTimeout(() => {
//             if (currentStep < 4) {
//                 setCurrentStep(currentStep + 1);
//             } else {
//                 // Find matching services when all steps are complete
//                 findMatchingServices({ ...userSelections, [step]: value });
//             }
//         }, 500);
//     };

//     const findMatchingServices = (selections) => {
//         const matches = serviceDatabase.filter(service => {
//             return service.category === selections.legalArea &&
//                 service.urgency.includes(selections.urgency);
//         });
//         setMatchedServices(matches);
//         setCurrentStep(5); // Results step
//     };

//     const resetWizard = () => {
//         setCurrentStep(1);
//         setUserSelections({
//             legalArea: '',
//             urgency: '',
//             situation: '',
//             budget: ''
//         });
//         setMatchedServices([]);
//     };

//     const getStepProgress = () => {
//         return (currentStep / 4) * 100;
//     };

//     return (
//         <div className="min-h-screen bg-[#f4f5f3]">
//             {/* Header */}
//             <div className="bg-white border-b border-[#7a5a21]/20">
//                 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                     <div className="text-center">
//                         <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#003a42] mb-4">
//                             Find Your Legal Solution
//                         </h1>
//                         <p className="text-xl text-[#1f1f1f]">
//                             Answer a few questions to discover the perfect legal service for your situation
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Progress Bar */}
//             <div className="bg-white border-b border-[#7a5a21]/10">
//                 <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="py-4">
//                         <div className="flex items-center justify-between mb-2">
//                             <span className="text-sm font-medium text-[#003a42]">
//                                 Step {currentStep} of 4
//                             </span>
//                             <span className="text-sm text-[#7a5a21]">
//                                 {getStepProgress().toFixed(0)}% Complete
//                             </span>
//                         </div>
//                         <div className="w-full bg-[#f4f5f3] rounded-full h-2">
//                             <div
//                                 className="bg-gradient-to-r from-[#006b63] to-[#7a5a21] h-2 rounded-full transition-all duration-500"
//                                 style={{ width: `${getStepProgress()}%` }}
//                             ></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Wizard Content */}
//             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 <div className="bg-white rounded-2xl shadow-sm border border-[#7a5a21]/10 p-8">

//                     {/* Step 1: Legal Area */}
//                     {currentStep === 1 && (
//                         <div className="text-center">
//                             <div className="text-4xl mb-6">⚖️</div>
//                             <h2 className="text-2xl font-bold text-[#003a42] mb-4">
//                                 What legal area do you need help with?
//                             </h2>
//                             <p className="text-[#1f1f1f] mb-8 max-w-2xl mx-auto">
//                                 Select the category that best matches your legal needs
//                             </p>

//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                                 {legalAreas.map(area => (
//                                     <button
//                                         key={area.id}
//                                         onClick={() => handleSelection('legalArea', area.id)}
//                                         className="p-6 border-2 border-[#7a5a21]/20 rounded-xl text-left hover:border-[#006b63] hover:shadow-md transition-all duration-200 group"
//                                     >
//                                         <div className="text-2xl mb-3">{area.icon}</div>
//                                         <h3 className="font-semibold text-[#003a42] mb-2 group-hover:text-[#006b63]">
//                                             {area.name}
//                                         </h3>
//                                         <p className="text-sm text-[#1f1f1f] opacity-75">
//                                             {area.description}
//                                         </p>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Step 2: Urgency */}
//                     {currentStep === 2 && (
//                         <div className="text-center">
//                             <div className="text-4xl mb-6">⏰</div>
//                             <h2 className="text-2xl font-bold text-[#003a42] mb-4">
//                                 How urgent is your legal matter?
//                             </h2>
//                             <p className="text-[#1f1f1f] mb-8 max-w-2xl mx-auto">
//                                 This helps us prioritize and schedule appropriately
//                             </p>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
//                                 {urgencyLevels.map(level => (
//                                     <button
//                                         key={level.id}
//                                         onClick={() => handleSelection('urgency', level.id)}
//                                         className="p-6 border-2 border-[#7a5a21]/20 rounded-xl text-left hover:border-[#006b63] hover:shadow-md transition-all duration-200 group"
//                                     >
//                                         <h3 className="font-semibold text-[#003a42] mb-2 group-hover:text-[#006b63]">
//                                             {level.name}
//                                         </h3>
//                                         <p className="text-sm text-[#1f1f1f] mb-3">
//                                             {level.description}
//                                         </p>
//                                         <div className="text-xs bg-[#f4f5f3] text-[#7a5a21] px-2 py-1 rounded-full inline-block">
//                                             {level.timeframe}
//                                         </div>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Step 3: Situation Details */}
//                     {currentStep === 3 && (
//                         <div className="text-center">
//                             <div className="text-4xl mb-6">📝</div>
//                             <h2 className="text-2xl font-bold text-[#003a42] mb-4">
//                                 Tell us about your situation
//                             </h2>
//                             <p className="text-[#1f1f1f] mb-8 max-w-2xl mx-auto">
//                                 Briefly describe what you need help with (optional)
//                             </p>

//                             <div className="max-w-2xl mx-auto">
//                                 <textarea
//                                     placeholder="For example: 'I need to start a new LLC for my consulting business' or 'I'm going through a divorce and need child custody agreement'"
//                                     rows={4}
//                                     className="w-full p-4 border border-[#7a5a21]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006b63] focus:border-transparent resize-none"
//                                     onChange={(e) => handleSelection('situation', e.target.value)}
//                                 />
//                                 <button
//                                     onClick={() => handleSelection('situation', 'skip')}
//                                     className="mt-4 text-[#7a5a21] hover:text-[#006b63] transition-colors duration-200"
//                                 >
//                                     Skip this step →
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* Step 4: Budget */}
//                     {currentStep === 4 && (
//                         <div className="text-center">
//                             <div className="text-4xl mb-6">💰</div>
//                             <h2 className="text-2xl font-bold text-[#003a42] mb-4">
//                                 What's your budget range?
//                             </h2>
//                             <p className="text-[#1f1f1f] mb-8 max-w-2xl mx-auto">
//                                 This helps us recommend the most suitable options
//                             </p>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
//                                 {[
//                                     { id: 'under-2k', name: 'Under $2,000', desc: 'Basic legal services' },
//                                     { id: '2k-5k', name: '$2,000 - $5,000', desc: 'Standard legal matters' },
//                                     { id: '5k-10k', name: '$5,000 - $10,000', desc: 'Complex cases' },
//                                     { id: '10k-plus', name: '$10,000+', desc: 'Major litigation/business' },
//                                     { id: 'consult', name: 'Consultation First', desc: 'Discuss fees later' },
//                                     { id: 'unknown', name: 'Not Sure', desc: 'Need guidance' }
//                                 ].map(budget => (
//                                     <button
//                                         key={budget.id}
//                                         onClick={() => handleSelection('budget', budget.id)}
//                                         className="p-4 border-2 border-[#7a5a21]/20 rounded-xl hover:border-[#006b63] hover:shadow-md transition-all duration-200 group text-center"
//                                     >
//                                         <h3 className="font-semibold text-[#003a42] mb-1 group-hover:text-[#006b63]">
//                                             {budget.name}
//                                         </h3>
//                                         <p className="text-xs text-[#1f1f1f] opacity-75">
//                                             {budget.desc}
//                                         </p>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Step 5: Results */}
//                     {currentStep === 5 && (
//                         <div>
//                             <div className="text-center mb-8">
//                                 <div className="text-4xl mb-4">🎯</div>
//                                 <h2 className="text-2xl font-bold text-[#003a42] mb-2">
//                                     Recommended Legal Services
//                                 </h2>
//                                 <p className="text-[#1f1f1f]">
//                                     Based on your needs, we recommend these services
//                                 </p>
//                             </div>

//                             {matchedServices.length > 0 ? (
//                                 <div className="grid gap-6 max-w-2xl mx-auto">
//                                     {matchedServices.map(service => (
//                                         <div key={service.id} className="border border-[#7a5a21]/20 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
//                                             <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                                                 <div className="flex-1">
//                                                     <h3 className="text-xl font-bold text-[#003a42] mb-2">
//                                                         {service.name}
//                                                     </h3>
//                                                     <p className="text-[#1f1f1f] mb-3">
//                                                         {service.description}
//                                                     </p>
//                                                     <div className="flex flex-wrap gap-2 mb-3">
//                                                         {service.features.map((feature, index) => (
//                                                             <span key={index} className="text-xs bg-[#f4f5f3] text-[#1f1f1f] px-2 py-1 rounded border border-[#7a5a21]/10">
//                                                                 {feature}
//                                                             </span>
//                                                         ))}
//                                                     </div>
//                                                     <div className="flex items-center gap-4 text-sm">
//                                                         <span className="text-[#006b63] font-semibold">{service.price}</span>
//                                                         <span className="text-[#7a5a21]">•</span>
//                                                         <span className="text-[#1f1f1f]">Timeline: {service.timeframe}</span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex gap-2">
//                                                     <button className="bg-[#003a42] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#002a32] transition-colors duration-200">
//                                                         Select
//                                                     </button>
//                                                     <button className="border border-[#7a5a21] text-[#7a5a21] px-4 py-2 rounded-lg font-semibold hover:bg-[#7a5a21] hover:text-white transition-colors duration-200">
//                                                         Learn More
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="text-center py-8">
//                                     <div className="text-6xl mb-4">🤔</div>
//                                     <h3 className="text-xl font-semibold text-[#003a42] mb-2">
//                                         No exact matches found
//                                     </h3>
//                                     <p className="text-[#1f1f1f] mb-6">
//                                         Let us help you find the right solution with a personalized consultation.
//                                     </p>
//                                     <button className="bg-[#006b63] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005a53] transition-colors duration-200">
//                                         Schedule Free Consultation
//                                     </button>
//                                 </div>
//                             )}

//                             <div className="text-center mt-8">
//                                 <button
//                                     onClick={resetWizard}
//                                     className="text-[#7a5a21] hover:text-[#006b63] transition-colors duration-200"
//                                 >
//                                     ← Start Over with New Search
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* Navigation Controls */}
//                     {currentStep > 1 && currentStep < 5 && (
//                         <div className="flex justify-between mt-8 pt-6 border-t border-[#7a5a21]/10">
//                             <button
//                                 onClick={() => setCurrentStep(currentStep - 1)}
//                                 className="text-[#7a5a21] hover:text-[#006b63] transition-colors duration-200 flex items-center"
//                             >
//                                 ← Previous Step
//                             </button>
//                             <button
//                                 onClick={resetWizard}
//                                 className="text-[#7a5a21] hover:text-[#006b63] transition-colors duration-200"
//                             >
//                                 Start Over
//                             </button>
//                         </div>
//                     )}
//                 </div>

//                 {/* Alternative Access */}
//                 <div className="text-center mt-8">
//                     <p className="text-[#1f1f1f] mb-4">
//                         Prefer to browse all services directly?
//                     </p>
//                     <button className="border border-[#003a42] text-[#003a42] px-6 py-2 rounded-lg font-semibold hover:bg-[#003a42] hover:text-white transition-colors duration-200">
//                         View Complete Service Directory
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LawServicesPage;

//****

// import React, { useState } from "react";

// /*
//   Law Services - React + Tailwind

//   Usage:
//   - Drop this single-file component into your React + Tailwind project (e.g. src/components/LawServices.jsx)
//   - Ensure Tailwind is configured and your global CSS contains the color variables below or keep the <style> block.
//   - Customize the `SERVICES` data structure to add/remove services and sub-services.

//   This component implements:
//   - Accordion for main services
//   - Grid cards for sub-services (responsive 1/2/3 columns)
//   - Accessible buttons (aria) and basic keyboard support
//   - Hover, focus and active states using the provided palette
// */

// // Example data structure
// const SERVICES = [
//     {
//         id: "corporate",
//         title: "Corporate Law",
//         description: "Advising businesses on formation, compliance, contracts and M&A.",
//         subs: [
//             { id: "incorporation", name: "Company Formation", desc: "Set up LLC/Joint Stock companies, articles of association.", time: "2–5 days" },
//             { id: "contracts", name: "Commercial Contracts", desc: "Drafting and reviewing supply, distribution and partnership agreements.", time: "1–3 days" },
//             { id: "mna", name: "Mergers & Acquisitions", desc: "Deal structuring, due diligence and documentation.", time: "Varies" }
//         ]
//     },
//     {
//         id: "family",
//         title: "Family Law",
//         description: "Custody, divorce, inheritance and family disputes handled with discretion.",
//         subs: [
//             { id: "divorce", name: "Divorce & Separation", desc: "Negotiation, mediation and court representation.", time: "Varies" },
//             { id: "custody", name: "Child Custody", desc: "Guardianship, visitation schedules and enforcement.", time: "Varies" },
//             { id: "inheritance", name: "Inheritance", desc: "Wills, estate planning and probate support.", time: "1–7 days" }
//         ]
//     },
//     {
//         id: "criminal",
//         title: "Criminal Defense",
//         description: "Protection of client rights at every stage of criminal proceedings.",
//         subs: [
//             { id: "defense", name: "Defense Representation", desc: "Court representation and plea negotiation.", time: "Immediate" },
//             { id: "investigation", name: "Investigations", desc: "Assistance during police investigations and evidence review.", time: "Ongoing" }
//         ]
//     }
// ];

// export default function LawServices() {
//     const [openId, setOpenId] = useState(SERVICES[0]?.id || null);

//     const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

//     return (
//         <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-12" style={{ backgroundColor: "var(--color-bg)" }}>
//             {/* Palette styles (you can move these to global CSS) */}
//             <style>{`
//         :root{
//           --color-primary: #003a42;
//           --color-secondary: #7a5a21;
//           --color-accent: #006b63;
//           --color-bg: #f4f5f3;
//           --color-text: #1f1f1f;
//         }
//         .btn-primary{ background-color: var(--color-primary); }
//         .btn-primary:hover{ background-color: color-mix(in srgb, var(--color-primary) 85%, black 15%); }
//         .btn-secondary{ background-color: transparent; border: 1px solid var(--color-secondary); }
//       `}</style>

//             <div className="max-w-6xl mx-auto">
//                 <header className="mb-8">
//                     <h1 className="text-3xl sm:text-4xl font-semibold" style={{ color: "var(--color-text)" }}>
//                         Law Services
//                     </h1>
//                     <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">Professional legal services tailored to your needs. Choose a service category to explore sub-services and request assistance.</p>
//                 </header>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Left column: Accordion list */}
//                     <div className="lg:col-span-1">
//                         <div className="space-y-3">
//                             {SERVICES.map((s) => (
//                                 <button
//                                     key={s.id}
//                                     onClick={() => toggle(s.id)}
//                                     className={`w-full text-left p-4 rounded-2xl shadow-md transition-shadow focus:outline-none focus:ring-4`}
//                                     style={{ backgroundColor: openId === s.id ? 'white' : 'transparent', border: '1px solid rgba(0,0,0,0.06)' }}
//                                     aria-expanded={openId === s.id}
//                                 >
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <div className="font-medium" style={{ color: 'var(--color-primary)' }}>{s.title}</div>
//                                             <div className="text-xs text-gray-500 mt-1 hidden sm:block">{s.description}</div>
//                                         </div>
//                                         <div className={`ml-4 transform transition-transform ${openId === s.id ? 'rotate-180' : 'rotate-0'}`}>
//                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
//                                         </div>
//                                     </div>
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Right column: Details / cards */}
//                     <div className="lg:col-span-2">
//                         {SERVICES.map((s) => (
//                             <section key={s.id} className={`${openId === s.id ? '' : 'hidden'}`} aria-hidden={openId !== s.id}>
//                                 <div className="mb-6 flex items-center justify-between">
//                                     <div>
//                                         <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-primary)' }}>{s.title}</h2>
//                                         <p className="text-sm text-gray-600 mt-1">{s.description}</p>
//                                     </div>
//                                     <div className="hidden sm:flex items-center gap-3">
//                                         <button className="px-4 py-2 rounded-xl text-white btn-primary shadow-sm hover:opacity-95 focus:ring-2 focus:ring-offset-2" aria-label={`Request ${s.title}`}>
//                                             Request Service
//                                         </button>
//                                         <button className="px-3 py-2 rounded-xl text-sm border border-gray-300" aria-label={`Contact for ${s.title}`}>
//                                             Contact
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                                     {s.subs.map((sub) => (
//                                         <article key={sub.id} className="p-4 rounded-2xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1 bg-white" style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
//                                             <div className="flex flex-col h-full">
//                                                 <div className="flex-1">
//                                                     <h3 className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>{sub.name}</h3>
//                                                     <p className="mt-2 text-sm text-gray-600">{sub.desc}</p>
//                                                 </div>

//                                                 <div className="mt-4 flex items-center justify-between">
//                                                     <span className="text-xs text-gray-500">Est. {sub.time}</span>
//                                                     <button className="px-3 py-2 rounded-xl text-white btn-primary shadow-sm focus:ring-2 focus:ring-offset-1" aria-label={`Request ${sub.name}`}>
//                                                         Request Service
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </article>
//                                     ))}
//                                 </div>

//                                 {/* Mobile sticky CTA */}
//                                 <div className="fixed bottom-4 left-4 right-4 sm:hidden">
//                                     <div className="flex gap-3">
//                                         <button className="flex-1 py-3 rounded-2xl text-white btn-primary shadow-lg">Request {s.title}</button>
//                                         <button className="px-4 py-3 rounded-2xl border border-gray-300">Contact</button>
//                                     </div>
//                                 </div>

//                             </section>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Small print / notes */}
//                 <div className="mt-8 text-xs text-gray-500">Tip: Use the Request buttons to open your preferred booking modal or link to a contact form. Keep CTA flows consistent across the site.</div>
//             </div>
//         </div>
//     );
// }


// ***************

import React, { useState, useMemo } from 'react';

// Expanded data with many categories
const SERVICES = [
    {
        id: "corporate",
        title: "Corporate Law",
        description: "Business formation, compliance, contracts and M&A",
        icon: "🏢",
        category: "business",
        featured: true,
        subs: [
            { id: "incorporation", name: "Company Formation", desc: "Set up LLC/Joint Stock companies", time: "2–5 days", popular: true },
            { id: "contracts", name: "Commercial Contracts", desc: "Drafting and reviewing agreements", time: "1–3 days", popular: false },
            { id: "mna", name: "Mergers & Acquisitions", desc: "Deal structuring and due diligence", time: "Varies", popular: true },
        ]
    },
    {
        id: "family",
        title: "Family Law",
        description: "Custody, divorce, inheritance and family disputes",
        icon: "👨‍👩‍👧‍👦",
        category: "personal",
        featured: true,
        subs: [
            { id: "divorce", name: "Divorce & Separation", desc: "Negotiation and court representation", time: "Varies", popular: true },
            { id: "custody", name: "Child Custody", desc: "Guardianship and visitation schedules", time: "Varies", popular: true },
        ]
    },
    {
        id: "criminal",
        title: "Criminal Defense",
        description: "Protection of client rights in criminal proceedings",
        icon: "🛡️",
        category: "litigation",
        featured: true,
        subs: [
            { id: "defense", name: "Defense Representation", desc: "Court representation", time: "Immediate", popular: true },
            { id: "investigation", name: "Investigations", desc: "Evidence review", time: "Ongoing", popular: false },
        ]
    },
    {
        id: "real-estate",
        title: "Real Estate Law",
        description: "Property transactions and real estate disputes",
        icon: "🏠",
        category: "property",
        featured: false,
        subs: [
            { id: "transactions", name: "Property Transactions", desc: "Purchase and sale of properties", time: "30–45 days", popular: true },
        ]
    },
    {
        id: "immigration",
        title: "Immigration Law",
        description: "Visas, green cards, and citizenship processes",
        icon: "🌎",
        category: "international",
        featured: false,
        subs: [
            { id: "visas", name: "Visa Applications", desc: "Work and family visa processing", time: "3–9 months", popular: true },
        ]
    },
    {
        id: "employment",
        title: "Employment Law",
        description: "Workplace legal matters for employers and employees",
        icon: "💼",
        category: "business",
        featured: false,
        subs: [
            { id: "contracts", name: "Employment Contracts", desc: "Drafting and review", time: "1–2 weeks", popular: false },
        ]
    },
    {
        id: "intellectual-property",
        title: "Intellectual Property",
        description: "Trademarks, patents, copyrights protection",
        icon: "💡",
        category: "business",
        featured: false,
        subs: [
            { id: "trademarks", name: "Trademark Registration", desc: "Brand protection services", time: "6–12 months", popular: true },
        ]
    },
    {
        id: "tax",
        title: "Tax Law",
        description: "Tax planning and controversy resolution",
        icon: "💰",
        category: "financial",
        featured: false,
        subs: [
            { id: "planning", name: "Tax Planning", desc: "Strategic tax optimization", time: "2–4 weeks", popular: false },
        ]
    },
    {
        id: "bankruptcy",
        title: "Bankruptcy Law",
        description: "Debt relief and financial restructuring",
        icon: "📊",
        category: "financial",
        featured: false,
        subs: [
            { id: "chapter7", name: "Chapter 7 Bankruptcy", desc: "Liquidation proceedings", time: "3–6 months", popular: true },
        ]
    },
    {
        id: "personal-injury",
        title: "Personal Injury",
        description: "Compensation for injuries from accidents",
        icon: "🚑",
        category: "litigation",
        featured: true,
        subs: [
            { id: "accidents", name: "Accident Claims", desc: "Car and workplace injuries", time: "6–18 months", popular: true },
        ]
    },
    {
        id: "estate-planning",
        title: "Estate Planning",
        description: "Wills, trusts, and estate administration",
        icon: "📝",
        category: "personal",
        featured: false,
        subs: [
            { id: "wills", name: "Will Drafting", desc: "Comprehensive will creation", time: "2–4 weeks", popular: true },
        ]
    },
    {
        id: "environmental",
        title: "Environmental Law",
        description: "Compliance and litigation for environmental regulations",
        icon: "🌳",
        category: "specialized",
        featured: false,
        subs: [
            { id: "compliance", name: "Regulatory Compliance", desc: "Environmental regulation adherence", time: "1–3 months", popular: false },
        ]
    },
    {
        id: "healthcare",
        title: "Healthcare Law",
        description: "Medical practice and healthcare compliance",
        icon: "🏥",
        category: "specialized",
        featured: false,
        subs: [
            { id: "compliance", name: "HIPAA Compliance", desc: "Healthcare privacy regulations", time: "2–4 weeks", popular: true },
        ]
    },
    {
        id: "technology",
        title: "Technology Law",
        description: "IT contracts, data privacy, and tech compliance",
        icon: "💻",
        category: "business",
        featured: false,
        subs: [
            { id: "privacy", name: "Data Privacy", desc: "GDPR and data protection", time: "1–2 months", popular: true },
        ]
    },
    {
        id: "maritime",
        title: "Maritime Law",
        description: "Shipping, cargo, and maritime disputes",
        icon: "⚓",
        category: "specialized",
        featured: false,
        subs: [
            { id: "shipping", name: "Shipping Disputes", desc: "Cargo and vessel legal issues", time: "Varies", popular: false },
        ]
    },
    {
        id: "entertainment",
        title: "Entertainment Law",
        description: "Media, arts, and entertainment contracts",
        icon: "🎬",
        category: "specialized",
        featured: false,
        subs: [
            { id: "contracts", name: "Artist Contracts", desc: "Performance and recording agreements", time: "2–4 weeks", popular: true },
        ]
    }
];

const CATEGORIES = [
    { id: 'all', name: 'All Services', count: SERVICES.length },
    { id: 'business', name: 'Business', count: SERVICES.filter(s => s.category === 'business').length },
    { id: 'personal', name: 'Personal', count: SERVICES.filter(s => s.category === 'personal').length },
    { id: 'litigation', name: 'Litigation', count: SERVICES.filter(s => s.category === 'litigation').length },
    { id: 'property', name: 'Property', count: SERVICES.filter(s => s.category === 'property').length },
    { id: 'international', name: 'International', count: SERVICES.filter(s => s.category === 'international').length },
    { id: 'financial', name: 'Financial', count: SERVICES.filter(s => s.category === 'financial').length },
    { id: 'specialized', name: 'Specialized', count: SERVICES.filter(s => s.category === 'specialized').length }
];

export default function LawServicesManyCategories() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [expandedServices, setExpandedServices] = useState(new Set([SERVICES[0]?.id]));

    const filteredServices = useMemo(() => {
        return SERVICES.filter(service => {
            const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
            const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.subs.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchTerm]);

    const toggleService = (serviceId) => {
        setExpandedServices(prev => {
            const newSet = new Set(prev);
            if (newSet.has(serviceId)) {
                newSet.delete(serviceId);
            } else {
                newSet.add(serviceId);
            }
            return newSet;
        });
    };

    const featuredServices = SERVICES.filter(service => service.featured);

    return (
        <div className="min-h-screen bg-[#f4f5f3]">
            {/* Header */}
            <div className="bg-gradient-to-br from-[#003a42] via-[#006b63] to-[#003a42] text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        Legal Services
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto mb-8 leading-relaxed">
                        Comprehensive legal expertise across {SERVICES.length} practice areas.
                        Find the specialized counsel you need for your unique situation.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search legal services..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-4 rounded-2xl text-[#1f1f1f] focus:outline-none focus:ring-4 focus:ring-[#7a5a21] focus:ring-opacity-50 shadow-lg"
                            />
                            <svg className="w-6 h-6 text-[#7a5a21] absolute right-6 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-2xl font-bold">{SERVICES.length}+</div>
                            <div className="text-sm opacity-80">Practice Areas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">{SERVICES.flatMap(s => s.subs).length}+</div>
                            <div className="text-sm opacity-80">Specialized Services</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">24/7</div>
                            <div className="text-sm opacity-80">Emergency Support</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold">50+</div>
                            <div className="text-sm opacity-80">Legal Experts</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Controls Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-[#003a42]">
                            {activeCategory === 'all' ? 'All Legal Services' : `${CATEGORIES.find(c => c.id === activeCategory)?.name} Services`}
                        </h2>
                        <span className="bg-[#f4f5f3] text-[#7a5a21] px-3 py-1 rounded-full text-sm font-medium">
                            {filteredServices.length} services
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* View Toggle */}
                        <div className="flex bg-white rounded-lg border border-[#7a5a21]/20 p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#003a42] text-white' : 'text-[#1f1f1f]'}`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#003a42] text-white' : 'text-[#1f1f1f]'}`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Categories Sidebar */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-[#7a5a21]/10 sticky top-8">
                            <div className="p-4 border-b border-[#7a5a21]/10">
                                <h3 className="font-semibold text-[#003a42]">Categories</h3>
                            </div>
                            <nav className="p-2">
                                {CATEGORIES.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${activeCategory === category.id
                                                ? 'bg-[#003a42] text-white shadow-md'
                                                : 'text-[#1f1f1f] hover:bg-[#f4f5f3] hover:text-[#003a42]'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{category.name}</span>
                                            <span className={`text-sm ${activeCategory === category.id ? 'text-white/80' : 'text-[#7a5a21]'
                                                }`}>
                                                {category.count}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Quick Contact */}
                        <div className="mt-6 bg-gradient-to-br from-[#003a42] to-[#006b63] rounded-xl p-6 text-white text-center">
                            <h3 className="font-semibold mb-3">Need Immediate Help?</h3>
                            <p className="text-sm opacity-90 mb-4">24/7 emergency legal support</p>
                            <button className="w-full bg-[#7a5a21] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#6a4a19] transition-colors duration-200 mb-2">
                                Emergency Contact
                            </button>
                            <div className="text-xs opacity-75">Call: (555) 123-HELP</div>
                        </div>
                    </div>

                    {/* Services Content */}
                    <div className="flex-1">
                        {filteredServices.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-xl">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-[#003a42] mb-2">No services found</h3>
                                <p className="text-[#1f1f1f] mb-6">Try adjusting your search or filter criteria</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                                    className="bg-[#003a42] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#002a32] transition-colors duration-200"
                                >
                                    View All Services
                                </button>
                            </div>
                        ) : viewMode === 'grid' ? (
                            /* Grid View */
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredServices.map(service => (
                                    <div key={service.id} className="bg-white rounded-xl shadow-sm border border-[#7a5a21]/10 hover:shadow-lg transition-all duration-300">
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="text-3xl">{service.icon}</div>
                                                {service.featured && (
                                                    <span className="text-xs bg-[#006b63] text-white px-2 py-1 rounded-full">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-semibold text-[#003a42] mb-2">
                                                {service.title}
                                            </h3>

                                            <p className="text-[#1f1f1f] text-sm mb-4 leading-relaxed">
                                                {service.description}
                                            </p>

                                            <div className="space-y-2 mb-4">
                                                {service.subs.slice(0, 3).map((sub, index) => (
                                                    <div key={index} className="flex items-center text-sm text-[#1f1f1f]">
                                                        <svg className="w-4 h-4 text-[#006b63] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="truncate">{sub.name}</span>
                                                    </div>
                                                ))}
                                                {service.subs.length > 3 && (
                                                    <div className="text-sm text-[#7a5a21] font-medium">
                                                        +{service.subs.length - 3} more services
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex space-x-2 pt-4 border-t border-[#7a5a21]/10">
                                                <button className="flex-1 bg-[#003a42] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[#002a32] transition-colors duration-200">
                                                    Learn More
                                                </button>
                                                <button className="flex-1 border border-[#7a5a21] text-[#7a5a21] py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[#7a5a21] hover:text-white transition-colors duration-200">
                                                    Contact
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* List View */
                            <div className="space-y-4">
                                {filteredServices.map(service => (
                                    <div key={service.id} className="bg-white rounded-xl shadow-sm border border-[#7a5a21]/10 hover:shadow-md transition-shadow duration-300">
                                        <button
                                            onClick={() => toggleService(service.id)}
                                            className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#006b63] focus:ring-opacity-50"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-2xl">{service.icon}</div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-[#003a42]">
                                                            {service.title}
                                                        </h3>
                                                        <p className="text-sm text-[#1f1f1f] mt-1">
                                                            {service.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    {service.featured && (
                                                        <span className="text-xs bg-[#006b63] text-white px-2 py-1 rounded-full">
                                                            Featured
                                                        </span>
                                                    )}
                                                    <span className="text-sm text-[#7a5a21]">
                                                        {service.subs.length} services
                                                    </span>
                                                    <svg
                                                        className={`w-5 h-5 text-[#7a5a21] transition-transform duration-300 ${expandedServices.has(service.id) ? 'rotate-180' : ''
                                                            }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </button>

                                        {expandedServices.has(service.id) && (
                                            <div className="px-6 pb-6 border-t border-[#7a5a21]/10 pt-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {service.subs.map((sub, index) => (
                                                        <div key={index} className="bg-[#f4f5f3] rounded-lg p-4">
                                                            <div className="flex items-start justify-between mb-2">
                                                                <h4 className="font-semibold text-[#003a42]">{sub.name}</h4>
                                                                {sub.popular && (
                                                                    <span className="text-xs bg-[#7a5a21] text-white px-2 py-1 rounded-full">
                                                                        Popular
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-[#1f1f1f] mb-3">{sub.desc}</p>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs text-[#7a5a21]">Est. {sub.time}</span>
                                                                <button className="text-sm bg-[#003a42] text-white px-3 py-1 rounded hover:bg-[#002a32] transition-colors duration-200">
                                                                    Request
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}