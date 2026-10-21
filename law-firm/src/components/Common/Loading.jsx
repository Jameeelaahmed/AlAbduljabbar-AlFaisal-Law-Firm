import { ColorRing } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import logo from "../../assets/Logos/logo1.png";

export const Loading = () => {
    const { t } = useTranslation();

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-linear-to-br from-bg to-[#e8e9e7]">
            <img
                src={logo}
                alt="Al Abduljabbar"
                className="mb-3 h-24 w-24 object-contain"
            />
            <h2 className="text-3xl font-bold text-primary">{t("logo1Title")}</h2>
            <div className="my-2 h-0.5 w-28 rounded-full bg-linear-to-r from-secondary to-accent" />
            <p className="mb-8 text-sm text-text/70">{t("logoSubtitle")}</p>

            <ColorRing
                visible={true}
                height="70"
                width="70"
                ariaLabel="color-ring-loading"
                wrapperClass="color-ring-wrapper"
                colors={["#001b1e", "#003a42", "#006b63", "#00918a", "#7fc3be"]}
            />
            <p className="mt-3 text-xl font-medium text-primary">Loading..</p>
        </div>
    );
};

export default Loading;
