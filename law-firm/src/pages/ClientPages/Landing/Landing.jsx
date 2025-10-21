import Hero from "../../../components/ClientComponents/Hero/Hero"
import OurCompany from "../../../components/ClientComponents/OurCompany/OurCompany"
import ClientOpinions from '../../../components/ClientComponents/ClientOpinions/ClientOpinions'
import OurVision from "../../../components/ClientComponents/OurVision/OurVision"
import OurOffices from '../../../components/ClientComponents/OurOffices/OurOffices'
import Footer from "../../../components/ClientComponents/Footer/Footer"
import OurServices from "../../../components/ClientComponents/OurServices/OurServices"
import OurTeam from "../../../components/ClientComponents/OurTeam/OurTeam"
import { useHomePage } from "../../../hooks/useHomePage"
import { useTranslation } from "react-i18next"

function Landing() {
    const { t } = useTranslation()
    const { data: homePageData, isLoading, error } = useHomePage();

    if (isLoading) return <div>{t("Loading...")}</div>;
    if (error) return <div>Failed to load home page.</div>;

    const {
        entitySettings,
        lawyers,
        clientReviews,
    } = homePageData?.data || {};

    return (
        <>
            <Hero />
            <OurCompany
                summary={entitySettings?.companySummary}
                milestones={entitySettings?.journeyMilestones}
                coreValues={entitySettings?.coreValues}
            />
            <OurVision baseOfSuccess={entitySettings?.baseOfOurSuccess} />
            <OurServices />
            <ClientOpinions clientReviews={clientReviews} />
            <OurTeam lawyers={lawyers} />
            <OurOffices />
        </>
    )
}

export default Landing
