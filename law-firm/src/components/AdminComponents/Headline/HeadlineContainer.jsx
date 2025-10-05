
import HeadlinePresentational from './HeadlinePresentational'
function HeadlineContainer({ headlineLabel, buttonLabel = "", buttonIcon = "" }) {
    return (
        <>
            <HeadlinePresentational headlineLabel={headlineLabel} buttonLabel={buttonLabel} buttonIcon={buttonIcon} />
        </>
    )
}

export default HeadlineContainer
