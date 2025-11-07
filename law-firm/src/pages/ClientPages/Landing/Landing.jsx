import Hero from "../../../components/ClientComponents/Hero/Hero"
import OurCompany from "../../../components/ClientComponents/OurCompany/OurCompany"
import ClientOpinions from '../../../components/ClientComponents/ClientOpinions/ClientOpinions'
import OurVision from "../../../components/ClientComponents/OurVision/OurVision"
import OurOffices from '../../../components/ClientComponents/OurOffices/OurOffices'
import OurServices from "../../../components/ClientComponents/OurServices/OurServices"
import OurTeam from "../../../components/ClientComponents/OurTeam/OurTeam"
import { useHomePage } from "../../../hooks/useHomePage"
import Loading from "../../../components/Common/Loading"

function Landing() {
    const { data: homePageData, isLoading } = useHomePage();

    if (isLoading) return <Loading />

    //! No need
    // if (error) return <div>Failed to load home page.</div>;

    const {
        entitySettings,
        lawyers,
        clientReviews,
    } = homePageData || {};

    return (
        <>
            <Hero />
            <OurCompany
                summary={entitySettings?.companySummary}
                milestones={entitySettings?.journeyMilestones}
                coreValues={entitySettings?.coreValues}
            />
            <OurTeam teamMembers={lawyers} />
            <OurVision baseOfSuccess={entitySettings?.baseOfOurSuccess} />
            <OurServices />
            <ClientOpinions clientReviews={clientReviews} />
            {/* <OurOffices /> */}
        </>
    )
}

export default Landing
