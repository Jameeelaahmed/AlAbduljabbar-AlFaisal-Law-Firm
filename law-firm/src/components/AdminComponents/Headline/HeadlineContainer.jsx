
import HeadlinePresentational from './HeadlinePresentational'
function HeadlineContainer({ headlineLabel, buttonLabel = "", buttonIcon = "", handleOpenCategoryModal }) {
    return (
        <>
            <HeadlinePresentational headlineLabel={headlineLabel} buttonLabel={buttonLabel} buttonIcon={buttonIcon} handleOpenCategoryModal={handleOpenCategoryModal} />
        </>
    )
}

export default HeadlineContainer
