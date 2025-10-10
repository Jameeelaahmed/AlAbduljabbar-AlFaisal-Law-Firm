function HeadlinePresentational({ headlineLabel, buttonLabel, buttonIcon, handleOpenCategoryModal }) {
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h1 className="text-primary text-xl sm:text-2xl font-bold">{headlineLabel}</h1>
            {buttonLabel &&
                <button onClick={() => handleOpenCategoryModal()} className="bg-primary text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/80 cursor-pointer transition-colors text-sm sm:text-base w-full sm:w-auto">
                    <span className="text-lg sm:text-xl">{buttonIcon}</span>
                    <span className="whitespace-nowrap">{buttonLabel}</span>
                </button>
            }
        </div>
    )
}

export default HeadlinePresentational
