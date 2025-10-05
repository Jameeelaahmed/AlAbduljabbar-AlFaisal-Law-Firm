function HeadlinePresentational({ headlineLabel, buttonLabel, buttonIcon }) {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-primary text-2xl font-bold mb-4">{headlineLabel}</h1>
            {buttonLabel &&
                <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/80 cursor-pointer">
                    <span className="text-xl">{buttonIcon}</span> <span> {buttonLabel} </span>
                </button>
            }
        </div>
    )
}

export default HeadlinePresentational
