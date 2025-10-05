import { Trash, ChevronDown, Plus } from "lucide-react"

function ServiceItemPresentational({ isChecked, setIsChecked, isExpanded, setIsExpanded }) {
    return (
        <div className="group">
            <div className={`flex justify-between items-center p-4 md:p-6 cursor-pointer transition-all duration-300 ${isExpanded
                ? 'bg-primary text-white'
                : 'hover:bg-primary hover:text-white'
                }`} onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex flex-col gap-1">
                    <p className={`font-semibold text-base md:text-lg lg:text-xl transition-colors ${isExpanded ? 'text-white' : 'group-hover:text-white'
                        }`}>الملكيه الفكريه</p>
                    <span className={`text-xs md:text-sm transition-colors ${isExpanded
                        ? 'text-white/80'
                        : 'text-secondary group-hover:text-white/80'
                        }`}>3 خدمات فرعيه</span>
                </div>

                <div className="flex justify-around gap-2 md:gap-4 lg:gap-6 items-center">
                    {/* Egypt Toggle */}
                    <div className="flex items-center gap-2">
                        <span className={`text-sm md:text-base font-medium transition-colors ${isExpanded ? 'text-white' : 'group-hover:text-white'
                            }`}>مصر</span>
                        <label
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsChecked(!isChecked);
                            }}
                            className={`relative inline-flex items-center w-10 h-6 md:w-12 md:h-7 rounded-full cursor-pointer transition-colors duration-200 ${isChecked
                                ? (isExpanded ? "bg-white/20" : "bg-primary group-hover:bg-white/20")
                                : (isExpanded ? "bg-white/20" : "bg-gray-600 group-hover:bg-white/20")
                                }`}
                        >
                            <span
                                className={`absolute left-1 top-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-white border-2 border-white shadow-md transform transition-transform duration-200 ${isChecked ? "translate-x-4 md:translate-x-5" : "translate-x-0"
                                    }`}
                            ></span>
                        </label>
                    </div>

                    {/* Saudi Arabia Toggle */}
                    <div className="flex items-center gap-2">
                        <span className={`text-sm md:text-base font-medium transition-colors ${isExpanded ? 'text-white' : 'group-hover:text-white'
                            }`}>السعوديه</span>
                        <label
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsChecked(!isChecked);
                            }}
                            className={`relative inline-flex items-center w-10 h-6 md:w-12 md:h-7 rounded-full cursor-pointer transition-colors duration-200 ${isChecked
                                ? (isExpanded ? "bg-white/20" : "bg-primary group-hover:bg-white/20")
                                : (isExpanded ? "bg-white/20" : "bg-gray-600 group-hover:bg-white/20")
                                }`}
                        >
                            <span
                                className={`absolute left-1 top-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-white border-2 border-white shadow-md transform transition-transform duration-200 ${isChecked ? "translate-x-4 md:translate-x-5" : "translate-x-0"
                                    }`}
                            ></span>
                        </label>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-1 md:gap-2">
                        <button className={`p-1.5 md:p-2 rounded-lg transition-all duration-200 ${isExpanded
                            ? 'hover:bg-white/20'
                            : 'hover:bg-secondary/10 group-hover:hover:bg-white/20'
                            }`}>
                            <Plus className={`w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 transition-colors ${isExpanded
                                ? 'text-white'
                                : 'text-primary group-hover:text-white'
                                }`} />
                        </button>
                        <button className={`p-1.5 md:p-2 rounded-lg transition-all duration-200 ${isExpanded
                            ? 'hover:bg-white/20'
                            : 'hover:bg-red-50 group-hover:hover:bg-white/20'
                            }`}>
                            <Trash className={`w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5  transition-colors text-denied`} />
                        </button>

                        <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-300 ${isExpanded
                            ? 'rotate-180 text-white'
                            : 'text-primary group-hover:text-white'
                            }`} />
                    </div>
                </div>
            </div>

            {/* Expanded Content with Dynamic Height Animation */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <ul className="overflow-hidden">
                    <li className="bg-gray-50 group-hover:bg-primary/5 border-t border-gray-200">
                        {/* This would be your dynamic content from API */}
                        <div className="flex justify-between items-center p-4 md:p-6 lg:p-8 ml-4 md:ml-8 border-l-2 border-primary/20">
                            <p className="text-sm md:text-base lg:text-lg font-medium text-gray-700 group-hover:text-primary">
                                تسجيل العلامات التجاريه
                            </p>
                            <div className="flex items-center gap-1 md:gap-2">
                                <button className="p-1.5 md:p-2 hover:bg-secondary/10 rounded-lg transition-all duration-200">
                                    <Plus className="w-3 h-3 md:w-4 md:h-4 text-primary hover:text-secondary" />
                                </button>
                                <button className="p-1.5 md:p-2 hover:bg-red-50 rounded-lg transition-all duration-200">
                                    <Trash className="w-3 h-3 md:w-4 md:h-4 text-denied hover:text-red-600" />
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ServiceItemPresentational
