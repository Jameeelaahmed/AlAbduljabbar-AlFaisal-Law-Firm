import { useTranslation } from 'react-i18next';
import { useState, useMemo, useEffect, useRef } from 'react';
// lucide icons
import { Search, MapPin, Menu, Check, FileText, ArrowRight } from 'lucide-react';
// hooks
import { useAllCategories } from '../../../hooks/useCategories';
import { useGetServicesByCategoryId } from '../../../hooks/useServices';
// components
import Modal from '../../../components/ClientComponents/Modals/Modal';
import RequestService from '../../../components/ClientComponents/Modals/RequestService/RequestService';
export default function LawServicesManyCategories() {
    const { t } = useTranslation();
    const { data: allCategories = [] } = useAllCategories();
    const [branch, setBranch] = useState(1);
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { data: services = [] } = useGetServicesByCategoryId(activeCategory);
    const requestService = useRef();
    const [service, setService] = useState({})

    function handleOpenRequestService(serviceId, serviceName) {
        requestService.current.open();
        setService({ serviceId, serviceName })
    }

    function handleCloseRequestService() {
        requestService.current.close();
    }
    // compute categories visible for the selected branch
    const visibleCategories = useMemo(() => {
        return allCategories.filter(cat => cat.branchId === branch || cat.branchId === 3);
    }, [allCategories, branch]);

    const visibleCategoryIds = useMemo(() => {
        return new Set(visibleCategories.map(c => String(c.id)));
    }, [visibleCategories]);

    // ensure activeCategory is set once categories load or branch changes
    useEffect(() => {
        if (!visibleCategories || visibleCategories.length === 0) {
            setActiveCategory(null);
            return;
        }
        setActiveCategory(prev => {
            if (prev && visibleCategoryIds.has(String(prev))) return prev;
            return visibleCategories[0].id;
        });
    }, [visibleCategories, visibleCategoryIds]);

    const handleBranchChange = (val) => {
        setBranch(val);
        setActiveCategory(prev => (prev === 'all' || visibleCategoryIds.has(prev) ? 'all' : 'all'));
    };

    const filteredServices = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        const matchesSearch = (svc) => {
            if (!term) return true;
            if (svc.name?.toLowerCase().includes(term)) return true;
            const subs = Array.isArray(svc.subs) ? svc.subs : [];
            if (subs.some(s => (s.name || '').toLowerCase().includes(term))) return true;
            return false;
        };

        return (services || [])
            .filter(svc => {
                if (!visibleCategoryIds.has(String(svc.categoryId))) return false;
                if (activeCategory && String(svc.categoryId) !== String(activeCategory)) return false;
                return matchesSearch(svc);
            });
    }, [services, activeCategory, searchTerm, visibleCategoryIds]);

    const currentCategory = allCategories.find(c => c.id === activeCategory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Enhanced Header */}
            <div className="bg-gradient-to-br from-[#003a42] via-[#006b63] to-[#003a42] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:20px_20px]"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                        <span className="w-2 h-2 bg-[#7a5a21] rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium">{t("Legal Services")}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                        {t("Legal Services")}
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
                        {t("Comprehensive legal expertise across practice areas. Find the specialized counsel you need for your unique situation.")}
                    </p>

                    {/* Enhanced Search Bar */}
                    <div className="max-w-3xl mx-auto mb-8">
                        <div className="relative group">
                            <div className="absolute -inset-1 ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-[#7a5a21] to-[#006b63] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder={t("Search legal services, expertise, or practice areas...")}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-8 py-5 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-[#7a5a21] focus:ring-opacity-50 shadow-2xl text-lg placeholder-white"
                                />
                                <Search className="w-7 h-7 text-[#7a5a21] absolute ltr:right-8 rtl:left-8 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </div>
                        {searchTerm && (
                            <div className="text-center mt-4">
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="text-white/80 cursor-pointer hover:text-white text-sm font-medium inline-flex items-center gap-2 transition-colors"
                                >
                                    {t("Clear search")}
                                    <span className="bg-white/20 rounded-full px-2 py-1 text-xs">{t("ESC")}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
                {/* Enhanced Controls Bar */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Branch Filter */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                                <MapPin className="w-5 h-5 text-[#003a42]" />
                                <label className="text-sm font-semibold text-[#003a42]">{t("Office Location")}</label>
                                <select
                                    value={branch}
                                    onChange={(e) => handleBranchChange(Number(e.target.value))}
                                    className="px-4 py-2 rounded-lg border-0 bg-white shadow-sm focus:ring-2 focus:ring-[#7a5a21] focus:border-transparent font-medium"
                                >
                                    <option value={1}>{t("Cairo")}</option>
                                    <option value={2}>{t("Saudi Arabia")}</option>
                                </select>
                            </div>
                        </div>

                        {/* Results Info */}
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-[#003a42] font-serif">
                                    {currentCategory?.name}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {currentCategory?.description}
                                </p>
                            </div>
                            <div className="ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-[#003a42] to-[#006b63] text-white px-4 py-3 rounded-xl shadow-lg">
                                <span className="font-bold text-lg">{filteredServices.length}</span>
                                <span className="text-sm font-medium ltr:ml-1 rtl:mr-1">{t("services available")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-96 flex-shrink-0"> {/* Increased width */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 sticky top-8 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#003a42] to-[#006b63] text-white">
                                <h3 className="font-bold text-lg flex items-center gap-3 mb-2">
                                    <Menu className="w-5 h-5" />
                                    {t("Practice Areas")} ({visibleCategories.length})
                                </h3>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="bg-white/10 rounded p-2 text-center">
                                        <div className="font-bold">{visibleCategories.filter(c => c.branchId === branch).length}</div>
                                        <div className="opacity-80">{t("Branch Specific")}</div>
                                    </div>
                                    <div className="bg-white/10 rounded p-2 text-center">
                                        <div className="font-bold">{visibleCategories.filter(c => c.branchId === 3).length}</div>
                                        <div className="opacity-80">{t("Both Branches")}</div>
                                    </div>
                                </div>
                            </div>

                            <nav className="p-4 max-h-[600px] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-2">
                                    {visibleCategories?.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.id)}
                                            className={`p-3 rounded-xl cursor-pointer transition-all duration-200 group ltr:text-left rtl:text-right ${activeCategory === category.id
                                                ? 'ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-[#003a42] to-[#006b63] text-white shadow-lg'
                                                : 'text-gray-700 hover:bg-gray-50 hover:shadow-md border border-transparent hover:border-gray-200'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between mb-1">
                                                <span className={`text-xs font-semibold ${category.branchId === 3
                                                    ? 'text-[#7a5a21]'
                                                    : 'text-[#006b63]'
                                                    }`}>
                                                    {category.branchId === 3 ? t('Both') : branch === 1 ? t('Cairo') : t('KSA')}
                                                </span>
                                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeCategory === category.id
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {category.count}
                                                </span>
                                            </div>
                                            <span className="font-medium text-sm block leading-tight">
                                                {category.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Enhanced Services Content */}
                    <div className="flex-1">
                        {filteredServices.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-xl border border-gray-200">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t("No services found")}</h3>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                    {t("We couldn't find any services matching your search criteria. Try adjusting your search terms or browse all categories.")}                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="bg-[#003a42] cursor-pointer text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#002a32] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        {t("Clear Search")}
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory(visibleCategories[0]?.id ?? null)}
                                        className="border-2 border-[#003a42] cursor-pointer text-[#003a42] px-8 py-3 rounded-xl font-semibold hover:bg-[#003a42] hover:text-white transition-all duration-200"
                                    >
                                        {t("View All Services")}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Enhanced Grid View */
                            // In your Services Content section, replace the grid with:
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 auto-rows-fr">
                                {filteredServices.map(service => {
                                    const subs = Array.isArray(service.subs) ? service.subs : [];
                                    return (
                                        <div
                                            key={service.id}
                                            className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 group overflow-hidden flex flex-col h-full"
                                        >
                                            <div className="p-6 flex-1 flex flex-col">
                                                {/* Header */}
                                                <div className="flex items-start justify-between mb-4">
                                                    <h3 className="text-xl font-bold text-[#003a42] group-hover:text-[#006b63] transition-colors duration-300 leading-tight line-clamp-2 min-h-[3rem]">
                                                        {service.name}
                                                    </h3>
                                                </div>

                                                {/* Services List - Flexible height */}
                                                <div className="space-y-3 mb-6 flex-1">
                                                    {subs.slice(0, 4).map((sub, idx) => (
                                                        <div key={idx} className="flex items-center text-sm text-gray-700 group/item hover:text-[#003a42] transition-colors duration-200">
                                                            <div className="w-2 h-2 bg-[#006b63] rounded-full ltr:mr-3 rtl:ml-3 group-hover/item:scale-150 transition-transform duration-200"></div>
                                                            <span className="flex-1 line-clamp-1">{sub.name || sub.title || 'Legal Service'}</span>
                                                        </div>
                                                    ))}
                                                    {subs.length > 4 && (
                                                        <div className="text-sm text-[#7a5a21] font-semibold bg-[#7a5a21]/5 rounded-lg px-3 py-2 text-center">
                                                            +{subs.length - 4} {t("additional services")}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex gap-3 pt-5 border-t border-gray-200 mt-auto">
                                                    <button onClick={() => handleOpenRequestService(service.id, service.name)} className="flex-1 cursor-pointer ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-[#003a42] to-[#006b63] text-white py-3 px-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 group/btn">
                                                        <span className="flex items-center justify-center gap-2 ltr:flex-row rtl:flex-row-reverse">
                                                            <span className="ltr:order-1 rtl:order-2">{t("Request Service")}</span>
                                                            <ArrowRight className="w-4 h-4 text-white ltr:ml-1 rtl:mr-1 transition-transform duration-200 ltr:group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 ltr:rotate-0 rtl:rotate-180" />
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <Modal title={t("Request Service")} onClose={() => handleCloseRequestService()} ref={requestService}>
                                    <RequestService onClose={() => handleCloseRequestService()} service={service} />
                                </Modal>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}